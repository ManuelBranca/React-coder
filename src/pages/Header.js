import Navbar from "./Navbar";
import Cartwidget from "./Cartwidget";
function Header() {
    return (
        <>
            <div className="d-flex column bg-header">
                <h1 className="text-center m-1 col-4">TuTienda</h1>
                <Navbar className="col-4"></Navbar>
                <Cartwidget className="col-4 text-center"></Cartwidget>
            </div>
        </>
    );
}

export default Header;