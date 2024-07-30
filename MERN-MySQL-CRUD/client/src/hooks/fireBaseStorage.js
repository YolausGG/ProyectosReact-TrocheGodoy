import { appFireBase } from './fireBaseConfig.js';

//import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


//const db = getFirestore(appFireBase);
const storage = getStorage(appFireBase);

// Get a list of cities from your database

export const setImagenStorage = async (image) => {

  console.log('image FRS');
  console.log(image);
 
  const refImage = ref(storage, `imagenes/${image.name}`)
  await uploadBytes(refImage, image)

  //obtener URL de firebase storage
  const URLImagen = await getDownloadURL(refImage) 

  console.log('URL FRS');
  console.log(URLImagen);
  return URLImagen

}



