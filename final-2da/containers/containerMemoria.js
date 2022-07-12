class containerMemoria {
    constructor(array){
        this.array = array
    }

    save(product) {
        try{        
            this.array.push(product)
        }
        catch(error){
            return `Ocurrio un error: ${error}`
        }
    }

    getAll() {
        try{
            return this.array
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
                this.array = data
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
            this.array = data
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
            this.array = fileContent
        } catch (error) {
            return `Ocurrio un error: ${error}`
        }
    }

    async updatePull(id, dataId){
        try {
            let fileContent = this.getAll()
            const index = fileContent.findIndex(p => p.id == id)
            const index2 = fileContent[index].products.findIndex(p => p.id == dataId)
            fileContent[index].products.splice(index2, 1)
            this.array = fileContent
        } catch (error) {
            return `Ocurrio un error: ${error}`
        }
    }


}

module.exports = containerMemoria
