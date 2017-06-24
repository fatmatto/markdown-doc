# Marketcloud PHP SDK 

- [Introduction](#introduction)
- [Installation](#installation)
- [Authentication and security](#authentication-and-security)
- [Making requests](#making-requests)
- [Addresses](#addresses)
    * [Arguments](#arguments)
    * [Example request](#example-request)
    * [Arguments](#arguments-1)
    * [Example request](#example-request-1)
    * [Example request](#example-request-2)
    * [Arguments](#arguments-2)
    * [Example request](#example-request-3)
    * [Example request](#example-request-4)
- [Brands](#brands)
    + [Example request](#example-request-5)
    + [Arguments](#arguments-3)
    + [Example request](#example-request-6)
    + [Arguments](#arguments-4)
    + [Example request](#example-request-7)
    + [Arguments](#arguments-5)
    + [Example request](#example-request-8)
    + [Example request](#example-request-9)
- [Carts](#carts)
    + [Arguments](#arguments-6)
    + [Example request](#example-request-10)
    + [Arguments](#arguments-7)
    + [Example request](#example-request-11)
    + [Example request](#example-request-12)
    + [Example request](#example-request-13)
    + [Example request](#example-request-14)
    + [Example request](#example-request-15)
    + [Example request](#example-request-16)
- [Categories](#categories)
    + [Arguments](#arguments-8)
    + [Example request](#example-request-17)
    + [Arguments](#arguments-9)
    + [Example request](#example-request-18)
    + [Example request](#example-request-19)
    + [Arguments](#arguments-10)
    + [Example request](#example-request-20)
    + [Example request](#example-request-21)
- [Collections](#collections)
    + [Example request](#example-request-22)
    + [Arguments](#arguments-11)
    + [Example request](#example-request-23)
    + [Collection entry](#collection-entry)
    + [Example request](#example-request-24)
    + [Arguments](#arguments-12)
    + [Example request](#example-request-25)
    + [Example request](#example-request-26)
- [Coupons](#coupons)
    + [Example request](#example-request-27)
    + [Example request](#example-request-28)
    + [Parameters](#parameters)
    + [Example request](#example-request-29)
    + [Example request](#example-request-30)
    + [Example request](#example-request-31)
- [Orders](#orders)
    + [Arguments](#arguments-13)
    + [Example request](#example-request-32)
    + [Example request](#example-request-33)
    + [Arguments](#arguments-14)
    + [Example request](#example-request-34)
- [Payment methods](#payment-methods)
    + [Usage with orders](#usage-with-orders)
- [Payments](#payments)
    + [Arguments](#arguments-15)
    + [Example request](#example-request-35)
- [Products](#products)
    + [Arguments](#arguments-16)
    + [Example request](#example-request-36)
    + [Example request](#example-request-37)
    + [Example response](#example-response)
    + [Arguments](#arguments-17)
    + [Example request](#example-request-38)
    + [Arguments](#arguments-18)
    + [Example request](#example-request-39)
    + [Example request](#example-request-40)

This is the documentation for the official Marketcloud PHP SDK. It is a wrapper for our REST api and it makes it easier to use.

### Introduction

If you haven't set up an application yet, please refer to this [Getting Started](/documentation/rest-api/gettingstarted) guide.

Your account on Marketcloud can handle multiple marketcloud-apps, each one has its own public key / secret key pair that you insert into your PHP code.

The Marketcloud PHP SDK is open source and publicly available at [Github](https://github.com/Marketcloud/marketcloud-php)

### Installation

The easiest way to get started with the PHP sdk, is to install it with composer:

```
composer require marketcloud/marketcloud-php
```

At this point you can include the sdk in your application

```
require('./vendor/autoload.php');
```

### Authentication and security

Every application identifies itself to Marketcloud using a unique public key. Since you must ship the public key with your client application code, this key is **public**. The application security is guaranteed by the secret key, which you should never share with anyone, since it would allow to ignore every authorization mechanism. The only place where it should be safe to store and use the secret key is (in case you need it) your server side code.

Your app's credentials are stored by the `Marketcloud` object

```
Marketcloud\Marketcloud::setCredentials(array(
  'secret_key' => 'your-secret-key-here',
  'public_key' => 'your-public-key-here'
));
```

The token is transparently handled by the client and generated only when needed.

### Making requests

```

$query = array(
   'category_id' => 1101,
   'price_lt' => 50
)
Marketcloud\Products::get($query);

```



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



### Addresses







##### Arguments



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



##### Example request

```

Marketcloud\Addresses::create($new_address)

```







##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Filter addresses by the customer's id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of addresses to retrieve per page |
| page | Number | The page number of addresses to display |



Retrieves a list of addresses filtered and sorted by the query object.

##### Example request

```

Marketcloud\Addresses::get($query);

```







Retrieves an address by its id.

##### Example request

```

Marketcloud\Addresses::getById($address_id)

```







Updates an address by id.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| address_id  **Required**  | Number | The univocal address identifier |
| update_data  **Required**  | Object | An object containing the updates. See [addresses.create()](#addresses.create) for more informations. |



##### Example request

```

$update_data = array(
    "city" => "Berlin"
    "country" => "Germany"
)
Marketcloud\Addresses::update($address_id, $update_data);

```





Deletes an address by id.

##### Example request

```

Marketcloud\Addresses::delete($address_id);

```







### Brands





##### Example request

```

Marketcloud\Brands::getById($id);

```





Retrieves a list of Brands filtered and sorted by the query object.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of brands to retrieve per page |
| page | Number | The page number of brands to display |



##### Example request

```

Marketcloud\Brands::get();
```





##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | String |
| image_url | String | The URL for the brand image/logo. |
| description | String | A description of the brand. |
| url | String | A label to be used in urls. |



##### Example request

```

$new_brand = array("name" => "Evil Inc.");
Marketcloud\Brands::create($new_brand);

```





Updates a brand by id.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| brand_id  **Required**  | Number | The univocal brand identifier |
| update_data  **Required**  | Object | An object containing the updates. See [brands.create()](#brands.create) for more informations. |



##### Example request

```

$update = array("name" => "Good Inc.");
Marketcloud\Brands::update($brand_id,$update);

```





Deletes a brand by id.

##### Example request

```

Marketcloud\Brands::delete($brand_id);

```





### Carts





Creates a new cart with a product in it.

##### Arguments



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



##### Example request

```

Marketcloud\Carts::create(array(
            "items" => array(
              array( "product_id" => 2222, "quantity" =>2 ),
              array( "product_id" => 3333, "quantity" =>2 )
            )
)

```





Retrieves a list of carts filtered and sorted by the query object.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Display carts that belong to the user with the given id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



##### Example request

```

Marketcloud\Carts::get($query);

```





##### Example request

```

Marketcloud\Carts::getById($cart_id);

```





##### Example request

```

Marketcloud\Carts::add($cart_id,
        array( array("product_id" => 5785, "quantity" =>2))
)

```





Update quantities of products in cart or add new products to cart.

##### Example request

```

Marketcloud\Carts::update(testCart.id,array(
  array("product_id" => 5712,"quantity" =>1),
  array("product_id" => 5785,"quantity" =>1)
))

```





##### Example request

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





Deletes a cart by id.

##### Example request

```

Marketcloud\Carts::delete($cart_id)

```





### Categories





##### Arguments



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The category name |
| description | String | A description of the category |
| image_url | String | The URL for the category image/logo |
| url | String | A label to be used in urls |
| parent_id | Number | Null if it is a category.
With a value represents the parent category identifier, and this is a subcategory |



##### Example request

```

$new_category = array( "name" => "T-Shirts");
Marketcloud\Categories::create($new_category);

```





Retrieves a list of categories filtered and sorted by the query object.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of categories to retrieve per page |
| page | Number | The page number of categories to display |



##### Example request

```

$query = array("path" => "/T-Shirts");
Marketcloud\Categories::get($query);

```





Retrieves a category by its id.

##### Example request

```

Marketcloud\Categories::getById($category_id);

```





Updates a category by id.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| category_id  **Required**  | Number | The univocal category identifier |
| update_data  **Required**  | Object | An object containing the updates. See [categories.create()](#categories.create) for more informations. |



##### Example request

```

$update_data = array("name" => "tshirts");
Marketcloud\Categories::update($category_id,$update_data);

```





Deletes a category by id.

##### Example request

```

Marketcloud\Categories::delete($category_id);

```





### Collections





##### Example request

```

//Retrieves a collection by its id
Marketcloud\Collections::getById($id);

```





Retrieves a list of Collections filtered and sorted by the query object.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Integer | The number of collections to retrieve per page |
| page | Integer | The page number of collections to display |



##### Example request

```

Marketcloud\Collections::get();

```







| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The name of the collection |
| slug | String | URL friendly string |
| Description | String | A description of the collection |
| items | Array | An array of collection entries, see the table below for more details |



##### Collection entry



| Attribute | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The id of the product entry. |
| variant_id  **Required**  | Number | The variant_id of the product entry |



##### Example request

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





Updates a collection by id.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| collection_id  **Required**  | Integer | The univocal collection identifier |
| update_data  **Required**  | Object | An object containing the updates. See [Collections::create()](#collections.create) for more informations. |



##### Example request

```

$collection_update = array("name" => "2016 Spring Collection");
Marketcloud\Collections::update($collection_id,$collection_update);

```





Deletes a collection by id.

##### Example request

```

Marketcloud\Collections::delete($collection_id);

```





### Coupons





##### Example request

```
//Retrieves a coupon by its id
Marketcloud\Coupons::getById($id);

```





##### Example request

```
//Retrieves a paginated list of coupons
$query = array(
  "active" => true 
)
Marketcloud\Coupons::get($query);

```





##### Parameters



| Attribute | Type | Description |
| --- | --- | --- |
| name  **Required**  | String | The coupon name |
| code  **Required**  | String | The secret code that the customer must match to benefit from the coupon. |
| target_type  **Required**  | String | This parameter tells the API where the coupon can be applied. Use `'CART_COUPON'` if you want to apply a discount to the whole cart, `'PRODUCT_COUPON'` if the discount is appliable only to a specific product, and `'CATEGORY_COUPON'` if the discount can be applied to all products in a certain category. |
| discount_type  **Required**  | String | This parameter tells the API which is the type of discount. Use `'NET_REDUCTION'` if you want to apply a net discount, or use `'PERCENTAGE_DISCOUNT'` if you want to apply a percentage discount. |
| discount_value  **Required**  | Number | The value of the discount, if the discount_type is `PERCENTAGE_DISCOUNT` the discount_value represent the percentage of discount to apply (the percentage is calculated against the target, cart, product or category) |
| active | Boolean | Tells wether the coupon is active or not. |



##### Example request

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





##### Example request

```
//Updates coupon, sets the discount value to 20
$coupon_update = array(
  "name" => "Welcome coupon 20$ discount",
  "discount_value" => 20
)

Marketcloud\Coupons::update($coupon_id,$coupon_update);

```





##### Example request

```
//Delete a coupon by its id
Marketcloud\Coupons::delete($id);

```





### Orders





##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| user_id | Number | Filter orders by the customer's id. |
| fields | String | Comma separated list of attribute names to retrieve. Use it to retrieve only the fields you need. |
| per_page | Number | The number of products to retrieve per page |
| page | Number | The page number of products to display |



##### Example request

```

Marketcloud\Orders::get($query);   

```





##### Example request

```

Marketcloud\Orders::getById($id);

```





##### Arguments



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



##### Example request

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





```
//Updates a new payment method
  Marketcloud\PaymentMethods::update(array("fixed_fee" => 10)

```





```
//Deletes a payment method with id 123
  Marketcloud\PaymentMethods::delete(123)

```





```
//Retrieves a payment method by its id
  Marketcloud\PaymentMethods::getById(payment_method_id)

```





```
//Retrieves a list of payment methods filtered and sorted by the query object
  Marketcloud\PaymentMethods::get(query)

```





### Payments

Marketcloud supports a certain number of payment methods. Most of them requires client side and server side configuration, we try to abstract the server side part, so you just have to configure client side scripts.

You can find the list of payment methods supported by Marketcloud in your application's dashboard under the **settings** > **payments** page. There you will also find a link to the documentation related to each payment method.

> **Info**
> In order to create payments using a payment method, you must enable and configure that method in your dashboard.





##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| method  **Required**  | String | A valid name of one of the supported payment methods. You can see a list of supported payment methods in Dashboard > settings > payments. |
| order_id | Integer | The id of the order related to this payment. |
|  | Mixed | Every payment method requires different additional parameters. Refer to the payment method documentation for more informations. |



##### Example request

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





### Products





##### Arguments



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



##### Example request

```
Marketcloud\Products::create($new_product);

```







Retrieves a product by its id

##### Example request

```
Marketcloud\Products::getById($product_id);

```

##### Example response

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





Retrieves a list of products filtered and sorted by the query object.

##### Arguments



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



##### Example request

```

$query = array(
   'category_id' => 1101,
   'price_lt' => 50
)
Marketcloud\Products::get($query);

```

The previous example queries the api for products that belongs to the category with id equal to 5 and that cost less than 50





Updates a product by id.

##### Arguments



| Field | Type | Description |
| --- | --- | --- |
| product_id  **Required**  | Number | The univocal product identifier |
| update_data  **Required**  | Object | An object containing the updates. See [products.create()](#products.create) for more informations. |



##### Example request

```

$update_data = array("price" => 19, "price_discount" => 12.50);
Marketcloud\Products::update($product_id,$update_data);

```





Delete a product by id.

##### Example request

```

Marketcloud\Products::delete($product_id);

```



 