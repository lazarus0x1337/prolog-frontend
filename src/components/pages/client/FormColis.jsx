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
import { Input } from "@mui/material";
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
    const [showTel,setshowTel]=useState(true);
    const [Prix,setPrix]=useState(200);
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
                        id="firstName"
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
                        id="lastName"
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
                        id="tel"
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
                        id="address1"
                        name="address1"
                        label="Address line"
                        fullWidth
                        autoComplete="address-line1"
                        variant="standard"
                    />
                </Grid>
{/*                <Grid item xs={12}>*/}
{/*/!*date to come*!/*/}
{/*                    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
{/*                        <DemoContainer components={['DateField']}>*/}
{/*                            <DateField label="Time to Start" />*/}
{/*                        </DemoContainer>*/}
{/*                    </LocalizationProvider>*/}
{/*                </Grid>*/}
            </Grid>
           <br/>
            <Typography variant="h6" gutterBottom>
                Colis :
            </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    label="length (cm)"
                    fullWidth
                    type="number"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    label="Width (cm)"
                    fullWidth
                    type="number"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
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
                    id="tel"
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
                    onChange={(e) => setPrix(e.target.value)}
                    value={Prix}
                    required
                    label="Prix (DH)"
                    fullWidth
                    type="number"
                    variant="standard"
                />
            </Grid>
        </Grid>


            <div>
                <Button style={{backgroundColor:"var(--primary-blue)",color:"black",marginLeft:"170px",marginTop:"27px",padding:"10px"}} >Confirmer</Button>
            </div>



                </Typography>
            </Box>
    );
}