import {
    Button,
    Form,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'

import TallyBoardsList from './TallyBoardsList'

export default function CountBoard(data) {
    return (
        <>
            <Row className="d-flex justify-content-center" xs={1} md={3}>
                {data.production.map((value, index) => {
                    return (
                        <Col key={index}>
                            <TallyBoardsList
                                index={index}
                                board={value}
                                count={data.count}
                                singleCount={data.singleCount?.productionByWorker?.length > 0 ? data.singleCount.productionByWorker[index] : null}
                                handleShow={data.handleShow}
                                groupCount={data.groupCount.length > 0 ? data.groupCount[index] : null}
                            />
                        </Col>
                    )
                })}
            </Row>

        </>
    )
}

