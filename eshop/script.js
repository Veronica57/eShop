// Задание № 7
// 1. Привязать добавление товара в корзину к реальному API.
// 2. Добавить API для удаления товара из корзины.

const API_URL = 'http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: () => ({
    goods: [],
    filteredGoods: [],
    cartGoods: [],
    searchLine: '',
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
    this.getCartData();
  },
  methods: {
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    getCartData() {
      this.makeGETRequest(`${API_URL}/cartData`, (goods) => {
        this.cartGoods = JSON.parse(goods);
      });
    },
    addGoodToCart(good) {
      this.makePOSTRequest(`${API_URL}/addToCart`, JSON.stringify(good), () => {
        this.getCartData();
      });
    },
    deleteGoodFromCart(good) {
      this.makePOSTRequest(`${API_URL}/deleteFromCart`, JSON.stringify(good), () => {
        this.getCartData();
      });
    },
    makeGETRequest(url, callback) {
      var xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },
    makePOSTRequest(url, data, callback) {
      let xhr;
  
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }
  
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
      xhr.send(data);
    },
  },
});