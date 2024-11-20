import { useState } from "react";
import { postCard } from "../services/service";
import store from "../stores/store";
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';

const Forma = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const sendFile = async (event) => {
    event.preventDefault();

    if (!name || price <= 0 || !description || files.length <= 0) return;

    const cardData = { name, price, description };
    
    postCard(cardData, files);

    setName('');
    setPrice('');
    setDescription('');

    setFiles([]);
    document.querySelector("form input[type=file]").value = null;

    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>

      <Button
        variant="primary"
        style={{ borderRadius: "25%", padding: "15px 20px" }}
        onClick={handleShow}
      >
        +
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton/>
        <Modal.Body>
          <Form onSubmit={sendFile} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <Form.Group controlId="formName">
              <Form.Label>Название товара *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Цена в рублях *</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите цену"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Описание товара *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile">
              <Form.Label>Загрузить изображение *</Form.Label>
              <Form.Control
                type="file"
                onChange={e => setFiles(e.target.files)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Отправить ➡
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Forma;
