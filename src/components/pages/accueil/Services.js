import React from "react";

const Services = () => {
  return (
    <div id="services" className="services">
      <h1 className="py-5">Nos services</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <h3>Delivery Service</h3>
              <p>Pour effectuer des envois via notre plateforme, il suffit de remplir quelques champs (nom du destinataire, son adresse, mode de paiement ...) et nous occupons du reste...</p>
            </div>
          </div>
          {/* - */}
          <div className="col-md-3 col-sm-6">
            <div className="box">


              <h3>Warehousing</h3>
              <p>Nous disposons d’un vaste espace alloué à chacun de nos vendeurs pour stocker leurs marchandises. Ceci a pour but de leurs épargner du temps ...</p>
            </div>
          </div>
          {/* - */}
          <div className="col-md-3 col-sm-6">
            <div className="box">

              <h3>CallCenter</h3>
              <p>Nous disposons d’une équipe performante, experte en communication et techniques de vente. Disponible pour appeler vos clients et confirmer vos commandes...</p>.
            </div>
          </div>

          {/* - */}
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <h3>Rental Vehicules</h3>
              <p>Nous sommes aussi une entreprise de location de camions proposant une large gamme de véhicules pour répondre à tous vos besoins de transport...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Services;
