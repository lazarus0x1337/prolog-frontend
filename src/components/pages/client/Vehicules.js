import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Nav from "../admin/Nav";
import { Button } from "@material-ui/core";
import Cards from "../accueil/Cards";
import c1 from "../../images/camion_benne.png";
import { Link } from "react-router-dom";
import c2 from "../../images/camion_frigo.png";
import c3 from "../../images/camion_fourgon.png";
import c4 from "../../images/camion_plateau.png";

const style={
backgroundColor:"var(--primary-blue)",
    marginLeft:"30px"
}
function Vehicules(props) {


    return (
        <div>
            <Nav Toggle={props.Toggle} fullname={props.fullname}/>
                <div className="container-lg">
                    <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4">
                        <div className="col pt-4 ">
                            <img src={c1} className="gallery-item"/>
                        </div>
                        <div className="col pt-3">
                            <img src={c2} className="gallery-item"/>
                        </div>
                        <div className="col pt-3">
                            <img src={c3} className="gallery-item"/>
                        </div>
                        <div className="col pb-3">
                            <img src={c4} className="gallery-item"/>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4">
                        <div className="col">
                            <Button style={style}>Rent a Camion Benne</Button>
                        </div>
                        <div className="col">
                            <Button style={style}>Rent a Camion Frigo</Button>
                        </div>
                        <div className="col">
                            <Button style={style}>Rent a Camion Fourgon</Button>
                        </div>
                        <div className="col">
                            <Button style={style}>Rent a Camion Plateau</Button>
                        </div>
                    </div>
                </div>

            {/**/}
        </div>
    );
}
export default Vehicules;
