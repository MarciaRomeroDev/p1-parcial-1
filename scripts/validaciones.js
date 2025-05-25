// verifico que se haya ingresado un dato en el promp
function validarPromp(mensaje) {
  let dato;
  do {
    dato = prompt(mensaje);

    if (dato === null) {
      alert(`El dato es obligatorio`);
    } else if (dato === "") {
      alert(`Por favor, no deje el campo vacío`);
    } else if (dato.trim() === "") {
      alert(`El dato no puede ser espacios vacios`);
    }
  } while (dato === null || dato === "" || dato.trim() === "");
  return dato;
}

// valido que se haya ingresado  string
function validarString(mensaje) {
  let datoString;

  do {
    datoString = validarPromp(mensaje);

    if (!isNaN(datoString)) {
      alert(`No puede ser números`);
      datoString = null; //cambio el valor de el dato para que con la funcion validarPromp lo vuelva a pedir
    }
  } while (datoString === null || !isNaN(datoString));

  return datoString;
}

// valido que se haya ingresado un número
function validarNum(mensaje) {
  let datoNum;

  do {
    const entrada = validarPromp(mensaje);
    datoNum = parseInt(entrada);

    if (isNaN(datoNum)) {
      alert("El dato debe ser un número");
    }
  } while (isNaN(datoNum));

  return datoNum;
}

// validar url
function esURLValida(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function validarURL(mensaje) {
  do {
    let url = validarPromp(mensaje);
    if (esURLValida(url) === true) {
      break;
    } else {
      alert("la URL incorrecta, ingrese una URL válida");
      continue;
    }
  } while (true);
}

// Convertir la primer letra en mayuscula
const capitalizeString = (dato) => {
  return dato.replace(dato.charAt(0), dato.charAt(0).toUpperCase());
  ;
};
