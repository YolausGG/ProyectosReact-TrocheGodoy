
export function showFiles(files) {
    console.log(files);
    if (files == null) {
        document.querySelector('#imgs-preview').innerHTML = null
    } else {
        for (const file of files) {
            processFile(file)
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    const fileReader = new FileReader()
    const id = `file-${Math.random().toString(32).substring(7)}`

    console.log('pasa');
    console.log(file);
    if (validExtensions.includes(docType)) {
        fileReader.addEventListener('load', () => {
            const fileUrl = fileReader.result
            const image = `
                <div id="${id}" className="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="50px">
                    <div className="img-status">
                        <span>${file.name}</span>                       
                    </div>
                </div>
                `
            const htmlImage = document.querySelector('#imgs-preview').innerHTML
            document.querySelector('#imgs-preview').innerHTML = image + htmlImage
        })

        const formData = new FormData()
        formData.append("file", file)

        fileReader.readAsDataURL(file)

        //cargarImagenes(file)

    } else {
        alert('No es un archivo valido')
    }
}

