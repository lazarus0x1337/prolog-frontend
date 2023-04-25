import "./Cards.css";
import { Link } from 'react-router-dom';
import c1 from '../../images/camion_benne.png';
import c2 from '../../images/camion_frigo.png';
import c3 from '../../images/camion_fourgon.png';
import c4 from '../../images/camion_plateau.png';
function Cards() {
    return (
        <div id="equipements" className='cards'>
            <h1 className="py-5">Nos equipements</h1>
                <div className="container-lg ">
                    <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4">
                        <div className="col pt-4 ">
                            <img src={c1} className="gallery-item"/>
                            <Link className='cards__item__link' >Camion Benne</Link>
                        </div>
                        <div className="col pt-4">
                            <img src={c2} className="gallery-item"/>
                            <Link className='cards__item__link' >Camion Frigo</Link>
                        </div>
                        <div className="col ">
                            <img src={c3} className="gallery-item"/>
                            <Link className='cards__item__link' >Camion Fourgon</Link>
                        </div>
                        <div className="col pb-2 ">
                            <img src={c4} className="gallery-item"/>
                            <Link className='cards__item__link' >Camion Plateau</Link>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row">Comme vous le savez, il existe différentes tailles et dimensions de camion, et bien entendu différentes capacités de stockage. Ainsi, selon le volume de votre déménagement, PROLOG vont utiliser différents camions.</div>
                </div>
        </div>
    );
}

export default Cards;