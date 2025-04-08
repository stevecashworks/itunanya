import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import logo from "../Assets/Logo---HD.png"
import {useNavigate} from "react-router-dom"

export const apiEndPoint= "http://localhost:5001"
const Register = ({setAction}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate= useNavigate()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
     const {email, password,name}= formData
     fetch(`${apiEndPoint}/users/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.success){
        setSuccess("Registration successful!");
        
        localStorage.setItem("itunaya_token", data.result )
        navigate("/")

      }
      else{
        setError("User exists")
      }
    
    })
    .catch(err=>{console.log(err.message);

      alert("user exists")
    })
    // Handle registration logic here
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#1c1c1c", color: "#ecf0f1" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow-lg" style={{ backgroundColor: "#2c3e50", color: "#ecf0f1" }}>
            <Card.Body>
              <div className="text-center text-danger mb-4">
                <img style={{width:"90px"}} src={logo}></img>
              </div>
              <h3 className="text-center mb-4">Register</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#34495e", color: "#ecf0f1" }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: "#16a085", borderColor: "#16a085" }}>
                  Register
                </Button>

                <div className="text-center">
              <a href="#" onClick={()=>{setAction("login")}} style={{textDecoration:"none", display:"block", marginTop:"10px"}} className="text-light">Already have an account? Login</a>
            </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;