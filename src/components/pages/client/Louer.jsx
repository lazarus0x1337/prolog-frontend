import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function Louer() {
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

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const [date, setDate] = useState(currentDate.toLocaleDateString('en-GB').replace(/\//g, '-'));
    const [Prix,setPrix]=useState(200);
    const [addD,setaddD]=useState("");
    const [addR,setaddR]=useState("");
    const [TYPE, setType] = React.useState('');

    return (
        <Box sx={style}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Louer :
                </Typography>
                <Grid container spacing={3} >
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={TYPE}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value={10}>Benne</MenuItem>
                                <br/>
                                <MenuItem value={20}>Frigo</MenuItem>
                                <br/>
                                <MenuItem value={30}>Fourgon</MenuItem>
                                <br/>
                                <MenuItem value={30}>Plateau</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            name="Address"
                            label="Address Depart"
                            fullWidth
                            autoComplete="given-name"
                            onChange={(e) => setaddD(e.target.value)}
                            value={addD}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            name="Address"
                            label="Address Arrivé"
                            fullWidth
                            autoComplete="given-name"
                            onChange={(e) => setaddR(e.target.value)}
                            value={addR}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={(e) => setPrix(e.target.value)}
                            value={Prix}
                            label="Prix (DH)"
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            name="time"
                            label="Date"
                            fullWidth
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