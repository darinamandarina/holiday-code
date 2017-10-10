var mongoose = require('mongoose');
//создадим схему и объявим ее свойства
var goodsSchema = mongoose.Schema({  
    name:String,
    description: String,
    priceRU:Number,
    availableNow:Boolean,
    tags:[String], //массив строк
});
goodsSchema.methods.getUSprice = function(){
    return '$' + (this.priceRU / 60).toFixed(2);
};

//создадим модель схемы
var List = mongoose.model('List', goodsSchema);

module.exports = List;
