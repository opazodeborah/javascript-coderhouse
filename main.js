//Clase Artefacto

class Artefacto {
	constructor(nombre, consumo) {
		this.id = i++;
		this.nombre = nombre;
		this.consumo = consumo;
	}

}


let cantidadDiasPeriodo = 0;
let i = 1;
let totalConsumos = 0;
console.log(totalConsumos);

let arrayArtefactos = [];
const artefactosEliminados = [];
let almacenados = JSON.parse(localStorage.getItem('Artefacto'));
console.log(arrayArtefactos);
console.log(almacenados);

// Funcion para cargar datos en almacenados en localStorage
function almacenarHistorial() {
	if (almacenados != undefined && almacenados.length < 1) {
		console.log(almacenados);
	}
	if (almacenados?.length >= 1) {
		arrayArtefactos = almacenados;
		console.log(arrayArtefactos);
		i = (1 + almacenados.length);
		mostrarInfoArtefactoslocalstorage();

	}
}

almacenarHistorial();



// Funcion para guardar datos de artefactos en localStorage
function guardarEnlocalStorage() {
	localStorage.setItem("Artefacto", JSON.stringify(arrayArtefactos));
}

// Funcion para guardar datos de artefactos eliminados en localStorage
function guardarEnlocalStorageEliminado() {
	localStorage.setItem("ArtefactosEliminados", JSON.stringify(artefactosEliminados));
}


const total = document.getElementById("total");
const subsidio = document.getElementById("subsidio");

function calcularTotal() {
	let totalConsumo = arrayArtefactos.reduce((acumulador, Artefacto) => acumulador + (Artefacto.consumo * cantidadDiasPeriodo), 0);
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
function altaDeArtefacto() {
	const formulario = document.getElementById("formulario");


	formulario.addEventListener("submit", (e) => {
		//Evito el comportamiento por default del formulario. 
		e.preventDefault();

		const nombre = document.getElementById("listado");
		const consumo = document.getElementById("consumo");

		console.log("Formulario Enviado");

		//Creamos un objeto Artefacto: 
		const artefacto = new Artefacto(nombre.value, +consumo.value);
		arrayArtefactos.push(artefacto);
		console.log(totalConsumos.value);
		//  Guardo en el localStorage
		guardarEnlocalStorage();
		//Verificamos por consola:
		console.log(arrayArtefactos);

		//Reseteamos el formulario: 
		formulario.reset();
		mostrarInfoArtefactos();
		totalkilowatts();
		calcularTotal();
		Swal.fire({
			title: "Electrodoméstico cargado",
			icon: "success",
			confirmButtonText: "Aceptar",
			confirmButtonColor: "#B7950B",
			background: "#FDEBD0",
		})
	})
}

altaDeArtefacto();


// Funcion para mostrar la informacion del array de artefactos en la grilla

function mostrarInfoArtefactos() {
	const formulario = document.getElementById("formulario");
	const artefactoTabla = document.getElementById("InfoArtefactos");
	//creamos la tabla y el tbody
	const tabla = document.createElement("table");
	tabla.className = "table table-striped";
	const tablaBody = document.createElement("tbody");
	tabla.innerHTML += `
		<thead>
		<tr>
		  <th scope="col">#id</th>
		  <th scope="col">Nombre</th>
		  <th scope="col">Consumo</th>
		</tr>
	  </thead>
	  `;
	artefactoTabla.innerHTML = "";

	//recorro el array de Artefacto
	for (const artefacto of arrayArtefactos) {
		tablaBody.innerHTML += `
				<tr>
					<td>${artefacto.id}</td>
					<td>${artefacto.nombre}</td>
					<td>${artefacto.consumo}</td>				
				</tr>
			`;
	}

	tabla.append(tablaBody);
	artefactoTabla.append(tabla);
	formulario.reset();
	totalkilowatts();
	calcularTotal();
}

// Funcion para moostrar la informacion almacenada en localStorage al cargar la pagina 
function mostrarInfoArtefactoslocalstorage() {
	const formulario = document.getElementById("formulario");
	const artefactoTabla = document.getElementById("InfoArtefactos");
	//creamos la tabla y el tbody
	const tabla = document.createElement("table");
	tabla.className = "table table-striped";
	const tablaBody = document.createElement("tbody");
	tabla.innerHTML += `
			<thead>
			<tr>
			  <th scope="col">#id</th>
			  <th scope="col">Nombre</th>
			  <th scope="col">Consumo</th>
			</tr>
		  </thead>
		  `;
	artefactoTabla.innerHTML = "";

	//recorro el array de Artefacto
	for (const artefacto of arrayArtefactos) {
		tablaBody.innerHTML += `
					<tr>
						<td>${artefacto.id}</td>
						<td>${artefacto.nombre}</td>
						<td>${artefacto.consumo}</td>				
					</tr>
				`;
	}

	tabla.append(tablaBody);
	artefactoTabla.append(tabla);
	formulario.reset();
}


// Funcion para calcular el total de kilowatts y mostrar frase.
function totalkilowatts() {
	let totalkilowatts = arrayArtefactos.reduce((acumulador, Artefacto) => acumulador + (Artefacto.consumo * cantidadDiasPeriodo), 0);
	total.innerHTML = `El saldo Total de todos los kilowatts es de ${totalkilowatts}, para el periodo de ${cantidadDiasPeriodo} dias
		<br>`;
}

// Funcion para ordenar grilla de menor a mayor
function ordenarConsumoMenorMayor() {
	arrayArtefactos.sort((a, b) => a.consumo - b.consumo);
	mostrarInfoArtefactos();
}

// Funcion para ordenar grilla de mayor a menor
function ordenarConsumoMayorMenor() {
	arrayArtefactos.sort((a, b) => b.consumo - a.consumo);
	mostrarInfoArtefactos();
}


//Eliminar un Artefacto:
function eliminarArtefacto() {
	const formularioEliminarArtefacto = document.getElementById("formularioEliminarArtefacto");
	const formularioOriginal = formularioEliminarArtefacto.innerHTML
	formularioEliminarArtefacto.addEventListener("submit", (e) => {
		//Evito el comportamiento por default del formulario. 
		e.preventDefault();

		const ideliminar = parseInt(document.getElementById("ideliminar").value);
		const artefactoAeliminar = arrayArtefactos.find(artefactoAeliminar => artefactoAeliminar.id === ideliminar);
		const indice = arrayArtefactos.indexOf(artefactoAeliminar);
		if (indice > -1) {
			arrayArtefactos.splice(indice, 1);
			artefactosEliminados.push(artefactoAeliminar);

			//  Guardo en el localStorage
			guardarEnlocalStorage();
			guardarEnlocalStorageEliminado();
			//Verificamos por consola:
			console.log(arrayArtefactos);

			//Reseteamos el formulario: 
			formulario.reset();
			formularioEliminarArtefacto.innerHTML = '';
			formularioEliminarArtefacto.innerHTML = formularioOriginal;
			formularioEliminarArtefacto.reset();
			mostrarInfoArtefactos();
			Swal.fire({
				title: "Electrodoméstico eliminado",
				icon: "warning",
				confirmButtonText: "Aceptar",
				confirmButtonColor: "#B7950B",
				background: "#FDEBD0",
				dangerMode: true,
			})
		}
		if (indice <= -1) {

			Toastify({
				text: "Electrodoméstico no encontrado",
				duration: 1000,
				gravity: "bottom",
				position: "right",
				style:
				{
					background: "RED",
				}
			}).showToast();
		}
		calcularTotal();
		totalkilowatts();
	})

}

eliminarArtefacto()

//Periodo de Dias

function agregarPeriodo() {
	const agregarPeriodo = document.getElementById("agregarPeriodo");
	agregarPeriodo.addEventListener("submit", (e) => {
		//Evito el comportamiento por default del formulario. 
		e.preventDefault();

		const agregarPeriodo = parseInt(document.getElementById("periodo").value);
		cantidadDiasPeriodo = agregarPeriodo;
		console.log(cantidadDiasPeriodo);
		console.log(arrayArtefactos);
		calcularTotal();
		totalkilowatts();
		mostrarInfoArtefactos();
		Toastify({
			text: "Periodo Confirmado",
			duration: 1000,
			gravity: "bottom",
			position: "right",
			style:
			{
				background: "Green",
			}
		}).showToast();


	})

}

agregarPeriodo()

// Funcion para eliminar todos los artefactos
function eliminarHistorial() {
	arrayArtefactos = [];
	localStorage.clear();
	mostrarInfoArtefactos();
}


// Trabajamos json para simular la obtencion de datos desde una api

const listado = document.getElementById("listado");
const listadoArtefactos = "json/artefactos.json";

fetch(listadoArtefactos)
	.then(respuesta => respuesta.json())
	.then(datos => {
		datos.forEach(artefacto => {
			listado.innerHTML += `
			<option>${artefacto.nombre}</option>
                `
		})
	})
	.catch(error => console.log(error))
	.finally(() => console.log("Proceso Finalizado"))