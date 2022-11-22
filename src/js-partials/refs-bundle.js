export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-form input'),
    button: document.querySelector('.search-form button'),
    gallery: document.querySelector('.gallery'),
    moreButton: document.querySelector('.load-more'),
  }
}