import React, { useState } from "react";
import '../css/style.css';
import { NavLink } from "react-router-dom";
import Image from '../../images/background_darkblue.jpeg';
import Dashboard from "../admin/Dashboard";
import Managers from "../admin/Managers";
import Clients from "../admin/Clients";
import Driver from "../admin/Driver";

const divStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    width:'auto',
};

function Admin() {
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {  setToggle(!toggle) }

    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    function handleClick1() {
        setShow1(true);
        setShow2(false);
        setShow3(false);
        setShow4(false);
    }
    function handleClick2() {
        setShow1(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);
    }
    function handleClick3() {
        setShow1(false);
        setShow2(false);
        setShow3(true);
        setShow4(false);
    }
    function handleClick4() {
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(true);
    }
    return (

        <>
            <div className='container-fluid  min-vh-100 ' style={divStyle}>
                <div className='row '>
                    {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>

                        <div className='bg-white sidebar p-2'>
                            <div className='sidebar__top m-1'>
                                {/*<i className="bi bi-caret-right-fill"/>*/}
                                <span className='brand-name' >Welcome</span>
                            </div>
                            <hr className='text-dark' />
                            <div className='list-group list-group-flush'>

                                <a className='list-group-item py-2' >
                                    <i className="bi bi-speedometer2 fs-5 me-3"/>
                                    <NavLink
                                        onClick={handleClick1}
                                        style={{ color: "black",textDecoration:'none'}}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Dashboard</NavLink>
                                </a>

                                <a className='list-group-item py-2' >
                                    <i className="bi bi-person-gear fs-5 me-3"/>
                                    <NavLink
                                        onClick={handleClick2}
                                        style={{ color: "black",textDecoration:'none'}}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Managers</NavLink>
                                </a>

                                <a className='list-group-item py-2' >
                                    <i className="bi bi-table fs-5 me-3"/>
                                    <NavLink
                                        onClick={handleClick3}
                                        style={{ color: "black",textDecoration:'none'}}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Clients</NavLink>
                                </a>
                                <a className='list-group-item py-2' >
                                    <i className="bi bi-clipboard-data fs-5 me-3"/>
                                    <NavLink
                                        onClick={handleClick4}
                                        style={{ color: "black",textDecoration:'none'}}
                                        className={ (navClass) =>
                                            navClass.isActive ? "nav__active nav__link" : "nav__link"}>Drivers</NavLink>
                                </a>

                                <a className='list-group-item py-2' >
                                    <i className="bi bi-power fs-5 me-3"/>
                                    <NavLink to="/home"
                                             style={{ color: "black",textDecoration:'none'}}
                                             className={ (navClass) =>
                                                 navClass.isActive ? "nav__active nav__link" : "nav__link"}>Logout</NavLink>
                                </a>

                            </div>
                        </div>
                    </div>}

                    {toggle &&  <div className='col-4 col-md-2'/>}
                    <div className='col'>
                        {show1 && <Dashboard Toggle={Toggle} /> }
                        {show2 && <Managers Toggle={Toggle} /> }
                        {show3 && <Clients Toggle={Toggle}/> }
                        {show4 && <Driver Toggle={Toggle} /> }
                    </div>
                </div>
            </div>

        </>
    );
}
export default Admin;