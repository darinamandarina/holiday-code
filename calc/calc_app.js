var express = require('/usr/lib/node_modules/express');
var app = express();

app.set('port', 4040);
app.use(function (req, res, next) {
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y || 0);
    var sum = x+y;  //switch(y){ case 0: sum = x;break;  default: sum = x+y;break;}
            
    console.log(sum, typeof(sum));
    res.send(200, sum /*'body.js'*/);
    next();
});

app.listen(app.get('port'), x => console.log('Express app is turn on localhost:' + app.get('port')));
