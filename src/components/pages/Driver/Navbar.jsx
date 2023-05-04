import { useRef } from "react";
import '../Driver/Driver.css';
import {Logout} from "../../api/Logout";
import sessionStorage from "sessionstorage";
import {NavLink, useNavigate} from "react-router-dom";

function Navbar({ handleClickChangeToShow1, handleClickChangeToShow2}) {
    const navigate = useNavigate();
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    const handleLogout = () => {
        Logout(sessionStorage.getItem("token"),navigate);
    }

        function handleShow1Click() {
            handleClickChangeToShow1();
        }

        function handleShow2Click() {
            handleClickChangeToShow2();
        }

    return (
        <header className="header-driver">
            <h3 className="title-driver">Prolog</h3>
            <nav ref={navRef}>
                <a className="a-navbar" onClick={handleShow1Click}>Containers</a>
                <a  className="a-navbar" onClick={handleShow2Click}>Packages</a>
                <a className="a-navbar" > Profile </a>
                <a className="a-navbar" onClick={handleLogout}>Logout</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <i className="bi bi-x-lg"/>
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <i className="bi bi-list"/>
            </button>
        </header>
    );
}

export default Navbar;