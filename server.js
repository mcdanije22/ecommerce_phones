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

app.listen(port, ()=> console.log('server started successfully'))