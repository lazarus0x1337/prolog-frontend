import Nav from "../admin/Nav";
import {Button, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";
import {Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import sessionStorage from "sessionstorage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {style,style_Tracking} from "../interfaces/Css_Modal";


function Colis(props) {
    const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };


    const [openModal1,setOpenModal1]=useState(false);
    const [openModal2,setOpenModal2]=useState(false);
    const [openModal3,setOpenModal3]=useState(false);
    const [openModal4,setOpenModal4]=useState(false);
    const [reference,setReference]=useState("");


    const [villeDepart,setvilleDepart]=useState(false);
    const [villeArrivee,setvilleArrivee]=useState(false);
    const [fullname,setfullname]=useState(false);

    const CheckRef= () => {

        axios.get(`http://localhost:8080/api/v1/conteneur/ref/${reference}`,config)
            .then(response => {
                if(response.status===200){
                    // Affichage du modal de validation

                    const {villeDepart,villeArrivee,driver} = response.data;
                    setvilleDepart(villeDepart);
                    setvilleArrivee(villeArrivee);
                    axios.get(`http://localhost:8080/api/v1/user/${driver.id}`,config)
                        .then(resp => {
                            const fullname = resp.data.fullname;
                            setfullname(fullname);
                        })
                    handleInfoContainer();
                }
            })
            .catch(reason => {
                handleAddContainer();
            });


    }

    const handleAddContainer=()=>{
        setOpenModal3(true);
        setOpenModal4(false);
        setOpenModal2(false);
        setOpenModal1(false);
    }

    const handleInfoContainer=()=>{
        setOpenModal4(true);
        setOpenModal3(false);
        setOpenModal2(false);
        setOpenModal1(false);
    };



    const handleOpenModal1= () =>{
        setOpenModal1(true);
        setOpenModal2(false);
        setOpenModal3(false);
        setOpenModal4(false);
    }
    const handleCloseModal1 = () =>{
        setOpenModal1(false);
        setOpenModal2(false);
        setOpenModal3(false);
        setOpenModal4(false);
    }

    const handleOpenModal2= () =>{
       setOpenModal2(true);
       setOpenModal1(false);
        setOpenModal3(false);
        setOpenModal4(false);

    }
    const handleCloseModal2 = () =>{
        setOpenModal1(false);
        setOpenModal2(false);
        setOpenModal3(false);
        setOpenModal4(false);
    }




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
                setFactures(fact);
            }
        });

    const [selectedIds, setSelectedIds] = useState([]);

    function handleAddToContainer(){
        if(selectedIds.length===0) {
            handleOpenModal1();
        }
        else{
              handleOpenModal2();
        }
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
                        <Button variant="contained" onClick={handleAddToContainer} >Add to container</Button>

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
            <Modal open={openModal1} onClose={handleCloseModal1} >
                <Box sx={style}>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                            Veuillez selectionner au moins un colis !
                        </Typography>
                        <Button onClick={handleCloseModal1} style={{
                            backgroundColor: "var(--primary-blue)",
                            color: "black",
                            marginLeft: "180px",
                            marginTop: "27px",
                            padding: "10px"
                        }}>Ok</Button>
                    </Grid>
                </Box>
            </Modal>

            <Modal open={openModal2} onClose={handleCloseModal2} >
                <Box sx={style} >
                    <Grid>
                        <Typography variant="h6"  gutterBottom>
                            Container :
                        </Typography>

                        <Grid sx={{ my: 0.5 }} item xs={12} >
                            <TextField sx={{ my: 1 }}
                                       label="Reference"
                                       onChange={(e) => setReference(e.target.value)}
                                       value={reference}
                                       fullWidth
                                       type="text"
                            />
                            <Button onClick={CheckRef} style={{
                                backgroundColor: "var(--primary-blue)",
                                color: "black",
                                width:"100%"
                            }}>Check Reference</Button>
                        </Grid>
                    </Grid>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" textAlign="left" gutterBottom>
                            Colis à ajouter au conteneur :
                        </Typography>
                        {selectedIds.map(item => (
                            <TextField
                                sx={{ my: 0.1 }}
                                style={{textAlign:"center"}}
                                key={item.id}
                                InputProps={{
                                readOnly: true,
                                  }}
                                value={item}
                                fullWidth
                                type="text"

                             />
                        ))}
                    </Grid>
                </Box>
            </Modal>



            <Modal open={openModal3} onClose={handleOpenModal2} >
                <Box sx={style} >
                    <Grid>
                        <Typography variant="h6"  gutterBottom>
                           Add a Container :
                        </Typography>

                        <Grid sx={{ my: 0.5 }} item xs={12} >
                            <TextField sx={{ my: 1 }}
                                       label="Reference"
                                       onChange={(e) => setReference(e.target.value)}
                                       value={reference}
                                       fullWidth
                                       type="text"
                            />

                        </Grid>
                    </Grid>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" textAlign="left" gutterBottom>
                            Colis à ajouter au conteneur :
                        </Typography>
                        {selectedIds.map(item => (
                            <TextField
                                sx={{ my: 0.1 }}
                                style={{textAlign:"center"}}
                                key={item.id}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={item}
                                fullWidth
                                type="text"

                            />
                        ))}
                    </Grid>
                </Box>
            </Modal>



            <Modal open={openModal4} onClose={handleOpenModal2} >
                <Box sx={style} style={{overflow:"hidden"}} >
                    <Grid>
                        <Typography variant="h6"  gutterBottom>
                            Informations about Container :
                        </Typography>

                        <Grid sx={{ my: 0.5 }} item xs={12} >
                            <TextField sx={{ my: 1 }}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       label="Reference"
                                       onChange={(e) => setReference(e.target.value)}
                                       value={reference}
                                       fullWidth
                                       type="text"
                            />
                            <TextField sx={{ my: 1 }}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       label="Ville Depart :"
                                       value={villeDepart}
                                       fullWidth
                                       type="text"
                            />
                            <TextField sx={{ my: 1 }}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       label="Ville Arrivee :"
                                       value={villeArrivee}
                                       fullWidth
                                       type="text"
                            />
                            <TextField sx={{ my: 1 }}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       label="Chauffeur :"
                                       value={fullname}
                                       fullWidth
                                       type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid  sx={{ my: 1 }} >
                        <Typography variant="h6" textAlign="left" gutterBottom>
                            Colis à ajouter au conteneur :
                        </Typography>
                        <Grid style={style_Tracking}>
                            {selectedIds.map(item => (
                                <TextField
                                    sx={{ my: 0.1 }}
                                    style={{textAlign:"center"}}
                                    key={item.id}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={item}
                                    fullWidth
                                    type="text"
                                />
                            ))}
                        </Grid>
                        
                    </Grid>
                    <Button  style={{
                        marginTop:"10px",
                        backgroundColor: "var(--primary-blue)",
                        color: "black",
                        width:"100%"
                    }}>Valider</Button>
                </Box>
            </Modal>
        </>
    );

}


export default Colis;