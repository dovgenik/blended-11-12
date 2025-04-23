//Логіка сторінки Home
// https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// https://dummyjson.com/products/1 - отримати один продукт по ID
// https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// https://dummyjson.com/products/category-list - отримати список категорій продуктів
// https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

import { getForTest, getData } from './js/products-api';
import { categoryRender, productOnCategory } from './js/render-function.js';
import { keyCategoryClick, clickFormFind, clickLoadMore } from './js/handlers.js';
import {
  notFoundOn,
  notFoundOff,
  loadMoreOn,
  loadMoreOff,
} from './js/helpers.js';

import { RG } from './js/constants.js';




// слухач на кнопки категорій
document
  .querySelector('.categories')
  .addEventListener('click', keyCategoryClick);

// слухач на форму пошуку
document.querySelector('.search-form').addEventListener('click', clickFormFind);

// слухач на кнопку LoadMore
document.querySelector('.load-more').addEventListener('click', clickLoadMore);




// отримую перелік категорій і рендерю на екран
categoryRender(await getData('/category-list'));


// першу сторінку товарів рендерю на екран
(async () => {
    RG.pageLen = 12;
    RG.pageCurrent = 0;
    RG.getStrForReq = function () {return `?limit=${this.pageLen}&skip=${this.pageCurrent * this.pageLen}`;   };
    RG.keySourseInet = true;
  loadMoreOff();
  notFoundOff();

  const x = await getData(RG.getStrForReq()); //'?limit=12&skip=0'
  

  if (x.products.length > 0) {
    productOnCategory(x.products);
    if ((x.products.length === RG.pageLen)) {
      loadMoreOn();
    } else {
      notFoundOn();
    }
  } else {
    notFoundOn();
  }
})();

