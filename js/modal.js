import galleryItems from './gallery-items.js';
import { galleryList } from './gallery.js';

const refs = {
    lightbox: document.querySelector('.js-lightbox'),
    closingBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxImg: document.querySelector('.js-lightbox img'),
}

galleryList.addEventListener('click', onOpensImg);
refs.closingBtn.addEventListener('click', onClosesImg);
refs.lightbox.addEventListener('click', onClosesImgByBackdrop);

function onOpensImg(event) {
    event.preventDefault();
    const clickedImg = event.target;
    if (clickedImg.nodeName !== 'IMG') {
        return;
    }
    refs.lightbox.classList.add('is-open'); 

    addsImageToModal(clickedImg);
}

function addsImageToModal(clickedImg) {
    refs.lightboxImg.alt = clickedImg.alt;
    refs.lightboxImg.src = clickedImg.dataset.source;
}

function onClosesImg() {
    refs.lightbox.classList.remove('is-open'); 
    refs.lightboxImg.removeAttribute('src');
}

function onClosesImgByBackdrop(event) {
    if (event.target.nodeName === 'IMG') {
        return;
    }
    closesImg();
}
