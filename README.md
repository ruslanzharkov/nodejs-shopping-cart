# Node js, Mongodb, Express js Shopping Cart

![image](https://user-images.githubusercontent.com/28437795/124288418-d3633a80-db59-11eb-8ecd-f01dba239fb7.png)

This project works with Stripe api on Nodejs and on the client representation as well.
Go to [Stripe](http://stripe.com/) for more information

## Requirements

- [community mongodb installed locally](https://www.mongodb.com/docs/manual/administration/install-community/) or [cloud version](https://www.mongodb.com/atlas/database)
- node.js
- account on Stripe.js (for your test purchases)

## Used middlewares

- connect-mongo
- express cookie
- nodemon
- morgan

## Migrations

Current app implementation doesn't have a UI for adding new products,
but you can run script with migrations to add some products into DB and receive it from the application's UI.
Make sure MongoDB is installed and running first.

```npm
npm run migration:write
```

## ENV

Before running the app, you should create your own `.env` file in the root with the following variables:

```dotenv
PORT=<place your port here>
STRIPE_SECRET_KEY=<your stripe secret test key for server>
MONGO_DB_URL='mongodb://127.0.0.1:27017' or remote mongo address
```

Note: make sure to add publc stripe key to `public/javascripts/checkout.js` in order to configure both server and client parts of Stripe.

```javascript
const stripePublishableTestKey = null;
// your public key should be here for proper Stripe work
// otherwise app generates en error with alert message

if (!stripePublishableTestKey) {
  const error = 'Please add a Stripe.js public key';
  alert(error);
  throw new Error(error);
}

Stripe.setPublishableKey(stripePublishableTestKey);
```

### Running

- npm install
- add stripe test key to ENV file and to `checkout.js` (publishable not secret key for sender identification)
- npm start
- open browser at specified PORT env variables
