//создадим массив для советов-предсказаний, который будем отображать в представлении about.handlebars в рандомном порядке

//при инкапсуляции (создании и экспорте модулей) надежность кода повышается, т.к. вложенные данные (в нашем случае, массив prediction[]) скрываются

let prediction = ["Будь сильным, и терпеливым, тогда все будет хорошо", "Сохраняй спокойствие и веру в себя, и у тебя все сложится", "Не бойся неведомого, изучай его", "Победи свои страхи или они победят тебя"];


exports.getFortune = function(){
    let index = Math.floor(Math.random() * prediction.length);
    return prediction[index];
};
