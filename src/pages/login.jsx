import { useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import fetchData from "../fetchData";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const  navigate= useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
  const  [email, setEmail]= useState("")                                                                                         
  const  [password, setPassword]= useState("")           
  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!password||!email){
        alert("please  fill the form  properly  to proceed")
        return
    }
     fetchData(
        "users/login",
        "Post",
        (data)=>{
            console.log(data)
            localStorage.setItem("itunaya_token",data);
            navigate("/")
        },
        (data)=>{
          console.log(data)
        },
        {
            email, 
            password
        }
     );

  }                                                                              
  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center bg-dark">
      <Card className="p-4 text-light bg-secondary shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" className="bg-dark text-light" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-dark text-light"
                  required="true"
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
                <Button
                  variant="outline-light"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button onClick={(e)=>{handleSubmit(e)}} variant="success" type="submit" className="w-100">
              Login
            </Button>
            <div className="text-center">
              <a href="/register" style={{textDecoration:"none", display:"block", marginTop:"10px"}} className="text-light">Don't have an account? Register</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
