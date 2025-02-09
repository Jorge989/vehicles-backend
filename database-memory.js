import {randomUUID} from "node:crypto"
export class DataBaseMemory {
    #vehicles = new Map()

    list() {
        return Array.from(this.#vehicles.entries()).map((vehiclesArray) => {
            const id = vehiclesArray[0]
            const data = vehiclesArray[1]
            return {
                id, ...data
            }
        })
    }

    create(vehicles) {
       const vehiclesId = randomUUID()

       this.#vehicles.set(vehiclesId, vehicles)
    }

    update(id, vehicles) {
        this.#vehicles.set(id, vehicles)
    }

    delete(id, vehicles) {
        this.#vehicles.set(id, vehicles)
    }
}

