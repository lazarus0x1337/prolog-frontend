import React, { useState } from "react";
import DriverData from "../data/Driver_data";
import { Table } from "react-bootstrap";
import './css/client.css';
import Nav from "./Nav";

const Driver = ({Toggle}) => {
    const [Current,SetCurrent] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = Current * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
        const records = DriverData.slice(firstIndex , lastIndex);
    const npage = Math.ceil(DriverData.length / recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1)

    function prePage(){
        if(Current !== 1) SetCurrent(Current - 1)
    }
    function changeCPage(id){
        SetCurrent(id);
    }
    function nextPage(){
        if(Current !== npage) SetCurrent(Current + 1)
    }
    return (
        <div className="px-3">
            <Nav Toggle={Toggle}/>

        <div className="client">
            <div className="sell__car-wrapper">
                <h2 className="title">Drivers</h2>
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
                                <li className={`page-item ${Current === n ? 'active' : ''}`} key={i}>
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

export default Driver;
