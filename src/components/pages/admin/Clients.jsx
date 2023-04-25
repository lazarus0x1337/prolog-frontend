import React, { useState } from "react";
import "./css/client.css";
import ClientData from "../services/Client_data";
import { Table } from "react-bootstrap";
import Nav from "./Nav";
import { Button,TextField  } from "@mui/material";

const Clients = ({Toggle}) => {

    const [CurrentPage,SetCurrentPage] = useState(1);
    const recordsPerPage =3;
    const lastIndex = CurrentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = ClientData.slice(firstIndex , lastIndex);
    const npage = Math.ceil(ClientData.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1)

    function prePage(){
        if(CurrentPage !== 1) SetCurrentPage(CurrentPage - 1)
    }
    function changeCPage(id){
        SetCurrentPage(id);
    }
    function nextPage(){
        if(CurrentPage !== npage) SetCurrentPage(CurrentPage + 1)
    }
    return (

        <div className="px-3">
            <Nav Toggle={Toggle}/>

    <div className="client">
      <div className="sell__car-wrapper">
        <h2 className="title">Clients : </h2>
          <div className="input-group">
              <div className="container search-form">
                  <input type="search" id="form1" className="form-control" placeholder="Search..."/>
                  <Button variant="contained" >Search</Button>
              </div>
          </div>
          <br/>
          <div>
              <Table className="table" >
                  <thead>
                  <tr>
                      <th scope="col">id</th>
                      <th scope="col">Username</th>
                      <th scope="col">email</th>

                  </tr>
                  </thead>
                  <tbody>

                  {records?.map((item,i) => (
                      <tr key={i}  >
                          <th scope="row" className='pl-5'>{item.id}</th>
                          <td>{item.Username}</td>
                          <td>{item.email}</td>
                      </tr>
                  ))}
                  </tbody>
              </Table>
          </div>
          <>
              <ul className='pagination'>
                  <li className='page-item'>
                      <a href='#' className='page-link' onClick={prePage}>Prev</a>
                  </li>
                  {
                      numbers.map((n,i) =>(
                          <li className={`page-item ${CurrentPage === n ? 'active' : ''}`} key={i}>
                              <a href='#' className='page-link' onClick={ ()=> changeCPage(n) }>{n}</a>
                          </li>
                      ))
                  }
                  <li className='page-item'>
                      <a href='#' className='page-link' onClick={nextPage}>Next</a>
                  </li>
              </ul>
          </>
      </div>
    </div>
  </div>
  );
};

export default Clients;
