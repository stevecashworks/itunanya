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
  }`
;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 20px;`
;

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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const fileInputRefThumbnail = useRef(null);
  const fileInputRefVideo = useRef(null);

  const addTag = () => {
    if (tagName.trim()) {
      setTags((prev) => [...new Set([...prev, tagName.toLowerCase()])]);
      setTagName("");
    }
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !thumbnailFile || !videoFile || tags.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("thumbnail", thumbnailFile);
    formData.append("video", videoFile);

    try {
      const res = await axios.post(`${apiEndPoint}/videos/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("itunaya_token"),
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      if (res.data.success) {
        alert("Upload successful");
        window.location.reload();
      } else {
        alert("Upload failed: " + res.data.result);
      }
    } catch (error) {
      console.error(error);
      alert("Upload error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-secondary text-light m-3">
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
          <Dropdown.Item href="#">Channel 1</Dropdown.Item>
          <Dropdown.Item href="#">Channel 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input
        ref={fileInputRefThumbnail}
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={(e) => setThumbnailFile(e.target.files[0])}
      />

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
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <ProgressBar now={progress} animated className="mb-2" />

      <Button variant="danger" onClick={() => removeUpload(upload.id)}>
        <FaTrash /> Delete
      </Button>

      <Button type="submit" variant="success" className="mt-2">
        Save
      </Button>
    </form>
  );
};


export default CreatorProfile;