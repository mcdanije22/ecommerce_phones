const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Knex = require('Knex');

const db = Knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'joshmcdaniel',
      password : '',
      database : 'ecommerce'
    }
  });
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{
  db.select('*').from('products')
  .then(data=>{
    res.send(data);
  })
});

// db.query('SELECT * FROM products')


app.get('/search/:search', (req,res)=>{
  const search = req.params.search;
  if(search == 'deals'){
    db('products')
    .whereNotNull('sale_discount')
    .then(data=>{
      res.send(data);
    })
  }else if(search == 'phone'){
    db('products')
    .where('product_type', 'ilike', search)
    .then(data=>{
      res.send(data)
    })
  }else if(search == 'accessory'){
    db('products')
    .where('product_type', 'ilike', search)
    .then(data=>{
      res.send(data)
    })
  }else{
    db('products')
    .where('brand', 'ilike', search)
    .then(data=>{
      res.send(data)
    })
  }
});


app.listen(port, ()=> console.log('server started successfully'))