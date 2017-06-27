# Marketcloud PHP SDK 

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
  * [Payment methods](#payment-methods)
      - [Usage with orders](#usage-with-orders)
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
- [Promotions](#promotions)
  * [List promotions](#list-promotions)
  * [Create a promotion](#create-a-promotion)
  * [Updates a promotion](#updates-a-promotion)
  * [Delete a promotion](#delete-a-promotion)
  * [Retrieve a promotion](#retrieve-a-promotion)
  * [Get by cart](#get-by-cart)
- [Shippings](#shippings)
  * [Retrieve a shipping](#retrieve-a-shipping)
  * [List all shippings](#list-all-shippings)
  * [Create a new shipping](#create-a-new-shipping)
  * [Update a shipping](#update-a-shipping)
  * [Delete a shipping](#delete-a-shipping)
- [Users](#users)
  * [Authenticates a user](#authenticates-a-user)
  * [Create a new user](#create-a-new-user)
  * [List all users](#list-all-users)
  * [Retrieve a user](#retrieve-a-user)
  * [Update a user](#update-a-user)
  * [Delete a user](#delete-a-user)
- [Variables](#variables)
  * [Create a variable](#create-a-variable)
  * [List variables](#list-variables)
  * [Retrieve a variable](#retrieve-a-variable)
  * [Update a variable](#update-a-variable)
  * [Delete a variable](#delete-a-variable)
## Introduction

This is the documentation for the official Marketcloud PHP SDK. It is a wrapper for our REST api and it makes it easier to use.

If you haven't set up an application yet, please refer to this [Getting Started](https://www.marketcloud.it/documentation/rest-api/gettingstarted) guide.

Your account on Marketcloud can handle multiple marketcloud-apps, each one has its own public key / secret key pair that you insert into your PHP code.

The Marketcloud PHP SDK is open source and publicly available at [Github](https://github.com/Marketcloud/marketcloud-php)

## Installation

The easiest way to get started with the PHP sdk, is to install it with composer:

```
composer require marketcloud/marketcloud-php
```

At this point you can include the sdk in your application

```
require('./vendor/autoload.php');
```

## Authentication and security

Every application identifies itself to Marketcloud using a unique public key. Since you must ship the public key with your client application code, this key is **public**. The application security is guaranteed by the secret key, which you should never share with anyone, since it would allow to ignore every authorization mechanism. The only place where it should be safe to store and use the secret key is (in case you need it) your server side code.

Your app's credentials are stored by the `Marketcloud` object

```
Marketcloud\Marketcloud::setCredentials(array(
  'secret_key' => 'your-secret-key-here',
  'public_key' => 'your-public-key-here'
));
```

The token is transparently handled by the client and generated only when needed.

## Making requests

```

$query = array(
   'category_id' => 1101,
   'price_lt' => 50
)
Marketcloud\Products::get($query);

```

## Handling errors

Errors returned by the SDK have the following structure

```

{
  "code" : 404,
  "type" : "NotFound",
  "message" : "Resource not found"
}

```

Validation error have further attributes:

```

{    
    "code": 400,
    "type": "BadRequest",
    "message": "Bad request",
    "valid": false,
    "failedValidator": "missingRequiredProperty",
    "invalidPropertyName": "price"
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

Marketcloud\Addresses::create($new_address)

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

Marketcloud\Addresses::get($query);

```





### Retrieve an address

Retrieves an address by its id.

**Example request**

```

Marketcloud\Addresses::getById($address_id)

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

$update_data = array(
    "city" => "Berlin"
    "country" => "Germany"
)
Marketcloud\Addresses::update($address_id, $update_data);

```



### Delete an address

Deletes an address by id.

**Example request**

```

Marketcloud\Addresses::delete($address_id);

```







## Brands



### Retrieve a brand

**Example request**

```

Marketcloud\Brands::getById($id);

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

Marketcloud\Brands::get();
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

$new_brand = array("name" => "Evil Inc.");
Marketcloud\Brands::create($new_brand);

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

$update = array("name" => "Good Inc.");
Marketcloud\Brands::update($brand_id,$update);

```



### Delete a brand

Deletes a brand by id.

**Example request**

```

Marketcloud\Brands::delete($brand_id);

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

Marketcloud\Carts::create(array(
            "items" => array(
              array( "product_id" => 2222, "quantity" =>2 ),
              array( "product_id" => 3333, "quantity" =>2 )
            )
)

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

Marketcloud\Carts::get($query);

```



### Retrieve a cart

**Example request**

```

Marketcloud\Carts::getById($cart_id);

```



### Add items to cart

**Example request**

```

Marketcloud\Carts::add($cart_id,
        array( array("product_id" => 5785, "quantity" =>2))
)

```



### Update cart contents

Update quantities of products in cart or add new products to cart.

**Example request**

```

Marketcloud\Carts::update(testCart.id,array(
  array("product_id" => 5712,"quantity" =>1),
  array("product_id" => 5785,"quantity" =>1)
))

```



### Remove items from cart

**Example request**

```

Marketcloud\Carts::remove(testCart.id,array(
  array("product_id" => 5712),
  array("product_id" => 5785)
))

```

If your store works with **variants**, you need to explicitly indicate which variant you want to add/remove/update .

```

        //Adds an item to the cart
Marketcloud\Carts::add(cart_id,array(
  array( "product_id" => 5785,
    "quantity" =>2,
    "varitant_id" => 3
  )))
//Updates an item in the cart

Marketcloud\Carts::update(cart_id,array(array(
  'product_id'=> 5785,
  'quantity'=>1,
  'variant_id' => 3
)))
        //Remove an item from the cart
Marketcloud\Carts::remove(cart_id,array(array(
  "product_id" => 5785,
  "varitant_id" => 3
)))

```



### Delete a cart

Deletes a cart by id.

**Example request**

```

Marketcloud\Carts::delete($cart_id)

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

$new_category = array( "name" => "T-Shirts");
Marketcloud\Categories::create($new_category);

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

$query = array("path" => "/T-Shirts");
Marketcloud\Categories::get($query);

```



### Retrieve a category

Retrieves a category by its id.

**Example request**

```

Marketcloud\Categories::getById($category_id);

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

$update_data = array("name" => "tshirts");
Marketcloud\Categories::update($category_id,$update_data);

```



### Delete a category

Deletes a category by id.

**Example request**

```

Marketcloud\Categories::delete($category_id);

```





## Collections



### Retrieve a collection

**Example request**

```

//Retrieves a collection by its id
Marketcloud\Collections::getById($id);

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

Marketcloud\Collections::get();

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

$new_collection = array(
"name" => "2016 Winter collection",
"items" => array(
  array("product_id" => 123, "variant_id" => 1),
  array("product_id" => 124, "variant_id" => 1),
  array("product_id" => 125, "variant_id" => 1),
)
);
Marketcloud\Collections::create($new_collection);

```



### Update a collection

Updates a collection by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| collection_id  **Required**  | Integer | The univocal collection identifier |
| update_data  **Required**  | Object | An object containing the updates. See [Collections::create()](#collections.create) for more informations. |



**Example request**

```

$collection_update = array("name" => "2016 Spring Collection");
Marketcloud\Collections::update($collection_id,$collection_update);

```



### Delete a collection

Deletes a collection by id.

**Example request**

```

Marketcloud\Collections::delete($collection_id);

```





## Coupons



### Retrieve a coupon

**Example request**

```
//Retrieves a coupon by its id
Marketcloud\Coupons::getById($id);

```



### List coupons

**Example request**

```
//Retrieves a paginated list of coupons
$query = array(
  "active" => true 
)
Marketcloud\Coupons::get($query);

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
$coupon = array(
  "name" => "Welcome coupon 10$ discount",
  "code" => "XS671GH",
  "type" => "total",
  "target_type" => "CART_COUPON",
  "discount_type" => "NET_REDUCTION",
  "discount_value" => 10
)

Marketcloud\Coupons::create($coupon);

```



### Updates a coupon

**Example request**

```
//Updates coupon, sets the discount value to 20
$coupon_update = array(
  "name" => "Welcome coupon 20$ discount",
  "discount_value" => 20
)

Marketcloud\Coupons::update($coupon_id,$coupon_update);

```



### Delete a coupon

**Example request**

```
//Delete a coupon by its id
Marketcloud\Coupons::delete($id);

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

Marketcloud\Orders::get($query);   

```



### Retrieve an order

**Example request**

```

Marketcloud\Orders::getById($id);

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

$order = array(
  "shipping_address_id" => 111,
  "billing_address" => 111,
  "promotion_id" => $promotion->id,
  "shipping_id" => $shipping_method->id,
  "items" => array(array("product_id" => 1, "quantity" => 1), array("product_id" => 2, "quantity" => 1))
)
Marketcloud\Orders::create(the_order)

```





### Payment methods

Payment methods are a way to describe how customers will pay the goods they are buying. We have some default payment methods which are integrated into the system such as Braintree and Stripe, but your store might want some custom methods, such as cash on delivery.

##### Usage with orders

In order to tell Marketcloud that an order is using a certain payment method, just create an order with a `payment_method_id` value. See [orders.create](#orders.create) for an example



### Create a payment method

```
//Creates a new payment method

$new_payment_method = array(
    "name" => "Cash on delivery",
    "description" => "The order is paid at delivery.",
    "cost_type" => "fixed_fee",
    "fixed_fee" => 5,
    "active" => true
)

  Marketcloud\PaymentMethods::create($new_payment_method)

```



### Update a payment method

```
//Updates a new payment method
  Marketcloud\PaymentMethods::update(array("fixed_fee" => 10)

```



### Delete a payment method

```
//Deletes a payment method with id 123
  Marketcloud\PaymentMethods::delete(123)

```



### Retrieve a payment method

```
//Retrieves a payment method by its id
  Marketcloud\PaymentMethods::getById(payment_method_id)

```



### List all payment methods

```
//Retrieves a list of payment methods filtered and sorted by the query object
  Marketcloud\PaymentMethods::get(query)

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
Marketcloud\Payments::create(array(
  "method" => "Braintree",
  "order_id" => $order->id,
  "nonce" => $BraintreeNonce
));

// Stripe example
Marketcloud\Payments::create(array(
  "method" => "Stripe",
  "order_id" => $order->id,
  "source" => $StripeSource
));

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
Marketcloud\Products::create($new_product);

```





### Retrieve a product

Retrieves a product by its id

**Example request**

```
Marketcloud\Products::getById($product_id);

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

$query = array(
   'category_id' => 1101,
   'price_lt' => 50
)
Marketcloud\Products::get($query);

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

$update_data = array("price" => 19, "price_discount" => 12.50);
Marketcloud\Products::update($product_id,$update_data);

```



### Delete a product

Delete a product by id.

**Example request**

```

Marketcloud\Products::delete($product_id);

```





## Promotions

> **Warning**
> This is a new feature, if you find some issue, please report at info@marketcloud.it. Also, note that you have to create promotions from the dashboard.



### List promotions

**Example request**

```
//Retrieves a paginated list of promotions
$query = array(
  "active" => true 
)
Marketcloud\Promotions::get($query);

```



### Create a promotion



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The name of the promotion |
| conditions  **Required**  | Mixed | An array of conditions, a condition is an object describing the rules under which a promotion can be applied to an order. See the table below for further information |
| effects  **Required**  | Mixed | An array of effects, an effect is an object describing the impact of the promotion on the final order. See the table below for further information |
| active | Boolean | If false, the promotion can not be used by any order. |



**Promotion condition model**



| Attribute | Type | Description |
| --- | --- | --- |
| type  **Required**  | String | The type of the condition, possible values are `'MIN_NUMBER_OF_PRODUCTS'` triggered when the cart has at least a certain number of products, `'MIN_CART_VALUE'` triggered when the total value of the products in cart is greater than or equal to a certain value, `'CART_HAS_ITEM'` when the cart contain a certain item. |
| value  **Required**  | Number | The value of the |



**Promotion effect model**



| Attribute | Type | Description |
| --- | --- | --- |
| type  **Required**  | String | The type of the effect, possible values are `'CART_VALUE_PERCENTAGE_REDUCTION'` will reduce the total cart value by a percentage value, `'CART_VALUE_NET_REDUCTION'` will redduce the total cart value by a fixed value, `'CART_ITEMS_NET_REDUCTION'` will reduce only the value of items by a fixed value, `'CART_ITEMS_PERCENTAGE_REDUCTION'` will reduce only the value of items by a percentage value, `FREE_SHIPPING` will discount the value of shipping. |
| value  **Required**  | Number | The value of the effect. |



**Example request**

```
//Creates a new promotion that grants 
//free shipping on order with a cart value above 70$ 
$promotion = array(
  "name" => "Free shipping above 70$",
  "conditions" => array(
    array(
      "type" => "MIN_CART_VALUE",
      "value" => 70
    )
  ),
  "effects" => array(
    array(
        "type" : "FREE_SHIPPING",
        "value" : "FREE SHIPPING"
      )
  ),

)

Marketcloud\Promotions::create($promotion);

```



### Updates a promotion

**Example request**

```
//Updates promotion,
$promotion_update = array(
"name" => "Free shipping above 50$",
  "conditions" => array(
    array(
      "type" => "MIN_CART_VALUE",
      "value" => 50
    )
  ),
)

Marketcloud\Promotions::update($promotion_id,$promotion_update);

```



### Delete a promotion

**Example request**

```
//Delete a promotion with id $id
Marketcloud\Promotions::delete($id);

```





### Retrieve a promotion

**Example request**

```
//Retrieves a promotion by its id
Marketcloud\Promotions::getById($id);

```



### Get by cart

Retrieves a list of Promotions that can be applied to the given cart.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| cart_id | Integer | Return only those promotion methods are compatibles with the cart with id `cart_id` |



**Example request**

```

// Get eligible promotions for cart with id 1234
Marketcloud\Promotions::getByCart(1234);

```





## Shippings



### Retrieve a shipping

**Example request**

```
//Retrieves a shipping by its id
Marketcloud\Shippings::getById($id);

```



### List all shippings

Retrieves a list of Shippings filtered and sorted by the query object.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Integer | The number of shippings to retrieve per page |
| page | Integer | The page number of shippings to display |
| value | Integer | Return only those shipping methods that allow the wanted total value |
| weight | Integer | Return only those shipping methods that allow the wanted total weight |
| height | Integer | Return only those shipping methods that allow the wanted total height |
| depth | Integer | Return only those shipping methods that allow the wanted total depth |
| width | Integer | Return only those shipping methods that allow the wanted total width |



**Example request**

```

// Get eligible shippings methods for orders
// with a total value of $cart_value
// and a total weight of 40
Marketcloud\Shippings::get(array(
    "value" => $cart_value,
    "weight" => 40
));
```



### Create a new shipping

**Arguments**



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The shipping name |
| base_cost  **Required**  | Number | The base price for this shipping method. |
| per_item_cost | Number | The additional price for each item in the shipment. |
| min_value | Number | Orders with a total price greater than  are eligible for this shipping rule. |
| max_value | Number | Orders with a total price smaller than  are eligible for this shipping rule. |
| min_weight | Number | Orders with a total weight greater than  are eligible for this shipping rule. |
| max_weight | Number | Orders with a total weight smaller than  are eligible for this shipping rule. |
| min_width | Number | Orders with a total width greater than  are eligible for this shipping rule. |
| max_width | Number | Orders with a total width smaller than  are eligible for this shipping rule. |
| min_height | Number | Orders with a total height greater than  are eligible for this shipping rule. |
| max_height | Number | Orders with a total height smaller than  are eligible for this shipping rule. |
| min_depth | Number | Orders with a total depth greater than  are eligible for this shipping rule. |
| max_depth | Number | Orders with a total depth smaller than  are eligible for this shipping rule. |



**Example request**

```

// This shipping is eligible for orders with total value greater than 20
$new_shipping = array(
  "name" => "Free shipping",
  "base_cost" => 0,
  "per_item_cost" => 0,
  "min_value" => 20
);
Marketcloud\Shippings::create($new_shipping);

```



### Update a shipping

Updates a shipping by id.

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| shipping_id  **Required**  | Integer | The univocal shipping identifier |
| update_data  **Required**  | Object | An object containing the updates. See [Shippings::create()](#shippings.create) for more informations. |



**Example request**

```

$update = array("name" => "Fruit");
Marketcloud\Shippings::update($shipping_id,$update);

```



### Delete a shipping

Deletes a shipping by id.

**Example request**

```

Marketcloud\Shippings::delete($shipping_id);

```





## Users



### Authenticates a user

**Example request**

```

//Authenticates a user given email and password
Marketcloud\Users::authenticate('john.snow@wall.com','IKnowNothing')  

```

If the authentication is successful, `data` is an object:

```

{
  "user" : {
    "email" : "john.doe@example.com",
    "full_name" : "John Doe"
  },
  "token" : "SECRET_TOKEN"
}

```

You can use the token to make calls on behalf of the user, but since the SDK works with admin credentials, you should avoid doing it.



### Create a new user

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| email  **Required**  | String | The user mail, must be less than 255 characters long. |
| name  **Required**  | String | The user name |
| password  **Required**  | String | The user password |
| image_url | String | The URL for the user image/logo. |
| `` | Mixed | This resource accepts custom attributes. |



Use this method to register users to you eCommerce app.

**Example request**

```

//Authenticates a user given email and password
Marketcloud\Users::create(array(
  "name" => "John Snow",
  "email" => "john.snow@thewall.com",
  "password" => "IknowKnothing"
))

```



### List all users

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| `` | Mixed | Filter users by any custom field. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



**Example request**

```
Marketcloud\Users::get($query);

```



### Retrieve a user

**Example request**

```

Marketcloud\Users::getById(888)   

```



### Update a user

**Arguments**



| Field | Type | Description |
| --- | --- | --- |
| user_id  **Required**  | Number | The univocal user identifier |
| update_data  **Required**  | Object | An object containing the updates. See [users.create()](#users.create) for more informations. |



**Example request**

```

Marketcloud\Users::update(user_id,update_data)

```



### Delete a user

Delete a user by id

**Example request**

```

Marketcloud\Users::delete($user_id)

```





## Variables

### Create a variable

**Model**



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The variable name |
| value  **Required**  | Mixed | The value of your variable |
| type  **Required**  | String | This parameter tells the API the type of this variable, the possible values are `string`, `number` and `boolean` |



**Example request**

```
//Creates a new variable
$variable = array(
  "name" => "google_analytics_code",
  "code" => "UA-127168162196",
  "type" => "string"
)

Marketcloud\Variables::create($variable);

```



### List variables

**Example request**

```
//Retrieves a paginated list of variables
$query = array(
  "active" => true 
)
Marketcloud\Variables::get($query);

```



### Retrieve a variable

**Example request**

```
//Retrieves a variable by its id
Marketcloud\Variables::getById(123);

```



### Update a variable

**Example request**

```
//Updates a variable
$update = array(
  "name" => "newVariableName"
)
Marketcloud\Variables::update($id,$update);

```



### Delete a variable

**Example request**

```
//Delete a variable by its id
Marketcloud\Variables::delete($id);

```



