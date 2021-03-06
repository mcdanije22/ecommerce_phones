const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const path = require('path');


// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'joshmcdaniel',
//       password : '',
//       database : 'ecommerce'
//     }
//   });



  const db = knex({
    client: 'pg',
    connection: {
     connectionString: process.env.DATABASE_URL,
     ssl:true,
    }
  });
  
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
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
  // .leftJoin('customers', 'reviews.customer_id', 'customers.customer_id')
  .where('products.product_id', id)
  // .orWhere('products.brand', brand)
  // .andWhere('products.product_type', 'Accessory')
  .then(data=>{
    console.log(data)
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
  const {email,password} = req.body;
  db.select('*')
  .from('login')
  .where('login.email', email) 
  .where('login.password', password) 
  .innerJoin('customers', 'customers.customer_id', 'login.customer_id')
  // .leftJoin('customer_address', 'customer_address.customer_id', 'customers.customer_id') //potental issue 
  .then(data=>{
    console.log(data)
    res.json(data)
  })
})

app.post('/register', (req,res)=>{
  const { email, password, first_name, last_name } = req.body;
  db.transaction(trx => { 
    trx.insert({
      email,
      password,
      first_name,
      last_name,
      date_joined: new Date()
    })
    .into('customers')
    .returning('*')
    .then(user=>{
      console.log(user)
     return trx('login')
     .returning('*')
     .insert({
        email:user[0].email,
        password:user[0].password,
        customer_id:user[0].customer_id
      })
      .then(data=>{
        console.log(data[0])
        res.json(data[0])
      })
    })
  .then(trx.commit)
  .catch(trx.rollback)
  })
  .catch(error=>{
    if(error.detail === 'Key (email)=(test) already exists.'){
      res.status(500).json({message:error})
    }
  })
})

app.get('/orders/:customerid', (req,res)=>{
  const {customerid} = req.params;
  console.log(customerid)
  db
  .select('*')
  .from('orders')
  .where('customer_id', customerid)
  .innerJoin('order_items', 'order_items.order_id', 'orders.order_id')
  .innerJoin('products', 'products.product_id', 'order_items.product_id')
  .innerJoin('invoices', 'invoices.order_id', 'orders.order_id')
  .then(data=>{
    res.send(data)
  })
})
app.get('/specificorder/:customerid/:orderid',(req,res)=>{
  const {customerid, orderid } =  req.params; 
  db 
  .select('*')
  .from('orders')
  .where('orders.order_id', orderid)
  // .where('order_id.customer_id', customerid)
  .innerJoin('customer_address', 'customer_address.address_id', 'orders.address_id')
  .innerJoin('customer_cards', 'customer_cards.card_id', 'orders.card_id')
  .innerJoin('order_items', 'order_items.order_id', 'orders.order_id')
  .innerJoin('products', 'products.product_id', 'order_items.product_id')
  .innerJoin('invoices', 'invoices.order_id', 'orders.order_id')
  .then(data=>{
    res.send(data)
  })
})



app.get('/address/:customerid', (req,res)=>{
  const {customerid} = req.params;
  db
  .select('*')
  .from('customer_address')
  .where('customer_id', customerid)
  .then(data=>{
    res.send(data)
  })
})
app.post('/addaddress', (req,res)=>{
  const { address_name, customer_id, street, secondary, city, state, zipcode } = req.body;
  db('customer_address')
  .insert({
    address_name,
    customer_id,
    street,
    secondary,
    city,
    state,
    zipcode
  })
  .returning('*')
  .then(item=>{
    console.log(item)
    res.json(item)
  })
  .catch(error=>{
    res.status(500).json({message:error})
  })
})
app.put('/editaddress', (req, res)=>{
  const { address_name, customer_id, street, secondary, city, state, zipcode, } = req.body;
  db('customer_address')
  .where('address_name', address_name)
  .where('customer_id', customer_id)
  .update({
    address_name,
    customer_id,
    street,
    secondary,
    city,
    state,
    zipcode
  })
  .then(item=>{
    res.json(item)
  })
})
app.delete('/deleteaddress/:addressid', (req, res)=>{
  const { addressid } =req.params;
  db('customer_address')
  .where('address_id', addressid)
  .delete()
  .then(res.json())
})
app.get('/wallet/:customerid', (req,res)=>{
  const {customerid} = req.params;
  db
  .select('*')
  .from('customer_cards')
  .where('customer_id', customerid)
  .then(data=>{
    res.send(data)
  })
})
app.post('/addcard', (req,res)=>{
  const { card_name, card_number, exp_date, cvc, customer_id  } = req.body;
  db('customer_cards')
  .insert({
    customer_id,
    card_name,
    card_number,
    exp_date,
    cvc 
  })
  .returning('*')
  .then(item=>{
    console.log(item)
    res.json(item)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message:error})
  })
})
app.put('/editcard', (req, res)=>{
  const { card_name, card_number, exp_date, cvc, customer_id  } = req.body;
  db('customer_cards')
  .where('card_name', card_name)
  .where('customer_id', customer_id)
  .update({
    customer_id,
    card_name,
    card_number,
    exp_date,
    cvc 
  })
  .then(item=>{
    res.json(item)
  })
  .catch(error=>{
    res.status(500).json({message:error})
  })
})
app.delete('/deletecard/:cardid', (req, res)=>{
  const { cardid } =req.params;
  db('customer_cards')
  .where('card_id', cardid)
  .delete()
  .then(res.json())
})
app.put('/editpassword', (req,res)=>{
  const { newPassword, customer_id}= req.body;
  db.transaction(trx=>{
  db('login') 
  .where('customer_id', customer_id)
  .update('password', newPassword)
  .returning('*')
  .then(()=>{
    return db('customers')
    .where('customer_id', customer_id)
    .update('password', newPassword)
    .returning('*')
  })
  .then(item=>{
    res.json(item)
  })
  .then(trx.commit)
  .catch(trx.rollback)
})
  .catch(error=>{
    console.log(error)
    res.status(500).json({message:error})
  })
});
app.get('/orderaccountinfo/:orderAddress/:orderPayment/:customerid',(req,res)=>{
  let { orderAddress, orderPayment, customerid } = req.params;
  customerid = parseInt(customerid)
  orderPayment = parseInt(orderPayment)
  console.log(orderAddress, orderPayment, customerid)
    db.select('*')
    .from('customers')
    .where('customers.customer_id', customerid)
    .innerJoin('customer_address', 'customer_address.customer_id', customerid)
    .innerJoin('customer_cards', 'customer_cards.customer_id', customerid)
    .where('customer_address.address_id', orderAddress)
    .where('customer_cards.card_id', orderPayment)
  .then(data=>{
    console.log(data)
    res.send(data)
  })
})
app.post('/placeorder', (req,res)=>{
  const { customer_id, card_id, address_id, cartProductIds,total } = req.body;
  console.log(total)
  db.transaction(trx=>{
  trx('shopping_carts')
  .where('customer_id', customer_id)
  .delete()
  .returning('*')
  .then(order=>{
    return trx('orders')
    .insert({
      customer_id,
      card_id,
      address_id,
      date_order_placed: new Date()
    })
      .returning('*')
   })
  .then(order=>{
    return trx('invoices')
    .insert({
      order_id:order[0].order_id,
      total
      })
      .returning('*')
   })
  .then(order=>{
    return cartProductIds.map((item,i)=>{
      trx('order_items')
      .returning('*')
      .insert({
        product_id:item,
        order_id:order[0].order_id
        })
        .returning('*')
          .then(data=>{
            console.log(data)
            res.json(data)
          })
          .then(trx.commit)
          .catch(trx.rollback)
      })
    })
  })
})
app.post('/postreview', (req,res)=>{
  const { reviewer, review, review_score, product_id } = req.body;
  db('reviews')
  .insert({
    product: product_id,
    review,
    reviewer,
    review_score,
    post_date: new Date()
  })
  .returning('*')
  .then(review=>{
    console.log(review)
    res.json(review)
  })
})


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, ()=> console.log(`server started successfully on ${PORT}`))