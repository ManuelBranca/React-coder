import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { collection, getDocs } from "firebase/firestore"; // Importa los módulos de Firestore
import Numero from "./Numero";
import { db } from "../firebase"; // Importa la instancia de Firebase que configuraste

function ItemListContainer() {
    const [productos, setProductos] = useState([]);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [detalleProducto, setDetalleProducto] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const { cart } = useCartContext();

    // Función para obtener productos de Firebase
    const obtenerProductosDeFirebase = async () => {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            productosArray.push({ id: doc.id, ...data });
        });
        setProductos(productosArray);
    };

    const onAdd = (quantity, productId) => {
        const message = `Se guardaron ${quantity} del producto ${productId}`;
        console.log(message);
        setProductoSeleccionado(message);
    };

    useEffect(() => {
        obtenerProductosDeFirebase(); // Llama a la función para obtener productos desde Firebase
    }, []);

    const mostrarDetalleProducto = (producto) => {
        setDetalleProducto(producto);
        setMostrarDetalle(true);
    };

    const ocultarDetalle = () => {
        setMostrarDetalle(false);
        setDetalleProducto(null);
        setProductoSeleccionado(null);
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
                        <Numero
                            onAdd={(quantity) =>
                                onAdd(quantity, detalleProducto.id)
                            }
                            product={detalleProducto} // Pasa el objeto del producto
                        />
                        <button
                            onClick={ocultarDetalle}
                            className="btn agregarCarrito h-25 m-2"
                        >
                            Cerrar Detalle
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-2 row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {productos.map((producto) => (
                        <div className="col mb-4" key={producto.id}>
                            <div className="card h-100 cardPersonalizada">
                                <img
                                    src={producto.image}
                                    alt={producto.title}
                                    className="card-img-top product-image align-self-center"
                                />
                                <div className="card-body text-center">
                                    <h2 className="h5">{producto.title}</h2>
                                    <p className="small">
                                        Precio: ${producto.price}
                                    </p>
                                    <button
                                        className="agregarCarrito btn h-25"
                                        onClick={() => {
                                            mostrarDetalleProducto(producto);
                                            setProductoSeleccionado(null);
                                        }}
                                    >
                                        Ver detalle
                                    </button>
                                    {producto.id === productoSeleccionado && (
                                        <Numero
                                            onAdd={(quantity) =>
                                                onAdd(quantity, producto.id)
                                            }
                                            product={producto} // Pasa el objeto del producto
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ItemListContainer;
