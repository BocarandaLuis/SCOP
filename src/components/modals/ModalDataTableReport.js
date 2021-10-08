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

import TableReport from './TableReport'

export default function ModalDataTableReport(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reporte general de producción de obreros
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TableReport
          data={props.data}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}