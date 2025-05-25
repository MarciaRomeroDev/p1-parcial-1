class Disco {
  constructor(nombre, artista, id, portada, pistas = []) {
    this.nombre = nombre;
    this.artista = artista;
    this.id = id;
    this.portada = portada;
    this.pistas = pistas;
  }

  static pedirNombre() {
    return validarString("Ingrese el nombre del disco");
  }

  static pedirArtista() {
    return validarString("Ingrese el nombre del artista o grupo");
  }

  static pedirId() {
    let id;
    do {
      id = validarNum("Ingrese un ID entre 1 y 999");

      if (id < 1 || id > 999) {
        alert("El ID debe estar entre 1 y 999");
        id = null;
        continue;
      }
      //validamos que el ID ingresado no exista en el array de discos

      const existe = discos.filter((disco) => disco.id == id);
      if (existe.length > 0) {
        alert("El ID ya existe. Ingrese uno nuevo");
        id = null;
      }
    } while (id === null);

    return id;
  }

  static pedirPortada() {
    return validarURL("Ingrese la URL de la imagen del disco");
  }

  static pedirPistas() {
    const pistas = [];
    let agregarMas;

    do {
      const nombre = Pista.pedirPista();
      const duracion = Pista.pedirDuracion();

      pistas.push(new Pista(nombre, duracion));
      agregarMas = confirm("¿Desea agregar otra pista?");
    } while (agregarMas);
    return pistas.sort((a, b) => a.nombre.localeCompare(b.nombre)); //ordeno las pistas alfabeticamente;
  }

  // cantidad de pistas del disco

  cantidadPistas() {
    return this.pistas.length;
  }

  // duracion total de las pistas
  duracionTotalPistas() {
    let duracionTotal = 0;

    for (const pista of this.pistas) {
      duracionTotal += pista.duracion;
    }
    return duracionTotal;
  }

  // promedio de duracion de  las pistas
  promedioPistas() {
    return this.duracionTotalPistas() / this.pistas.length;
  }

  // pista con mayor duracion del disco
  pistaMayorDuracion() {
    let mayorPista = this.pistas[0];
    for (const pista of this.pistas) {
      if (pista.duracion > mayorPista.duracion) {
        mayorPista = pista;
      }
    }
    return mayorPista.nombre;
  }

  toHTML() {
    let html = `<figure>
              <div class="info">
                <h3>${this.nombre.toLocaleUpperCase()}</h3>
                <p>ID: <span class="numero">${this.id}</span></p>
              </div>
              <div class="contenido-card">
                <img src="${this.portada}" alt="${this.nombre}" />

                <figcaption>
                  <h4>Inofrmación Adicional</h4>
                  <ul>
                    <li>Artista: <span>${capitalizeString(this.artista)}</span></li>
                    <li>Cantidad de pistas <span class="numero">${this.cantidadPistas()}</span></li>
                    <li>
                    <li>
                      Durción total del disco
                      <span class="numero">${Pista.formatearDuracion(this.duracionTotalPistas())}</span>
                    </li>
                    <li>
                      Promedio de duración: <span class="numero">${Pista.formatearDuracion(this.promedioPistas())}</span>
                    </li>
                    <li>
                      Pista con mayor duración:
                      <span class="resaltar">${this.pistaMayorDuracion()}</span>
                    </li>
                  </ul>
                </figcaption>
              </div>
            </figure>
            

        
            
    <div class="pistas">
      <h4>Pistas</h4>
      <div class="contenedor-pistas">
        ${this.pistas.map(p => p.toHTML()).join("")}
      </div>
    </div>`;
    return html;
  }
}


