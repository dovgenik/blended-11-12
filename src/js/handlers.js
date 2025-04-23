// Функції, які передаються колбеками в addEventListners
import {
  productOnCategory,
  deleteProductOnCategory,
} from './render-function.js';
import { getForTest, getData } from './products-api';
import { findProduct } from './helpers.js';
import { RG } from './constants.js';
import { refs } from './refs.js';
import { notFoundOn, notFoundOff, loadMoreOn, loadMoreOff } from './helpers.js';

// клік по кн. категорії
export function keyCategoryClick(event) {
  deleteProductOnCategory();
  loadMoreOff();
  notFoundOff();
  RG.pageLen = 12;
  RG.pageCurrent = 0;
  RG.keySourseInet = true;
  if (event.target.innerText.toLowerCase() === 'all') {
    RG.getStrForReq = function () {
      // формую строку запитів у т.ч. для кн. LoadMore
      return `?limit=${this.pageLen}&skip=${this.pageCurrent * this.pageLen}`;
    };
  } else {
    // формую строку запитів у т.ч. для кн. LoadMore
    RG.strForReq = '/category/' + event.target.innerText.toLowerCase(); // статична частина
    RG.getStrForReq = function () {
      return `${this.strForReq}?limit=${this.pageLen}&skip=${
        this.pageCurrent * this.pageLen
      }`; // динамічна частина
    };
  }

  (async () => {
    const x = await getData(RG.getStrForReq()); // функція передає сформовану строку для запиту в мережі

    if (x.products.length > 0) {
      productOnCategory(x.products);
      if (x.products.length === RG.pageLen) {
        loadMoreOn();
      } else {
        notFoundOn();
      }
    } else {
      notFoundOn();
    }
  })();
}

// ****************************************************************************************
// обробка кліків на формі для пошуку
export function clickFormFind(event) {
  const notFound = document.querySelector('.not-found');
  event.preventDefault();
  deleteProductOnCategory(); // очищаю екран від попереднього вивода списка товарів
  loadMoreOff();
  notFoundOff();

  const formFind = event.target;
  const inputFormFind = document.querySelector('.search-form__input');

  if (formFind.classList.contains('search-form__btn')) {
    // спроба пошуку
    const strForFind = inputFormFind.value.trim();

    if (strForFind != '') {
      RG.pageLen = 3;
      RG.pageCurrent = 0;
      RG.keySourseInet = false;
      //RG.strForReq = '/category/' + event.target.innerText.toLowerCase(); // статична частина
      RG.getStrForReq = function () {
        //return `${this.strForReq}?limit=${this.pageLen}&skip=${this.pageCurrent * this.pageLen}`; // динамічна частина
        return '/search?q=' + strForFind;
      };

      getData(RG.getStrForReq())
        .then(x => {
          if (x.products.length <= RG.pageLen) {
            productOnCategory(x.products);
            notFoundOn();
          } else {
            RG.arrForElements = x.products;
            productOnCategory(RG.arrForElements.slice(0, RG.pageLen));
            loadMoreOn();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    if (formFind.classList.contains('search-form__btn-clear')) {
      inputFormFind.value = '';
    }
  }
}

//***************************************************************
export function clickLoadMore() {
  if (RG.keySourseInet) {
    ++RG.pageCurrent;

    console.log(RG.pageCurrent);
    console.log(RG.getStrForReq());

    (async () => {
      const x = await getData(RG.getStrForReq());

      if (x.products.length > 0) {
        productOnCategory(x.products);
        if (x.products.length === RG.pageLen) {
          loadMoreOn();
        } else {
          loadMoreOff();
          notFoundOn();
        }
      } else {
        loadMoreOff();
        notFoundOn();
      }
    })();
  } else {
    productOnCategory(
      RG.arrForElements.slice(
        ++RG.pageCurrent * RG.pageLen,
        RG.pageCurrent * RG.pageLen + RG.pageLen
      )
    );
    if ((RG.arrForElements.length > RG.pageCurrent * RG.pageLen)) {
      loadMoreOn();
      notFoundOff();
    } else {
      loadMoreOff();
      notFoundOn();
    }
  }
}

// ***************************************************************************************
