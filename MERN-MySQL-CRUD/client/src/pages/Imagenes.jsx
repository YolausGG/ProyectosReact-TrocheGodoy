
import { useProductos } from "../contexts/productos"


export default function Imagenes() {

  const { imagenes } = useProductos()
  console.log(imagenes);

  
  return (
    <div className="container-imagenes">
      <h2>Imagenes</h2>
      {

        imagenes.map(imgen => (
          
          <div key={imgen.titulo}>
            {`../imagenesDB/${imgen.idImagen}-${imgen.titulo}`}
            <h3>{imgen.titulo}</h3>
            {imgen.dataImgaen?? <img src={imgen.dataImgaen} alt={imgen.titulo} />}

          </div>
        ))
      }
    </div>
  )
}
