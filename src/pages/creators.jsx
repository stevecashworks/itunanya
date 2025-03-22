import React, { useState, useContext, useRef, useCallback } from "react";
import { Button, ProgressBar, Dropdown } from "react-bootstrap";
import { FaUpload, FaTrash } from "react-icons/fa";
import axios from "axios";
import styled from "styled-components";
import { apiEndPoint } from "./register";
import { AppContext } from "../App";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/daxqedwet/upload";
const CLOUDINARY_UPLOAD_PRESET = "itunaya";

const Tag = styled.button`
  padding: 5px 50px;
  text-transform: capitalize;
  background-color: #343a40;
  color: white;
  border: 1px solid #343a40;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #23272b;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 20px;
`;

const CreatorProfile = () => {
  const [uploads, setUploads] = useState([]);
  const { state } = useContext(AppContext);

  const addUpload = () => {
    setUploads((prevUploads) => [
      ...prevUploads,
      { id: Date.now(), thumbnailUrl: "", videoUrl: "", progressThumbnail: 0, progressVideo: 0 },
    ]);
  };

  const removeUpload = useCallback((id) => {
    setUploads((prevUploads) => prevUploads.filter((upload) => upload.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-dark text-light">
      {uploads.map((upload) => (
        <UploadUI key={upload.id} upload={upload} removeUpload={removeUpload} />
      ))}
      <Button onClick={addUpload} variant="warning" className="mb-3">
        <FaUpload /> Add Upload
      </Button>
    </div>
  );
};

const UploadUI = ({ upload, removeUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [progressThumbnail, setProgressThumbnail] = useState(0);
  const [progressVideo, setProgressVideo] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const fileInputRefThumbnail = useRef(null);
  const fileInputRefVideo = useRef(null);

  const uploadFile = async (field, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          field === "thumbnail" ? setProgressThumbnail(percent) : setProgressVideo(percent);
        },
      });

      const fileUrl = response.data.secure_url;
      field === "thumbnail" ? setThumbnailUrl(fileUrl) : setVideoUrl(fileUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert(`Upload failed: ${error.response?.data?.message || "Check Cloudinary settings."}`);
    }
  };

  const addTag = () => {
    if (tagName) {
      setTags((prevTags) => Array.from(new Set([...prevTags, tagName.toLowerCase()])));
      setTagName("");
    }
  };

  const removeTag = (tagName) => {
    setTags((prevTags) => prevTags.filter((x) => x !== tagName));
  };

  const uploadVideo = () => {
    fetch(`${apiEndPoint}/videos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("itunaya_token"),
      },
      body: JSON.stringify({
        title,
        description,
        url: videoUrl,
        thumbnail: thumbnailUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Upload Successful");
          window.location.reload();
        } else {
          alert(data.result);
        }
      });
  };

  return (
    <div className="p-3 border rounded bg-secondary text-light m-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Dropdown style={{ marginTop: "10px", marginBottom: "10px", float: "right" }}>
        <Dropdown.Toggle variant="primary">Channels</Dropdown.Toggle>
        <Dropdown.Menu>
          {/* Replace with actual channels */}
          <Dropdown.Item href="#">Channel 1</Dropdown.Item>
          <Dropdown.Item href="#">Channel 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input
        ref={fileInputRefThumbnail}
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={(e) => uploadFile("thumbnail", e.target.files[0])}
      />
      <ProgressBar now={progressThumbnail} animated className="mb-2" />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          style={{ width: "75%", height: "35px" }}
        />
        <Button onClick={addTag} style={{ width: "20%" }}>
          Add Tag
        </Button>
      </div>

      <Tags>
        {tags.map((tag) => (
          <Tag key={tag} onClick={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Tags>

      <input
        ref={fileInputRefVideo}
        type="file"
        className="form-control mb-2"
        accept="video/*"
        onChange={(e) => uploadFile("video", e.target.files[0])}
      />
      <ProgressBar now={progressVideo} animated className="mb-2" />

      <Button variant="danger" onClick={() => removeUpload(upload.id)}>
        <FaTrash /> Delete
      </Button>

      {title && description && thumbnailUrl && videoUrl && tags.length > 0 && (
        <Button onClick={uploadVideo} variant="success" className="mt-2">
          Save
        </Button>
      )}
    </div>
  );
};

export default CreatorProfile;
