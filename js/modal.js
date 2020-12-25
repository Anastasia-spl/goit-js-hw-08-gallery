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
    if (event.target.classList.contains('right-arrow')) {
        setNextImg();
    }
    if (event.target.classList.contains('left-arrow')) {
        setPreviousImage()
  }
}

function setNextImg() {
    const currentImgIndex = +refs.lightboxImg.dataset.index;
    const nextIndex = currentImgIndex + 1;
    const nextImg = galleryList.querySelector(`img[data-index = "${nextIndex}"]`);
    if (nextIndex < 0 || nextIndex > 8) { return; }
        addsImageToModal(nextImg);
}
 
function setPreviousImage() {
    const currentImgIndex = +refs.lightboxImg.dataset.index;
const nextIndex = currentImgIndex - 1;
        const nextImg = galleryList.querySelector(`img[data-index = "${nextIndex}"]`);
        if (nextIndex < 0 || nextIndex > 8) { return;}
        addsImageToModal(nextImg);
}

function onKeyboardSlide(event) {
    if (event.code === 'ArrowRight') {
        setNextImg()
    }
    if (event.code === 'ArrowLeft') {
        setPreviousImage()
  }
}


