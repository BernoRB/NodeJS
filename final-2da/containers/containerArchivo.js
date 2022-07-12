const fs = require('fs')
const path = require('path')

class containerArchivo {
    constructor(file){
        this.file = path.join(__dirname, '..', 'dataFiles', `${file}.json`)
    }

    save(content) {
        let fileContent = this.getAll()
        fileContent.push(content)
        this.saveInFile(fileContent)
    }

    getAll() {
        try{
            const info = fs.readFileSync(this.file, 'utf-8')
            const data = JSON.parse(info)
            return data.map(p => p);
        }
        catch(error){
            return `Ocurrio un error: ${error}`
        }
    }

    async getById(id){
        try{
            const data = await this.getAll()
            const datum = data.find(p => p.id == id)
            if(datum)
                return datum
            throw new Error('No existe un producto con ese ID')    
        }
        catch(error){
            return `Ocurrio un error: "${error.message}"`
        }
    }

    async delete(id){
        try{
            const data = await this.getAll()
            const index = data.findIndex(p => {return p.id == id;})

            if (index > -1){
                data.splice(index, 1)
                await this.saveInFile(data)
            }
        }
        catch(error){
            return `Ocurrio un error: ${error}`
        }
    }

    async update(datum, id){
        try{
            const data = await this.getAll()
            const index = data.findIndex(p => p.id == id)
            datum.id = id
            data[index] = datum
            await this.saveInFile(data)
        }
        catch(error){
            return `Ocurrio un error: ${error}`
        }
    }

    async updatePush(data, id, field){
        try {
            let fileContent = this.getAll()
            const index = fileContent.findIndex(p => p.id == id)
            fileContent[index].products.push(data)
            this.saveInFile(fileContent)
        } catch (error) {
            return `Ocurrio un error: ${error}`
        }
    }

    async updatePull(id, dataId){
        try {
            let fileContent = this.getAll()
            const index = fileContent.findIndex(p => p.id == id)
            fileContent[index].products.splice(dataId, 1)
            this.saveInFile(fileContent)
        } catch (error) {
            return `Ocurrio un error: ${error}`
        }
    }


    async saveInFile(content){
        try {
            fs.writeFile(this.file, JSON.stringify(content), (err) => {
                if (err) throw err
                console.log('Archivo productos guardado correctamente')
            })
        } catch (error) {
            return `Ocurrio un error: ${error}`
        }
    }

}

module.exports = containerArchivo
