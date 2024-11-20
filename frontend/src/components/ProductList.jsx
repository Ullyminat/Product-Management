import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Row } from 'react-bootstrap';
import Forma from './Form';
import store from '../stores/store';
import { observer } from "mobx-react"

const ProductList = observer(() => {
  useEffect(() => {
        axios.get('http://localhost:3006/product/load')
        .then(res=>{
          console.log(res.data)
          store.setCards(res.data)
        });
  }, []);

  return (
    <div id='product_list' className="container mt-4">
      <Row>
        {store.products.map((product, i) => (
          <Col key={i} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={`http://localhost:3006/product/${product.picture}`}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.price} ₽
                </Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">В корзину</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col sm={12} md={6} lg={4} className="mb-4">
          <Card className="h-100" style={{minWidth: "232px", minHeight: "448px"}}>
            <Card.Body style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Forma/>
              </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default ProductList;
