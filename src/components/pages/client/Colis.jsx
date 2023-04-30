import {useState} from "react";
import Nav from "../admin/Nav";
import {Table} from "react-bootstrap";
import {Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import FormColis from "./FormColis";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";



function Colis(props){
    // const [currentPage,setCurrentPage] = useState(1);
    // const recordsPerPage = 3;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const npage = Math.ceil(colis_data.length / recordsPerPage);
    // const numbers = [...Array(npage+1).keys()].slice(1);
    // function prePage(){
    //     if(currentPage !== 1) setCurrentPage(currentPage - 1)
    // }
    // function changeCPage(id){
    //     setCurrentPage(id);
    // }
    // function nextPage(){
    //     if(currentPage !== npage) setCurrentPage(currentPage + 1)
    // }


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

    axios.get(`http://localhost:8080/api/v1/factureColis/clientId/${sessionStorage.getItem("ID")}`, config)
        .then(response => {
            console.log("id ="+sessionStorage.getItem("ID"));
            setFactures(response.data); // liste
            // factures.map((a, i) => {
            //     // console.log(a.colis.trackingNumber.trackingNumber)
            // })
        })


    // Colis Data
    const [showTel, setshowTel] = useState(false);
    const [ColisId, setColisId] = useState(0);
    const [AddColis, setAddColis] = useState("");

    const [Poids, setPoids] = useState(0);
    const [Height, setHeight] = useState(0);
    const [Length, setLength] = useState(0);
    const [Width, setWidth] = useState(0);
    const [Prix, setPrix] = useState(Poids * Height * Width * Length);
    //Destinataire Data
    const [addressDES, setaddressDES] = useState("");
    const [telAdd, settelAdd] = useState("");
    const [lastName, setlastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [checkedFragile, setCheckedFragile] = useState(false);
    const [checkedFroid, setCheckedFriod] = useState(false);
    const [result, setResult] = useState('');
    const DataColis = {
        "poids": Poids,
        "longueur": Width,
        "largeur": Length,
        "hauteur": Height,
        "froid": checkedFroid,
        "fragile": checkedFragile,
        "adresse": AddColis,
        "destinataire": {
            "firstname": firstName,
            "lastname": lastName,
            "adresse": addressDES,
            "telephone": telAdd
        },
        "trackingNumber": {
            "trackingNumber": result
        }
    }

    const generateResult = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let randomResult = '';
        for (let i = 0; i < 15; i++) {
            randomResult = randomResult.concat(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        setResult(randomResult);
        console.log(result);
    }

    //modal :

    const [OpenColis, setOpenColis] = React.useState(false);
    const [OpenFacture, setOpenFacture] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    const [TEL, setTEL] = useState("");
    const [telModal, setTelModal] = useState(false);

    const ValidateFacture = () => {
        setOpenFacture(true);
        setOpenColis(false);
        setTelModal(false);
    }
    const closeValidateFacture = () => {
        setOpenFacture(false);
        setOpenColis(false);
        setTelModal(false);
    }

    const handleOpen = () => {
        setOpenColis(true);
        setOpenFacture(false);
        setTelModal(false);

    };
    const handleClose = () => {
        setOpenColis(false);
        setOpenFacture(false);
        setTelModal(false);
    };
    const  OpenModalTel=()=>{
        setTelModal(true);
        setOpenColis(false);
        setOpenFacture(false);
    }
    const  closeModalTel=()=>{
        setTelModal(false);
        setOpenColis(false);
        setOpenFacture(false);
        setSaved(false);
    }
    const Saved=()=>{
        closeModalTel();
        setSaved(true);
    }



    const CheckTel=()=>{
        axios.get(`http://localhost:8080/api/v1/user/${sessionStorage.getItem("ID")}`, config)
            .then(response => {
                if(!response.data.telephone){
                    OpenModalTel();
                } else {
                    SaveFacture();
                }
            })

    }
    const SaveFacture = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/v1/colis', DataColis, config);
            if (response.status === 201) {
                console.log("Colis enregistré avec succès");
                const DataFacture = {
                    "prix":Prix,
                    "date":"2023-04-27T13:30:00.000+00:00",
                    "client":{
                        "id":sessionStorage.getItem("ID")
                    },
                    "colis":{
                        "id":response.data.id
                    }
                }
                const resp = await axios.post('http://localhost:8080/api/v1/factureColis', DataFacture, config);
                if (resp.status === 201) {
                    Saved();
                }
            } else {
                alert("Les champs sont vides ou incorrects");
            }
        } catch (error) {
            alert("Erreur lors de l'enregistrement");
            console.log(error);
        }

    }

    const saveTel = () => {
        axios.put(`http://localhost:8080/api/v1/user/${sessionStorage.getItem("ID")}`,{"telephone":TEL},config)
        SaveFacture();
    }

    function handleClick() {
        if (!Poids || !Width || !Length || !Height || !lastName || !firstName || !telAdd || !AddColis || !addressDES) {
            alert("Valeur Null !");

        } else {
            setPrix(Height*Width*Length*Poids*0.02);
            generateResult();
            ValidateFacture();
        }
    }


    return (
        <>
            <Nav Toggle={props.Toggle} fullname={props.fullname}/>
            <div className="manager">
                <h2 className="booking__title">Colis : </h2>
                <div className="input-group">
                    <div className="container search-form">
                        <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                        <Button variant="contained">Search</Button>
                        <Button variant="contained" onClick={handleOpen}>Send new Colis</Button>
                    </div>
                </div>

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
                                <th scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</th>
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
                {/*<>*/}
                {/*    <ul className='pagination'>*/}
                {/*        <li className='page-item'>*/}
                {/*            <a href='#' className='page-link'  onClick={prePage}>Prev</a>*/}
                {/*        </li>*/}
                {/*        {*/}
                {/*            numbers.map((n,i) =>(*/}
                {/*                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>*/}
                {/*                    <a href='#' className='page-link' onClick={ ()=> changeCPage(n) }>{n}</a>*/}
                {/*                </li>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*        <li className='page-item'>*/}
                {/*            <a href='#' className='page-link' onClick={nextPage}>Next</a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</>*/}
            </div>
            </>
    );
}

export default Colis;