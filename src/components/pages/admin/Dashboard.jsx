import  Nav from "./Nav";
import React, {useEffect, useState} from "react";
import "../css/dashboard.css";
import sessionStorage from "sessionstorage";
import {GetAllColis} from "../../api/colis/GetAllColis";
import {GetAllFacturesColis} from "../../api/facture/GetAllFacturesColis";

function Dashboard(props){

    let [countAllColis,setcountAllColis]=useState(0);
    let [sommePrix,setSommePrix]=useState(0);
    let [arrivedColis,setArrivedColis]=useState(0);
    let [facturesAujourdhui,setFacturesAujourdhui]=useState(0);
    let [troisPremieresFactures,setTroisPremieresFactures]=useState([]);
    useEffect( () => {
        const token = sessionStorage.getItem("token");
        GetAllColis(token).then((colis) => {
            setcountAllColis(colis.length);
            const arrivedColis = colis.filter(coli => coli.delivered).length;
            setArrivedColis(arrivedColis);
        });
        GetAllFacturesColis(token).then(factures => {
            // Somme des factures
            const sommePrix = factures.reduce((acc, facture) => acc + facture.prix, 0);
            setSommePrix(sommePrix);

            // Factures du jour
            const today = new Date();
            const facturesAujourdhui = factures.filter(facture => {
                const factureDate = new Date(facture.date);
                return factureDate.toISOString().substring(0, 10) === today.toISOString().substring(0, 10);
            });
            const nombreFacturesAujourdhui = facturesAujourdhui.length;
            setFacturesAujourdhui(nombreFacturesAujourdhui);

            // Recent order
            const troisPremieresFactures = factures.slice(0, 3);
            setTroisPremieresFactures(troisPremieresFactures);
        });
    }, []);
    return(

        <>
            <Nav Toggle={props.Toggle} fullname={sessionStorage.getItem("fullname")}/>
          <div className="container-fluid px-lg-4">
           <div className="row g-3 my-2 ">
               <div className="col-md-3 p-1 cadre_admin">
                   <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded ">
                       <div>
                           <h3 className="fs-2">{countAllColis}</h3>
                           <p className="fs-2">Packages</p>
                       </div>
                       <i className="bi bi-cart-plus p-3 fs-1"/>
                   </div>
               </div>
               <div className="col-md-3 p-1 cadre_admin">
                   <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded">
                       <div>
                           <h3 className="fs-2">{sommePrix*0.1}</h3>
                           <p className="fs-2">Earnings</p>
                       </div>
                       <i className="bi bi-currency-dollar p-3 fs-1"/>
                   </div>
               </div>
               <div className="col-md-3 p-1 cadre_admin">
                   <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded">
                       <div>
                           <h3 className="fs-2">{arrivedColis}</h3>
                           <p className="fs-2">Delivery</p>
                       </div>
                       <i className="bi bi-truck p-3 fs-1"/>
                   </div>
               </div>
               <div className="col-md-3 p-1 cadre_admin">
                   <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded">
                       <div>
                           <h3 className="fs-2">{facturesAujourdhui}</h3>
                           <p className="fs-2">    Today</p>
                       </div>
                       <i className="bi bi-graph-up-arrow p-3 fs-1"/>
                   </div>
               </div>
           </div>
          </div>
            <div className="px-4 manager">
            <table className="table caption-top mt-2 table-dashboard">
                <caption className="text-white fs-4">Recent Orders :</caption>
                <thead>
                <tr>
                    <th scope="col">Tracking Number</th>
                    <th scope="col">Origin Address</th>
                    <th scope="col">Arrived Address</th>
                    <th scope="col">Date</th>
                    <th scope="col">Price(Dhs)</th>

                </tr>
                </thead>
                <tbody>
                {troisPremieresFactures?.map((item, i) => (
                 <tr key={i}>
                     <th scope="row" className='pl-5'>{item.colis.trackingNumber.trackingNumber}</th>
                     <td>{item.colis.adresse}</td>
                     <td>{item.colis.destinataire.adresse}</td>
                     <td>{item.date.substring(0,10)} {item.date.substring(11,19)}</td>
                     <td>{item.prix}</td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </>
    );
}

export default Dashboard;