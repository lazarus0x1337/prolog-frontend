import Nav from "../admin/Nav";
import {Button, FormControlLabel, FormGroup, Switch} from "@mui/material";
import {Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import sessionStorage from "sessionstorage";


function Colis(props) {

    let [factures, setFactures] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };
   //api manager for get all factures :
    axios.get(`http://localhost:8080/api/v1/factureColis`,config)
        .then(response => {
            if(!isChecked) setFactures(response.data);
            else{
                const fact = response.data.filter(facture => facture.colis.inContainer === false);
                console.log(fact);
                setFactures(fact);
            }
        });

    const [selectedIds, setSelectedIds] = useState([]);

    function handleAddContainer(){
        if(selectedIds.length===0) alert("Veuillez selectionner au moins un colis");
        else console.log("Selected IDs:", selectedIds);
    }



    return(
        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
            <div className="manager">
                <h2 className="booking__title">Colis : </h2>
                <div className="input-group">
                    <div className="container search-form">
                        <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                        <Button variant="contained">Search</Button>
                        <Button variant="contained" onClick={handleAddContainer} >Add to container</Button>

                    </div>
                </div>
                <br/>
                <div style={{paddingLeft:"14px",width:"25%",borderRadius:"20px",border:"2px solid var(--primary-blue)",marginLeft:"14px",marginBottom:"14px"}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            defaultChecked color="default"/>} label="Hide on-board packages" style={{color:"var(--primary-blue)"}}/>
                    </FormGroup>
                </div>

                <div>

                    <Table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Tracking Number</th>
                            <th scope="col">Proprietaire</th>
                            <th scope="col">Origin Address</th>
                            <th scope="col">Arrived Address</th>
                            <th scope="col">Weight(g)</th>
                            <th scope="col">Dim(L)</th>
                            <th scope="col">Fragile</th>
                            <th scope="col">Froid</th>

                        </tr>
                        </thead>

                        <tbody>
                        {  factures?.map((item, i) => (
                            <tr key={i}>
                                <th>
                                    <div className="form-check" >
                                        <input
                                            type="checkbox"
                                            id={item.colis.trackingNumber.trackingNumber}
                                            checked={selectedIds.includes(item.colis.trackingNumber.trackingNumber)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds([...selectedIds, item.colis.trackingNumber.trackingNumber]);
                                                } else {
                                                    setSelectedIds(selectedIds.filter((id) => id !== item.colis.trackingNumber.trackingNumber));
                                                }
                                            }}
                                        />
                                    </div>
                                </th >
                                <th scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</th>
                                <td>{item.client.fullname}</td>
                                <td style={{textAlign:"left"}}>{item.colis.adresse}</td>
                                <td style={{textAlign:"left"}}>{item.colis.destinataire.adresse}</td>
                                <td>{item.colis.poids}</td>
                                <td>{item.colis.longueur * item.colis.largeur * item.colis.hauteur/1000}</td>
                                <td>{item.colis.fragile ?
                                    <i className="bi bi-box-fill " style={{color: "#00FF03", paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "#FF0000", paddingLeft: "12px"}}/>}</td>
                                <td>{item.colis.froid ?
                                    <i className="bi bi-box-fill " style={{color: "#00FF03", paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "#FF0000", paddingLeft: "12px"}}/>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}


export default Colis;