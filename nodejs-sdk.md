# Marketcloud NodeJS SDK 

- [Introduction](#introduction)
- [Installation](#installation)
- [Authentication and security](#authentication-and-security)
- [Making requests](#making-requests)
- [Handling errors](#handling-errors)
- [Addresses](#addresses)
  * [Create an address](#create-an-address)
  * [List all addresses](#list-all-addresses)
  * [Retrieve an address](#retrieve-an-address)
  * [Update an address](#update-an-address)
  * [Delete an address](#delete-an-address)
- [Brands](#brands)
  * [Retrieve a brand](#retrieve-a-brand)
  * [List all brands](#list-all-brands)
  * [Create a new brand](#create-a-new-brand)
  * [Update a brand](#update-a-brand)
  * [Delete a brand](#delete-a-brand)
- [Carts](#carts)
  * [Create a new cart](#create-a-new-cart)
  * [List all carts](#list-all-carts)
  * [Retrieve a cart](#retrieve-a-cart)
  * [Add items to cart](#add-items-to-cart)
  * [Update cart contents](#update-cart-contents)
  * [Remove items from cart](#remove-items-from-cart)
  * [Delete a cart](#delete-a-cart)
- [Categories](#categories)
  * [Create a new category](#create-a-new-category)
  * [List all categories](#list-all-categories)
  * [Retrieve a category](#retrieve-a-category)
  * [Update a category](#update-a-category)
  * [Delete a category](#delete-a-category)
- [Collections](#collections)
  * [Retrieve a collection](#retrieve-a-collection)
  * [List all collections](#list-all-collections)
  * [Create a new collection](#create-a-new-collection)
  * [Update a collection](#update-a-collection)
  * [Delete a collection](#delete-a-collection)
- [Coupons](#coupons)
  * [Retrieve a coupon](#retrieve-a-coupon)
  * [List coupons](#list-coupons)
  * [Create a coupon](#create-a-coupon)
  * [Updates a coupon](#updates-a-coupon)
  * [Delete a coupon](#delete-a-coupon)
- [Orders](#orders)
  * [List all orders](#list-all-orders)
  * [Retrieve an order](#retrieve-an-order)
  * [Create a new order](#create-a-new-order)
- [Payment methods](#payment-methods)
  * [Create a payment method](#create-a-payment-method)
  * [Update a payment method](#update-a-payment-method)
  * [Delete a payment method](#delete-a-payment-method)
  * [Retrieve a payment method](#retrieve-a-payment-method)
  * [List all payment methods](#list-all-payment-methods)
- [Payments](#payments)
  * [Create a payment](#create-a-payment)
- [Products](#products)
  * [Create a product](#create-a-product)
  * [Retrieve a product](#retrieve-a-product)
  * [List all products](#list-all-products)
  * [Update a product](#update-a-product)
  * [Delete a product](#delete-a-product)

This is the documentation for the official Marketcloud NodeJS SDK. It is a wrapper for our REST api and it makes it easier to use. You can find the list of our official SDKs in the [libraries section](/documentation/libraries).



## Introduction

If you haven't set up an application yet, please refer to this [Getting Started](/documentation/rest-api/gettingstarted) guide.

Your account on Marketcloud can handle multiple marketcloud-apps, each one has its own public key / secret key pair that you insert into your NodeJS code.

The Marketcloud NodeJS SDK is open source and publicly available at [Github](https://github.com/Marketcloud/marketcloud-node)



## Installation

The easiest way to get started with the NodeJS sdk, is to install it via NPM:

```
npm install marketcloud-node
```

At this point you can include the sdk in your application

```
var Marketcloud = require('marketcloud-node');
```



## Authentication and security

Every application identifies itself to Marketcloud using a unique public key. Since you must ship the public key with your client application code, this key is **public**. The application security is guaranteed by the secret key, which you should never share with anyone, since it grants higher authorization levels to clients using it. The only place where it should be safe to store and use the secret key is (in case you need it) your server side code or, even better, [some safer place](https://12factor.net/config).

Your app's credentials are stored by the `Marketcloud.Client` instance

```
var marketcloud = new Marketcloud.Client({
    public_key : 'your_public_key',
    secret_key : 'your_secret_key'
})
```

The token is transparently handled by the client and it lasts 4 hours, after that ,the SDK automatically detects the need to re-authenticate so you don't need to check for this.

## Making requests

The SDK uses Promises to handle concurrency and to interact with the Marketcloud REST api. Promises provide a way to write asynchronous code that is readable and easily composable. The SDK internally uses the well known library [Bluebird.js](http://bluebirdjs.com/docs/why-promises.html)

```

marketcloud.products.list({})
.then(function(data){
  // Handle success
})
.catch(function(error){
  //Handle error
})

```

## Handling errors

Errors returned by the SDK have the following structure

```

{
  code : 404,
  type : "NotFound",
  message : "Resource not found"
}

```

Validation error have further attributes:

```

{ code: 400,
  type: "BadRequest",
  message: "Bad request",
  valid: false,
  failedValidator: "missingRequiredProperty",
  invalidPropertyName: "price"
}

```

## Addresses





### Create an address

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| full_name  **Required**  | String | The full name of the resident |
| email  **Required**  | String | A valid email address |
| country  **Required**  | String | The country of the address |
| state | String | The state of the address |
| city  **Required**  | String | The city of the address |
| address1  **Required**  | String | The first address |
| address2 | String | Additional address space |
| postal_code  **Required**  | String | The postal code of the address |
| phone_number | String | The phone number for the address |
| alternate_phone_number | String | An alternate phone number for the address |



**Example request**

```

marketcloud.addresses.create(new_address)
.then(function(address){
  // Your code here
})

```





### List all addresses

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Filter addresses by the customer's id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of addresses to retrieve per page |
| page | Number | The page number of addresses to display |



Retrieves a list of addresses filtered and sorted by the query object.

**Example request**

```

marketcloud.addresses.list(query)
  .then(function(data){
})

```





### Retrieve an address

Retrieves an address by its id.

**Example request**

```

marketcloud.addresses.getById(881)
.then(function(data){
  // Your code here
})

```





### Update an address

Updates an address by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| address_id  **Required**  | Number | The univocal address identifier |
| update_data  **Required**  | Object | An object containing the updates. See [addresses.create()](#addresses.create) for more informations. |



**Example request**

```

marketcloud.addresses.update(address_id,update_data)
.then(function(address){
  // Your code here
})

```



### Delete an address

Deletes an address by id.

**Example request**

```

marketcloud.addresses.delete(address_id)
.then(function(){
  // Your code here
})

```





## Brands



### Retrieve a brand

**Example request**

```
//Retrieves a brand by its id
marketcloud.brands.getById(881)
.then(function(data){
  // Your code here
})

```



### List all brands

Retrieves a list of Brands filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of brands to retrieve per page |
| page | Number | The page number of brands to display |



**Example request**

```

marketcloud.brands.list(query)
.then(function(data){
      })
```



### Create a new brand

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | String |
| image_url | String | The URL for the brand image/logo. |
| description | String | A description of the brand. |
| url | String | A label to be used in urls. |



**Example request**

```

marketcloud.brands.create(new_brand)
.then(function(brand){
  // Your code here
})

```



### Update a brand

Updates a brand by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| brand_id  **Required**  | Number | The univocal brand identifier |
| update_data  **Required**  | Object | An object containing the updates. See [brands.create()](#brands.create) for more informations. |



**Example request**

```

marketcloud.brands.update(brand_id,new_brand)
.then(function(brand){
  // Your code here
})

```



### Delete a brand

Deletes a brand by id.

**Example request**

```

marketcloud.brands.delete(brand_id)
.then(function(){
  // Your code here
})

```





## Carts



### Create a new cart

Creates a new cart with a product in it.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | The univocal user identifier |
| items  **Required**  | Array of Objects | The list of items, in the form `{product_id:1,quantity:10, [variant_id:1]}`, added on the cart |



A line item is an object with the following attributes:



| Field | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The univocal product identifier |
| variant_id | Number | The univocal number identifying a product's variant. |
| quantity  **Required**  | Number | A _positive_ number that indicates how many units of the chosen product must be added to cart. |



**Example request**

```

marketcloud.carts.create({
  items:[{'product_id':5785,'quantity':2}]
})
.then(function(data){
  // Your code here
})

```



### List all carts

Retrieves a list of carts filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Display carts that belong to the user with the given id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



**Example request**

```

marketcloud.carts.list(query)
.then(function(data){
})

```



### Retrieve a cart

**Example request**

```

marketcloud.carts.getById(cart_id)
.then(function(data){
  // Your code here
})

```



### Add items to cart

**Example request**

```

        //Add products to a cart identified by its id
marketcloud.carts.add(cart_id,
        [{'product_id':5785,'quantity':2}])
.then(function(data){
  // Your code here
})

```



### Update cart contents

Update quantities of products in cart or add new products to cart.

**Example request**

```

marketcloud.carts.update(testCart.id,[
  {'product_id':5712,'quantity':1},
  {'product_id':5785,'quantity':1}
])
.then(function(data){
  // Your code here
})

```



### Remove items from cart

**Example request**

```

marketcloud.carts.remove(testCart.id,[
  {'product_id':5712},
  {'product_id':5785}
])
.then(function(data){
  // Your code here
})

```

If your store works with **variants**, you need to explicitly indicate which variant you want to add/remove/update .

```

        //Adds an item to the cart
marketcloud.carts.add(cart_id,[
  { 'product_id':5785,
    'quantity':2,
    'variant_id' : 3
  }])
.then(function(data){
          // Your code here
        })
        //Updates an item in the cart
marketcloud.carts.update(cart_id,[{
  'product_id':5785,
  'quantity':1,
  'variant_id' : 3
}])
.then(function(data){
          // Your code here
        })
        //Remove an item from the cart
marketcloud.carts.remove(cart_id,[{
  'product_id':5785,
  'variant_id' : 3
}])
.then(function(data){
          // Your code here
        })

```



### Delete a cart

Deletes a cart by id.

**Example request**

```

marketcloud.carts.delete(cart_id)
.then(function(){
  // Your code here
})

```





## Categories



### Create a new category

**Arguments**



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The category name |
| description | String | A description of the category |
| image_url | String | The URL for the category image/logo |
| url | String | A label to be used in urls |
| parent_id | Number | Null if it is a category.
With a value represents the parent category identifier, and this is a subcategory |



**Example request**

```

marketcloud.categories.create(new_category)
.then(function(category){
  // Your code here
})

```



### List all categories

Retrieves a list of categories filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of categories to retrieve per page |
| page | Number | The page number of categories to display |



**Example request**

```

marketcloud.categories.list(query)
.then(function(data){
  // Your code here
})

```



### Retrieve a category

Retrieves a category by its id.

**Example request**

```

marketcloud.categories.getById(881)
.then(function(data){
  // Your code here
})               

```



### Update a category

Updates a category by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| category_id  **Required**  | Number | The univocal category identifier |
| update_data  **Required**  | Object | An object containing the updates. See [categories.create()](#categories.create) for more informations. |



**Example request**

```

marketcloud.categories.update(category_id,update_data)
.then(function(category){
  // Your code here
})

```



### Delete a category

Deletes a category by id.

**Example request**

```

marketcloud.categories.delete(category_id)
.then(function(){
  // Your code here
})

```





## Collections



### Retrieve a collection

**Example request**

```
//Retrieves a collection by its id
marketcloud.collections.getById(123)
.then(function(response){

})
.catch(function(error){

})

```



### List all collections

Retrieves a list of Collections filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Integer | The number of collections to retrieve per page |
| page | Integer | The page number of collections to display |



**Example request**

```

marketcloud.collections.list({})
.then(function(response){

})
.catch(function(error){

})

```



### Create a new collection



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The name of the collection |
| slug | String | URL friendly string |
| Description | String | A description of the collection |
| items | Array | An array of collection entries, see the table below for more details |



**Collection entry**



| Attribute | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The id of the product entry. |
| variant_id  **Required**  | Number | The variant_id of the product entry |



**Example request**

```

var new_collection = {
  "name" : "2017 Summer collection",
  "items" : [
    {"product_id" : 123, "variant_id" : 1 },
    {"product_id" : 123, "variant_id" : 4 },
    {"product_id" : 124, "variant_id" : 1 }
  ]
}
marketcloud.collections.create(new_collection)
.then(function(response){

})
.catch(function(error){

})

```



### Update a collection

Updates a collection by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| collection_id  **Required**  | Integer | The univocal collection identifier |
| update_data  **Required**  | Object | An object containing the updates. See [marketcloud.collections.create()](#collections.create) for more informations. |



**Example request**

```

// updates collection with it 123
marketcloud.collections.update(123, {"name" => "2018 Spring Collection"})
.then(function(response){

})
.catch(function(error){

})

```



### Delete a collection

Deletes a collection by id.

**Example request**

```

// Delete collection with id 123
marketcloud.collections.delete(123)
.then(function(response){

})
.catch(function(error){

})

```





## Coupons



### Retrieve a coupon

**Example request**

```
//Retrieves a coupon by its id
marketcloud.coupons.getById(123);

```



### List coupons

**Example request**

```
//Retrieves a paginated list of coupons
// in this example, we only look for active coupons
marketcloud.coupons.list({active : true});

```



### Create a coupon

**Parameters**



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The coupon name |
| code  **Required**  | String | The secret code that the customer must match to benefit from the coupon. |
| target_type  **Required**  | String | This parameter tells the API where the coupon can be applied. Use `'CART_COUPON'` if you want to apply a discount to the whole cart, `'PRODUCT_COUPON'` if the discount is appliable only to a specific product, and `'CATEGORY_COUPON'` if the discount can be applied to all products in a certain category. |
| discount_type  **Required**  | String | This parameter tells the API which is the type of discount. Use `'NET_REDUCTION'` if you want to apply a net discount, or use `'PERCENTAGE_DISCOUNT'` if you want to apply a percentage discount. |
| discount_value  **Required**  | Number | The value of the discount, if the discount_type is `PERCENTAGE_DISCOUNT` the discount_value represent the percentage of discount to apply (the percentage is calculated against the target, cart, product or category) |
| active | Boolean | Tells wether the coupon is active or not. |



**Example request**

```
//Creates a new coupon worth 10$
var newCoupon = {
  "name" : "Welcome coupon 10$ discount",
  "code" : "XS671GH",
  "type" : "total",
  "target_type" : "CART_COUPON",
  "discount_type" : "NET_REDUCTION",
  "discount_value" : 10
}

marketcloud.coupons.create(newCoupon);

```



### Updates a coupon

**Example request**

```
//Updates coupon, sets the discount value to 20
var couponUpdate = {
  name : "Welcome coupon 20$ discount",
  discount_value : 20
}
marketcloud.coupons.update(123,couponUpdate);

```



### Delete a coupon

**Example request**

```
//Delete a coupon by its id
marketcloud.coupons.delete(123);

```





## Orders



### List all orders

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Filter orders by the customer's id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



**Example request**

```

marketcloud.orders.list(query)
.then(function(data){
  // Your code here
})     

```



### Retrieve an order

**Example request**

```

marketcloud.orders.getById(id)
.then(function(data){
  // Your code here
})     

```



### Create a new order

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| items | Array | An array of line items.This is required if the  is missing. |
| cart_id  **Required**  | Number | The id of the cart that is going to be turned into an order. This is required if  is missing |
| state | String | The state of the order. Defaults to _created_ |
| shipping_address_id  **Required**  | Number | The id of the shipping address |
| shipping_address | Object | A shipping address object. See Address for more informations. This is required if the  is missing. |
| billing_address_id  **Required**  | Number | The id of the billing address |
| billing_address | Object | A sbilling address object. See Address for more informations. This is required if the  is missing. |
| user_id | Number | The id of the user making the order |
| store_id | Number | The id of the store receiving in the order |
| promotion_id | Number | The id of the promotion to apply. |
| coupon_code | String | The code of the coupon to apply. |
| payment_method_id | Number | The id of the custom payment method selected for the order. |
| shipping_id | Number | The id of the shipping method selected for the order. |



**Example request**

```

var the_order = {
  shipping_address_id : 111,
  billing_address : 111,
  items : [{product_id : 1, quantiyt: 1}]
}
marketcloud.orders.create(the_order)
.then(function(data){
  // Your code here
})

```





## Payment methods

Payment methods are a way to describe how customers will pay the goods they are buying. We have some default payment methods which are integrated into the system such as Braintree and Stripe, but your store might want some custom methods, such as cash on delivery.

**Usage with orders**

In order to tell Marketcloud that an order is using a certain payment method, just create an order with a `payment_method_id` value. See [orders.create](#orders.create) for an example



### Create a payment method

```
//Creates a new payment method

var new_payment_method = {
    "name" : "Cash on delivery",
    "description" : "The order is paid at delivery.",
    "cost_type" : "fixed_fee",
    "fixed_fee" : 5,
    "active" : true
}

  marketcloud.paymentMethods.create(new_payment_method)
  .then( function(response){

  })
  .catch( function(error){

  })
```



### Update a payment method

```
//Updates a new payment method
  marketcloud.paymentMethods.update({fixed_fee : 10})
  .then( function(response){
    //
  })
  .catch( function(error){
    //
  })
```



### Delete a payment method

```
//Deletes a payment method with id 123
  marketcloud.paymentMethods.delete(123)
  .then( function(response){
    //
  })
  .catch( function(error){
    //
  })
```



### Retrieve a payment method

```
//Retrieves a payment method by its id
  marketcloud.paymentMethods.getById(payment_method_id)
  .then( function(response){

  })
  .catch( function(error){

  })
```



### List all payment methods

```
//Retrieves a list of payment methods filtered and sorted by the query object
  marketcloud.paymentMethods.list(query)
  .then( function(response){

  })
  .catch( function(error){

  })
```





## Payments

Marketcloud supports a certain number of payment methods. Most of them requires client side and server side configuration, we try to abstract the server side part, so you just have to configure client side scripts.

You can find the list of payment methods supported by Marketcloud in your application's dashboard under the **settings** > **payments** page. There you will also find a link to the documentation related to each payment method.

> **Info**
> In order to create payments using a payment method, you must enable and configure that method in your dashboard.



### Create a payment

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| method  **Required**  | String | A valid name of one of the supported payment methods. You can see a list of supported payment methods in Dashboard > settings > payments. |
| order_id | Integer | The id of the order related to this payment. |
|  | Mixed | Every payment method requires different additional parameters. Refer to the payment method documentation for more informations. |



**Example request**

```

// Braintree example
var payment = {
  method: 'Braintree',
  order_id: created_order.id,
  nonce: 'nonce-from-braintree.js'
};

marketcloud.payments.create(payment);

// Stripe example
var payment = {
  method: 'Stripe',
  order_id: created_order.id,
  source: 'value-from-stripe.js'
};

marketcloud.payments.create(payment);

// In both cases, nonce and source are obtained from Braintree
// and Stripe servers using their client side SDKs

```





## Products



### Create a product

**Arguments**



| Parameter | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The product name |
| sku | String | The product sku identifier |
| category_id | Number | The category identifier |
| brand_id | Number | The brand identifier |
| store_id | Number | The store identifier |
| description | String | A description for the product |
| price  **Required**  | Number | The product price |
| stock_type  **Required**  | Number | The stock type for the product |
| stock_level | Number | The stock level for the product |
| stock_status | String | The stock_status indicates whether the |
| published | Boolean | The status of the product |
| `` | Mixed | This resource accepts custom attributes. |



**Example request**

```
marketcloud.products.create(new_product)
.then(function(product){
  // Your code here
})

```





### Retrieve a product

Retrieves a product by its id

**Example request**

```
marketcloud.products.getById(888)
.then(function(product){    
  // Your code here          
});

```

**Example response**

```

{
    "id": 13687,
    "name": "A song of fire and ice: A feast for crows",
    "sku": "ASOFAI_AFFC",
    "price": 7.79,
    "description": "A brief description of this book.",
    "published": true,
    "stock_level": 30,
    "stock_type": "track",
    "stock_status": null,
    "author": "George R. R. Martin",
    "isbn-10": "055358202X",
    "isbn-13": "978-0553582024",
    "pages": 1060,
    "editor": "Bantam Books",
    "genre": "Fantasy",
    "cover": "Paperback",
    "publication_year": "2001"
  }

```

Note that starting from author, the remaining fields are custom attributes defined when the product was created.



### List all products

Retrieves a list of products filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| q | String | Filter results performing a text research on your products. |
| price_gt | Number | Display only products that cost more than the specified value. |
| price_lt | Number | Display only products that cost less than the specified value. |
| category_id | Number | Display products that belongs to a particular category. |
| brand_id | Number | Display products that belongs to a particular brand. |
| category | String | Display only products that belongs to the specified category path or to a sub category. For example, `?category=/shoes` matches all producs in categories /shoes, /shoes/running /shoes/classic and other subcategories of "shoes" |
| `` | Mixed | Filter products by any custom field. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



**Example request**

```

var query = {category_id : 5,price_lt:50}
marketcloud.products.list(query)
.then(function(products){
          // Your code here
})

```

The previous example queries the api for products that belongs to the category with id equal to 5 and that cost less than 50



### Update a product

Updates a product by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The univocal product identifier |
| update_data  **Required**  | Object | An object containing the updates. See [products.create()](#products.create) for more informations. |



**Example request**

```

marketcloud.products.update(product_id,update_data)
.then(function(product){
  // Your code here
})

```



### Delete a product

Delete a product by id.

**Example request**

```

marketcloud.products.delete(product_id)
.then(function(){
  // Your code here
})

```



 