const express = require('/usr/lib/node_modules/express');
const app = express();
const handlebars = require('/usr/lib/node_modules/express-handlebars').create({
    defaultLayout: 'main'
});
const prediction = require('./lib/prediction.js');
exports.start = function () {
        //настаиваем view в MVC
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');
    
        //порядок важен!
        //первым делом, задаем порт
        app.set('port', process.env.PORT || 3000);
        
        //добавим промежуточное ПО (middleware)
    
        //промежуточное ПО static
        app.use(express.static(__dirname + '/public'));
        
        //промежуточное ПО для прогонки тестов и чтения запроса в url после знака ?
        app.use(function(req,res,next){
            res.locals.showTests = app.get('env')!=='production' && req.query.test==='1';
            next();
        });
    
        //следом за ним идет роутинг (маршрутизация)
        app.get('/', function (req, res) {
            res.render('home');
        });
    
        
        app.get('/about', function (req, res) {
            res.render('about');                
        });
    
        //функция выдачи рандомного предсказания getFortune из модуля prediction.js и страничный тест.
        app.get('/app',function(req,res){
            res.render('app', {
                prediction: prediction.getFortune(),
                pageTestScript: '/qa/tests-about.js'
            });
        })
           .get('/reqres', function(req,res){
            
            let request = {
                Request_path: req.path,
                Request_IP: req.ip,
                Request_HOST:req.hostname,
                Request_protocol:req.protocol,
                Request_acceptedLanguage:req.acceptedLanguages,
                Request_url:req.url,
                
            };
                res.send('200', request);
        });
    
        app.get('/contact', function(req,res){
            res.render('contact');
        });
    
        app.get('/blog', function(res,req){
            res.render('blog');
        });
        //зададим страницы отображения для отображения страниц со статусом ответа, отличным от 200
        app.use(function (req, res) {
            res.status(404);
            res.render('404');
        });

        app.use(function (err, req, res, next) {
            console.log(err.stack);
            res.status(500);
            res.render('500');
        });
        
        //добавим защиту, отключив заголовок Express
        app.disable('x-powered-by');
    
        app.listen(app.get('port'), function () {
            console.log('Express запущен на localhost:' + app.get('port') + '\n нажмите Ctrl+C для завершения.');
        });
    };
    //page 71 - read about tests untill the end of this unit
    //page 90 - continue
