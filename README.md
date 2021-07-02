# Node js, Mongodb, Express js Shopping Cart 


![image](https://user-images.githubusercontent.com/28437795/124288418-d3633a80-db59-11eb-8ecd-f01dba239fb7.png)

This project work with Stripe api for Nodejs. Go to http://stripe.com/ for more information

## Requirements
- mongodb with Robo3T or MongoDB Compass
- node.js
- account on Stripe.js (for your test purchases)

## Used middlewares
- connect-mongo
- express cookie
- nodemon
- morgan

## Migrations
Current app implementation doesn't have UI for adding new products, <br/>
but you can run script with migrations for add some data into DB and get it from UI.

````npm
npm run migration:write
````

## ENV
 Before running the app, you should create your own `.env` file in the root with the following variables:
```dotenv
PORT=<place your port here>
STRIPE_SECRET_KEY=<your stripe test key>
MONGO_DB_URL=<path to mongoDB>
```

 ### Running
  * npm install
  * add stripe test key to ENV file and to `checkout.js` (publishable not secret key for sender identification)
  * npm start
  * open browser at `http://localhost:3000`
