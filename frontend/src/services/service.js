import axios, { all } from 'axios';
import store from '../stores/store';

export const postCard = async (card, files) => {

  console.log(files)

  try {
    const formData = new FormData();

    formData.append('name', card.name);
    formData.append('price', card.price);
    formData.append('description', card.description);
    
    formData.append('picture', files[0]);

    const response = await axios.post('http://localhost:3006/product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.created_product) return;

    const all_cards  = store.getCards();
    all_cards.push(response.data.created_product);

    store.setCards(all_cards); 
    console.log('Карточка создана:', response.data.created_product);

    return response.data;
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
    throw error;
  }
};
