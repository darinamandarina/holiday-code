let x=1, y=2;
    let (x=x+1,y=x+2) {   // Отметьте, что здесь выполняется сокрытие переменных
        console.log(x+y); // Выведет 5
    };
console.log(x+y);     // Выведет 3
/****/
let x=1, y=2;
console.log(let (x=x+1,y=x+2) x+y); // Аналогичный код. Выведет 5