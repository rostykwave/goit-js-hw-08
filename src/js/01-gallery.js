import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line


// Крок 1
const galleryRef = document.querySelector('.gallery');
////Створення розмітки з файлу gallery-items
const markup = makeMarkup(galleryItems);
////Вставлення розміки
galleryRef.insertAdjacentHTML('beforeend', markup);

////Крок 2 
///ініціація і модифікація підпису лайтбоксу 
var lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});


function makeMarkup(images) {
    return images
        .map(({ preview, original, description }) => {
            return `
        <a class="gallery__item" href="${original}" target="_blank" rel="noopener noreferrer">
  <img 
  class="gallery__image" 
  src="${preview}" 
  alt="${description}" />
</a>
`;
        })
        .join('');
};
