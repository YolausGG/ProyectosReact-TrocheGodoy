import PropTypes from 'prop-types'

//import imgDefult from '../images/iconCamisa2.png'
import { useEffect, useState } from 'react';

function CartaProducto({ producto }) {

    const [imgURL, setImgURL] = useState()

    console.log(producto);


    useEffect(() => {
        if (producto.imagenes.length > 0 && producto.imagenes[0].idProducto != 0) {
            console.log(producto.imagenes[0].dataImagen.data);

            var bytes = new Uint8Array(producto.imagenes[0].dataImagen.data);

            // Convertir los bytes a un blob
            var myBlob = new Blob([bytes]);

            // Obtener el url
            var url = URL.createObjectURL(myBlob);
            console.log(url);

            setImgURL(url)
        }
        else {
            setImgURL('https://rickandmortyapi.com/api/character/avatar/2.jpeg')
        }
    }, [])


    //console.log(url.substring(5,url.length))
    //https://rickandmortyapi.com/api/character/avatar/2.jpeg
    return (
        <div className='cardProducto'>
            <img className='imgProducto' src={imgURL} alt="imagen de producto" />
            <div className='datosProducto'>
                <h4>{producto.nombre}</h4>
                <strong>${producto.precio}</strong>
            </div>        
            <ul>
                {producto.marcas.map(marca => (
                    <li key={marca.idMarca} >{marca.nombre}</li>
                ))}
            </ul>
        </div>
    )
}

export default CartaProducto


CartaProducto.propTypes = {
    producto: PropTypes.object.isRequired,
    nombre: PropTypes.string,
    precio: PropTypes.number,
    talle: PropTypes.string,
    stock: PropTypes.number,
    descripcion: PropTypes.string,
    imagenes: PropTypes.array,
    categorias: PropTypes.array,
    marcas: PropTypes.array,
    ofertas: PropTypes.array
}