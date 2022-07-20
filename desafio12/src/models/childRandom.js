function randomGenerator (cant) {
    // Genero un array lleno de ceros del tamano pasado
    // Si sale un 5, se va a sumar un numero en la posicion 5
    // Luego el valor de numbers[i] es la cantidad de veces que salio ese numero 'i'
    let numbers = new Array(1001).fill(0)
    for (let i = 0; i < cant; i++) {
        let number = Math.floor(Math.random() * 1000) + 1
        numbers[number]++
    }

    let objNumbers = {}
    for(let i = 1; i <= cant; i++) {
        objNumbers[i] = numbers[i]
    }

    return objNumbers
}

process.on('message', (cant) => {
    process.send(randomGenerator(cant))
} )