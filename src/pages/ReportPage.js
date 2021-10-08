import React, { useState } from 'react'
import ReportCard from '../components/ReportCard'
import { getReportWorkerProduction } from '../api/reportWorker'
import ModalDataTableReport from '../components/modals/ModalDataTableReport'

const initial = {
    date: "",
    time: "",
    select: ""
}

export default function ReportPage() {
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
        const res = await getReportWorkerProduction()
        if (res.status != 200) return alert(res.message)
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

            <ModalDataTableReport
                data={report}
                show={modalShow}
                onHide={handleHiddenModal}
            />
        </div>
    )
}


