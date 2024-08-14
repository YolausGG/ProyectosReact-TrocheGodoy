import { appFireBase } from './fireBaseConfig.js';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(appFireBase);

export const setImagenStorage = async (image) => {
 
  const refImage = ref(storage, `imagenes/${image.name}`)
  await uploadBytes(refImage, image)

  //obtener URL de firebase storage
  const URLImagen = await getDownloadURL(refImage) 

  return URLImagen
}



