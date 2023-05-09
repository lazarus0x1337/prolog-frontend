import Nav from "../admin/Nav";
import {Button} from "@mui/material";
import {Table} from "react-bootstrap";
import {useState} from "react";
import "../css/manager.css";
import sessionStorage from "sessionstorage";
import axios from "axios";
import * as React from "react";


function Container(props) {
    const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` // Ajouter le token dans l'en-tête d'autorisation
        }
    };


    const [Drivers, setDrivers] = useState([]);


// get all containers :
    try{
        axios.get('http://localhost:8080/api/v1/user',config)
            .then(response => {
                if(response.status === 200){
                    const driver = response.data.filter(driver => driver.role === "DRIVER");
                    setDrivers(driver);
                }else console.log("ereur"+response.status);
            })
    }catch (error){
        console.log(error);
    }


    return(
        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
            <div className="manager">
                <h2 className="title">Containers : </h2>


                <div className="input-group">
                    <div className="container search-form">
                        <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                        <Button variant="contained" >Search</Button>
                    </div>
                </div>
                <br/>
                <div>

                    <Table className="table table-manager" >
                        <thead>
                        <tr >
                            <th scope="col">Fullname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telephone</th>

                        </tr>
                        </thead>
                        <tbody>

                        {Drivers?.map((driver, i) => (
                            <React.Fragment key={i}>
                                <tr>
                                    <td scope="row" className='pl-5'>{driver.fullname}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.telephone}</td>

                                </tr>
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}


export default Container;