//Допоміжні функції
// import {  } from './constants.js';
import { refs, } from './refs.js';


export function findProduct(strForFind) {
    return false;
}


export function loadMoreOn() {
    if (!refs.loadMore.classList.contains('load-more--visible')) {
        refs.loadMore.classList.add('load-more--visible');
    } 
};

export function loadMoreOff() {
    if (refs.loadMore.classList.contains('load-more--visible')) {
        refs.loadMore.classList.remove('load-more--visible');
    }
};

export function notFoundOn() {
    if (!refs.notFound.classList.contains('not-found--visible')) {
        refs.notFound.classList.add('not-found--visible');
    } 
};

export function notFoundOff() {
    if (refs.notFound.classList.contains('not-found--visible')) {
        refs.notFound.classList.remove('not-found--visible');
    }
};
