import * as React from 'react';
import Nav from "../admin/Nav";
import "../css/style.css";
import Louer from "./Louer";
import { Button } from "@material-ui/core";
import c1 from "../../images/camion_benne.png";
import c2 from "../../images/camion_frigo.png";
import c3 from "../../images/camion_fourgon.png";
import c4 from "../../images/camion_plateau.png";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";



function Vehicules(props) {
    const [loginOpen,setloginOpen]=React.useState(false);
    const  handleClick=()=>{
        setloginOpen(true);
    }
    const  handleClose=()=>{
        setloginOpen(false);
    }

    return (
        <div>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
                <div className="container-lg">
                    <div className="row camion-2  row-cols-1 row-cols-2 row-cols-3 row-cols-4">
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
                    <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4 vehicules">
                        <div className="col">
                            <Grid className="camion-1">
                                <div className="p-2 ">&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;Benne Truck</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Volume&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;40 000 L</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Fragile Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Cold Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-square"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Available&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/></div>
                            </Grid>
                        </div>
                        <div className="col">
                            <Grid className="camion-1">
                                <div className="p-2 ">&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;Frigo Truck</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Volume&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;50 000 L</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Fragile Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Cold Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Available&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/></div>
                            </Grid>
                        </div>
                        <div className="col">
                            <Grid className="camion-1">
                                <div className="p-2 ">&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;Fourgon Truck</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Volume&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;60 500 L</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Fragile Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Cold Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-square"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Available&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/></div>
                            </Grid>
                        </div>
                        <div className="col">
                            <Grid className="camion-1">
                                <div className="p-2 ">&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;Plateau Truck</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Volume&nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-arrow-right"/>&nbsp;&nbsp;&nbsp;Depends container</div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Fragile Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-square"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Support Cold Packages&nbsp;&nbsp;&nbsp; <i className="bi bi-square"/> </div>
                                <div className="p-2">&nbsp;&nbsp;&nbsp;Available&nbsp;&nbsp;&nbsp; <i className="bi bi-check-square-fill"/></div>
                            </Grid>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4 vehicules">
                        <Button onClick={handleClick} >Rent a Truck </Button>
                    </div>
                </div>

            <Modal open={loginOpen} onClose={handleClose}>
              <Louer/>
            </Modal>
        </div>
    );
}
export default Vehicules;
