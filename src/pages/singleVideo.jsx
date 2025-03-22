import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { apiEndPoint } from "./register";

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [title,setTitle]= useState("Video Player")
  const [description,setDescription]= useState("Video Description")
  const videoRef = useRef(null);

  console.log("Fetched Video URL:", videoUrl);

  useEffect(() => {
    fetch(`${apiEndPoint}/videos/code/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("API Response:", data);
        if (data.success) {
          setVideoUrl(data.result.url);
          setDescription(data.result.description);
          setTitle(data.result.title);
        }
      })
      .catch(error => console.error("Error fetching video:", error));
  }, [id]); // Ensure it updates when the video ID changes

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setCanPlay(true)).catch(err => {
        console.error("Autoplay failed:", err);
      });
    }
  };

  return (
    <Container className="mt-5 text-center">
      

      <div className="mt-4">
        {videoUrl ? (
          <video
            ref={videoRef}
            width="75%"
            height="auto"
            controls
            onLoadedData={handlePlay} // Auto-play when metadata is loaded
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>

      {!canPlay && videoUrl && (
        <Button variant="primary" className="mt-3" onClick={handlePlay}>
          ▶ Play Video
        </Button>
      )}  



<h2 className="mb-4">{title}</h2>
<p className="text-muted">{description}</p>
    </Container>
  );
};

export default VideoPlayer;
