import React, { useState } from "react";
import logo from "../../images/prolog.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Register.css";
import { Link } from "react-scroll";
//Modal ==> StyledComponents
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import axios from "axios";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    p: 4,
};




const NavBar = () => {

    // -------------------------------------------API LOGIN----------------------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function useLogin(event){
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/v1/auth/authenticate",
                {
                    email:email,
                    password:password
                }).then((response)=> {

                    if(response.status===200) {
                        const { access_token } = response.data;

                        const config = {
                            headers: {
                                'Authorization': `Bearer ${access_token}` // Ajouter le token dans l'en-tête d'autorisation
                            }
                        };

                        axios.get(`http://localhost:8080/api/v1/user/email/${email}`, config)
                            .then( response => {
                                const { id, role, fullname } = response.data;
                                if(role==="ADMIN") navigate('/admin');
                                else if(role==="CLIENT") navigate(`/client?id=${id}&tk=${access_token}&fullname=${fullname}`);
                            })

                    } else if (response.status===401 || response.status===403) alert("incorrect email and password");


            },fail=>{
                alert("incorrect email and password not mutch");
                console.error(fail); //error
            });
        }
        catch (err){
            alert(err);
        }
    }

    // -------------------------------------------API REGISTER----------------------------------------------

    const [emailRegister, setEmailR] = useState("");
    const [fullName, setFullName] = useState("");
    const [passwordRegister, setPasswordR] = useState("");
    async function useRegister(event){
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/v1/auth/register",
                {
                    fullname:fullName,
                    email:emailRegister,
                    password:passwordRegister
                }).then((response)=> {

                if(response.status===200) {
                    const { access_token } = response.data;

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${access_token}` // Ajouter le token dans l'en-tête d'autorisation
                        }
                    };

                    axios.get(`http://localhost:8080/api/v1/user/email/${emailRegister}`, config)
                        .then( response => {
                            const { id, fullname } = response.data;
                            navigate(`/client?id=${id}&tk=${access_token}&fullname=${fullname}`);
                        })

                } else if (response.status===401 || response.status===403) alert("Email is already exist");


            },fail=>{
                alert("problem");
                console.error(fail); //error
            });
        }
        catch (err){
            alert(err);
        }
    }
    // const [jwt, setJwt] = useLocalState("null");
    // function sendLoginRequest() {
    //     setErrorMsg("");
    //     const reqBody = {
    //         email: email,
    //         password: password,
    //     };
    //     fetch("localhost:8080/api/v1/auth/authenticate", {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         method: "post",
    //         body: JSON.stringify(reqBody),
    //     })
    //         .then((response) => {
    //             if (response.status === 200) return response.text();
    //             else if (response.status === 401 || response.status === 403) {
    //                 setErrorMsg("Invalid username or password");
    //             } else {
    //                 setErrorMsg(
    //                     "Something went wrong, try again later or reach out to trevor@coderscampus.com"
    //                 );
    //             }
    //         })
    //         .then((services) => {
    //             if (services) {
    //                 user.setJwt(services);
    //                 navigate("/admin");
    //             }
    //         });
    // }
    const Button = styled.button`
      background-color: transparent;
      border: 3px solid var(--primary-red);
      //text-transform: uppercase;
      border-radius: 40% 15% 40% 15% ;
      padding: 0.3rem 0.7rem 0.3rem 0.7rem;
      color: #ffffff;
      margin-left: 1.3rem ;
      
      

      &:hover {
        background-color: var(--primary-hover-red);
        //box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
        box-shadow: 10px 1px 20px rgba(53, 239, 239, 0.4);
        color : dimgrey;
      }
    `;
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 100) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };
    window.addEventListener("scroll", changeNavbarColor);

    // pour modal

    const [loginOpen, setLoginOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);

    const handleLoginOpen = () => {
        setRegisterOpen(false);
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleRegisterOpen = () => {
        setLoginOpen(false);
        setRegisterOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterOpen(false);
    };

    const handleClickNav = () =>{
        setColorchange(true);
    }

    return (
        <>


            <nav
                className={`navbar navbar-expand-lg pt-0 p-lg-0  fixed-top ${
                    colorChange ? "bg-dark" : ""
                }`}
            >
                <div className="container ">
                    <a className="navbar-brand" href="/">
                        <img className="logo pt-2" src={logo} alt="prolog" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={handleClickNav}
                    >
                        <i className="bi bi-list" style={{ color: "#ffffff" }} />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item active">
                                <Link
                                    smooth={false}
                                    to="home"
                                    offset={-95}
                                    className="nav-link "
                                    href="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    smooth={false}
                                    to="services"
                                    offset={-95}
                                    className="nav-link"
                                    href="/"
                                >
                                    Services
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    smooth={false}
                                    to="about"
                                    offset={-95}
                                    className="nav-link"
                                    href="/"
                                >
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    smooth={false}
                                    offset={-95}
                                    to="Contacts"
                                    className="nav-link"
                                    href="/"
                                >
                                    Contacts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    smooth={false}
                                    offset={-95}
                                    to="equipements"
                                    className="nav-link"
                                    href="/"
                                >
                                    Équipements
                                </Link>
                            </li>
                            <li className="nav-item">
                                {/*<Link*/}
                                {/*    onClick={handleLoginOpen}*/}
                                {/*    className="nav-link"*/}
                                {/*>*/}
                                {/*    Login / Register*/}
                                {/*</Link>*/}
                                <Button className="login-btn" onClick={handleLoginOpen} >Log in</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>




            {/**************************************page login***************************************/}




            <Modal open={loginOpen} onClose={handleLoginClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>

                        <div className="wrapper ">
                            <span className="icon-close" onClick={handleLoginClose}><ion-icon name="close"/></span>
                            <div className="form-box login">
                                <h2>Login</h2>
                                <form form name="login" method="post" >
                                    <div className="input-box">
                                        <span className="icon"><ion-icon name="mail"/></span>
                                        <input type="email" id="input_email"
                                               value={email}
                                               required
                                               onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label>Email</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon"><ion-icon name="lock-closed"/></span>
                                        <input id="input_pass" type="password"
                                               value={password}
                                               required
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label>Password</label>
                                    </div>
                                    {/*<div className="remember-forgot">*/}
                                    {/*    <label>*/}
                                    {/*        <input type="checkbox" id="checkLogin"/>Remember me*/}
                                    {/*    </label>*/}

                                    {/*</div>*/}
                                    <button type="submit" className="btn" onClick={useLogin}>Login</button>
                                    <div className="login-register">
                                        <p>Don't have an account?
                                            <a className="register-link"  onClick={handleRegisterOpen}>Register</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </Typography>

                </Box>
            </Modal>

            {/**************************************page register***************************************/}

            <Modal open={registerOpen} onClose={handleRegisterClose} >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        <div className="wrapper-register ">
                            <span className="icon-close"onClick={handleRegisterClose} ><ion-icon name="close"/></span>
                            <div className="form-box register">
                                <h2>Registration</h2>
                                <form form name="register" method="post" >
                                    <div className="input-box">
                                        <span className="icon"><ion-icon name="person"/></span>
                                        <input type="text"
                                               value={fullName}
                                               onChange={(e) => setFullName(e.target.value)}
                                               required/>
                                        <label>Full Name</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon"><ion-icon name="mail"/></span>
                                        <input type="email"
                                               value={emailRegister}
                                               onChange={(e) => setEmailR(e.target.value)}
                                               required/>
                                        <label>Email</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon"><ion-icon name="lock-closed"/></span>
                                        <input type="password"
                                               value={passwordRegister}
                                               onChange={(e) => setPasswordR(e.target.value)}
                                               required/>
                                        <label>Password</label>
                                    </div>
                                    {/*<div className="remember-forgot">*/}
                                    {/*    <label>*/}
                                    {/*        <input type="checkbox"/>I agree to the terms & conditions*/}
                                    {/*    </label>*/}
                                    {/*</div>*/}
                                    <button type="submit" className="btn" onClick={useRegister}>Register</button>
                                    <div className="login-register">
                                        <p>Already have an account?
                                            <a  className="login-link" onClick={handleLoginOpen}>login</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>

        </>
    );
};

export default NavBar;