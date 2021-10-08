import { getStorage, createStorage, addStorage, updateStorage, cleanStorage } from './storageTimeCount'

const key = "singleCount"
const key2 = "groupCount"
export const save = (data) => {
    if (getStorage(key) == null) {
        createStorage(key)
        data.productionByWorker = countZero(data.productionByWorker)
        addStorage(key, data)
    }
    let pack = getStorage(key)

    for (let i = 0; i < pack.length; i++) {
        if (pack[i].idWorker == data.idWorker) {
            let cantidad = pack[i].productionByWorker[data.index].cant
            cantidad = cantidad + data.value
            pack[i].productionByWorker[data.index].cant = cantidad
            updateStorage(key, pack)
            return pack[i]
        }
    }
    addStorage(key, data)
    return data
}

export const saveGroupCount = (data) => {
    let product = {
        id_prod: null,
        cant: null,
    }
    if (getStorage(key2) == null) {
        createStorage(key2)
        for (let i = 0; i < data.listProduct.length; i++) {
            const element = data.listProduct[i];
            let cantidad = 0
            if (element.id_prod == data.id_prod) {
                cantidad = cantidad + data.value
            }
            product.id_prod = element.id_prod
            product.cant = cantidad
            addStorage(key2, product)
        }
        return getStorage(key2)
    }

    let pack = getStorage(key2)
    let list = data.listProduct
    let size = list.length
    let check = 0
    let arr = []
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < pack.length; i++) {
            if (list[j].id_prod == data.id_prod && pack[i].id_prod == data.id_prod) {

                product.id_prod = pack[i].id_prod
                pack[i].cant = pack[i].cant + data.value
                product.cant = pack[i].cant
                data.listProduct[j] = product
                updateStorage(key2, pack)
                ++check
            } else if (list[j].id_prod == pack[i].id_prod) {
                data.listProduct[j] = pack[i]
            }
        }
    }
    if (check == 0) {
        for (let i = 0; i < data.listProduct.length; i++) {
            const element = data.listProduct[i];
            let cantidad = 0
            if (element.id_prod == data.id_prod) {
                cantidad = cantidad + data.value
            }
            product.id_prod = element.id_prod
            product.cant = cantidad
            data.listProduct[i] = JSON.parse(JSON.stringify(product))
            arr.push(product)
            addStorage(key2, product)
        }
    }
    return data.listProduct
}


export const getSingleCount = (idWorker, listProduct) => {
    let pack = getStorage(key)
    if (pack == null) return
    for (let i = 0; i < pack.length; i++) {
        if (pack[i].idWorker == idWorker) {
            return pack[i]
        }
    }
    for (let i = 0; i < listProduct.length; i++) {
        listProduct[i].cant = 0
    }
    return { productionByWorker: listProduct }
}

export const getGroupCount = (data) => {
    let pack = getStorage(key2)
    if (pack == null) return
    for (let i = 0; i < pack.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (pack[i].id_prod == data[j].id_prod) {
                data[j] = pack[i]
            }
        }
    }

    return data
}



export const deteleSingleCount = () => {
    cleanStorage(key)
    cleanStorage(key2)
}

const countZero = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].cant = 0
    }
    return data
}

