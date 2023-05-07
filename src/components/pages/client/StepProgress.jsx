import "../css/Step.css";
import React, {useState} from "react";
import Nav from "../admin/Nav";
import {GetTrajetByTracking} from "../../api/GetTrajetByTracking";
import {GetFactureByTrackingNumber} from "../../api/GetFactureByTrackingNumber";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Button } from "@mui/material";


const StepProgress = (props) =>{

    let [Showtracking,setShowTracking]=useState(false);
    let [ShowError,setShowError]=useState(false);

    let [valueSearch,setValueSearch]=useState(localStorage.getItem('tracking'));

    let [pointsDeRelais,setPointsDeRelais]=useState([]);
    let [dateChemin,setDateChemin]=useState([]);
    let [colisTracked,setColisTracked]=useState({});
    let [factureTracked,setFactureTracked]=useState({});
    let [trajet,setTrajet]=useState({});

    const handleSearchTracking = async () => {
        const token = sessionStorage.getItem('token');
        if (valueSearch) {
            try {
                const tra = await GetTrajetByTracking(token, valueSearch);
                const fact = await GetFactureByTrackingNumber(token, valueSearch);
                setTrajet(tra);
                setFactureTracked(fact);
                setShowTracking(true);
                setShowError(false);

            } catch (error) {
                console.log(error);
            }

        }else{
            setShowTracking(false);
            setShowError(true);
        }
    }

    return (
        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>

            {/*table de tracking*/}
            <section className="tracking-info " id="tracking-info" style={{position:"relative"}}>
                <div className="container ">
                    <div className="input-group ">
                        <div className="container search-form">
                            <input
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                                type="search" id="form1"
                                className="form-control"
                                placeholder="tracking number..." />

                            <Button className="searchButton"
                                    variant="contained"
                                    onClick={handleSearchTracking}
                            >Search</Button>

                        </div>
                    </div>
                    <br/>
                    { Showtracking &&
                    <div className="col-md-12 col-lg-12  step-tracking">
                        <ul className="list-unstyled events ">
                            { trajet && trajet.pointsDeRelais.reverse().map((item,i) => (
                                <li className="event" key={i} >
                                    {trajet.dateChemin &&
                                        <div className="event-time">
                                    <strong>{trajet.dateChemin[trajet.pointsDeRelais.length-i-1].substring(0,10)}</strong>
                                    <span>{trajet.dateChemin[trajet.pointsDeRelais.length-i-1].substring(11,19)}</span>
                                </div>}
                                <div className="event-dot"/>
                                <div className="event-content">
                                    <strong> {item.adresse} </strong>
                                    <span className="location">{item.ville}, MAR</span>
                                    <div className="carrier">
                                        <div className="courier-icon courier-icon-sytrack"/>
                                        prolog post
                                    </div>
                                </div>
                            </li>
                            ))}
                            {factureTracked &&
                                <li className="event" >
                                    <div className="event-time">
                                        <strong>{factureTracked.date.substring(0,10)}</strong>
                                        <span>{factureTracked.date.substring(11,19)}</span>
                                    </div>
                                    <div className="event-dot"/>
                                    <div className="event-content">
                                        <strong>Pre-Shipment Info Sent to Dest</strong>
                                        <span className="location">{factureTracked.colis.adresse}, MAR</span>
                                        <div className="carrier">
                                            <div className="courier-icon courier-icon-sytrack"/>
                                            prolog post
                                        </div>
                                    </div>
                                </li>
                            }

                        </ul>
                    </div>
               }

                    {ShowError &&
                        <Box sx={{height: 600, width: '100%', marginTop: '100px'}} backgroundColor="transparent">
                            <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                <i className="bi bi-exclamation-triangle"
                                   style={{color: "var(--primary-blue)", fontSize: "40px"}}/>
                                <Typography variant="h6" paragraph color="var(--primary-blue)" textTransform="uppercase"
                                            style={{fontFamily: "Georgia"}}>Trucking Number indefined</Typography>
                            </Box>
                        </Box>
                    }

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