import styled from "styled-components"
import {Spinner} from "react-bootstrap"
import { useEffect, useState } from "react"
import {apiEndPoint} from "./register"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../App.js"
import fetchData from "../fetchData.js"
const Container=styled.div`
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
` 
const Home=()=>{
    const navigate= useNavigate()
    const [userDetailsAreFetched, setUserDetailsAreFetched]= useState(false);
    const [channelsAreFetched, setChannelsAreFetched]= useState(false);

    const  {state, dispatch}= useContext(AppContext)
    
    useEffect(()=>{
        const token=localStorage.getItem("itunaya_token")
        if(token){
            if(!userDetailsAreFetched){
                fetch(`${apiEndPoint}/users/loginwithtoken`,{
    
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        token
                    },
                    
        
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(!data.success){
                        console.log(data)
                    }
                    else{
                        localStorage.setItem("itunaya_id", data.result._id)
                        localStorage.setItem("itunaya_username", data.result.name)
                        dispatch({type:"setUserDetails", payload:data.result})
                        
                        setUserDetailsAreFetched(true)
                    }
                }).catch(err=>{
                    console.log(err.message)
                });
            
            }

        }
        else{
            console.log("token not found, redirecting to feeds")
            navigate("/register")
        }
       
        

        if(!channelsAreFetched){
            fetchData("channels", "get",

                (result)=>{
                    dispatch({type:"setChannels", payload:result})
                    setChannelsAreFetched(true)
                },
                (message)=>{
                    console.log(message)
                }
            )

        }

        if(channelsAreFetched&&userDetailsAreFetched){
            navigate("/feeds")
        }

        
    },[channelsAreFetched, userDetailsAreFetched])
    return(
        
        <Container>
            <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        </Container>
    )
}

export default Home