// Функції для роботи з бекендом
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

// response    {
// data:       містить тіло відповіді від сервера.
// status:     HTTP-код відповіді (наприклад, 200 для успішного запиту).
// statusText: текстове повідомлення, пов’язане з кодом статусу.
// headers:    об'єкт HTTP-заголовків, отриманих у відповіді.
// config:     конфігурація, яка використовувалася при виконанні запиту.
// request:    сам запит, який був надісланий.
// }

import axios from 'axios';
import {STORAGE_KEYS, arrayForFindElement, } from './constants.js';

axios.defaults.baseURL = STORAGE_KEYS.baseURL;



export async function getData(requestStr) {
    try {
      const response = await axios.get(requestStr);
      return response.data; // проміс з масивом
    } catch (error) {
      console.log(error);
      return []; //якщо щось пішло не так
    }
  }


export async function getForTest(runAfterThen) {
  await axios
    .get('/category/smartphones')
    .then(response => {
        runAfterThen(response.data); // варіант 1
        
    })
    .catch(error => {
      console.log(error);
    });
}