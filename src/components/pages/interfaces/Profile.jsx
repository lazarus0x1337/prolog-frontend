import Nav from "../admin/Nav";
import "../css/profile.css";
import React from "react";
import Select from "@mui/material/Select";
import {FormLabel, Input} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

function Profile(props) {

    return(
        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
            <div className="profile-1">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <FormControl id="firstName" className="full-width-input" sx={{textAlign:"center",fontSize: "50px"}}>
                        <FormLabel>Profile</FormLabel>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="firstName" className="full-width-input">
                        <FormLabel>First Name</FormLabel>
                        <Input focusBorderColor="brand.blue" type="text" placeholder="Tim" sx={{ color: "var(--primary-blue)" }}  />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="lastName" className="full-width-input">
                        <FormLabel>Last Name</FormLabel>
                        <Input focusBorderColor="brand.blue" type="text" placeholder="Cook" sx={{ color: "var(--primary-blue)" }} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="phoneNumber" className="full-width-input">
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            focusBorderColor="brand.blue"
                            type="tel"
                            placeholder="(408) 996–1010"
                            sx={{ color: "var(--primary-blue)" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="emailAddress" className="full-width-input">
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            focusBorderColor="brand.blue"
                            type="email"
                            placeholder="tcook@apple.com"
                            sx={{ color: "var(--primary-blue)" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="city" className="full-width-input">
                        <FormLabel>City</FormLabel>
                        <Select focusBorderColor="brand.blue" placeholder="Select city">
                            <option value="california">California</option>
                            <option value="washington">Washington</option>
                            <option value="toronto">Toronto</option>
                            <option value="newyork" selected>
                                New York
                            </option>
                            <option value="london">London</option>
                            <option value="netherland">Netherland</option>
                            <option value="poland">Poland</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl id="country" className="full-width-input">
                        <FormLabel>Country</FormLabel>
                        <Select focusBorderColor="brand.blue" placeholder="Select country">
                            <option value="america" selected>
                                America
                            </option>
                            <option value="england">England</option>
                            <option value="poland">Poland</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
</div>
        </>
    );

}
export default  Profile;