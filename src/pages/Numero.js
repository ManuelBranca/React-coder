import { useState } from "react";

function Numero() {
    const [cantidad, setCantidad] = useState(0);

    const incremento = () => {
        if (cantidad < 10) {
            setCantidad(cantidad + 1);
        }
    }

    const decremento = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    }

    return (
<div>
            <div className="d-flex border-top justify-content-center col">
                <div className="row">
                    <div className="col-md-3 text-center">
                        <button className="button masYMenos" onClick={incremento}>+</button>
                        <h4 className="number">{cantidad}</h4>
                        <button className="button masYMenos" onClick={decremento}>-</button>
                    </div>
                    <div className="col-md-9 gap-3 text-center d-flex align-items-center ">
                        <button className="button agregarCarrito h-10">agregar al carrito</button>
                        <button className="button agregarCarrito">ver detalle de producto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Numero;