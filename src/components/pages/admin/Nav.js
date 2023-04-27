import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
function Nav(props) {
    let username=props.fullname;
    return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent mx-lg-2 my-lg-2 ">
            <i className="navbar-brand bi bi-justify-left fs-4  " onClick={props.Toggle}/>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-justify"/>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">{username}</a>
                                      <div className="dropdown-menu" aria-labelledby="dropdownId">
                                             <a className="dropdown-item" href="#">Profile</a>
                                             <a className="dropdown-item" href="#">Setting</a>
                                             <a className="dropdown-item" href="#">Logout</a>
                                      </div>
                    </li>
                </ul>
            </div>
    </nav>
    );
}
export default Nav;