import "../css/Step.css";
import React from "react";
import Nav from "../admin/Nav";
import info_colis from '../services/info_colis';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
const StepProgress = (props) =>{

    return (
        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>

            {/*table de tracking*/}
            <section className="tracking-info " id="tracking-info" style={{position:"relative"}}>
                <div className="container ">
                    <div className="input-group ">
                        <div className="container search-form">
                            <input type="search" id="form1" className="form-control" placeholder="tracking number..." />
                            <Button className="searchButton" variant="contained" >Search</Button>

                        </div>
                    </div>
                    <br/>

                    <div className="col-md-12 col-lg-12  step-tracking">
                        <ul className="list-unstyled events ">

                            {info_colis.map((item,i) => (
                                <li className="event" key={i} >
                                <div className="event-time">
                                    <strong>{item.date}</strong>
                                    <span>{item.heure}</span>
                                </div>
                                <div className="event-dot"/>
                                <div className="event-content">
                                    <strong>{item.status} {item.Dest}</strong>
                                    <span className="location">{item.Origin} , MAR</span>
                                    <div className="carrier">
                                        <div className="courier-icon courier-icon-sytrack"/>
                                        prolog post
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </section>





            {/*<Modal open={loginOpen} >*/}
            {/*    <Box sx={style}>*/}
            {/*        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>*/}



            {/*        </Typography>*/}

            {/*    </Box>*/}
            {/*</Modal>*/}

</>
    );
}
export default StepProgress;