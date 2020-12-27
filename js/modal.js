// import galleryItems from './gallery-items.js';
import { galleryList } from './gallery.js';
const refs = {
    lightbox: document.querySelector('.js-lightbox'),
    closingBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxImg: document.querySelector('.js-lightbox img'),
    btnLeft: document.querySelector('.left-arrow'),
    btnRight: document.querySelector('.right-arrow'),

}

galleryList.addEventListener('click', onOpensModal);
refs.closingBtn.addEventListener('click', onClosesModal);
refs.lightbox.addEventListener('click', onBackdropClick);

function onOpensModal(event) {
    event.preventDefault();
    window.addEventListener('keydown', onEscPress);
    window.addEventListener('keydown', onKeyboardSlide);

    const clickedImg = event.target;
    if (clickedImg.nodeName !== 'IMG') {
        return;
    }
    refs.lightbox.classList.add('is-open'); 
    addsImageToModal(clickedImg);
}

function onEscPress(event) {
    if (event.code === 'Escape') {
        onClosesModal();
    }
}

function addsImageToModal(clickedImg) {
    refs.lightboxImg.alt = clickedImg.alt;
    refs.lightboxImg.src = clickedImg.dataset.source;
    refs.lightboxImg.setAttribute('data-index', clickedImg.dataset.index);
}

function onClosesModal() {
    refs.lightbox.classList.remove('is-open'); 
    refs.lightboxImg.removeAttribute('src');
    window.removeEventListener('keydown', onEscPress);
    window.removeEventListener('keydown', onKeyboardSlide);
}

function onBackdropClick(event) {
    if (event.target.classList.contains('lightbox__overlay')) {
        onClosesModal();
    }

    const currentImgIndex = +refs.lightboxImg.dataset.index;
    if (event.target.classList.contains('right-arrow')) {
        setNextImg(currentImgIndex + 1);
    }
    if (event.target.classList.contains('left-arrow')) {
        setNextImg(currentImgIndex - 1);
  }
}

function setNextImg(index) {
    const maxIndex = galleryList.childNodes.length - 1;
    const minIndex = 0;
    if (index < minIndex) { index = maxIndex;}
    if (index > maxIndex) { index = minIndex; }
    const nextImg = galleryList.querySelector(`img[data-index = "${index}"]`);
    addsImageToModal(nextImg);
}

function onKeyboardSlide(event) {
     const currentImgIndex = +refs.lightboxImg.dataset.index;
    if (event.code === 'ArrowRight') {
        setNextImg(currentImgIndex + 1)
    }
    if (event.code === 'ArrowLeft') {
        setNextImg(currentImgIndex - 1)
  }
}


