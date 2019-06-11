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

//get specific product and recommended accessories based off brand 
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
  const{customer_id, product_id,item_quantity}=req.body;
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
  .catch((err)=>{
    if(err.column === 'customer_id'){
      res.status(400).json({message:err})
      console.log('test')
    }else{
      res.status(500).json({message:err})
      // console.log(err.name);
    }
  })
})

app.get('/cart/:customerid', (req,res)=>{
  const customerid = req.params.customerid;
  db.select('*')
  .from('shopping_carts')
  .where('customer_id', customerid)
  .innerJoin('products', 'products.product_id', 'shopping_carts.product_id')
  .then(data=>{
    console.log(data)
    res.send(data)
  })
 
})

app.delete('/cart/delete/:productid/:customerid', (req,res)=>{
  const { productid, customerid} =req.params;
  if(productid == 'clear'){
    db('shopping_carts')
    .where('customer_id', customerid)
    .delete()
    .then(res.json())
  }else{
  db('shopping_carts')
  .where('product_id', productid) 
  .where('customer_id', customerid)
  .delete()
  .then(res.json())
  }
})

app.post('/signin', (req,res)=>{
  const {email,password}=req.body;
  db.select('*')
  .from('login')
  .where('login.email', email) 
  .where('login.password', password) 
  .innerJoin('customers', 'customers.customer_id', 'login.customer_id')
  .then(data=>{
    res.json(data)
  })
})

app.listen(port, ()=> console.log('server started successfully'))