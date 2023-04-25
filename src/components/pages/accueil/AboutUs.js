import React from "react";
import nous from "../../images/nous.jpg";

const AboutUs = () => {
  return (
    <div id="about" className="container py-5">
      <div className="row">
        <div className="col-lg-6 col-xm-12">
          <div className="photo-wrap mb-5">
            <img className="profile-img" src={nous} alt="author..." />
          </div>
        </div>
        <div className="col-lg-6 col-xm-12">
          <h1 className="about-heading">About Us</h1>
          <p>
            Nous sommes une entreprise spécialisée dans la logistique et la location de véhicules. Notre objectif est de fournir des services logistiques efficaces et fiables pour répondre aux besoins de nos clients, tout en offrant une flotte de véhicules de haute qualité pour répondre à leurs besoins de transport. Nous sommes fiers de notre capacité à fournir des solutions sur mesure pour chaque client, en fonction de leurs besoins spécifiques, en utilisant des technologies de pointe pour assurer une efficacité maximale dans tous nos processus. Nous sommes engagés à offrir un service exceptionnel et une satisfaction client de premier ordre à tous nos clients. Avec notre expertise en matière de logistique et de location de véhicules, nous sommes fiers d'être un partenaire de confiance pour les entreprises de tous les secteurs d'activité.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
