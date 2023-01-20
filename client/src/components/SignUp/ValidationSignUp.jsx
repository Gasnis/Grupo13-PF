const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export function validation(signUp) {
    let errors = {};

    if(signUp.id && !regexEmail.test(signUp.id)) errors.id = "El mail que ingresaste no es válido";

    return errors;
}