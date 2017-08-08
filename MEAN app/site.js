//var globalPath = '/usr/lib/node_modules/';
var express = require( 'express');
var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main', //настройка шаблона представлений
    helpers:{
        section: function(name, options){
            if(!this._sections) this._sections={};
            this._sections[name] = options.fn(this);
            return null;
        } //настройка вспомогательного элемента #section, для внедрения части кода в представление
    }
});
var bodyParser = require('body-parser');
var prediction = require('./lib/prediction.js');
exports.start = function () {
    //настаиваем view в MVC
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

    //порядок важен!
    //первым делом, задаем порт
    app.set('port', process.env.PORT || 3000);
    // активирум  кэширование представлений("вьюшек")
    app.set('view cache', true);
    //добавим промежуточное ПО (middleware)
    app.use(express.static(__dirname + '/public/'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(function (req, res, next) {
        if(!res.locals.partials) res.locals.partials = {};
        res.locals.partials.predictionContext = prediction.getFortune();
        next();
    });
    //промежуточное ПО для прогонки тестов и чтения запроса в url после знака ?
    app.use(function (req, res, next) {
        res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
        next();
    });

    //следом за ним идет роутинг (маршрутизация)
    app.get('/', function (req, res) {
        res.render('home', {
            prediction: prediction.getFortune()
        });
    });
    //скачивание любого файла с папки проекта при адресации (нажатии на ссылку ссылвющуюся) на указанный файл <a href="/download/filename"></a>
    app.get('/download/:file', function (req, res) {
        var file = req.params.file;
        console.log(file);
        res.download('public/uploads/' + file);
    });


    app.get('/about', function (req, res) {
        res.render('about');
    });

    //функция выдачи рандомного предсказания getFortune из модуля prediction.js и страничный тест.
    /*app.get('/app', function (req, res) {
            res.render('app', {
                prediction: prediction.getFortune(),
                pageTestScript: '/qa/tests-about.js'
            });
        })*/
    app.get('/reqres', function (req, res) {

        var request = {
            Request_path: req.path,
            Request_IP: req.ip,
            Request_HOST: req.hostname,
            Request_protocol: req.protocol,
            Request_acceptedLanguage: req.acceptedLanguages,
            Request_url: req.url,

        };
        res.send('200', request);
    });

    app.get('/contact', function (req, res) {
        res.render('contact');
    });

    app.get('/blog', function (req, res) {
        res.render('blog');
        //res.render('blog', { layout: 'blogLayout' }); - указание макета blogLayout.handlebars для предстваления blog.handlebars
    });
    //зададим страницы отображения для отображения страниц со статусом ответа, отличным от 200
    app.use(function (req, res) {
        res.status(404).render('404');
    });

    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).render('500');
    });

    //добавим защиту, отключив заголовок Express
    app.disable('x-powered-by');

    app.listen(app.get('port'), function () {
        console.log('Express запущен на localhost:' + app.get('port') + '\n нажмите Ctrl+C для завершения.');
    });
};

