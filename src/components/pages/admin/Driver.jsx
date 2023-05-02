import React, { useState } from "react";
import DriverData from "../services/Driver_data";
import { Table } from "react-bootstrap";
import '../css/client_driver.css';
import Nav from "./Nav";

const Driver = (props) => {
    // const [Current,SetCurrent] = useState(1);
    // const recordsPerPage = 3;
    // const lastIndex = Current * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    //     const records = DriverData.slice(firstIndex , lastIndex);
    // const npage = Math.ceil(DriverData.length / recordsPerPage);
    // const numbers = [...Array(npage+1).keys()].slice(1)
    //
    // function prePage(){
    //     if(Current !== 1) SetCurrent(Current - 1)
    // }
    // function changeCPage(id){
    //     SetCurrent(id);
    // }
    // function nextPage(){
    //     if(Current !== npage) SetCurrent(Current + 1)
    // }
    return (
        <div>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>

        <div className="client">
            <div className="sell__car-wrapper">
                <h2 className="title">Drivers :</h2>
                <br/>
                <div>

                    <Table className="table table-admin" >
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Username</th>
                            <th scope="col">email</th>

                        </tr>
                        </thead>
                        <tbody>

                        {DriverData?.map((item,i) => (
                            <tr key={i}  >
                                <td scope="row" className='pl-5'>{item.id}</td>
                                <td>{item.Username}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                {/*<>*/}
                {/*    <ul className='pagination'>*/}
                {/*        <li className='page-item'>*/}
                {/*            <a href='#' className='page-link' onClick={prePage}>Prev</a>*/}
                {/*        </li>*/}
                {/*        {*/}
                {/*            numbers.map((n,i) =>(*/}
                {/*                <li className={`page-item ${Current === n ? 'active' : ''}`} key={i}>*/}
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
        </div>
    );
};

export default Driver;
