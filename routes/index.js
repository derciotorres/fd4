const _ = require('lodash');
const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const sql = require('mssql');
var db = require('../db');
var path = require('path');





let details;
let products;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Food Detectives' });
});
/* GET search product */
router.get('/search', function(req, res) {

    let search = req.query.mySearch;
    req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search");

    req.query({
        "offset": "0",
        "number": "10",
        "maxCalories": "5000",
        "minProtein": "0",
        "maxProtein": "100",
        "minFat": "0",
        "maxFat": "100",
        "minCarbs": "0",
        "maxCarbs": "100",
        "minCalories": "0",
        "query": search
    });

    req.headers({
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
    });


    req.end(function (resp) {
        if (res.error) throw new Error(res.error);

        //console.log(resp.body.products);
        // console.log(ids)
        products = resp.body.products;
        res.render('products', {products: resp.body.products})

    });


});

router.post('/signup', function(req, res) {
    var results;
    var username = req.body.username2;
    var password = req.body.password;
    sql.connect(db).then(pool => {
        return pool.request()
            .input('username', sql.VarChar(30), username)
            .input('password', sql.VarChar(30), password)
            .output('returnValue', sql.VarChar(50))
            .execute('usp_Users_UserLogin')
    }).then(result => {
        console.log(result)
        results = result
        console.log(results)
        if (result.output.returnValue == 1) {  
           
            console.log('here');
            res.redirect('/preferences');
       
            console.log('heheheheh')
            
        } else {
            console.log('error')
        }
    }).catch(err => {
        console.log(err)
    })

});

module.exports = router;
// router.get("/details", function(req, res) {
//
//     let searchId = req.query.id;
//             let unirest = require("unirest");
//
//             req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${searchId}`);
//
//             req.headers({
//                 "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//                 "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
//             });
//
//
//             req.end(function (resp) {
//                 if (res.error) throw new Error(res.error);
//
//                 details += resp.body;
//                 res.render('products', {details: resp.body})
//
//                 console.log(resp.body);
//             });
//
// });

   // console.log(products());
  // req.end(function (res) {
  //     if (res.error) throw new Error(res.error);
  //     products = res.body.products;
      //console.log(products)
      // async function badges() {
      //   _.forEach(products, function (product, i) {
      //     return badger = getProduct(product.id)
      //   })
      //  _.forEach(products, function (product, i) {
      //     products[i] = {
      //       title: product.title,
      //       image: product.image,
      //       ids: product.id,
      //       badges: badger[i]
      //     }
      //  });
//});
  // waitForValue(products)
  //
  //
  //     console.log(products)
  //     _.forEach(products, function(product, i){
          //console.log(product.ids);
//           products.ids[i] = {
//               badges: getProduct(product.ids)
//           }
//       });
//       console.log(products)
//       waitForValue();
//     });
//   }
// });
//   function waitForValue(products) {
//     if(!_.isUndefined(products)) {
//       httpMsgs.sendJSON(req, res, {
//         from: 'Server',
//         products: products
//       });
//     }
//     else {
//       setTimeout(waitForValue, 250)
//     }
//     // console.log(products, 'here i am bitch')
//   }
//
//   function getProduct(id) {
//     req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`,
//       {
//         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
//       });

    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);
      // _.forEach(res, function(resp){
      //     console.log(resp[0])
      // })
      //console.log(res)
      // console.log(badgess[products.length - 1])
//       return badgess;
//     });
//   }
// });
module.exports = router;
