const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');/*Cross Origin Request Sharing*/
const stripe = require('stripe')('sk_test_51HWpvyLUnNLJLkiJpVnLA5Gx3Ln2WTXva9AEt03OuVYmzOPmiYbjw5A0J9SmDhldwRXatlXT0edguJ2LBJsmmAWa00XsGAyalj')

//API

// - App config
const app=express();

//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello'))

app.post('/payment/create', async (request, response)=>{
  const total=request.query.total; //came from payment.js url.

  console.log('payment receive',total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: 'usd',
  });

  //OK -Created
  response.status(201).send({
    clientSecrect: paymentIntent.client_secret,
  });
});
//-Listen command
exports.api = functions.https.onRequest(app);
