import { useState } from 'react'
import './App.css'
import express from 'express';

import caregoriaRoutes from './database/routes/categoria.routes.js'

function App() {
  const app = express();

  app.use(express.json())

  const reultado = app.use(caregoriaRoutes)

  console.log(reultado)
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
