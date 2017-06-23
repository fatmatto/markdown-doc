

### Promises

Even if the examples in this reference use callbacks, starting with version 2.0.0 of the SDK, each endpoint method also returns a promise.

```
//This will work
marketcloud.products.list({},function(err,response){
 console.log("My products:",response.data);
})

//And also this works
marketcloud.products.list({})
.then(function(response){
  console.log("My products:",response.data);
})
.catch(function(error){
  console.log("Something went wrong",error);
})

```

For using promises, the SDK needs Bluebird as a dependency. If you are installing this SDK with NPM or Bower, they will handle dependencies for you.