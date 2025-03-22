import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import NotFound from "./pages/notFound.jsx";
import VideoDashboard from "./pages/feeds.jsx";
import  RegisterPage from "./pages/register.jsx"
import CreatorsPage from "./pages/creators.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import SingleVideo from "./pages/singleVideo.jsx"
import AddChannel from "./pages/addChannel.jsx";
import LoginPage from  "./pages/login.jsx"
import { createContext, useReducer } from "react";
import reducer, {initialState} from "./reducer.js";

export const AppContext= createContext()
const {Provider}= AppContext
const App = () => {

  const [state,dispatch]= useReducer(reducer, initialState)
  console.log(state)
  return (
    <Provider value={{state, dispatch}}>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feeds" element={<VideoDashboard />} />
        <Route path="/create" element={<CreatorsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/channels/add" element={<AddChannel />} />
        <Route path="/video/:id" element={<SingleVideo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </Provider>
  );
};

export default App;
