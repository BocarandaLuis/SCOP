import React from 'react'
import {
  Button,
  Modal,
  Form,
  Card,
  Col,
  Container,
  Row,
  FormControl,
  InputGroup,
  Table
} from 'react-bootstrap'

import TableDataWeighingReport from '../TableDataWeighingReport'

export default function ModalDataTableWeighing(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mh-100"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reporte pagos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TableDataWeighingReport
          data={props.data}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}