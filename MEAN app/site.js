var express = require('/usr/lib/node_modules/express');
var app = express();
var handlebars = require('/usr/lib/node_modules/express-handlebars').create({
    defaultLayout: 'main'
});
var prediction = require('./lib/prediction.js');
exports.start = function () {
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');
        //порядок важен!
        //первым делом, задаем порт
        app.set('port', process.env.PORT || 3009);

        //следом за ним идет роутинг (маршрутизация)
        //добавим промежуточное ПО(middleware)
        app.use(express.static(__dirname + '/public'));
        
        app.use(function(req,res,next){
            var x = Number(req.query.x);
        });

        app.get('/', function (req, res) {
            res.render('home');
        });

        app.get('/about', function (req, res) {
            res.render('about', {
                prediction: prediction.getFortune()
            });
        });

        app.use(function (req, res) {
            res.status(404);
            res.render('404');
        });

        app.use(function (err, req, res, next) {
            console.log(err.stack);
            res.status(500);
            res.render('500');
        });
        //добавим промежуточное ПО static


        app.listen(app.get('port'), function () {
            console.log('Express запущен на localhost:' + app.get('port') + '\n нажмите Ctrl+C для завершения.');
        });
    }
    //page 50 in book
