import ojo from '../images/ojo.png'
import invisible from '../images/invisible.png'

export function inputsInteractivos() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
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
    })
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