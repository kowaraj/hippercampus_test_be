For the test React client (frontend), see: https://github.com/kowaraj/hippercampus_test_fe

# Create Express API (backend)

npx express-generator be
cd be
npm install
npm start

# Modify

## Change the port in `bin/www`
```
var port = normalizePort(process.env.PORT || '3003');
app.set('port', port);
```

## Routes

Create a router `be/routes/test_be.js`. 

Then `require` and `use` it in `be/app.js`
```
var test_be_router = require("./routes/test_be");
...
app.use("/testAPI", test_be_router);
```