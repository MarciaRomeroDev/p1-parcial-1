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

            const existe = discos.filter(disco => disco.id == id);
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
        return pistas.sort((a, b) => a.nombre.localeCompare(b.nombre)) //ordeno las pistas alfabeticamente;
    }

    // cantidad de pistas del disco

    cantidadPistas(){
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
        return  this.duracionTotalPistas() / this.pistas.length;
    }

    // pista con mayor duracion del disco
    pistaMayorDuracion(){
    
    let mayorPista = this.pistas[0]; 
       for (const pista of this.pistas) {
         if (pista.duracion > mayorPista.duracion){
         mayorPista = pista;
         }
       }
return mayorPista.nombre;

    }

    toHTML() {

        let html = `<div class="card" style="width: 18rem;">`;
        html += `<img src="${this.portada}" class="card-img-top" alt="${this.nombre}">`;
        html += ` <div class="card-body">`;
        html += ` <h5 class="card-title">nombre : ${this.nombre.toLocaleUpperCase()}</h5>`;
        html += `<h5 class="card-title">id: ${this.id}</h5>`;
        html += `<h5 class="card-title">artista: ${capitalizeString(this.artista)}</h5>`
        html += `<h5 class="card-title">cantidad de pistas del disco: ${this.cantidadPistas()}</h5>`
        html += `<h5 class="card-title">duracion total de las pitas : ${Pista.formatearDuracion(this.duracionTotalPistas())}</h5>`
        html += `<h5 class="card-title">Promedio de duracion: ${Pista.formatearDuracion(this.promedioPistas())}</h5>`
        html += `<h5 class="card-title">Pista con mayor duarción: ${this.pistaMayorDuracion()}</h5>`
        html += ` </div>`;
        html += `<ul class="list-group list-group-flush">`;
        html += this.pistas.map(p => p.toHTML()).join("");
        html += `</ul>`;
        html += `</div>`


        return html;
    }
}

/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>*/