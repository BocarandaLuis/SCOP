import React, { useState } from 'react'
import ReportCard from '../components/ReportCard'
import { getPayment } from '../api/payment'
import ModalDataTablePayment from '../components/modals/ModalDataTablePayment'

import {
    Button,
    Modal
} from 'react-bootstrap'

const initial = {
    date: "",
    time: "",
    select: ""
}

export default function ReportPaymentPage() {
    const [data, setData] = useState(initial)
    const [modalShow, setModalShow] = useState(false);
    const [report, setReport] = useState(null)

    const handleChange = (property, value) => {
        let v = value
        if (property == "date" || property == "time") v = value.target.value
        if (property == "select") v = value.value
        setData({
            ...data,
            [property]: v,
        });
    }

    const handleReport = async () => {
        const res = await getPayment(data)
        if (res.status != 200) { alert(res.message); return }
        setReport(res.body)
        setModalShow(true)
    }

    const handleHiddenModal = () => {
        setModalShow(false)
    }

    return (
        <div className=" container card-repor-container d-flex justify-content-center align-items-center">
            <ReportCard
                onChange={handleChange}
                onClick={handleReport}
            />

            <ModalDataTablePayment
                data={report}
                show={modalShow}
                onHide={handleHiddenModal}
            />
        </div>
    )
}


