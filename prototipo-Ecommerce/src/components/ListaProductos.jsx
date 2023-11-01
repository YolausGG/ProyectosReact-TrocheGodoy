import { React, useState } from "react"
import { products } from '../mocks/products.json'
import { Producto } from "./Producto"

export const ListaProductos = () => {

    return (
        <ul className="listaProductos">
            {
                products.map((producto, index) => {
                    return (
                        <Producto key={index} producto={producto} />
                    )
                }
                )
            }
        </ul>
    )
}