class Pista {
  constructor(nombre, duracion) {
    this.nombre = nombre;
    this.duracion = duracion;
  }

  static formatearDuracion(segundos) {
    const horas = Math.floor(segundos / 3600)
      .toString() //convierto a string para poder usar el siguiente metodo
      .padStart(2, "0");
    const minutos = Math.floor((segundos % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const segs = Math.floor(segundos % 60)
      .toString()
      .padStart(2, "0");

    return `${horas}: ${minutos}: ${segs}`;
  }

  static pedirPista() {
    return validarString("Ingrese el nombre de la pista");
  }

  //solicito la duracion de la pista y valido que este en el rango
  static pedirDuracion() {
    let duracion;
    do {
      duracion = validarNum(
        "Ingrese la duracion de la pista en segundos (máximo 7200) "
      );
      if (duracion <= 0 || duracion > 7200) {
        alert("La duración debe estar entre 1 y 7200 segundos");
        duracion = null;
      }
    } while (duracion === null);
    return duracion;
  }

  toHTML() {
    let html = `<ul>
                  <li>${capitalizeString(this.nombre)}</li>
                  <li class="numero">${Pista.formatearDuracion(this.duracion)}
                  </li>
                </ul>`;

    return html;
  }
}
