const regexUrl = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;

export function validation(local) {
    let errors = {};

    // if (local.image && !regexUrl.test(local.image)) errors.image = "URL invalido"
    if(typeof local.image === "array") errors.image = "Debes agregar más archivos."
    return errors;
}