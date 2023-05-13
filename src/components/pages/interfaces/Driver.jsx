import imgMap from "../../images/googlemapImg.jpg";
import "../css/driver.css";
import Navbar from "../Driver/Navbar";
import sessionStorage from "sessionstorage";
import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Table} from "react-bootstrap";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Checkbox, TextField} from "@mui/material";

import {GetConteneurById} from "../../api/conteneur/GetConteneurById";
import {UpdateTracking} from '../../api/tracking/UpdateTracking';
import {GetPointsRelais} from '../../api/PointRelais/GetPointsRelais';
import {UpdateColis} from "../../api/colis/UpdateColis";
import Profile_driver from "../Driver/Profile_driver";
import axios from "axios";
import {FinTravel} from "../../api/conteneur/FinTravel";


export default function Driver() {

    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [Conteneurs, setConteneurs] = useState([]);
    const [Conteneur, setConteneur] = useState({});
    const [pointRelais,setPointRelais] = useState([]);
    const [unPointRelais,setUnPointRelais] = useState({});

    const location = useLocation();
    const [id, setId] = useState(new URLSearchParams(location.search).get('id'));
    const [tk, setTk] = useState(new URLSearchParams(location.search).get('tk'));
    const [fullname, setFullname] = useState('');
    const [user, setUser] = useState({});
    const [recupValues, setRecupValues] = useState({}); // état pour stocker si chaque colis a été récupéré
    const [deliveredValues, setDeliveredValues] = useState({}); // état pour stocker si chaque colis a été livré
    const [refetch, setRefetch] = useState(false);




    useEffect(() => {
        if(id) {
            sessionStorage.setItem("ID", id);
        }
        if(tk) {
            sessionStorage.setItem("token", tk);
        }

        loadContainers().then(cont => {
            setConteneurs(cont);
            if (cont.length === 0)
                NoDataFound();
        });
    }, [refetch]);

    const loadContainers = async () => {

        const API_URL = 'http://localhost:8080/api/v1';
        const token = sessionStorage.getItem("token");
        const driverId = sessionStorage.getItem("ID");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        return axios.get(`${API_URL}/conteneur`, config)
                .then(async response => {
                    if (response.status === 200) {
                        return response.data.filter(cc => cc.driver.id == driverId && !cc.fin);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                });
    }


    function handleClickChangeToShow1() {

        if (Conteneurs.length === 0)
            NoDataFound();
        else {
            setShow1(true);
            setShow2(false);
            setShow3(false);
            setShow4(false);
        }
    }

    function handleClickChangeToShow2() {

        if (Object.keys(Conteneur).length === 0)
            NoDataFound();
        else {
            setUnPointRelais({});
            setShow1(false);
            setShow2(true);
            setShow3(false);
            setShow4(false);
        }
    }

    function handleClickChangeToShow3() {
        setUnPointRelais({});
        setShow1(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);
    }

    const NoDataFound = () => {
        setShow1(false);
        setShow2(false);
        setShow3(true);
        setShow4(false);
    }
    const theme = createTheme();
    const handleClickVoyager = async (idConteneur) => {
        const token = sessionStorage.getItem("token");
        const cont = await GetConteneurById(token, idConteneur);
        setConteneur(cont);
        cont.colis.map((colis) => {
            setRecupValues(prevValues => ({
                ...prevValues,
                [colis.id]: colis.recup
            }));

            setDeliveredValues(prevValues => ({
                ...prevValues,
                [colis.id]: colis.recup
            }));
        })
        const pr = await GetPointsRelais(token);
        setPointRelais(pr);
        handleClickChangeToShow3();
    }

    const [selectedColis, setSelectedColis] = useState(null);
    const handleRowClick = (container) => {
        setSelectedColis(container);
    };

    const [selectedValues, setSelectedValues] = useState({});
    const handleChange = (event: ChangeEvent<HTMLInputElement>, colisId: number) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [colisId]: event.target.value
        }));
    };

    const handleClickConfirm=()=>{
        if (!(Object.keys(unPointRelais).length === 0)){
            const token = sessionStorage.getItem('token');
            UpdateTracking(token,unPointRelais,Conteneur.colis);
        }
        handleCancelClick();
    }
    const handleCancelClick = () => {
        // setPointRelais([]);
        setUnPointRelais(null); // Clear the selected value
    };
    async function handleCheckboxChange(e, colisId) {
        const token = sessionStorage.getItem('token');
        const isChecked = e.target.checked;
        const checkboxValue = e.target.value;
        await UpdateColis(token,colisId,checkboxValue,isChecked);
        if (checkboxValue === "recup") {
            setRecupValues(prevValues => ({
                ...prevValues,
                [colisId]: isChecked
            }));
        } else if (checkboxValue === "delivered") {
            setDeliveredValues(prevValues => ({
                ...prevValues,
                [colisId]: isChecked
            }));
        }

    }

    function  handleClickChangeToShowProfile(){
        setShow1(false);
        setShow2(false);
        setShow3(false);
        setShow4(true);
    }
    //
    const ButtonEndOfTrip=()=>{
        console.log("hi");
        const token = sessionStorage.getItem('token');

        FinTravel(token, Conteneur.id).then(() => {
            setConteneur({});
            setRefetch(prevState => !prevState);


        }).finally(handleClickChangeToShow1());

    }


    return (
        <>
            <Navbar handleClickChangeToShow1={handleClickChangeToShow1}
                    handleClickChangeToShow2={handleClickChangeToShow2}
                    handleClickChangeToShowProfile={handleClickChangeToShowProfile}/>

            {show4 && <Profile_driver/>
            }


            {show3 &&
                <Box sx={{height: 600, width: '100%', marginTop: '100px'}} backgroundColor="transparent">
                    <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <i className="bi bi-exclamation-triangle"
                           style={{color: "var(--primary-blue)", fontSize: "40px"}}/>
                        <Typography variant="h6" paragraph color="var(--primary-blue)" textTransform="uppercase"
                                    style={{fontFamily: "Georgia"}}> No container was selected </Typography>
                    </Box>
                </Box>

            }

            {show1 &&
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <main>
                        <Container sx={{py: 0, marginTop: "120px"}} maxWidth="md">
                            {/*<Typography gutterBottom variant="h2" component="h1" sx={{ textAlign:"center",color :"white"}}>*/}
                            {/*    <div className="Containers-title" style={{fontFamily: "Georgia"}}> Containers </div>*/}
                            {/*</Typography>*/}
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {Conteneurs.map((item, i) => (
                                    <Grid item key={i} xs={12} sm={6} md={4} sx={{marginBottom: '10px'}}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                backgroundColor: 'transparent',
                                                // border: '5px solid var(--color-menu)',
                                                borderRadius: '20px',
                                            }}>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    // 16:9
                                                    // pt: '56.25%',
                                                }}
                                                image={imgMap}
                                                alt="random"
                                            />
                                            <CardContent sx={{flexGrow: 1, backgroundColor: 'var(--color-menu)'}}>
                                                <Typography gutterBottom variant="h5" component="h2" sx={{
                                                    textAlign: "center",
                                                    color: "var(--color-font-hover)",
                                                    fontFamily: 'cursive'
                                                }}>
                                                    {item.ref}
                                                </Typography>
                                                <TextField sx={{
                                                    my: 1,
                                                    color: "var(--color-font)",
                                                    '& .MuiInputLabel-root': {
                                                        color: "var(--color-font)" // Changer la couleur de l'étiquette en blanc
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--color-font-hover)' // Changer la couleur du texte à l'intérieur du champ de saisie
                                                    }
                                                }}
                                                           InputProps={{
                                                               readOnly: true,
                                                           }}
                                                           label="Number of Packages"
                                                           variant="standard"
                                                           fullWidth
                                                           type="text"
                                                           value={item.colis.length}
                                                />
                                                <TextField sx={{
                                                    my: 1,
                                                    color: "var(--color-font)",
                                                    '& .MuiInputLabel-root': {
                                                        color: "var(--color-font)" // Changer la couleur de l'étiquette en blanc
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--color-font-hover)' // Changer la couleur du texte à l'intérieur du champ de saisie
                                                    }
                                                }}
                                                           InputProps={{
                                                               readOnly: true,
                                                           }}
                                                           label="FROM"
                                                           variant="standard"
                                                           fullWidth
                                                           type="text"
                                                           value={item.villeDepart}
                                                />
                                                <TextField sx={{
                                                    my: 1,
                                                    color: "var(--color-font)",
                                                    '& .MuiInputLabel-root': {
                                                        color: "var(--color-font)" // Changer la couleur de l'étiquette en blanc
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--color-font-hover)' // Changer la couleur du texte à l'intérieur du champ de saisie
                                                    }
                                                }}
                                                           InputProps={{
                                                               readOnly: true,
                                                           }}
                                                           label="TO"
                                                           variant="standard"
                                                           fullWidth
                                                           type="text"
                                                           value={item.villeArrivee}
                                                />
                                            </CardContent>
                                            <CardActions sx={{
                                                flexGrow: 1,
                                                backgroundColor: 'var(--color-degrade3-1)',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    backgroundColor: 'var(--color-font-hover)',
                                                    color: "var(--color-menu)"
                                                }
                                            }}>
                                                <Button
                                                    onClick={() => handleClickVoyager(item.id)}
                                                    sx={{
                                                        fontFamily: 'cursive',
                                                        color: "var(--color-font-2)",
                                                        fontSize: "1rem",
                                                        '&:hover': {
                                                            color: "var(--color-menu)"
                                                        }

                                                    }}>Travel</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            }

            {show2 &&
                <Box sx={{height: '100%', width: '0 auto', marginTop: '80px', borderTop:'2px solid var(--color-font-hover)'}} backgroundColor="var(--color-menu)">
                    <Box sx={{marginBottom:'10px', backgroundColor:"var(--color-menu)"}} p={2} display="flex" flexDirection="column"
                         justifyContent="center">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={ButtonEndOfTrip}
                                variant="contained"
                                sx={{
                                    fontWeight:'bold',
                                    padding:"10px" ,
                                    borderRadius:'5px',
                                    backgroundColor:'var(--color-font-hover)',
                                    color:'var(--color-menu)',
                                    width:"150px"
                                }}>End of the Trip
                            </Button>
                        </div>
                        <Typography color="var(--color-font)" variant="h6" paragraph>Container Reference :<div style={{textAlign:'center', color:"var(--primary-blue)"}}>  {Conteneur.ref}</div></Typography>
                        <Typography color="var(--color-font)" variant="body1" paragraph>Source Address : <div style={{textAlign:'center' ,color:"var(--primary-blue)"}}> {Conteneur.villeDepart}</div></Typography>
                        <Typography color="var(--color-font)" variant="body1" paragraph>Arrival Address :<div style={{textAlign:'center', color:"var(--primary-blue)"}}>  {Conteneur.villeArrivee}</div></Typography>
                    </Box>

                    <Box style={{borderRadius:'5px', backgroundColor:'var(--color-font-hover)',padding: '10px', borderTop:'2px solid var(--color-font-hover)',borderBottom:'2px solid var(--color-font-hover)'}} display="flex" flexDirection="row" justifyContent="center" alignItems="center" width="100%">
                        {/*<Box flexGrow={1} marginRight={1}>*/}
                        <FormControl variant="standard"
                                     sx={{backgroundColor: "transparent", width: '70%'}}>
                            <InputLabel id="demo-simple-select-standard-label" sx={{color:'var(--color-menu)'}}>Relay point</InputLabel>
                            <Select
                                key={unPointRelais}
                                value={unPointRelais}
                                onChange={(e) => {
                                    setUnPointRelais(e.target.value);

                                }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                // value={}
                                // onChange={handleChange}
                                label="Relay"
                            >
                                {pointRelais.map((item, i) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item}
                                        sx={{ color:"var(--primary-blue)",
                                            border:'5px solid var(--color-menu)',
                                            backgroundColor: "var(--color-menu)",
                                            '&:hover': {
                                                backgroundColor: "var(--color-menu)"
                                            },
                                            '&:active': {
                                                backgroundColor: 'var(--color-menu)' // couleur de fond au clic
                                            },
                                            '&.selected': {
                                                backgroundColor: 'var(--color-menu)' // couleur de fond pour l'élément sélectionné
                                            },
                                            '&.focus': {
                                                backgroundColor: 'var(--color-menu)' // couleur de fond pour l'élément sélectionné
                                            }
                                    }}
                                    >{item.ville}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/*</Box>*/}
                        {/*<Box>*/}
                            <Button
                                onClick={handleClickConfirm}
                                variant="contained"
                                sx={{fontWeight:'bold' ,borderRadius:'5px', border:'5px solid var(--color-menu)', backgroundColor:'var(--color-font-hover)', color:'var(--color-menu)', marginLeft: 1}}>
                                Confirm
                            </Button>
                            <Button
                                onClick={handleCancelClick}
                                variant="contained" sx={{fontWeight:'bold' ,borderRadius:'5px', border:'5px solid var(--color-menu)', backgroundColor:'var(--color-menu)', color:'var(--color-font-hover)', marginLeft:1}}>
                                Cancel
                            </Button>
                        {/*</Box>*/}
                    </Box>

                    <Table className="table TableDriver">
                        <thead>
                        <tr>
                            {/*<th scope="col"></th>*/}
                            <th scope="col">Tracking</th>
                            <th scope="col">Recovered</th>
                            <th scope="col">Delivred</th>

                        </tr>
                        </thead>
                        <tbody>
                        {Conteneur.colis?.map((colis, i) => (
                            <React.Fragment key={i}>
                                <tr onClick={() => handleRowClick(colis)}>
                                    {/*<td scope="row" className='pl-5'><img src={iconeBox} style={{width: '40px'}}/></td>*/}
                                    <td scope="row" className='pl-5'>{colis.trackingNumber.trackingNumber}</td>
                                    <td>
                                        <Checkbox
                                            value="recup"
                                            checked={recupValues[colis.id]}
                                            onChange={(e) => handleCheckboxChange(e, colis.id)}
                                            name={colis.id}
                                            style={{ color: 'var(--color-font-hover)' }}
                                        />
                                    </td>
                                    <td>
                                        <Checkbox
                                            value="delivered"
                                            checked={deliveredValues[colis.id]}
                                            onChange={(e) => handleCheckboxChange(e, colis.id)}
                                            name={colis.id}
                                            style={{ color: 'var(--color-font-hover)' }}
                                        />
                                    </td>

                                </tr>
                                {selectedColis && selectedColis.id === colis.id && (
                                    <tr key={`${i}-details`} style={{backgroundColor: "var(--color-menu)"}}>
                                        <td colSpan={5}>
                                            <Table className="table TableDriver2">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Tel</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td className="title-minitab">Sender</td>
                                                    <td>{colis.client.fullname}</td>
                                                    <td>{colis.adresse}</td>
                                                    <td>{colis.client.telephone}</td>

                                                </tr>
                                                <tr>
                                                    <td className="title-minitab">Receiver</td>
                                                    <td>{colis.destinataire.firstname} {colis.destinataire.lastname}</td>
                                                    <td>{colis.destinataire.adresse}</td>
                                                    <td>{colis.destinataire.telephone}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                            <Table className="table TableDriver2">
                                                <thead>
                                                <tr>
                                                    <th>Weigth(g)</th>
                                                    <th>Dimension(L)</th>
                                                    <th>Cold</th>
                                                    <th>Fragile</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>{colis.poids}</td>
                                                    <td>{colis.largeur * colis.longueur * colis.hauteur / 1000}</td>
                                                    <td>{colis.froid ? "Yes" : "No"}</td>
                                                    <td>{colis.fragile ? "Yes" : "No"}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                            <TextField
                                                sx={{ my: 0.1,
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--color-font-hover)',
                                                        fontSize: '1.5em',
                                                        textAlign: 'right',
                                                        outline: 'none',
                                                        borderRadius: '10px',
                                                        backgroundColor: 'var(--color-menu-hover)'
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: "var(--color-degrade3-1)", // Changer la couleur de l'étiquette en blanc
                                                        fontSize: '1.5em',
                                                        backgroundColor: 'var(--color-menu-hover)',
                                                        paddingLeft: '5px',
                                                        paddingRight: '5px',
                                                        fontWeight: 'bold',
                                                        // borderRadius: '5px',
                                                        marginTop: '10px',
                                                        borderBottom: '1px solid black'

                                                    }}}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={colis.prix+" Dhs"}
                                                fullWidth
                                                type="text"
                                                label='Price'

                                            />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}

                        </tbody>
                    </Table>
                </Box>
            }
        </>
    );
}