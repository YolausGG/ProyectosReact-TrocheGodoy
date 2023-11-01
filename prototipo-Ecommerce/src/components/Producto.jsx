import PropTypes from 'prop-types'
import React from 'react'
import '../styles/producto.css'
export const Producto = ({producto}) => {
    
    
    return(
        <li className='producto'>
            <strong>{producto.id}</strong>
            <strong>{producto.title}</strong>
        </li>
    )
}

Producto.propTypes = {
    producto: PropTypes.object
}


 