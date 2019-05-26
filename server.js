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
    .where('product_name', 'ilike', `%${search}%`)
    .orWhere('brand', 'ilike', search)    
    .then(data=>{
      res.send(data)
    })
  }
});

app.get('/product/:id/:brand', (req,res)=>{
  const id = req.params.id;
  const brand = req.params.brand;
  db.select('*')
  .from('products')
  .leftJoin('reviews', 'products.product_id', 'reviews.product')
  .leftJoin('customers', 'reviews.customer_id', 'customers.customer_id')
  .where('products.product_id', id)
  .orWhere('products.brand', brand)
  .andWhere('products.product_type', 'Accessory')
  .then(data=>{
    res.send(data)
  })
});


app.post('/addcart', (req,res)=>{
  const{customer_id, product_id,item_quantity}=req.body
  db('shopping_carts')
  .insert({
    customer_id:customer_id,
    product_id:product_id,
    item_quantity:item_quantity
  })
  .then(item=>{
    console.log(item)
    res.json(item)
  })
})


app.listen(port, ()=> console.log('server started successfully'))