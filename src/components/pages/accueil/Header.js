import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Typed from "react-typed";
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const history = useNavigate();

    function handleClick() {
        history('/client');
    }


    return (
                <div id="home" className="header-wrapper bg-opacity-50">
                  <div className="main-info">
                      <h1> <span>Développez </span> votre service
                          <br/> en toute confiance.</h1>
                      <Typed
                          className="typed-text"
                          strings={["PROLOG","Logistique simplifiée", "Location de véhicules",
                          "Solutions de transport innovantes"]}
                          typeSpeed={40}
                          backSpeed={60}
                          loop
                      />

                      <form className="income-form" >
                          <div className="form-inner ">
                              <input type="text" name="" placeholder="Enter Tracking number"  />
                              {/*<div className="fa fa-binoculars"/>*/}
                              <br/>
                              <button type="submit" onClick={handleClick}>TRACK PACKAGE</button>

                          </div>
                      </form>



                 {/*<a href="#" className="btn-main-offer">Register</a>*/}
                     </div>
                </div>
    )
}

export default Header;