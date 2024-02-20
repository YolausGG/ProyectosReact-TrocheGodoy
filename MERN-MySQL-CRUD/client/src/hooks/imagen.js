function cargarFuncionalidadImagen() {

    //const { createImagen } = useImagen();        
    let files;

    const areaImagen = document.querySelector("#drag-area");

    const dragText = areaImagen.querySelector("#h4-img");
    const button = areaImagen.querySelector("#button-img");
    const input = areaImagen.querySelector("#inp-file");

    button.addEventListener("click", () => {
        input.click();
    })

    input.addEventListener('change', () => {
        files = input.files
        areaImagen.classList.add('active')
        console.log('change');
        showFiles(files)
        areaImagen.classList.remove('active')
    })

    areaImagen.addEventListener('dragover', (e) => {
        e.preventDefault()
        areaImagen.classList.add('active')
        dragText.textContent = 'Suelta para subir la Imagenes'
    })
    areaImagen.addEventListener('dragleave', (e) => {
        e.preventDefault()
        areaImagen.classList.remove('active')
        dragText.textContent = 'Arrastra y suelta Imagenes'
    })
    areaImagen.addEventListener('drop', (e) => {
        e.preventDefault()
        files = e.dataTransfer.files
        console.log('drop');
        showFiles(files)
        areaImagen.classList.remove('active')
        dragText.textContent = 'Arrastra y suelta Imagenes'
    })
}

function showFiles(files) {
    console.log(files);
    for (const file of files) {
        processFile(file)
    }

}

function processFile(file) {

    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']

    const fileReader = new FileReader()
    const id = `file-${Math.random().toString(32).substring(7)}`


    if (validExtensions.includes(docType)) {
        fileReader.addEventListener('load', () => {
            const fileUrl = fileReader.result
            const image = `
                <div id="${id}" className="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="50px">
                    <div className="img-status">
                        <span>${file.name}</span>
                        <span className='status-text'>
                            Loading...
                        </span>
                    </div>
                </div>
                `
            const htmlImage = document.querySelector('#imgs-preview').innerHTML
            document.querySelector('#imgs-preview').innerHTML = image + htmlImage

        })
        
        const formData = new FormData()
        formData.append("file", file)
        
        fileReader.readAsDataURL(file)

        cargarImagenes(file)

    } else {
        alert('No es un archivo valido')
    }
}

