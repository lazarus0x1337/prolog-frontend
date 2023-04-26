import { useState } from "react";
import  Nav from "../admin/Nav";
import { Table } from "react-bootstrap";
import colis_data from "../services/colis_data_client";
import { Button, Typography } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import FormColis from "./FormColis";
import Modal from "@mui/material/Modal";
import axios from "axios";

function Colis(props){
    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const npage = Math.ceil(colis_data.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);
    function prePage(){
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    function changeCPage(id){
        setCurrentPage(id);
    }
    function nextPage(){
        if(currentPage !== npage) setCurrentPage(currentPage + 1)
    }


    const [loginOpen, setLoginOpen] = React.useState(false);
    const handleLoginOpen = () => {
        setLoginOpen(true);
    };
    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    // service -----------------------------------------------------------
    let [factures,setFactures] = useState([]);

    const config = {
        headers: {
            'Authorization': `Bearer ${props.tk}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };

    axios.get(`http://localhost:8080/api/v1/factureColis/clientId/${props.id}`, config)
        .then(response => {
            setFactures(response.data); // liste
            factures.map((a,i)=>{console.log(a.colis.trackingNumber)})

        })

    return(
        <div className="px-3">
            <Nav Toggle={props.Toggle} fullname={props.fullname}/>
            <div className="manager">
                <h2 className="booking__title">Colis : </h2>
                <div className="input-group">
                    <div className="container search-form">
                        <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                        <Button variant="contained" >Search</Button>
                        <Button variant="contained" onClick={handleLoginOpen} >Send new Colis</Button>
                    </div>
                </div>
                <Modal open={loginOpen} onClose={handleLoginClose}>
                    <FormColis/>
                </Modal>
              <br/>
                <div>

                    <Table className="table" >
                        <thead>
                        <tr>
                            <th scope="col">Tracking Number</th>
                            <th scope="col">Origin Address</th>
                            <th scope="col">Arrived Address</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Volume</th>
                            <th scope="col">Fragile</th>
                            <th scope="col">Froid</th>
                            <th scope="col">facture</th>
                        </tr>
                        </thead>
                        <tbody>

                        {factures?.map((item,i) => (
                            <tr key={i}  >
                                <th scope="row" className='pl-5'>{item.colis.trackingNumber}</th>
                                <td>{item.colis.adresse}</td>
                                <td>{item.colis.destinataire.adresse}</td>
                                <td>{item.colis.poids}</td>
                                <td>{item.colis.longueur*item.colis.largeur*item.colis.hauteur}</td>
                                <td>{item.colis.fragile ? <i className="bi bi-box-fill " style={{color:"#00FF03",paddingLeft:"12px"}}/> : <i className="bi bi-box-fill " style={{color:"#FF0000",paddingLeft:"12px"}}/>}</td>
                                <td>{item.colis.froid ? <i className="bi bi-box-fill " style={{color:"#00FF03",paddingLeft:"12px"}}/> : <i className="bi bi-box-fill " style={{color:"#FF0000",paddingLeft:"12px"}}/>}</td>
                                <td><a href="">Imprimer</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link'  onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n,i) =>(
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link' onClick={ ()=> changeCPage(n) }>{n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </>
            </div>
        </div>
    );
}

export default Colis;