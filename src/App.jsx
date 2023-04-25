import './App.css';
import * as React from 'react';
import Home from "./components/pages/accuil/Home";
import {  Route ,Routes,Navigate} from "react-router-dom";
import Client from "./components/pages/interfaces/Client";
import Admin from "./components/pages/interfaces/Admin";
import  ClockLoader from "react-spinners/ClockLoader";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
function App() {
const [loading,setLoading]=React.useState(false);
useEffect( ()=>{
    setLoading(true);
    setTimeout(()=>{
        setLoading(false);
    },780);
    },[]);

    return (
<>

    { loading ? (<div className="App"> <ClockLoader size={50} color={'#00FFF0'} loading={loading}/></div>
        ) :(
    <Routes>
        <Route path="/" element={<Navigate to="/home" element={<Home />} />}/>
                   <Route path="/home" element={<Home/>} />
                    <Route path="/client" element={<Client/>} />
                   <Route path="/admin" element={<Admin/>} />

    </Routes>

        )}


</>
    );
}
export default App;
