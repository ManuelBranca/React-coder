import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Productos() {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [detalleProducto, setDetalleProducto] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                if (categoria) {
                    const productosFiltrados = data
                        .filter(producto => producto.category.toLowerCase() === categoria.toLowerCase())
                        .filter(producto => producto.price < 50);
                    setProductos(productosFiltrados);
                } else {
                    const productosMenosDe50Dolares = data.filter(producto => producto.price < 50);
                    setProductos(productosMenosDe50Dolares);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [categoria]);


    const mostrarDetalleProducto = (producto) => {
        setDetalleProducto(producto);
        setMostrarDetalle(true);
    };


    const ocultarDetalle = () => {
        setMostrarDetalle(false);
        setDetalleProducto(null);
    };

    return (
        <section className="container">
            {mostrarDetalle ? (
                <div className="detalle text-center">
                    <h2>Detalle del Producto</h2>
                    <h3>{detalleProducto.title}</h3>
                    <p>Precio: ${detalleProducto.price}</p>

                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={detalleProducto.image}
                            alt={detalleProducto.title}
                            className="img-thumbnail"
                        />
                        <p>Breve descripcion: {detalleProducto.description}</p>
                        <button onClick={ocultarDetalle} className="btn agregarCarrito h-25 m-2">
                            Cerrar Detalle
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-center">Vea Nuestros Productos más baratos!</h1>
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
                                        <button className="agregarCarrito btn h-25" onClick={() => mostrarDetalleProducto(producto)}>Ver detalle</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Productos;
