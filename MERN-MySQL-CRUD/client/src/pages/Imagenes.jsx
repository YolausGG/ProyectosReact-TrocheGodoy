
import { useProductos } from "../contexts/productos"

export default function Imagenes() {

  const { imagenes } = useProductos()



  function crearURL(dataImg) {
    var bytes = new Uint8Array(dataImg);
    console.log(imagenes);
    // Convertir los bytes a un blob
    var myBlob = new Blob([bytes]);
    

    // Obtener el url
        var url = URL.createObjectURL(myBlob);

    console.log(url);
    //console.log(url.substring(5,url.length))
    return url
  }



  return (
    <div className="container-imagenes">
      <h2>Imagenes</h2>
      {

        imagenes.map(imgen => (
          <div key={imgen.titulo}>
            <h3>{imgen.titulo}</h3>
            {imgen.dataImgaen?? <img src={crearURL(imgen.dataImgaen)} alt={imgen.titulo} />}

          </div>
        ))
      }
    </div>
  )
}
