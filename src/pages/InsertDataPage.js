
import React, { useState } from 'react'

import Guidelines from '../components/Guidelines'
import ProductionDataTable from '../components/ProductionDataTable'
import { insertDataProduction } from '../api/production'
const extracArea = [
    { id_zona_ext: '1', label: 'La Cañada' },
    { id_zona_ext: '2', label: 'Santa Rita' },
    { id_zona_ext: '3', label: 'San Francisco' },
    { id_zona_ext: '4', label: 'Bobure' }
]

const produts = [
    { id_prod: '1', label: 'Jumbo' },
    { id_prod: '2', label: 'Lump' },
    { id_prod: '4', label: 'Claw' },
    { id_prod: '5', label: 'Cocktail' },
    { id_prod: '11', label: 'Cestas/Desc' }
]

export default function InsertDataPage() {
    const [extArea, setExtArea] = useState(null)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [dataTable, setdataTable] = useState([])
    const [box, setBox] = useState({ element: null, i: null })

    const onChange = (property, value) => {
        if (property == "extArea") setExtArea(value)
        if (property == "product") setProduct(value)
        if (property == "quantity") setQuantity(value)
    }

    const inserTable = () => {
        const d = [
            ...dataTable,
            { extArea: extArea, product: product, quantity: quantity }
        ]
        setdataTable(d)
    }

    const handleEdit = (element, index) => {
        const d = dataTable.map((data, i) => (
            i == index
                ? element  
                : data      
        ))
        setdataTable(d)
    }

    const handleDelete = (element, index) => {
        const changedCart = dataTable.filter((product, i) => i !== index)
        setdataTable(changedCart)
    }

    const handleChange = (element, i) => {
        setBox({
            ...box,
            ["element"]: element,
            ["i"]: i
        })

    }

    const sendData = async () => {
        const res = await insertDataProduction({ productionList: dataTable })
        if (res.status != 200) return alert(res.message)
        alert(res.message)

        setExtArea(null)
        setProduct(null)
        setQuantity(null)
        setdataTable([])
        setBox({ element: null, i: null })
    }

    return (
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
            <Guidelines
                onChange={onChange}
                inserTable={inserTable}
                extracArea={extracArea}
                produts={produts}
                sendData={sendData}
            />
            {
                dataTable.length > 0 &&
                <ProductionDataTable
                    data={dataTable}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    extracArea={extracArea}
                    produts={produts}
                    handleChange={handleChange}
                    box={box}
                />
            }

        </div>
    )
}