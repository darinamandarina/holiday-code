var fs = require('fs');
require('sugar')();
var prompt = require('prompt');
var answer;

// функция, возвращающая то или иное значение, в зависимости от того, какое число сгенерируется
var gnrNum = (function () {
    var toGnrNum = [1, 2].sample();
    if (toGnrNum == 1) {
        return {
            number: toGnrNum,
            result: 'orel'
        }
    } else if (toGnrNum == 2) {
        return {
            number: toGnrNum,
            result: 'reshka'
        }
    }
}());

//объект, объявленный для использования в модуле prompt, посредством передачи его как аргумента методу get.
var num = {
    properties: {
        inpNum: {
            description: 'Enter 1 or 2, where 1 is for orel and 2 is for reshka',
            type: 'number',
            maxLengh: 1,
            pattern: /(1|2)/,
            message: 'You may enter only 1 or 2',
            required: true
        },
        /*answ: {
            description: 'Do you want to play again? (y or n)',
            type: 'string',
            pattern: /y|n/,
            message: 'incorrect input',
            required: true
        } */

    }
};

//функция, сравнивающая два числа (введенное и сгенерированное) и выводящая ответ
var comparingNums = function (enteredNum, generatedNum, file) {
    var result;
    if (enteredNum == generatedNum) {
        console.log('You\'ve guessed!!!');
        result = 1;
        fs.appendFile(file, '\nResult: ' + result +'\n', function (err) {
            if (err) throw err;
        });
    } else {
        console.log('You\'re wrong :( \nTry again')
        result = 0;
        fs.appendFile(file, '\nResult: ' + result+'\n', function (err) {
            if (err) throw err;
        });
    };
    return result
};

// начало ввода данных
prompt.start();


prompt.get(num, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        var str = '\nResults of a game'+'\nYour number: ' + res.inpNum + '\nHere\'s: ' + gnrNum.result;
        console.log('Have you guessed orel or reshka?');
        console.log('your number is ' + res.inpNum);
        console.log('And here\'s a ' + gnrNum.result);
        // запись результатов в файл
        fs.appendFile('log.txt', str, function (err) {
            if (err) throw err;
        });
        //answer = res.answ; 
        console.log(comparingNums(res.inpNum, gnrNum.number, 'log.txt'));
        //return answer 
    }
});
