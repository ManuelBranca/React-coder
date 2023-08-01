function Navbar() {
    return (
        <>
            <nav className="d-flex align-items-end m-1 justify-content-center col-4 text-center">
                <ul className="d-flex text-center justify-content-center align-items-center gap-5 m-0 p-0">
                    <li ><a className="color-nav p-0" href="#">Home</a></li>
                    <li ><a className="color-nav" href="#">Productos</a></li>
                    <li ><a className="color-nav" href="#">Envios</a></li>
                    <li ><a className="color-nav" href="#">Contactos</a></li>
                </ul>
            </nav>
        </>
    )
}
export default Navbar;