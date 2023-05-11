import {useEffect, useState} from "react";
import Nav from "../admin/Nav";
import {Table} from "react-bootstrap";
import {Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {style} from "../interfaces/Css_Modal";
import logo from "../../images/logo/prologBW.png";
import axios from 'axios';
import sessionStorage from "sessionstorage";
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';
import { BiPrinter } from 'react-icons/bi';
// TODO: restore const config as before and add config value to axios call

function Colis(props) {


    // service -----------------------------------------------------------
    let [factures, setFactures] = useState([]);
    // Colis Data
    const [showTel, setshowTel] = useState(false);
    const [ColisId, setColisId] = useState(0);
    const [AddColis, setAddColis] = useState("");

    const [Poids, setPoids] = useState(0);
    const [Height, setHeight] = useState(0);
    const [Length, setLength] = useState(0);
    const [Width, setWidth] = useState(0);
    const [Prix, setPrix] = useState();
    //Destinataire Data
    const [addressDES, setaddressDES] = useState("");
    const [telAdd, settelAdd] = useState("");
    const [lastName, setlastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [checkedFragile, setCheckedFragile] = useState(false);
    const [checkedFroid, setCheckedFriod] = useState(false);
    const [result, setResult] = useState('');
    const [refetch, setRefetch] = useState(false);

    const DataColis = {
        "poids": Poids,
        "longueur": Width,
        "largeur": Length,
        "hauteur": Height,
        "froid": checkedFroid,
        "fragile": checkedFragile,
        "adresse": AddColis,
        "recup": false,
        "delivered": false,
        "inContainer": false,
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

    const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/api/v1/factureColis/clientId/${sessionStorage.getItem("ID")}`,config)
                .then(response => {
                    setFactures(response.data);
                });
        }

        fetchData();
    }, [refetch])

    const generateResult = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let randomResult = '';
        for (let i = 0; i < 15; i++) {
            randomResult = randomResult.concat(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        setResult(randomResult);

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

    const handlePrint = (facture) => {
        const factureWindow = window.open("", "Facture", "height=600,width=800");

        factureWindow.document.write("<html><head><title>Prolog Facture Colis</title></head>");
        factureWindow.document.write("<style>"
            + "body { position: relative; }"
            + "h1 { margin: 0 auto; }"
            + "table { margin: auto; border='10'; border-collapse: collapse;}"
            + "td { padding: 4px 10px; }"
            + "th { padding: 4px 10px; }"
            + "div.container { display: flex; justify-content: center; flex-direction: column;}"
            + ".bas-page { text-align: center; display: flex; position: fixed; bottom: 0; justify-content: center; }"
            + ".haut-page { text-align: center; display: flex; position: fixed; top: 0; justify-content: center; }"
            + "@media print { .print-only { display: block !important; }}"
            + ".img-responsive {margin: 50px 300px !important;}"
            + "</style></head><body>");

        factureWindow.document.write("<div style='page-break-after: always;'>");
        // factureWindow.document.write("<img src="+logo+"/>");
        // factureWindow.document.write("<h1>PROLOG</h1>");
            factureWindow.document.write("<div style='margin-top: 80px;'>");
                factureWindow.document.write("<h2>Facture</h2>");
                factureWindow.document.write("<p><span style='font-weight: bold'>Ref : </span> #" + facture.id + "</br>");
                factureWindow.document.write("<span style='font-weight: bold'>Date : </span>" + facture.date.substring(0,10) + "</br>");
                factureWindow.document.write("<span style='font-weight: bold'>Heure : </span>" + facture.date.substring(11,19) + "</p>");
                factureWindow.document.write("<hr>");
                factureWindow.document.write("<h2>Client</h2>");
                factureWindow.document.write("<table border='1' >");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<th>Reference</th>");
                factureWindow.document.write("<th>Nom complet</th>");
                factureWindow.document.write("<th>Email</th>");
                factureWindow.document.write("<th>Telephone</th>");
                factureWindow.document.write("<th>Adresse</th>");
                factureWindow.document.write("</tr>");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<td>"+ facture.client.id +"</td>");
                factureWindow.document.write("<td>"+ facture.client.fullname +"</td>");
                factureWindow.document.write("<td>"+ facture.client.email +"</td>");
                factureWindow.document.write("<td>"+ facture.client.telephone +"</td>");
                factureWindow.document.write("<td>"+ facture.colis.adresse +"</td>");
                factureWindow.document.write("</tr>");
                factureWindow.document.write("</table>");
            // factureWindow.document.write("<hr>");
                factureWindow.document.write("<h2>Destinataire</h2>");
                factureWindow.document.write("<table border='1'><thead>");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<th>Reference</th>");
                factureWindow.document.write("<th>Nom complet</th>");
                factureWindow.document.write("<th>Email</th>");
                factureWindow.document.write("<th>Telephone</th>");
                factureWindow.document.write("<th>Adresse</th>");
                factureWindow.document.write("</tr></thead>");
                factureWindow.document.write("<tbody><tr>");
                factureWindow.document.write("<td>"+ facture.colis.destinataire.id +"</td>");
                factureWindow.document.write("<td>"+ facture.colis.destinataire.firstname +" "+facture.colis.destinataire.lastname+"</td>");
                factureWindow.document.write("<td> - </td>");
                factureWindow.document.write("<td>"+ facture.colis.destinataire.telephone +"</td>");
                factureWindow.document.write("<td>"+ facture.colis.adresse +"</td>");
                factureWindow.document.write("</tr></tbody>");
                factureWindow.document.write("</table>");
            // factureWindow.document.write("<hr>");
                factureWindow.document.write("<h2>Colis</h2>");
                factureWindow.document.write("<table border='1'>");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<th>Numero de tracking</th>");
                factureWindow.document.write("<th>Poids (g)</th>");
                factureWindow.document.write("<th>Dimension</th>");
                factureWindow.document.write("<th>Cold</th>");
                factureWindow.document.write("<th>Fragile</th>");
                factureWindow.document.write("</tr>");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<td>"+ facture.colis.trackingNumber.trackingNumber +"</td>");
                factureWindow.document.write("<td>"+ facture.colis.poids +"</td>");
                factureWindow.document.write("<td>"+ facture.colis.longueur + "cm X " + facture.colis.largeur +"cm X " + facture.colis.hauteur + "cm" +"</td>");
                factureWindow.document.write("<td>"+ (facture.colis.froid?'Oui':'Non') +"</td>");
                factureWindow.document.write("<td>"+ (facture.colis.fragile?'Oui':'Non') +"</td>");
                factureWindow.document.write("</tr>");
                factureWindow.document.write("</table>");
                factureWindow.document.write("<p style='text-align: right; font-size: 2em;'><span style='font-weight: bold'>Montant TTC : </span>" + facture.prix + "Dhs</p>");
                factureWindow.document.write("<hr>");
            factureWindow.document.write("</div>");

        factureWindow.document.write("</div>");

        // 2eme page de l'imprimé
            factureWindow.document.write("<div style='page-break-before: always;'>");
                factureWindow.document.write("<p style='text-align: right;'>Veuillez coller ce document dans votre colis</p>");
                factureWindow.document.write("<div class='container'>");

                factureWindow.document.write("<div><h2>Tracking : "+facture.colis.trackingNumber.trackingNumber+"</h2></div>");
                factureWindow.document.write("<table class='a-coller' border='1'><thead><tr>");
                factureWindow.document.write("<th></th>");
                factureWindow.document.write("<th>Name</th>");
                factureWindow.document.write("<th>Phone Number</th>");
                factureWindow.document.write("<th>Address</th></tr></thead>");
                factureWindow.document.write("<tbody><tr>");
                factureWindow.document.write("<td>FROM</td>");
                factureWindow.document.write("<td>"+facture.client.fullname+"</td>");
                factureWindow.document.write("<td>"+facture.client.telephone+"</td>");
                factureWindow.document.write("<td>"+facture.colis.adresse+"</td></tr>");
                factureWindow.document.write("<tr>");
                factureWindow.document.write("<td>TO</td>");
                factureWindow.document.write("<td>"+facture.colis.destinataire.firstname + " " + facture.colis.destinataire.lastname + "</td>");
                factureWindow.document.write("<td>"+facture.colis.destinataire.telephone+"</td>");
                factureWindow.document.write("<td>"+facture.colis.destinataire.adresse+"</td>");
                factureWindow.document.write("</tr></tbody></table>");
                factureWindow.document.write("</div>");

                // Generation du QR CODE
                const qrCodeImg = document.createElement('img');
                qrCodeImg.src = 'https://chart.googleapis.com/chart?cht=qr&chl=tel:+' + facture.colis.destinataire.telephone + '&chs=250x250&chld=L|0';
                qrCodeImg.classList.add('qr-code', 'img-thumbnail', 'img-responsive');
                const qrCodeContainer = document.createElement('div');
                qrCodeContainer.appendChild(qrCodeImg);
                qrCodeContainer.classList.add('print-only');
                factureWindow.document.body.appendChild(qrCodeContainer);

            factureWindow.document.write("</div>");
        factureWindow.document.write("</div>");


        factureWindow.document.write("<div class='haut-page'>");
        factureWindow.document.write("<h1>PROLOG</h1>");

        // const logoImg = document.createElement('img');
        // logoImg.src = logo;
        // const hautPageDiv = factureWindow.document.querySelector('.haut-page');
        // hautPageDiv.appendChild(logoImg);

        factureWindow.document.write("</div>");

        factureWindow.document.write("<div class='bas-page'>");
        factureWindow.document.write("<div style='margin-left : 3%; margin-right : 3%;'><h4>Prolog</h4>" +
            "<p>22, Avenue Voltaire</br>" +
            "13000 Rabat</br>" +
            "Maroc</br>" +
            "N° Siren ou Siret : xxxxxDEVIS n° 123</br>" +
            "N° TVA intra. : MAXX 999999999</p></div>");
        factureWindow.document.write("<div style='margin-left : 3%; margin-right : 3%;'><h4>Coordonnées</h4>" +
            "<p>Nadir Ouzlim</br>" +
            "Téléphone : +2125 0000-0000</br>" +
            "E-mail : nadir@prolog.fr</br>" +
            "www.macompagnie.ma</p></div>");
        factureWindow.document.write("<div style='margin-left : 3%; margin-right : 3%;'><h4>Détails bancaires</h4>" +
            "<p>Banque BNP</br>" +
            "Code banque 10000000</br>" +
            "N° de compte 12345678</br>" +
            "IBAN MA2341124098234</br>" +
            "SWIFT/BIC MAHHCXX1001</p></div>");

        factureWindow.document.write("</div>");

        factureWindow.document.write("</body></html>");

        qrCodeImg.onload = function() {
            factureWindow.document.close();
            factureWindow.focus();
            factureWindow.print();
            factureWindow.close();
            window.focus();
        };
        // Masquer la fenêtre d'impression pour l'utilisateur
        // factureWindow.document.close();
        // factureWindow.focus();
        // factureWindow.print();
        // factureWindow.close();

        // Réafficher la page après l'impression
        // window.focus();
    }


    const CheckTel=()=>{
        axios.get(`http://localhost:8080/api/v1/user/${sessionStorage.getItem("ID")}`,config)
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
                const d = new Date();
                const DataFacture = {
                    "prix":Prix,
                    "date":d.toISOString(),
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
        } finally {
            setRefetch(prevState => !prevState)
        }

    }

    const saveTel = async  () => {
        await axios.put(`http://localhost:8080/api/v1/user/${sessionStorage.getItem("ID")}`,{"telephone":TEL}, config)
        SaveFacture();
    }

    function handleClick() {
        if (!Poids || !Width || !Length || !Height || !lastName || !firstName || !telAdd || !AddColis || !addressDES) {
            alert("Valeur Null !");

        } else {
            const ajout1 = checkedFragile?1.2:1;
            const ajout2 = checkedFroid?1.3:1;
            setPrix(((Poids/10) + (Height * Width * Length)/500000)*(ajout1*ajout2));
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
                            <th scope="col">Dimension(L)</th>
                            <th scope="col">Fragile</th>
                            <th scope="col">Cold</th>
                            <th scope="col">Facture</th>
                        </tr>
                        </thead>
                        <tbody>

                        {factures?.map((item, i) => (
                            <tr key={i}>
                                <th scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</th>
                                <td>{item.colis.adresse}</td>
                                <td>{item.colis.destinataire.adresse}</td>
                                <td>{item.colis.poids}</td>
                                <td>{item.colis.longueur * item.colis.largeur * item.colis.hauteur/1000}</td>
                                <td>{item.colis.fragile ?
                                    <i className="bi bi-box-fill " style={{color: "var(--color-font-hover)", paddingTop:'5px',paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "var(--color-font)", paddingLeft: "12px"}}/>}</td>
                                <td>{item.colis.froid ?
                                    <i className="bi bi-box-fill " style={{color: "var(--color-font-hover)", paddingLeft: "12px"}}/> :
                                    <i className="bi bi-box-fill "
                                       style={{color: "var(--color-font)", paddingLeft: "12px"}}/>}</td>
                                <td><Button
                                    variant="outlined"
                                    endIcon={<BiPrinter />}
                                    style={{
                                        color: "var(--color-font-hover)",
                                        backgroundColor: "var(--color-menu)",
                                        outline: '1px dashed var(--color-font-hover)'
                                    }}
                                    onClick={() => handlePrint(item)}>
                                    PRINT
                                </Button></td>
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
                            Receiver :
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
                                    label="Phone Number"
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
                                    label="Receiver Address"
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
                                    label="Source Address"
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
                                    label="Length (cm)"
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
                                    label="Weight (g)"
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
                                    label="Cold"
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
                                        label="Weight (g)"
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
                                    label="Source Address"
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
                                    label="Cold"
                                    checked={checkedFroid}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" gutterBottom>
                                Receiver :
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
                                    label="Phone Number"
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
                                    label="Receiver Address"
                                    fullWidth
                                    type="text"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid sx={{ my: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Price :
                            </Typography>
                            <Grid item xs={12}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={Prix}
                                    label="Shipping price (MAD)"
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
                            }}>Confirm</Button>
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