import ojo from '../images/ojo.png'
import invisible from '../images/invisible.png'

export function inputsInteractivos() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        if (input.type != 'checkbox' && input.type != 'file') {
            input.onfocus = () => {
                input.previousElementSibling.classList.add('top')
                input.previousElementSibling.classList.add('focus')
                input.parentNode.classList.add('focus')
            }
            input.onblur = () => {

                input.value = input.value.trim();

                if (input.value.trim().length == 0) {
                    input.previousElementSibling.classList.remove('top')
                }
                input.previousElementSibling.classList.remove('focus')
                input.parentNode.classList.remove('focus')
            }
        }
    })
}
export function fechasInteractivos() {

    const selectMes = document.getElementsByClassName('selectMes')
    const spanMesFN = document.getElementsByClassName('idSpanMesFN')

    selectMes.onfocus = () => {
        selectMes.classList.add('focus')
        spanMesFN.classList.add('top')
        spanMesFN.classList.add('focus')
    }
    selectMes.onblur = () => {
        console.log(selectMes.value);

        if (selectMes.value == "-1") {
            spanMesFN.classList.remove('top')
        }
        selectMes.classList.remove('focus')
        spanMesFN.classList.remove('focus')
    }
}
export function mostarContra() {

    var inp = document.getElementById('inpIdContra')
    var eye = document.getElementById('eye')

    if (inp.type == "password") {
        inp.type = "text"
        eye.src = invisible
    } else {
        inp.type = "password"
        //inp.value = "hidden"
        eye.src = ojo
    }


}
export function mostarContra2() {

    var inpR = document.getElementById('inpIdRepetirContra')
    var eyeR = document.getElementById('repetirEye')

    if (inpR.type == "password") {
        inpR.type = "text"
        eyeR.src = invisible
    } else {
        inpR.type = "password"
        //inp.value = "hidden"
        eyeR.src = ojo
    }
}
export function marcaYCategoriaInteractivas() {

    const selectsMC = document.querySelectorAll('select')

    selectsMC.forEach(select => {
        select.onfocus = () => {
            select.classList.add('focus')
            select.previousElementSibling.classList.add('focus')
            select.previousElementSibling.classList.add('top')
        }
    })
    selectsMC.forEach(select => {
        select.onblur = () => {
            console.log(select.value);

            if (select.value == "-1") {
                select.previousElementSibling.classList.remove('top')
            }
            select.classList.remove('focus')
            select.previousElementSibling.classList.remove('focus')
        }
    })
}

