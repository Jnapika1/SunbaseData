const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const axios = require('axios');

let token;

app.use(bodyParser.json({extended: false}));

app.use(cors());


app.get('/customers', async(req, res)=>{
  console.log(token);
  // let customers=[{}];
  axios.get('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {headers: {"Authorization": `Bearer ${token}`}})
  .then(response=>{
    // customers=response.data;
    res.status(201).json({customers: response.data});
    // console.log(response.data);
  })
  .catch(err=>console.log(err))
  // console.log(customers);
  
})

app.post('/login', async(req, res)=>{
  // console.log(req.body);
  const response = await axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', req.body);
  // console.log(response);
  token = response.data.access_token;
  // process.env.TOKEN=response.data.access_token;
  res.status(201).json({token: response.data.access_token});
})

app.post('/delete', async(req, res)=>{
  let uuid=req.body.uuid;
  console.log(uuid);
  axios.post(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuid}`, {}, {headers: {"Authorization": `Bearer ${token}`}})
  .then(response=>{
    res.status(201).json({message: response.data});
    // console.log(response.data);
  })
  .catch(err=>console.log(err))
})

app.post('/addcustomer', (req, res)=>{
  // console.log(req.body);
  let customer = req.body;
  axios.post('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create', customer, {headers: {"Authorization": `Bearer ${token}`}})
  .then(response=>{
    res.status(201).json({message: response.data});
    // console.log(response);
  })
  .catch(err=>{
    console.log(err);
  })
})

app.post('/update', (req, res)=>{
  let uuid = req.query.uuid;
  let customer = req.body;
  axios.post(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`, customer, {headers: {"Authorization": `Bearer ${token}`}})
  .then(response=>{
    console.log(response);
    res.status(201).json({message: response.data});
  })
  .catch(err=>{
    console.log(err);
  })
})

app.listen(3000);