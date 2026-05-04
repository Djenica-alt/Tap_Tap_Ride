import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './accueil.css';
import { FaMapMarkerAlt } from 'react-icons/fa';  
import { FaCreditCard } from 'react-icons/fa';    
import { FaStar } from 'react-icons/fa';           
import { FaClock } from 'react-icons/fa';

export default function Accueil() {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/Inscription');
    };
        
    return (
        <section>
            <div className="hero">
                <h1>TapTap Ride</h1>
                <h3>Votre trajet, en un clic !</h3>
                <p>Trouver rapidement un moyen de transport dans votre ville.</p>
                <Button onClick={handleStart}>Commencer maintenant</Button>
            </div>

            <section className='features-section'>
                <h3 className='features-title'> Pourquoi choisir Tap Tap Ride ?</h3>
                <div className='features'>
                        <div className="card">
                        <div className="icon-circle">
                        <FaMapMarkerAlt size={50} />
                        </div>
                        <h3>Géolocalisation</h3>
                        <p>Trouvez les transports disponibles près de vous en temps réel.</p>
                    </div>

                    <div className="card">
                        <div className="icon-circle">
                        <FaCreditCard size={50}/>
                        </div>
                        <h3>Prix transparent</h3>
                        <p>Estimez le coût de votre trajet avant de réserver.</p>
                    </div>
                    
                    <div className="card">
                        <div className="icon-circle">
                        <FaStar size={50} />
                        </div>
                        <h3>Avis vérifiés</h3>
                        <p>Consultez les notes et avis des autres utilisateurs.</p>
                    </div>

                    <div className="card">
                        <div className="icon-circle">
                        <FaClock size={50} />
                        </div>
                        <h3>Géolocalisation</h3>
                        <p>Réservez votre course en quelques secondes seulement.</p>
                    </div>
                </div>
            </section>

            <section className='Footer'>
                <h2> Prêt à partir ?</h2>
                <p>Rejoignez des milliers d'utilisateurs satisfaits et 
                    commencez à voyager intelligemment dès aujourd'hui !</p>
                <Button onClick={handleStart} children={"Créer un compte"}/>
            </section>
        </section>
    );
};
