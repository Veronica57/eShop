const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(cors());

app.get('/catalogData', (req, res) => {
  fs.readFile('./database/catalog.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.get('/cartData', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.post('/deleteFromCart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      let cart = JSON.parse(data);
      const item = req.body;

      cart = cart.filter((good) => good.product_name !== item.product_name);
      
      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      const hasItem = cart.find((good) => good.product_name === item.product_name);

      if (hasItem) {
        res.send('{"result": 1}');
        return;
      }

      cart.push(item);
      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000!');
});