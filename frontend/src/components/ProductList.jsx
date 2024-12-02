import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Row, Modal, Form } from 'react-bootstrap';
import Forma from './Form';
import store from '../stores/store';
import { observer } from "mobx-react";
import edit from './../assets/edit.png';
import close from "./../assets/close.svg";

const ProductList = observer(() => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3006/product/load')
      .then(res => {
        console.log(res.data)
        store.setCards(res.data)
      });
  }, []);

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:3006/product/delete/${productId}`)
      .then(() => {
        store.removeCard(productId);
      })
      .catch(error => {
        console.error("Ошибка при удалении продукта:", error);
      });
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditDescription(product.description);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const updatedProduct = {
      ...editedProduct,
      name: editName,
      price: editPrice,
      description: editDescription
    };

    axios.put(`http://localhost:3006/product/update/${editedProduct._id}`, updatedProduct)
      .then(() => {
        store.updateCard(updatedProduct);
        setShowEditModal(false);
      })
      .catch(error => {
        console.error("Ошибка при обновлении продукта:", error);
      });
  };

  return (
    <div id='product_list' className="container mt-4">
      <Row>
        {store.products.map((product, i) => (
          <Col key={i} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={`http://localhost:3006/product/${product.picture}`}
                style={{ objectFit: 'cover', height: '200px', borderRadius: '10px' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.price} ₽
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" className="mr-2">В корзину</Button>
                <div className='d-flex gap-2 justify-content-center mt-3'><Button variant="warning" className="mr-2" onClick={() => handleEdit(product)}><img src={edit} width={18}/></Button>
                <Button variant="danger" onClick={() => handleDelete(product._id)}><img src={close} width={18}/></Button></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col sm={12} md={6} lg={4} className="mb-4">
          <Card className="h-100" style={{ minWidth: "232px", minHeight: "448px" }}>
            <Card.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Forma />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Название товара</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="editPrice">
              <Form.Label>Цена в рублях</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите цену"
                value={editPrice}
                onChange={e => setEditPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="editDescription">
              <Form.Label>Описание товара</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary w-100" onClick={handleUpdate}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default ProductList;