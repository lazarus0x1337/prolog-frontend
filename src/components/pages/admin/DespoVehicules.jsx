import c1 from "../../images/camion_benne.png";
import c2 from "../../images/camion_frigo.png";
import c3 from "../../images/camion_fourgon.png";
import c4 from "../../images/camion_plateau.png";
import React from "react";
import Nav from "./Nav";

const DespoVehicules=(props)=>{

    return(
        <>
            <Nav Toggle={props.Toggle}/>
            <div className="container-lg">
                <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4">
                    <div className="col pt-4 ">
                        <img src={c1} className="gallery-item" />
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
            </div>

        </>
        );
 }
export default DespoVehicules;