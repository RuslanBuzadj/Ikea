
import { getData } from './getData.js'
import generateSubCatalog from './generateSubCatalog.js';
export const catalog = () => {
   // получаем элементы c DOM
   const updateSubCatalog = generateSubCatalog();

   const btnBurger = document.querySelector('.btn-burger');
   const catalog = document.querySelector('.catalog');
   const btnClose = document.querySelector('.btn-close');
   const subCatalog = document.querySelector('.subcatalog');
   const subCatalogHeader = document.querySelector('.subcatalog-header');
   const btnReturn = document.querySelector('.btn-return');


   const overlay = document.createElement('div');
   overlay.classList.add('overlay');
   document.body.insertAdjacentElement('beforebegin', overlay);

   // функции
   const openMenu = () => {    // функция открытия меню
      catalog.classList.add('open');
      overlay.classList.add('active');
   };

   const closeMenu = () => { // функция закрытия меню
      closeSubMenu(); 
      catalog.classList.remove('open');
      overlay.classList.remove('active');      
   };

   const openSubMenu = event => { 
      event.preventDefault(); 
      const target = event.target;  
      const itemList = target.closest('.catalog-list__item');
      if (itemList) {
         getData.subCatalog(target.textContent, data => {
            updateSubCatalog(itemList.textContent, data);
            subCatalog.classList.add('subopen');
         })         
         
      }
   };

   const closeSubMenu = () => { // функция закрытия под меню
      subCatalog.classList.remove('subopen');
   }
   // вызовы функций
   btnBurger.addEventListener('click', openMenu);
   btnClose.addEventListener('click', closeMenu);
   overlay.addEventListener('click', closeMenu);
   catalog.addEventListener('click', openSubMenu);
   subCatalog.addEventListener('click', (event) => {
      const btnReturn = event.target.closest('.btn-return');
      if (btnReturn) closeSubMenu();
   })
   btnReturn.addEventListener('click', closeSubMenu);
}
export default catalog;