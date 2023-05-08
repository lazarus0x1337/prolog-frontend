import React, {useEffect, useState} from "react";
import {FormLabel, Input, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import sessionStorage from "sessionstorage";
import Box from "@mui/material/Box";
import {style} from "../interfaces/Css_Modal";
import Modal from "@mui/material/Modal";
import {UpdateProfile} from "../../api/UpdateProfile";
import {GetProfile} from "../../api/GetProfile";

function Profile_driver(){
    const [profile, setProfile] = useState({});
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [Lastpassword, setLPassword] = useState('');
    const [Newpassword, setNPassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const id = sessionStorage.getItem("ID");
            const [pr] = await Promise.all([GetProfile(token, id)]);
            setProfile(pr);
            setFullname(pr.fullname);
            setEmail(pr.email);
            setTelephone(pr.telephone);
        } catch (err) {
            console.error(err);
        }
    };



    const handleUpdateProfile1 = ()=> {
        const token = sessionStorage.getItem("token");
        const id = sessionStorage.getItem("ID");
        const user = {
            "fullname":fullname,
            "email":email,
            "telephone":telephone
        }
        UpdateProfile(token,user,id);
        handlecheckModal();
    }

    const [ShowModal, setShow] = useState(false);
    const handlecheckModal=()=>{
        setShow(true);
    }
    const handleCloseModal=()=>{
        setShow(false);
    }
    return(
        <>
            <Modal open={ShowModal} onClose={handleCloseModal} >
                <Box sx={style}>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                            Update Successfully Validated
                        </Typography>
                        <Button onClick={handleCloseModal} style={{
                            backgroundColor: "var(--primary-blue)",
                            color: "black",
                            marginLeft: "180px",
                            marginTop: "27px",
                            padding: "10px"
                        }}>Ok</Button>
                    </Grid>
                </Box>
            </Modal>
            <div className="profile-1" style={{ marginTop:'100px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl id="profile" className="full-width-input" sx={{textAlign: "center"}}>
                            <FormLabel sx={{textDecoration: 'underline',color:"var(--color-font)",fontSize: "23px"}}>Personal Information</FormLabel>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="fullName" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>Full Name</FormLabel>
                            <Input
                                onChange={(e) => setFullname(e.target.value)}
                                value={fullname}
                                focusBorderColor="brand.blue"
                                type="email"
                                sx={{color: "var(--primary-blue)"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="emailAddress" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>Email Address</FormLabel>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                focusBorderColor="brand.blue"
                                type="email"
                                sx={{color: "var(--primary-blue)"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="phoneNumber" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>Phone Number</FormLabel>
                            <Input
                                onChange={(e) => setTelephone(e.target.value)}
                                value={telephone}
                                focusBorderColor="brand.blue"
                                type="tel"
                                sx={{color: "var(--primary-blue)"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', paddingRight:'30px'}}>
                        <Button onClick={handleUpdateProfile1}>Save</Button>
                    </Grid>

                </Grid>

                <Grid container spacing={2} justify="center" alignItems="center" >
                    <Grid item xs={12}>
                        <FormControl id="profile" className="full-width-input" sx={{textAlign: "center",marginTop:"30px"}}>
                            <FormLabel sx={{textDecoration: 'underline',color:"var(--color-font)", fontSize: "23px"}}>Changing Password</FormLabel>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="pass" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>Last Password</FormLabel>
                            <Input
                                onChange={(e) => setLPassword(e.target.value)}
                                value={Lastpassword}
                                focusBorderColor="brand.blue"
                                type="password"
                                sx={{color: "var(--primary-blue)"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="pass" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>New Password</FormLabel>
                            <Input
                                focusBorderColor="brand.blue"
                                type="password"
                                sx={{color: "var(--primary-blue)"}}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl id="pass" className="full-width-input">
                            <FormLabel sx={{color:'var(--color-font)', textAlign:'left', padding:'10px'}}>Confirm Password</FormLabel>
                            <Input
                                onChange={(e) => setNPassword(e.target.value)}
                                value={Newpassword}
                                focusBorderColor="brand.blue"
                                type="password"
                                sx={{color: "var(--primary-blue)"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', paddingRight:'30px'}}>
                        <Button>Change Password</Button>
                    </Grid>
                </Grid>

            </div>
        </>
    );
}

export default Profile_driver;