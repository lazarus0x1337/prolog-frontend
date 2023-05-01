import {useState} from "react";
import Nav from "../admin/Nav";
import {Table} from "react-bootstrap";
import {Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {style} from "../interfaces/Css_Modal";



function Colis(props) {


    // service -----------------------------------------------------------
    let [factures, setFactures] = useState([]);

    const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };

    axios.get(`http://localhost:8080/api/v1/factureColis/clientId/${sessionStorage.getItem("ID")}`, config)
        .then(response => {
            setFactures(response.data);
        });


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
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
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

                    <Table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Tracking Number</th>
                            <th scope="col">Origin Address</th>
                            <th scope="col">Arrived Address</th>
                            <th scope="col">Weight(g)</th>
                            <th scope="col">Dimension(cm3)</th>
                            <th scope="col">Fragile</th>
                            <th scope="col">Froid</th>
                            <th scope="col">facture</th>
                        </tr>
                        </thead>
                        <tbody>

                        {factures?.map((item, i) => (
                            <tr key={i}>
                                <th scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</th>
                                <td>{item.colis.adresse}</td>
                                <td>{item.colis.destinataire.adresse}</td>
                                <td>{item.colis.poids}</td>
                                <td>{item.colis.longueur * item.colis.largeur * item.colis.hauteur}</td>
                                <td>{item.colis.fragile ?
                                    <i className="bi bi-box-fill " style={{color: "#00FF03", paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "#FF0000", paddingLeft: "12px"}}/>}</td>
                                <td>{item.colis.froid ?
                                    <i className="bi bi-box-fill " style={{color: "#00FF03", paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "#FF0000", paddingLeft: "12px"}}/>}</td>
                                <td><a href="">Imprimer</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal open={OpenColis} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{mb: 2}}>
                        <Typography variant="h6" gutterBottom>
                            Destinataire :
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setfirstName(e.target.value)}
                                    value={firstName}
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setlastName(e.target.value)}
                                    value={lastName}
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={(e) => settelAdd(e.target.value)}
                                    value={telAdd}
                                    name="telephone"
                                    label="Telephone"
                                    fullWidth
                                    autoComplete="tel"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={(e) => setaddressDES(e.target.value)}
                                    value={addressDES}
                                    label="Address Destinataire"
                                    fullWidth
                                    autoComplete="address-line1"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h6" gutterBottom>
                            <br/>Colis :
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={(e) => setAddColis(e.target.value)}
                                    value={AddColis}
                                    label="Address Source"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    onChange={(e) => setLength(e.target.value)}
                                    value={Length}
                                    label="length (cm)"
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    onChange={(e) => setWidth(e.target.value)}
                                    value={Width}
                                    label="Width (cm)"
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    onChange={(e) => setHeight(e.target.value)}
                                    value={Height}
                                    label="Height (cm)"
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                />
                            </Grid>

                            {showTel &&
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        onChange={(e) => setTEL(e.target.value)}
                                        value={TEL}
                                        name="tel"
                                        label="your tel"
                                        fullWidth
                                        autoComplete="tel"
                                        variant="standard"
                                    />
                                </Grid>}

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    onChange={(e) => setPoids(e.target.value)}
                                    value={Poids}
                                    label="Poids (g)"
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox/>}
                                    label="Fragile"
                                    checked={checkedFragile}
                                    onChange={(e) => setCheckedFragile(e.target.checked)}/>
                                <FormControlLabel
                                    control={<Checkbox/>}
                                    label="Froid"
                                    checked={checkedFroid}
                                    onChange={(e) => setCheckedFriod(e.target.checked)}/>
                            </Grid>
                        </Grid>


                        <div>
                            <Button onClick={handleClick} style={{
                                backgroundColor: "var(--primary-blue)",
                                color: "black",
                                marginLeft: "160px",
                                marginTop: "27px",
                                padding: "10px"
                            }}>View Facture</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Modal open={OpenFacture} onClose={closeValidateFacture}>
                <Box sx={style}>
                    <i onClick={handleOpen} className="bi bi-caret-left-fill fs-5" style={{color: "var(--primary-blue)"}}/>
                    <Grid variant="h6" >
                        <Grid sx={{ my: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Colis :
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={Height + "cm x " + Width + "cm x " + Length + "cm"}
                                        label="Dimension (cm 3)"
                                        fullWidth
                                        type="text"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={Poids}
                                        label="Poids (g)"
                                        fullWidth
                                        type="number"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ my: 1 }}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={AddColis}
                                    label="Address Source"
                                    fullWidth
                                    type="text"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox/>}
                                    label="Fragile"
                                    checked={checkedFragile}
                                    disabled/>
                                <FormControlLabel
                                    control={<Checkbox/>}
                                    label="Froid"
                                    checked={checkedFroid}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" gutterBottom>
                                Destinataire :
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={firstName}
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={lastName}
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ my: 1 }}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={telAdd}
                                    name="telephone"
                                    label="Telephone"
                                    fullWidth
                                    autoComplete="tel"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={addressDES}
                                    label="Address Destinataire"
                                    fullWidth
                                    type="text"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid sx={{ my: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Prix :
                            </Typography>
                            <Grid item xs={12}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={Prix}
                                    label="Prix d'envoie (MAD)"
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>


                        <div>
                            <Button
                                onClick={CheckTel}
                                style={{
                                backgroundColor: "var(--primary-blue)",
                                color: "black",
                                marginLeft: "170px",
                                marginTop: "27px",
                                padding: "10px"
                            }}>Valider</Button>
                        </div>
                    </Grid>

                </Box>
            </Modal>
            <Modal open={telModal} onClose={closeModalTel}>
                <Box sx={style}>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Veuillez saisir votre numéro de télephone :
                        </Typography>
                        <TextField
                            onChange={(e) => setTEL(e.target.value)}
                            value={TEL}
                            fullWidth
                            type="text"
                            variant="standard"
                        />
                    </Grid>
                    <div>
                        <Button onClick={saveTel}
                            style={{
                                backgroundColor: "var(--primary-blue)",
                                color: "black",
                                marginLeft: "170px",
                                marginTop: "27px",
                                padding: "10px"
                            }}>Envoyer</Button>
                    </div>
                </Box>
            </Modal>
            <Modal open={saved} onClose={closeModalTel}>
                <Box sx={style}>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Package saved successfully !
                        </Typography>
                        <Grid sx={{ my: 1 }}>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={result}
                                label="Your Tracking Number"
                                fullWidth
                                type="text"
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </>
    );
}

export default Colis;