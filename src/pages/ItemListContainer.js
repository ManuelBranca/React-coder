import React, { useEffect, useState } from "react";
import Numero from "./Numero";
import { useCartContext } from "../context/CartContext";
import { collection, getFirestore, query, getDocs } from "firebase/firestore";

function ItemListContainer() {
    const [productos, setProductos] = useState([]);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [detalleProducto, setDetalleProducto] = useState(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const { cart } = useCartContext();

    useEffect(() => {
        const fetchProductos = async () => {
            const querydb = getFirestore();
            const productosCollection = collection(querydb, "productos");
            const q = query(productosCollection);

            try {
                const querySnapshot = await getDocs(q);
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setProductos(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProductos();
    }, []);

    const onAdd = (quantity, productId) => {
        const message = `Se guardaron ${quantity} del producto ${productId}`;
        console.log(message);
        setProductoSeleccionado(message);
    };

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
                                        <p>{productoSeleccionado}</p>
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
