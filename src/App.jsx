import './App.css';
import * as React from 'react';
import Home from "./components/pages/accueil/Home";
import {  Route ,Routes,Navigate} from "react-router-dom";
import Client from "./components/pages/interfaces/Client";
import Admin from "./components/pages/interfaces/Admin";
import Manager from "./components/pages/interfaces/Manager";
import  ClockLoader from "react-spinners/ClockLoader";
import { useEffect} from "react";
import Driver from "./components/pages/interfaces/Driver";
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
                    <Route path="/manager" element={<Manager/>} />
                    <Route path="/Driver" element={<Driver/>} />

    </Routes>

        )}
</>
    );
}
export default App;
