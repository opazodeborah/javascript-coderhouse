	function consola(frase) {

        console.log(frase);
        alert(frase);

	}

	//Clase Artefacto

class Artefacto {
    constructor(nombre, consumo) {
		this.id = i++;
        this.nombre = nombre;
        this.consumo = consumo;
		this.consumoPorPeriodo = consumo*cantidadDiasPeriodo;

    }
}

	let cantidadDiasPeriodo = 0;
	let i = 1;
	let totalConsumos = 0;
	console.log(totalConsumos);

	const arrayArtefactos = [];
	const artefactosEliminados = [];
/*
	function altaArtefacto() {
		let nombre = prompt( `Ingrese el nombre del Artefacto N°${i}: `);
		let consumo = parseInt(prompt(`Ingresá la cantidad de Consumo en kilowatts diario para ${nombre}`));
		totalConsumos = totalConsumos + consumo;
		let nuevoArtefacto = new Artefacto(nombre, consumo);
		arrayArtefactos.push(nuevoArtefacto);
	}
*/
	function guardarEnLocalStorage(){
		localStorage.setItem("Artefacto", JSON.stringify(arrayArtefactos));
	}

	function guardarEnLocalStorageEliminado(){
		localStorage.setItem("ArtefactosEliminados", JSON.stringify(artefactosEliminados));
	}


	const total = document.getElementById("total");
	const subsidio = document.getElementById("subsidio");

	function calcularTotal() {
	let totalConsumo = arrayArtefactos.reduce((acumulador, Artefacto) => acumulador + (Artefacto.consumo*cantidadDiasPeriodo), 0);
	arrayArtefactos.forEach((artefacto) => {
		totalConsumo += artefacto.consumo;
	});

	if (totalConsumo < 400) {

		subsidio.innerHTML = `Consumiste menos del tope de 400 kilowatts hora (kWh). Obtendrás el subsidio.`;
	}

	if (totalConsumo >= 400) {

		subsidio.innerHTML = `Superaste el tope de 400 kilowatts establecido por el gobierno. Dejarás de recibir el subsidio.`;

	}

	if (totalConsumo = isNaN(totalConsumo)) {
		subsidio.innerHTML = `Agrega artefactos para verificar si recibes el subsidio`;
	}
	console.log(totalConsumo);
}

//Función para dar de alta un Artefacto:
function altaDeArtefacto(){
	const formulario = document.getElementById("formulario");
	
	
	formulario.addEventListener("submit", (e) => {
		//Evito el comportamiento por default del formulario. 
		e.preventDefault();
	
		const nombre = document.getElementById("nombre");
		const consumo = document.getElementById("consumo");

		console.log("Formulario Enviado");
	
		//Creamos un objeto Artefacto: 
		const artefacto = new Artefacto(nombre.value, +consumo.value);
		arrayArtefactos.push(artefacto);
		console.log(totalConsumos.value);
		//  Guardo en el localstorage
		guardarEnLocalStorage();
		//Verificamos por consola:
		console.log(arrayArtefactos);
	
		//Reseteamos el formulario: 
		formulario.reset();
		mostrarInfoArtefactos();
		totalkilowatts();
		calcularTotal();
	})
	}



	function mostrarInfoArtefactos() {

 
		const artefactoTabla = document.getElementById("InfoArtefactos");
		//creamos la tabla y el tbody
		const tabla = document.createElement("table");
		tabla.className="table table-striped";
		const tablaBody = document.createElement("tbody");
		tabla.innerHTML += `
		<thead>
		<tr>
		  <th scope="col">#id</th>
		  <th scope="col">Nombre</th>
		  <th scope="col">Consumo</th>
		  <th scope="col">Consumo por Periodo</th>
		</tr>
	  </thead>
	  `;
		artefactoTabla.innerHTML = "";
		
		//recorro el array de Artefacto

		for(const artefacto of arrayArtefactos){
			tablaBody.innerHTML += `
				<tr>
					<td>${artefacto.id}</td>
					<td>${artefacto.nombre}</td>
					<td>${artefacto.consumo}</td>
					<td>${artefacto.consumoPorPeriodo}</td>					
				</tr>
			`;
		}
		
		tabla.append(tablaBody);
		artefactoTabla.append(tabla);
		}

	mostrarInfoArtefactos()

	
	altaDeArtefacto()


	function totalkilowatts() {
		let totalkilowatts = arrayArtefactos.reduce((acumulador, Artefacto) => acumulador + (Artefacto.consumo*cantidadDiasPeriodo), 0);
		total.innerHTML = `El saldo Total de todos los kilowatts es de ${totalkilowatts}, para el periodo de ${cantidadDiasPeriodo} dias
		<br>`;
	}


	function ordenarConsumoMenorMayor (){
		arrayArtefactos.sort( (a,b) => a.consumo - b.consumo);
		mostrarInfoArtefactos();
	}
	
	function ordenarConsumoMayorMenor (){
		arrayArtefactos.sort( (a,b) => b.consumo - a.consumo);
		mostrarInfoArtefactos();
	}


	//Eliminar un Artefacto:
function eliminarArtefacto(){
	const formularioEliminarArtefacto = document.getElementById("formularioEliminarArtefacto");
	const formularioOriginal = formularioEliminarArtefacto.innerHTML
	formularioEliminarArtefacto.addEventListener("submit", (e) => {
		//Evito el comportamiento por default del formulario. 
		e.preventDefault();
	
		const ideliminar = parseInt(document.getElementById("ideliminar").value);
		const artefactoAeliminar = arrayArtefactos.find(artefactoAeliminar => artefactoAeliminar.id === ideliminar);
		const indice = arrayArtefactos.indexOf(artefactoAeliminar);
		if (indice > -1){
		arrayArtefactos.splice(indice, 1);
		artefactosEliminados.push(artefactoAeliminar);
	
		//  Guardo en el localstorage
		guardarEnLocalStorage();
		guardarEnLocalStorageEliminado();
		//Verificamos por consola:
		console.log(arrayArtefactos);
	
		//Reseteamos el formulario: 
		formulario.reset();
		formularioEliminarArtefacto.innerHTML = '';
		formularioEliminarArtefacto.innerHTML = formularioOriginal;
		formularioEliminarArtefacto.reset();
		mostrarInfoArtefactos();
		}
		if (indice <= -1){
	
			formularioEliminarArtefacto.innerHTML += `<li>Artefacto no encontrado</li>`
		}
	calcularTotal();
	totalkilowatts();
	})
	
	}

	eliminarArtefacto()

	//Periodo de Dias

	function agregarPeriodo(){
		const agregarPeriodo = document.getElementById("agregarPeriodo");
		agregarPeriodo.addEventListener("submit", (e) => {
			//Evito el comportamiento por default del formulario. 
			e.preventDefault();
		
			const agregarPeriodo = parseInt(document.getElementById("periodo").value);
			cantidadDiasPeriodo = agregarPeriodo;
			console.log(cantidadDiasPeriodo)
			
		})
		
		}

	agregarPeriodo()