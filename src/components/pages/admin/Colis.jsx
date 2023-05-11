import sessionStorage from "sessionstorage";
import Nav from "./Nav";
import * as React from "react";
import Button from "@mui/material/Button";
import {Table} from "react-bootstrap";
import Stack from "@mui/material/Stack";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import {useEffect, useState} from "react";
import {GetAllFacturesColis} from "../../api/facture/GetAllFacturesColis";


const Colis=(props)=>{

    const [refetch, setRefetch] = useState(false);
    const [colis, setColis] = useState([]);

    useEffect( () => {
        const token = sessionStorage.getItem("token");
        GetAllFacturesColis(token).then((us) => {
            setColis(us);
        });
    }, [refetch]);

    return(
  <>
        <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>

    <div className="manager">
            <h2 className="booking__title">Packages : </h2>
            <div className="input-group">
                <div className="container search-form">
                    <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                    <Button variant="contained" >Search</Button>
                </div>
            </div>
            <br/>
            <div>
                <Table className="table table-admin" >
                    <thead>
                    <tr>
                        <th scope="col">Tracking Number</th>
                        <th scope="col">Source Address</th>
                        <th scope="col">Destination Address</th>
                        <th scope="col">Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {colis?.map((item,i) => (
                        <tr key={i}>
                            <td scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</td>
                            <td>{item.colis.adresse}</td>
                            <td>{item.colis.destinataire.adresse}</td>
                            <td>{item.date.substring(0,10)} {item.date.substring(11,19)}</td>
                            <td>{item.prix}</td>
                            <td >
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" endIcon={<UpdateIcon />}
                                             style={{
                                                 backgroundColor: "var(--color-font-hover)",
                                                 color: "var(--color-menu)"
                                             }}>
                                        Update
                                    </Button>
                                    <Button   variant="outlined" startIcon={<DeleteIcon />}
                                              style={{
                                                  color: "var(--color-font-hover)",
                                                  backgroundColor: "var(--color-menu)",
                                                  outline: '2px solid var(--color-font-hover)'
                                              }}>
                                        Delete
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                     ))}
                    </tbody>
                </Table>
            </div>

    </div>
  </>
    );
}


export  default Colis;