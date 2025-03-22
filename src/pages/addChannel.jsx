import { useState, useEffect } from "react";
import { Container, Form, Button, Badge, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchData from "../fetchData.js";

export default function AddChannel() {
const navigate= useNavigate()
  useEffect(()=>{
    fetchData(
      "channels/",
       "get",
        (result)=>{
          console.log(result)
        },
        (message)=>{
          console.log(message)
        }
        
      )
  },[])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (category.trim() && !categories.includes(category.trim())) {
      setCategories(Array.from(new Set([...categories, category.trim()])));
      setCategory("");
    }
  };

  const handleRemoveCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const createChannel=()=>{
  const channelDetails=  {
      name:title,
      description,
      tags:categories
    }

    fetchData(
      "channels/create", 
      "Post",
       (result)=>{
          console.log(result)
          navigate("/")
       },
       (message)=>{
        console.log(message)
       },
       channelDetails
      )
  }

  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center text-light">
      <Container>
        <Card bg="dark" text="light" className="p-4 shadow-lg w-100" style={{ maxWidth: "600px", margin: "auto" }}>
          <h3 className="mb-3 text-center">Add New Channel</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Channel Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter channel title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Channel Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter channel description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Col>
                <Col xs={3}>
                  <Button variant="success" className="w-100" onClick={handleAddCategory}>
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Group>

            <div className="mb-3 text-center">
              {categories.map((cat, index) => (
                <Badge
                  key={index}
                  pill
                  bg="light"
                  className="me-2 mb-2 p-2"
                  style={{ cursor: "pointer", color:"black", textTransform:"capitalize" }}
                  onClick={() => handleRemoveCategory(cat)}
                   
                  
                >
                  {cat} ✖
                </Badge>
              ))}
            </div>
        {
            title&&description&&(categories.length>0)&&(
                <Button onClick={createChannel} className="btn-block"  variant="success">Add Channel</Button>
            )
        }
          </Form>
        
        </Card>
      </Container>
    </div>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               