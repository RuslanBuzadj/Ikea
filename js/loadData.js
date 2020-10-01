   import { getData } from './getData.js';
   
   const wishList = ['idd001', 'idd077', 'idd088', 'idd099',];

   const cardList = [
      {
         id: 'idd015',
         count: 1
      },
      {
         id: 'idd080',
         count: 2
      },
      {
         id: 'idd030',
         count: 3
      },
   ]

export const loadData = () => {
   if(location.search) {
      const search = decodeURI(location.search);
      const prop = search.split('=')[0].substring(1);
      const value = search.split('=')[1];
      
      if (prop === 's') {
         getData.search(value, (data) => console.log(data))
      }else if (prop === 'wishlist') {
         getData.wishList(wishList, (data) => console.dir(data));
      } else if( prop === 'cat' || prop === 'subcat') {
         getData.category(prop, value, (data) => console.log(data)) 
      }
   }

   if(location.hash) {
      getData.item(location.hash.substring(1), (data) => console.log(data));
   }

   if(location.pathname.includes('cart')) {
      getData.card(cardList, (data) => console.log(data))
   }
   getData.catalog((data) => console.log(data));
   getData.subCatalog( 'Мебель' ,(data) => console.log(data));
};
