import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, Input } from "@mui/material";
export default function AddressForm() {
    const style = {
        color:'#000000',
        backgroundColor:'#ffffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        p: 4,
    };
    const [showTel,setshowTel]=useState(false);
    //colis
    const [AddColis,setAddColis]=useState("");
    const [Prix,setPrix]=useState(200);
    const [Poids,setPoids]=useState(0);
    const [TEL,setTEL]=useState(0);
    const [Height,setHeight]=useState(0);
    const [Length,setLength]=useState(0);
    const [Width,setWidth]=useState(0);
    //destenataire
    const [addressDES,setaddressDES]=useState("");
    const [telAdd,settelAdd]=useState("");
    const [lastName,setlastName]=useState("");
    const [firstName,setfirstName]=useState("");
    const [checkedFragile, setCheckedFragile] = useState(false);
    const [checkedFroid, setCheckedFriod] = useState(false);
    console.log(checkedFragile);
    //generateur tracking number :
    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 15; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));

    //     axios.post('http://localhost:8080/',{
    //         colis.trackingNumber.trackingNumber:result,
    //         colis.adresse:AddColis,
    //         colis.poids:Poids,
    //         colis.longueur:Length,
    //         colis.largeur:Width,
    //         colis.hauteur:Height,
    //         colis.fragile:checkedFragile,
    //         colis.froid:checkedFroid,
    //         colis.destinataire.adresse:addressDES,
    //         colis.destinataire.telephone:telAdd,
    //         colis.destinataire.firstname:firstName,
    //         colis.destinataire.lastname:lastName
    // }).then(response => {
    //         if(response.status===200) alert("Send package successfully");
    //         else alert("fields is empty or incorrect");
    //     })
    //         .catch(error => {
    //             alert("error");
    //             console.log(error);
    //         });
    }
    return (
        <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
                Destinataire :
            </Typography>
            <Grid container spacing={3} >
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
                <Grid item xs={12} >
                    <TextField
                        required
                        onChange={(e) => settelAdd(e.target.value)}
                        value={telAdd}
                        name="tel"
                        label="Tel "
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
                        name="address1"
                        label="Address line"
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
                name="address Colis"
                label="address Colis"
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

            { showTel &&
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

            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    onChange={(e) => setPoids(e.target.value)}
                    value={Poids}
                    label="Poids (Kg)"
                    fullWidth
                    type="number"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    onChange={() => setPrix(Poids*Height*Width*Length*0.2)}
                    value={Prix}
                    label="Prix (DH)"
                    fullWidth
                    type="number"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} >
                <FormControlLabel required
                                  control={<Checkbox />}
                                  label="Fragile"
                                  checked={checkedFragile}
                                  onChange={(e) => setCheckedFragile(e.target.checked)} />
                <FormControlLabel required
                                  control={<Checkbox />}
                                  label="Froid"
                                  checked={checkedFroid}
                                  onChange={(e) => setCheckedFriod(e.target.checked)}  />
            </Grid>
        </Grid>


            <div>
                <Button style={{backgroundColor:"var(--primary-blue)",color:"black",marginLeft:"170px",marginTop:"27px",padding:"10px"}} >Confirmer</Button>
            </div>



                </Typography>
            </Box>
    );
}













//generateur tracking number :
// function generateRandomString() {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < 15; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
//
//     axios.post('/updateValue', {
//         colis.trackingNumber:result,
//         colis.destinataire:
//
// })
// .then(response => {
//         // handle successful response
//     })
//         .catch(error => {
//             // handle error
//         });
//
//
// }