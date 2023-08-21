import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="d-flex align-items-end m-1 justify-content-center col-4 text-center">
                <ul className="d-flex text-center justify-content-center align-items-center gap-5 m-0 p-0">
                    <li ><NavLink className="color-nav p-0" to="/">Home</NavLink></li>
                    <li ><NavLink className="color-nav" to="/Productos">Productos Baratos</NavLink></li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar;