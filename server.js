var fs = require('fs')
  , express = require('express')
  , app = express();

app.configure(function(){

    // dont cache while testing
    app.use(function(req, res, next){
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        next();
    });

    // set static directory
    app.use(express.static(__dirname + '/src'));

    // file not found, route to index.html
    app.use(function(req, res){
        if (req.url.slice(-1) == "/") {
            res.redirect(req.url.slice(0,-1));
        } else {
            res.sendfile('src/index.html', {root: __dirname });
        }
    });
});

app.listen(8080, '0.0.0.0', function() {
    console.log("Listening on port: 8080");
});

module.exports = app;