import { useState, useEffect } from "react";
import axios from "axios";
import store from "../stores/store";
import { Form, Button, Col, Row, Modal, Dropdown } from 'react-bootstrap';

const Forma = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3006/category/load')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке категорий:", error);
      });
  }, []);

  const sendFile = async (event) => {
    event.preventDefault();

    if (!name || price <= 0 || !description || files.length <= 0 || !categoryId) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('picture', files[0]);

    try {
      const response = await axios.post(`http://localhost:3006/product/create/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      store.addCard(response.data);

      setName('');
      setPrice('');
      setDescription('');
      setCategoryId('');
      setFiles([]);
      document.querySelector("form input[type=file]").value = null;

      setShowModal(false);
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
    }
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
        <Modal.Header closeButton />
        <Modal.Body>
          <Form onSubmit={sendFile} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <Form.Group controlId="formCategoryId">
              <Form.Label>Выберите категорию *</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="dark w-100" id="dropdown-basic">
                  {categoryId ? categories.find(cat => cat._id === categoryId).name : 'Выберите категорию'}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  {categories.map(category => (
                    <Dropdown.Item key={category._id} onClick={() => setCategoryId(category._id)}>
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

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