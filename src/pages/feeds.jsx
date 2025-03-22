import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { IoMdWallet, IoMdAdd } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import {useNavigate} from "react-router-dom"
import { apiEndPoint } from "./register";
import styled from "styled-components";
import fetchData from "../fetchData.js";
import { useContext } from "react";
import { AppContext } from "../App.js";
import NavbarComponent from "../components/navbar.jsx";
const categories = ["Network", "Sports", "Educational", "Musician", "Deportes", "Gastronomy"];

;
const StyledCard=styled(Card)`
background:rgb(0,0,0,0.2);
`
const NothingCon=styled.div`
margin:100px auto;
display:flex;
flex-direction:column;
width:200px;
gap:20px;
`
const Link=styled.a`
`

const VideoDashboard = () => {
  const  navigate= useNavigate()
  const [ fetchedVideos, setFetchedVideos]= useState([])
  const {state}= useContext(AppContext)
  const {channels}= state
  const [query, setQuery]= useState("");
  console.log({channels})
  const startSearch=()=>{
    console.log(query)
    if(query){
      fetchData(
        `videos/search`,
        "POST",
        (result)=>{
          console.log(result)
          setFetchedVideos(result)
        },
        (message)=>{
          console.log(message)
        },
        {
          query
        }

      )

    }
  }

  const videos = [
    ...fetchedVideos.map(x=>{ return{duration:"1:00",id:x._id, view:"0",image:x.thumbnail, ...x}}),
    // { id: 1, title: "Tutorial", description: "Learn the basics of web development.", duration: "12:43", views: "2.5K", image: thumbnail },
    // { id: 2, title: "Advanced Techniques", description: "Explore advanced coding practices.", duration: "32:00", views: "7.8K", image: thumbnail },
    // { id: 3, title: "React Guide", description: "Master React for frontend development.", duration: "22:43", views: "12.9K", image: thumbnail },
    // { id: 4, title: "UI/UX Principles", description: "Improve your design skills.", duration: "12:43", views: "3.3K", image: thumbnail },
    // { id: 5, title: "Backend Development", description: "Understand how servers work.", duration: "22:43", views: "1.3K", image: thumbnail },
    // { id: 6, title: "Backend Development", description: "Understand how servers work.", duration: "22:43", views: "1.3K", image: thumbnail },
    // { id: 7, title: "Backend Development", description: "Understand how servers work.", duration: "22:43", views: "1.3K", image: thumbnail },
    // { id: 8, title: "Backend Development", description: "Understand how servers work.", duration: "22:43", views: "1.3K", image: thumbnail },
  
  ]

    useEffect(()=>{
    fetch(`${apiEndPoint}/videos`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.success){
          setFetchedVideos(data.result)
      }
      else{
          window.location.reload()
      }
    })
  },[])
  return (
    <>
      <NavbarComponent/>
    <Container fluid className="bg-dark text-light min-vh-100 d-flex">
      {/* Sidebar */}

      <div className="bg-black p-3 d-flex flex-column align-items-center" style={{ width: "80px" }}>
        <AiOutlineMenu size={24} className="mb-4" />
        <div className="d-flex flex-column gap-3">
          <Button variant="link" className="text-light p-0">
            <i className="bi bi-house-door-fill fs-4"></i>
          </Button>
          <Button variant="link" className="text-light p-0">
            <i className="bi bi-collection-play-fill fs-4"></i>
          </Button>
          <Button variant="link" className="text-light p-0">
            <i className="bi bi-clock-history fs-4"></i>
          </Button>
        </div>
      </div>

      <Container className="py-3 flex-grow-1">
        {/* Header */}
        <Row className="mb-4  align-items-center">
          <Col md={3} className="text-start">
            <h3 className="fw-bold text-uppercase text-danger"><span className="text-light">ITUNANYA</span>.com</h3>
          </Col>
          <Col md={6}>
            <InputGroup>
              <Form.Control type="text"onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search for name, category..." />
              <Button variant="secondary" onClick={startSearch}>
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-end">
            

            <Button variant="outline-light">
              <IoMdWallet />
            </Button>

            <Button
            onClick={()=>{
              if(localStorage.getItem("itunaya_id")){
                navigate("/create")
              }else{
                alert("you must become a creator first")
                navigate("/register")
              }
            }}
            
            style={{marginLeft:"8px"}} variant="outline-light">
              <IoMdAdd />
            </Button>
          </Col>
        </Row>

        {/* Categories */}
        <div className="mb-6 d-flex " style={{paddingRight:"100px", marginBottom:"40px"}}>
          <Col xs={12}>

            <div className="d-flex flex-wrap gap-1">
                <Button variant="light">
                <FaChevronLeft className="text-danger"/>
                </Button>
              {categories.map((cat, index) => (
                <Button key={index} variant="dark" className="border-light px-4 py-2">
                  {cat}
                </Button>
              ))}
               <Button variant="light">
                <FaChevronRight className="text-danger"/>
                </Button>
            </div>
          </Col>

        

    <Col>
    <Dropdown>
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
    </Col>
  

        </div>

        {/* Video Grid */}
        <Row >
          {(videos.length>0)?videos.map((video) => (
            <Col as={Link} style={{textDecoration:"none"}} href={`/video/${video.shortCode}`} key={video.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <StyledCard className="  text-white border-0">
                <Card.Img variant="top" src={video.image} />
                <Card.Body>
                  <Card.Title className="text-truncate">{video.title}</Card.Title>
                  <p>{video.duration} | {video.views} views</p>
                  <Card.Text>{video.description}</Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
          )):<NothingCon>
            <h6>Nothing to display</h6>
            <Button onClick={()=>{window.location.reload()}} variant="info">👈 Go back</Button>
            </NothingCon>}
        </Row>
      </Container>
    </Container>
        </>
  );
};

export default VideoDashboard;
