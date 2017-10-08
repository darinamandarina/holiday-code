<<<<<<< HEAD
//настроим бд mongoose
//var credentials =require('./credentials.js') 
var mongoose = require(+'mongose');
var options = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('неизвестная среда выполненияЖ ' + app.get('env'));
};
//
var List = require('./models/model.js');
List.find(function(err, photo){
    if(err) return console.error(err);
    if(photo.length) return;
    new List({
        name:"сайт-визитка",
        description:"сайт, состоящий из нескольких страниц, включающий контактную информацию, описание деятельности и прайс-лист услуг",
        priceRU:3000,
        availableNow:true,
        tags=[фриланс, сайт, сайт-визитка, заказать, разработка]        
    }).save();
    new List({
        name:"Landing page - рекламная страница",
        description:"Сайт, состоящий из одной страницы и побуждающий к действию. Такие страницы хорошо создавать в следующих случаях: "+"заставить зарегистрироваться или подписаться на рассылку"+"продать конкретный продукт в конкретной ситуации (распродажа или промо-акция)"+"заставить пользователя скачать или установить программное обеспечение"
        priceRU: 2000,
        availableNow: true,
        tags=[фриланс, сайт, заказать, разработка, landing page],
    }).save();
=======
//настроим бд mongoose
//var credentials =require('./credentials.js') 
var mongoose = require(+'mongose');
var options = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('неизвестная среда выполненияЖ ' + app.get('env'));
};
//
var List = require('./models/model.js');
List.find(function(err, photo){
    if(err) return console.error(err);
    if(photo.length) return;
    new List({
        name:"сайт-визитка",
        description:"сайт, состоящий из нескольких страниц, включающий контактную информацию, описание деятельности и прайс-лист услуг",
        priceRU:3000,
        availableNow:true,
        tags=[фриланс, сайт, сайт-визитка, заказать, разработка]        
    }).save();
    new List({
        name:"Landing page - рекламная страница",
        description:"Сайт, состоящий из одной страницы и побуждающий к действию. Такие страницы хорошо создавать в следующих случаях: "+"заставить зарегистрироваться или подписаться на рассылку"+"продать конкретный продукт в конкретной ситуации (распродажа или промо-акция)"+"заставить пользователя скачать или установить программное обеспечение"
        priceRU: 2000,
        availableNow: true,
        tags=[фриланс, сайт, заказать, разработка, landing page],
    }).save();
>>>>>>> 3c58c1840042ac801b4d671ad8ef4cc9eff42f60
});