import { Link } from 'react-router-dom';
import React, {useContext} from 'react';


function Cartwidget() {
    return (
        <>
            <div className="d-flex justify-content-end align-items-center col-3">
                <Link to="/cart">
                    <img className="border-r" width={50} height={50} src="../carrito.webp" alt="Logo de carrito" />
                </Link>
                <p>2</p>
            </div>
        </>
    );
}

export default Cartwidget;
