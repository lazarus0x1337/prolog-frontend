import { useRef } from "react";
import '../Driver/Driver.css';
import {Logout} from "../../api/Logout";
import sessionStorage from "sessionstorage";
import {useNavigate} from "react-router-dom";

function Navbar(props) {
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
    const handleClickChangeToPackages =() => {
        props.show1=
    }

    return (
        <header className="header-driver">
            <h3 className="title-driver">Prolog</h3>
            <nav ref={navRef}>
                <a href="/driver">Containers</a>
                <a onClick={handleClickChangeToPackages}>Packages</a>
                <a>Profile</a>
                <a href="/" onClick={handleLogout}>Logout</a>
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