// import React, { useState } from "react";
// import '../Driver/Driver.css';
// import axios from "axios";
// import "react-bootstrap";
// import {Button, Typography} from "@mui/material";
// import {Link} from "react-scroll";
// import Navbar from "../Driver/Navbar";
// import sessionStorage from "sessionstorage";
// import {useLocation, useNavigate} from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
//
// function Driver() {
//     mapquest.key = 'h1gCF3AbxiUXgb7p869zVLiqPcfW8VHT';
//     const [Conteneurs,setConteneurs]=useState([]);
//     const [ConteneursNonFilter,setConteneursNonFilter]=useState([]);
//     const [AfficheContainer,setAfficheContainer]=useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [id,setId] = useState(new URLSearchParams(location.search).get('id'));
//     const [tk,setTk] = useState(new URLSearchParams(location.search).get('tk'));
//     const [fullname,setFullname] = useState(new URLSearchParams(location.search).get('fullname'));
//
//     if(fullname) {
//         sessionStorage.setItem("fullname", fullname);
//     }
//     if(tk) {
//         sessionStorage.setItem("token", tk);
//     }
//     if(id) {
//         sessionStorage.setItem("ID", id);
//     }
//
//     const config = {
//         headers: {
//             'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
//         }
//     };
//
//
//     const handleLogout = () => {
//         axios.post("http://localhost:8080/api/v1/auth/logout",{},config)
//             .then(()=>{navigate('/home');})
//     }
//
//     axios.get("http://localhost:8080/api/v1/conteneur", config)
//         .then(response => {
//             if (response.status === 200) {
//
//                 const cont = response.data.filter(conteneur => conteneur.driver.id == sessionStorage.getItem("ID"));
//                 setConteneurs(cont);
//             }
//         })
//         .catch(reason => {
//             console.log(reason)
//         });
//
//     return (
//         <>
//             <Navbar/>
//             <div className="page-driver">
//                 <h1 className="py-5 mt-5">Containers.jsx</h1>
//                 <div className="container-driver">
//                     <div className="container">
//                         <div className="row">
//                             {Conteneurs?.map((item, i) => (
//                                 <div className="col-md-3 col-sm-6" key={i}>
//                                     <div className="box">
//                                         <Typography>{item.ref}</Typography>
//                                         <Grid sx={{ my: 0.5 }} item xs={12} >
//                                             <TextField sx={{ my: 1 }}
//                                                        InputProps={{
//                                                            readOnly: true,
//                                                        }}
//                                                        label="Nombre de Colis"
//                                                        variant="standard"
//                                                        fullWidth
//                                                        type="text"
//                                                        value={item.colis.length}
//                                             />
//                                             <TextField sx={{ my: 1 }}
//                                                        InputProps={{
//                                                            readOnly: true,
//                                                        }}
//                                                        label="Ville depart"
//                                                        variant="standard"
//                                                        fullWidth
//                                                        type="text"
//                                                        value={item.villeDepart}
//                                             />
//                                             <TextField sx={{ my: 1 }}
//                                                        InputProps={{
//                                                            readOnly: true,
//                                                        }}
//                                                        label="Ville d'arrivée"
//                                                        variant="standard"
//                                                        fullWidth
//                                                        type="text"
//                                                        value={item.villeArrivee}
//                                             />
//                                             <Button style={{
//                                                 backgroundColor: "var(--primary-blue)",
//                                                 color: "black",
//                                                 width:"100%"
//                                             }}>Depart</Button>
//                                         </Grid>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
// export default Driver;
