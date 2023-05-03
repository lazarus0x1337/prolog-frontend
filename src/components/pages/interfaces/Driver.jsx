import React, { useState } from "react";
import '../Driver/Driver.css';
import axios from "axios";
import "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-scroll";
import Navbar from "../Driver/Navbar";
function Driver() {
    const [AfficheContainer,setAfficheContainer]=useState(false);

    return (
        <>
            <Navbar />
            <div className="container-driver">

                <div className="d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="box">
                                    <h3>Container : rfc2324243</h3>
                                    <p>Pour effectuer des envois via notre plateforme, il suffit de remplir quelques champs (nom du destinataire, son adresse, mode de paiement ...) et nous occupons du reste...</p>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="box">
                                    <h3>Container : rfc2324243</h3>
                                    <p>Nous disposons d’un vaste espace alloué à chacun de nos vendeurs pour stocker leurs marchandises. Ceci a pour but de leurs épargner du temps ...</p>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-3 ">
                                <div className="box">
                                    <h3>Container : rfc2324243</h3>
                                    <p>Nous disposons d’une équipe performante, experte en communication et techniques de vente. Disponible pour appeler vos clients et confirmer vos commandes...</p>.
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 ">
                                <div className="box">
                                    <h3>Container : rfc2324243</h3>
                                    <p>Nous disposons d’une équipe performante, experte en communication et techniques de vente. Disponible pour appeler vos clients et confirmer vos commandes...</p>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
export default Driver;
