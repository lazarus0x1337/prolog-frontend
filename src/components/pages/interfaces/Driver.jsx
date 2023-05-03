import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import sessionStorage from "sessionstorage";
import {getConteneursByDriverId} from '../../api/GetConteneurByDriverId';
import Navbar from "../Driver/Navbar";
import {TextField} from "@mui/material";
import imgMap from "../../images/googlemapImg.jpg";


export default function Driver() {
    const [Conteneurs,setConteneurs]=useState([]);
    const [ConteneursNonFilter,setConteneursNonFilter]=useState([]);
    const [AfficheContainer,setAfficheContainer]=useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [id,setId] = useState(new URLSearchParams(location.search).get('id'));
    const [tk,setTk] = useState(new URLSearchParams(location.search).get('tk'));
    const [fullname,setFullname] = useState(new URLSearchParams(location.search).get('fullname'));

    if(fullname) {
        sessionStorage.setItem("fullname", fullname);
    }
    if(tk) {
        sessionStorage.setItem("token", tk);
    }
    if(id) {
        sessionStorage.setItem("ID", id);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const driverId = sessionStorage.getItem('ID');
        getConteneursByDriverId(token, driverId, setConteneurs);
    }, []);



    const theme = createTheme();

    return (
        <>
            <Navbar/>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Container sx={{ py: 0,marginTop:"120px" }} maxWidth="md">
                        <Typography gutterBottom variant="h2" component="h1" sx={{ textAlign:"center",color :"white"}}>
                            <div className="Containers-title" style={{fontFamily: "Georgia"}}> Containers </div>
                        </Typography>
                        {/* End hero unit */}
                        <Grid container spacing={4} >
                            {Conteneurs.map((item,i) => (
                                <Grid item key={i} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{

                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor:'transparent',
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
                                        <CardContent sx={{ flexGrow: 1, backgroundColor:'var(--color-menu)'}}>
                                            <Typography gutterBottom variant="h5" component="h2" sx={{
                                                textAlign:"center",color:"var(--color-font-hover)", fontFamily:'cursive' }}>
                                                {item.ref}
                                            </Typography>
                                            <TextField  sx={{
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
                                                       label="Nombre de Colis"
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
                                        <CardActions  sx={{ flexGrow: 1 , backgroundColor:'var(--color-degrade3-1)',justifyContent: 'center', '&:hover':{backgroundColor:'var(--color-font-hover)',color:"var(--color-menu)"} }}>
                                            <Button
                                                sx={{
                                                        fontFamily:'cursive',
                                                        color:"var(--color-font-2)",
                                                        fontSize:"1rem",
                                                        '&:hover': {
                                                            color:"var(--color-menu)"
                                                        }
                                            }}>Voyager</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </ThemeProvider>
        </>
    );
}