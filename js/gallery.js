import galleryItems from './gallery-items.js';

export const galleryList = document.querySelector('.js-gallery');

galleryItems.map(imgObject => makeItemLayout(imgObject));

function makeItemLayout({preview, original, description}) {
    const itemRef = document.createElement('li');
    const linkRef = document.createElement('a');
    const imgRef = document.createElement('img');

    itemRef.classList.add('gallery__item');
    linkRef.classList.add('gallery__link');
    imgRef.classList.add('gallery__image');

    linkRef.href = original;
    imgRef.src = preview;
    imgRef.setAttribute('data-source', original);
    imgRef.alt = description;

    itemRef.appendChild(linkRef);
    linkRef.appendChild(imgRef);
    galleryList.appendChild(itemRef);
}


