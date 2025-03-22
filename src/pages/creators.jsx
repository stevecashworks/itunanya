import React, { useState, createContext, useContext } from "react";
import { Button, ProgressBar, Dropdown } from "react-bootstrap";
import { FaUpload, FaUserPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import cover from "../Assets/coverimage.jpg";
import styled from "styled-components";
import { apiEndPoint } from "./register";
import { AppContext } from "../App";


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/daxqedwet/upload";
const CLOUDINARY_UPLOAD_PRESET = "itunaya";

const TagInputs = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Tag = styled.button`
  padding: 5px 50px;
  position: relative;
  text-transform: capitalize;
  width: 200px;
  height: 35px;
  overflow: hidden;
  background-color: #343a40; /* Bootstrap Dark */
  color: white;
  border: 1px solid #343a40;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: #23272b; /* Darker shade */
    border-color: #1d2124;
  }

  &::after {
    content: "❌";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: translateY(0);
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
  const {state}= useContext(AppContext)
  const addUpload = () => {
    setUploads((prevUploads) => [
      ...prevUploads,
      {
        id: Date.now(),
        title: "",
        description: "",
        thumbnail: null,
        video: null,
        progressThumbnail: 0,
        progressVideo: 0,
        thumbnailUrl: "",
        videoUrl: "",
      },
    ]);
  };

  const removeUpload = (id) => {
    setUploads((prevUploads) => prevUploads.filter((upload) => upload.id !== id));
  };

  const handleChange = (id, field, value) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.id === id ? { ...upload, [field]: value } : upload
      )
    );
  };

  const handleFileChange = (id, field, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload.id === id ? { ...upload, [field]: file } : upload
        )
      );
      uploadFile(id, field, file);
    }
  };

  const uploadFile = async (id, field, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploads((prevUploads) =>
            prevUploads.map((upload) =>
              upload.id === id
                ? { ...upload, [field === "thumbnail" ? "progressThumbnail" : "progressVideo"]: percent }
                : upload
            )
          );
        },
      });

      const fileUrl = response.data.secure_url;
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload.id === id ? { ...upload, [`${field}Url`]: fileUrl } : upload
        )
      );
    } catch (error) {
      console.error("Upload failed", error.response ? error.response.data : error.message);
      alert(`Upload failed: ${error.response?.data?.message || "Check Cloudinary settings."}`);
    }
  };

  const UploadUI = ({ upload }) => {
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState("");

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
      const { title, description, thumbnailUrl, videoUrl } = upload;

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
            alert("Successful");
            window.location.reload();
          } else {
            console.log(data);
            alert(data.result);
          }
        });
    };

    return (
      <div key={upload.id} className="p-3 border rounded bg-secondary text-light m-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={upload.title}
          onChange={(e) => handleChange(upload.id, "title", e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={upload.description}
          onChange={(e) => handleChange(upload.id, "description", e.target.value)}
        />

         <Dropdown style={{marginTop:"10px", marginBottom:"10px", float:"right"}}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Channels
              </Dropdown.Toggle>
        
              <Dropdown.Menu>
                {
                  
                  state.channels.map(channel=>{
                    return(
        
                      <Dropdown.Item href={`#${channel.name}`}>{channel.name} <small> ( {channel.dial} )</small></Dropdown.Item>
                    )
                    
                  })
                }
                {/* <Dropdown.Item href="#/action-2">Channel 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Channel 3</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Channel 4</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Channel 4</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Channel 6</Dropdown.Item>
                <Dropdown.Item href="#/action-7">Channel 7</Dropdown.Item>
                <Dropdown.Item href="#/action-8">Channel 8</Dropdown.Item>
                <Dropdown.Item href="#/action-9">Channel 9</Dropdown.Item>
                <Dropdown.Item href="#/action-10">Channel 10</Dropdown.Item> */}
                
                
              </Dropdown.Menu>
            </Dropdown>
        <input type="file" className="form-control mb-2" accept="image/*" onChange={(e) => handleFileChange(upload.id, "thumbnail", e)} />
        <ProgressBar now={upload.progressThumbnail} animated className="mb-2" />

        <TagInputs>
          <input value={tagName} onChange={(e) => setTagName(e.target.value)} style={{ width: "75%", height: "35px" }} />
          <Button onClick={addTag} style={{ width: "20%" }}>
            Add Tag
          </Button>
        </TagInputs>

        <Tags>
          {tags.map((tag) => (
            <Tag key={tag} onClick={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </Tags>

        <input type="file" className="form-control mb-2" accept="video/*" onChange={(e) => handleFileChange(upload.id, "video", e)} />
        <ProgressBar now={upload.progressVideo} animated className="mb-2" />
        <Button variant="danger" onClick={() => removeUpload(upload.id)}>
          <FaTrash /> Delete
        </Button>
        {upload.title && upload.description && upload.thumbnailUrl && upload.videoUrl && tags.length > 0 && (
          <Button onClick={uploadVideo} variant="success" className="mt-2">
            Save
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark text-light">
      
      {uploads.map((upload) => (
        <UploadUI key={upload.id} upload={upload} />
      ))}
      <Button style={{display:"block", margin:"30px auto"}} onClick={addUpload} variant="warning" className="mb-3">
        <FaUpload /> Add Upload
      </Button>
    </div>
  );
};

export default CreatorProfile;
