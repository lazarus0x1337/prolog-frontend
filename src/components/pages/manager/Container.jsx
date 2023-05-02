import Nav from "../admin/Nav";
import {Button} from "@mui/material";
import {Table} from "react-bootstrap";
import manager from "../services/Manager_data";
import {useState} from "react";
import "../css/manager.css";

function Container(props) {

    const [selectedContainer, setSelectedContainer] = useState(null);

    const handleRowClick = (container) => {
         setSelectedContainer(container);
    };

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
                            <th scope="col">Reference</th>
                            <th scope="col">UserName</th>

                        </tr>
                        </thead>
                        <tbody>

                        {manager?.map((container,i) => (
                            <tr key={i} onClick={() => handleRowClick(container)}  >
                                <td scope="row" className='pl-5'>{container.id}</td>
                                <td>{container.Username}</td>
                                {selectedContainer && selectedContainer.id === container.id &&(
                                    <tfoot>
                                    <tr>
                                        <td colSpan="3">
                                            <div className="colis-details">
                                                <h2>{selectedContainer.id}</h2>
                                                <p>{selectedContainer.category}</p>
                                                <p>{selectedContainer.groupSize}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    </tfoot>
                                )}
                            </tr>

                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}


export default Container;