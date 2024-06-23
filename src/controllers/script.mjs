import Estado from "../models/Estado.mjs"
import Grafo from "../models/Grafo.mjs"

const grafo = new Grafo()

let add = document.getElementById("agregar")
let edge = document.getElementById("edge")
let dfs = document.getElementById("dfs")
let rutaCorta = document.getElementById("rutaCorta")
let salidaFinal = document.getElementById("salidaDfs")

add.addEventListener("click", () => {
    let nombre = document.getElementById("name").value

    let estado = new Estado(nombre)

    let verificado = grafo.add(estado)

    if (verificado) {
        alert("Agregado con éxito")
    } else {
        alert("Fallo al agregar")
    }
})

edge.addEventListener("click", () => {
    let inicio = document.getElementById("estado1").value
    let destino = document.getElementById("estado2").value
    let distancia = document.getElementById("distancia").value

    let verificadoAux = grafo.agregarConexion(inicio, destino, distancia)
    if (verificadoAux) {
        alert("Conectado con éxito")
    } else {
        alert("Fallo al conectar")
    }
})

dfs.addEventListener("click", () => {
    let salida = ""

    grafo.busquedaProfundidad((estado) => {
        if (salida !== "") {
            salida += " -> "
        }
        salida += estado.name
    })
    salidaFinal.value = salida
})

rutaCorta.addEventListener("click", () => {
    let origen = document.getElementById("origen").value
    let destino = document.getElementById("destino").value
    let resultado = document.getElementById("resultado")

    grafo.dijkstra(origen, destino, (ruta)=>{
        resultado.value = ruta
    })
})