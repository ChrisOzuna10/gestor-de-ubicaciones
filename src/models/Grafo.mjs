import Node from "./Node.mjs";

export default class Grafo {
  #head
  #count
  adjacencyMatrix
  constructor() {
    this.#head = null
    this.#count = 0
    this.adjacencyMatrix = []
  }
  add(value) {
    this.adjacencyMatrix.push(new Array(this.adjacencyMatrix.length + 1).fill(0))
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      this.adjacencyMatrix[i].push(0)
    }
    let node = new Node(value)
    if (this.#head == null) {
      this.#head = node

    } else {
      let current = this.#head
      while (current.next != null) {
        current = current.next
      }
      current.next = node;
    }
    this.#count++
    return true
  }
  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return null
  }
  agregarConexion(inicio, final, distancia) {
    if (inicio >= 0 && inicio < this.adjacencyMatrix.length && final >= 0 && final < this.adjacencyMatrix.length) {
      this.adjacencyMatrix[inicio][final] = distancia
      this.adjacencyMatrix[final][inicio] = distancia
      return true
    }
    return false
  }
  size() {
    return this.#count
  }

  busquedaProfundidad(metodo) {
    if (this.adjacencyMatrix.size == 0) {
      alert("No hay elementos")
    }
    const visitados = new Array(this.adjacencyMatrix.length).fill(false)
    const pila = [0]

    while (pila.length) {
      const indice = pila.pop()
      if (!visitados[indice]) {
        visitados[indice] = true
        const nodo = this.getElementAt(indice)
        metodo(nodo.value)

        for (const vecino of this.getVecinos(indice)) {
          if (!visitados[vecino]) {
            pila.push(vecino)
          }
        }
      }
    }
  }

  getVecinos(indice) {
    const vecinos = []
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      if (this.adjacencyMatrix[indice][i] !== 0) {
        vecinos.push(i)
      }
    }
    return vecinos
  }
  dijkstra(inicio, destino, callback) {
    let L = [];
    let V = structuredClone(this.adjacencyMatrix);
    let Lprima = [...Array(this.adjacencyMatrix.length).keys()];
    let D = new Array(this.adjacencyMatrix.length).fill(99999);
    let previous = new Array(this.adjacencyMatrix.length).fill(null);

    D[inicio] = 0;

    while (Lprima.length > 0) {
      let minIndex = -1;
      let minDistance = 99999;

      for (let i = 0; i < Lprima.length; i++) {
        if (D[Lprima[i]] < minDistance) {
          minDistance = D[Lprima[i]];
          minIndex = i;
        }
      }

      let u = Lprima[minIndex];
      L.push(u);
      Lprima.splice(minIndex, 1);

      for (let j = 0; j < this.adjacencyMatrix.length; j++) {
        if (V[u][j] !== 0) {
          if (D[j] > D[u] + parseInt(V[u][j])) {
            D[j] = D[u] + parseInt(V[u][j]);
            previous[j] = u;
          }
        }
      }
    }
    let ruta = [];
    let verticeActual = destino;
    while (verticeActual !== null) {
      ruta.unshift(this.getElementAt(verticeActual).value.name);
      verticeActual = previous[verticeActual];
    }

    let resultado = `La distancia de "${ruta[0]}" a "${ruta[ruta.length - 1]}" es de: ${D[destino]}KM.\nLa ruta más corta es: ${ruta.join(" -> ")}`;

    callback(resultado)
  }
}