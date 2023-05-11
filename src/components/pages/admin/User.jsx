import  {useEffect, useState} from "react";
import "../css/client_driver.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';
import { Table } from "react-bootstrap";
import Nav from "./Nav";
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import sessionStorage from "sessionstorage";
import {GetAllUsers} from "../../api/user/GetAllUsers";
import {UpdateProfile} from "../../api/user/UpdateProfile";
import Box from "@mui/material/Box";
import {style} from "../interfaces/Css_Modal";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

const User = (props) => {
    const [users,setUsers]=useState([]);
    const [user,setUser]=useState({});
    const [refetch, setRefetch] = useState(false);
    const [ModalUpdate, setModalUpdate] = useState(false);
    const [ModalOk, setModalOk] = useState(false);

    useEffect( () => {
        const token = sessionStorage.getItem("token");
        const role = props.role;
        GetAllUsers(token, role).then((us) => {
            setUsers(us);
        });
    }, [refetch]);

    const ButtonUpdate = async () => {
        const token = sessionStorage.getItem("token");
        const data = {
            "fullname":user.fullname,
            "email":user.email,
            "telephone":user.telephone,
            "role":user.role
        };
        try {
            await UpdateProfile(token, data,user.id);
            ResponseOk();
        } catch (error) {
            console.log(error);
        } finally {
            setRefetch(prevState => !prevState);
        }
    }

    const ShowModalUpdate=(item)=>{
        setUser(item);
        setModalUpdate(true);
        setModalOk(false);
    }
    const ResponseOk=()=>{
        setModalUpdate(false);
        setModalOk(true);
    }

    const CloseModalUpdate=()=>{
        setModalUpdate(false);
        setModalOk(false);
    }


    return (

        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>

    <div className="manager">
        <h2 className="title">{props.role==='CLIENT'?'CUSTOMER':props.role}S : </h2>
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
                      <th scope="col">ID</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>

                  {users?.map((item,i) => (
                      <tr key={i}  >
                          <td scope="row" className='pl-5'>{item.id}</td>
                          <td>{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>{item.telephone}</td>
                          <td style={{ display: 'flex', justifyContent: 'center' }}>
                              <Stack direction="row" spacing={2}>
                                  <Button  onClick={() => ShowModalUpdate(item)} variant="contained" endIcon={<UpdateIcon />}
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

            <Modal open={ModalUpdate} onClose={CloseModalUpdate} >
                <Box sx={style} >
                    <Grid>
                        <Typography variant="h6"  gutterBottom>
                            Update information :
                        </Typography>

                        <Grid sx={{ my: 0.5 }} item xs={12} >
                            <TextField sx={{ my: 1 }}
                                       label="Full Name"
                                       onChange={(e) => {
                                           const newValue = e.target.value;
                                           if (newValue !== user.fullname) {
                                               setUser({ ...user, fullname: newValue });
                                           }
                                       }}
                                       value={user.fullname}
                                       fullWidth
                                       type="text"
                            />
                            <TextField sx={{ my: 1 }}
                                       label="Email"
                                       onChange={(e) => {
                                           const newValue = e.target.value;
                                           if (newValue !== user.email) {
                                               setUser({ ...user, email: newValue });
                                           }
                                       }}
                                       value={user.email}
                                       fullWidth
                                       type="text"

                            />
                            <TextField sx={{ my: 1 }}
                                       label="Phone Number"
                                       onChange={(e) => {
                                           const newValue = e.target.value;
                                           if (newValue !== user.telephone) {
                                               setUser({ ...user, telephone: newValue });
                                           }
                                       }}
                                       value={user.telephone}
                                       fullWidth
                                       type="text"
                            />
                            <FormControl  fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Roles</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={user.role}
                                    label="roles"
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (newValue !== user.role) {
                                            setUser((prevUser) => ({ ...prevUser, role: newValue }));
                                        }
                                    }}>
                                    <MenuItem value='ADMIN'>Admin</MenuItem>
                                    <MenuItem value='MANAGER'>Manager</MenuItem>
                                    <MenuItem value='DRIVER'>Driver</MenuItem>
                                    <MenuItem value='CLIENT'>Client</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={ButtonUpdate}
                        style={{
                            marginTop:"10px",
                            backgroundColor: "var(--primary-blue)",
                            color: "var(--color-menu)",
                            width:"100%"
                        }}
                        endIcon={<UpdateIcon />}
                    >Update</Button>
                </Box>
            </Modal>

            <Modal open={ModalOk} onClose={CloseModalUpdate} >
                <Box sx={style}>
                    <Grid  sx={{ my: 1 }}>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                            Successfully modified !
                        </Typography>
                        <Button onClick={CloseModalUpdate} style={{
                            backgroundColor: "var(--primary-blue)",
                            color: "black",
                            marginLeft: "180px",
                            marginTop: "27px",
                            padding: "10px"
                        }}>Ok</Button>
                    </Grid>
                </Box>
            </Modal>
  </>
  );
};

export default User;
