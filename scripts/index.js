

let discos = [];

fetch("discos.json")
  .then((response) => response.json())
  .then((json) => {
    discos = json.map(disco => {
      const pistas = disco.pistas.map(
        (pistas) => new Pista(pistas.nombre, pistas.duracion)
      );
      return new Disco(
        disco.nombre,
        disco.artista,
        disco.id,
        disco.portada,
        pistas.sort((a, b) => a.nombre.localeCompare(b.nombre)) //ordeno las pistas alfabeticamente
      );
    });
    discos.sort((primerDisco, ultimoDisco) => primerDisco.id - ultimoDisco.id); //ordeno los discos  de manera acendente 

  });

function mostrarDiscos() {

    // Mostrar en la parte superior la canctidad total de discos y el disco con mayor duracion
  let discoConMayorDuracion = discos[0];
  let duracionMaxima = discos[0].duracionTotalPistas();

  for (let i = 1; i < discos.length; i++) {
    const duracionActual = discos[i].duracionTotalPistas();
    if (duracionActual > duracionMaxima) {
      duracionMaxima = duracionActual;
      discoConMayorDuracion = discos[i];
    }

    const info = document.querySelector("#informacion");
    info.innerHTML = ` <h2>Mis Discos</h2>
     <ul>
              <li>Cantidad de discos: <span class="numero"> ${discos.length}</span></li>
              <li>
                Disco de mayor duración: <span class="resaltar">${discoConMayorDuracion.nombre}</span>
              </li>
              <li>Duración: <span class="numero">${Pista.formatearDuracion(duracionMaxima)}</span></li>
    </ul>`;
  const divBiblioteca = document.querySelector("#discos");
  divBiblioteca.innerHTML = "";
  discos.forEach((disco) => (divBiblioteca.innerHTML += disco.toHTML()));


  }

}

function cargarNuevoDisco() {

  const nombre = Disco.pedirNombre();
  const artista = Disco.pedirArtista();
  const id = Disco.pedirId();
  const portada = Disco.pedirPortada();
  const pistas = Disco.pedirPistas();

  const nuevoDisco = (new Disco(nombre, artista, id, portada, pistas));
  discos.push(nuevoDisco);
  discos.sort((x, y) => x.id - y.id);

  alert(`El disco ${nombre.toLocaleUpperCase()} fue agregado con exito`)
  mostrarDiscos();

}

function buscarDisco() {
  const dato = validarPromp("Ingrese el ID o nombre del disco");

  const discoEncontrado = discos.find(disco =>
    disco.id == dato || disco.nombre.toLowerCase() === dato.toLowerCase()
  );

  if (discoEncontrado) {
    const divBiblioteca = document.querySelector("#discos");
    divBiblioteca.innerHTML = discoEncontrado.toHTML();
  } else {
    alert("El disco no existe");
  }
}

