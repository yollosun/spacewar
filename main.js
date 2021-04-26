// let button = document.getElementById('but')
// // let all = document.getElementsByClassName('all')
// let test = document.getElementsByClassName('test')[0]
// button.addEventListener('click', bum)
// let points = 8
// function bum() {
//     if (points < 7) {
//         all[0].innerHTML = "<div class='bum'>Hello</div>"
//     } else {
//         all[0].innerHTML = 'Победа'
//     }
//     console.log(all)

// // }
// let arr = [{ 'id': 1, 'ques': 'dkls0', 'ans': ['true', 'false'], 'anst': 'true' },
// { 'id': 2, 'ques': 'dkls1', 'ans': ['true', 'false'], 'anst': 'true' },
// { 'id': 3, 'ques': 'dkls2', 'ans': ['true', 'false'], 'anst': 'false' },
// { 'id': 4, 'ques': 'dkls3', 'ans': ['true', 'false'], 'anst': 'true' },
// { 'id': 5, 'ques': 'dkls4', 'ans': ['true', 'false'], 'anst': 'false' },
// ]

// let points = 0
// let i = 0
// function bum() {
//     test.innerHTML = `<div><div>${arr[i].ques}</div> <button value ='true'>true</button> <button value ='false'>false</button> </div>`
//     i += 1
//     console.log(i, 'func')
//     console.log(arr[i])
// }

const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const page = document.getElementsByClassName("all")

function show_bum() {
    $('.all').addClass('bum')
    $('.tests').addClass('none')
    page[0].innerHTML = '<h2 class="lose">Котики захватили базу.<br> &#128557; Мы проиграли &#128557; </h2>'
}
function show_happ() {
    $('.all').addClass('happ')
    $('.tests').addClass('none')
    page[0].innerHTML = '<h2 class="win">Котики трусливо сбежали!<br> &#129321;Мы победили!&#129321;</h2>'
}

//Класс, который представляет сам тест
class Quiz {
    constructor(type, questions, results) {
        //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index) {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if (value >= 1) {
            correct = index;
        }
        else {
            //Иначе ищем, какой ответ может быть правильным
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next() {
        this.current++;

        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;


            }
        }
        if (this.result < 2) {
            show_bum()
        } else {
            show_happ()
        }

    }
}

//Класс, представляющий вопрос
class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

//Класс, представляющий ответ
class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

//Класс, представляющий результат
class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value) {
        if (this.value <= value) {
            return true;
        }
        else {
            return false;
        }
    }
}

//Массив с результатами
const results =
    [
        new Result("Вам многому нужно научиться", 0),
        new Result("Вы уже неплохо разбираетесь", 2),
        new Result("Ваш уровень выше среднего", 4),
        new Result("Вы в совершенстве знаете тему", 6)
    ];

//Массив с вопросами
const questions =
    [
        new Question("Цикл можно создать с помощью ключевого слова for ",
            [
                new Answer("True", 1),
                new Answer("False", 0),
            ]),

        new Question("Цикл можно создать с помощью ключевого слова loop",
            [
                new Answer("True", 0),
                new Answer("False", 1),
            ]),

        new Question("Так мы сможем атаковать 100 раз:<br>for(let i=0; i<200; i++){<br>console.log('Атака!')<br>}",
            [
                new Answer("True", 0),
                new Answer("False", 1),
            ]),

        new Question("Такая запись неверна:<br>for(let i=200){<br>console.log('Атака!')<br>}",
            [
                new Answer("True", 1),
                new Answer("False", 0),
            ]),

        new Question("Цикл можно создать с помощью ключевого слова while",
            [
                new Answer("True", 1),
                new Answer("False", 0),
            ]),

        new Question("Так мы сможем атаковать 3 раза:<br>let i = 0;<br> while (i < 3){<br> alert('Атака');<br>i++;<br>}",
            [
                new Answer("True", 1),
                new Answer("False", 0),
            ])
    ];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
    //Проверяем, есть ли ещё вопросы
    if (quiz.current < quiz.questions.length) {
        //Если есть, меняем вопрос в заголовке
        headElem.innerHTML = `<p>${quiz.questions[quiz.current].text}</p>`;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
    else {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Очки: " + quiz.score;
    }
}

function Init() {
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);

    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    //Делаем кнопки серыми
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }

    // Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if (quiz.type == 1) {
        if (correct >= 0) {
            btns[correct].className = "button button_correct";
        }

        if (index != correct) {
            btns[index].className = "button button_wrong";
        }
    }
    else {
        //Иначе просто подсвечиваем зелёным ответ пользователя
        btns[index].className = "button button_correct";
    }

    //Ждём секунду и обновляем тест
    setTimeout(Update, 1000);
}