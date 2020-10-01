// объект с параметрами 
const PARAM = { 
   cat: 'category',
   subcat: 'subcategory',
   search: ['name', 'description', 'category', 'subcategory'],
   failSearch: 'По вашему запросу ничего не найдено',
   failWishlist: 'Список желаний пуст'
};
// объект с набором функций для запроса на сервер
export const getData = {
   url: 'database/dataBase.json',
   get(process) { 
      fetch(this.url)                     // запрос на сервер
      .then((response) => response.json())
      .then(process);     
   },
   wishList(list, callback) { // запрос на формирование списка желаний
      this.get((data) => {
         const result = data.filter((item) => list.includes(item.id));
         if (result.length) { // если ответ положилельный
            callback(result);
         }else {              // если ответ отрицательный
            callback(PARAM.failWishlist)
         }
         
      })
   },
   item(value, callback) {
      this.get((data) => {
         const result = data.find( item => item.id === value);
         callback(result);
      })
   },
   card(list, callback) { // запрос на формирование карточки товара
      this.get((data) => {
         const result = data.filter( item => list.some(obj => obj.id === item.id));
         
         callback(result);
      })
   } ,
   category(prop, value, callback) { // запрос на формирование категорий
      this.get((data) => {   
              
         const result = data.filter( item => item[PARAM[prop]].toLowerCase() === value.toLowerCase()); 
         console.log(result)           
         callback(result);
      })
   } ,
   search(value, callback) { // запрос поиска
      this.get((data) => {
         const result = data.filter( item => {
            for(let prop in item) {
               if(PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
                  return true;
               }
            }
         });
         if (result.length) {
            callback(result);
         }else {
            callback(PARAM.failSearch)
         }
      })
   },
   catalog(callback) {  // запрос на формирование каталога
   this.get((data) => {
      const result = data.reduce((arr, item) => {
         if(!arr.includes(item.category)) {
            arr.push(item.category);
         }
         return arr
      }, [])
      callback(result);
   })
  },
  subCatalog(value ,callback) { // запрос на формирование под каталога
   this.get((data) => {
      const result = data.filter(item => item.category === value).reduce((arr, item) => {
         if(!arr.includes(item.subcategory)) {
            arr.push(item.subcategory);
         }
         return arr
      }, [])
      callback(result);
   })
  }
};