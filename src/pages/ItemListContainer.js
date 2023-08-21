import React, { useEffect, useState } from "react";
import Numero from "./Numero";

function ItemListContainer() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProductos(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <section className="container">
            <div className="mt-2 row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {productos.map(producto => (
                    <div className="col mb-4" key={producto.id}>
                        <div className="card h-100 cardPersonalizada">
                            <img
                                src={producto.image}
                                alt={producto.title}
                                className="card-img-top product-image align-self-center"
                            />
                            <div className="card-body text-center">
                                <h2 className="h5">{producto.title}</h2>
                                <p className="small">Precio: ${producto.price}</p>
                            </div>
                            <Numero></Numero>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ItemListContainer;
