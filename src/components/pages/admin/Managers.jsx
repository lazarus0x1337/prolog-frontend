import React, { useState } from "react";
import "../css/manager.css";
import { Table } from 'react-bootstrap';
import Nav from "./Nav";
import  manager  from "../services/Manager_data";
import {Link,useNavigate} from 'react-router-dom';
import { Button } from "@mui/material";
const Managers = (props) => {

    let history = useNavigate();
    const handleDelete =(id)=>{
          var index=manager.map(function(e){
              return e.id
        }).indexOf(id);
        manager.splice(index,1);
        history("/admin");
    }


    // const [currentPage,setCurrentPage] = useState(1);
    // const recordsPerPage = 3;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const records = manager.slice(firstIndex , lastIndex);
    // const npage = Math.ceil(manager.length / recordsPerPage);
    // const numbers = [...Array(npage+1).keys()].slice(1)

    // function prePage(){
    //     if(currentPage !== 1) setCurrentPage(currentPage - 1)
    // }
    // function changeCPage(id){
    //     setCurrentPage(id);
    // }
    // function nextPage(){
    //     if(currentPage !== npage) setCurrentPage(currentPage + 1)
    // }
  return (
      <div>
          <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
    <div className="manager">
        <h2 className="title">Managers : </h2>


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
          <tr>
                 <th scope="col">id</th>
                 <th scope="col">Username</th>
                 <th scope="col">category</th>
                 <th scope="col">groupsize</th>
                 <th>Action</th>
          </tr>
          </thead>
         <tbody>

                {manager?.map((item,i) => (
                    <tr key={i}  >
                    <td scope="row" className='pl-5'>{item.id}</td>
                    <td>{item.Username}</td>
                    <td>{item.category}</td>
                    <td>{item.groupSize}</td>
                     <td>
                         <a className="bi bi-trash3 " onClick={()=>handleDelete(item.id)}/>
                         &nbsp;&nbsp;&nbsp;
                         {/*<a className="bi bi-pencil-square" href=""  style={{color:"black"}}/>*/}
                     </td>
                    </tr>
                ))}
         </tbody>
        </Table>
        </div>
        {/*<>*/}
        {/*    <ul className='pagination'>*/}
        {/*        <li className='page-item'>*/}
        {/*            <a href='#' className='page-link'  onClick={prePage}>Prev</a>*/}
        {/*        </li>*/}
        {/*        {*/}
        {/*            numbers.map((n,i) =>(*/}
        {/*                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>*/}
        {/*                    <a href='#' className='page-link' onClick={ ()=> changeCPage(n) }>{n}</a>*/}
        {/*                </li>*/}
        {/*            ))*/}
        {/*        }*/}
        {/*        <li className='page-item'>*/}
        {/*            <a href='#' className='page-link' onClick={nextPage}>Next</a>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</>*/}
    </div>
      </div>
  );

};

export default Managers;
