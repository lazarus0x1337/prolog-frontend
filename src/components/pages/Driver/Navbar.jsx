import { useRef } from "react";
import '../Driver/Driver.css';

function Navbar() {
    const navigate = useNavigate();
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
            <h3>Prolog</h3>
            <nav ref={navRef}>
                <a href="/#">Containers</a>
                <a href="/#">Profile</a>
                <a href="/#">Setting</a>
                <a onClick={handleLogout}>Logout</a>
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