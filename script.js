const questions = [
    {
        question: "Для чего нужна коробка передач на мотоцикле?",
        answers: [
            "Для изменения передаточного отношения",
            "Для охлаждения двигателя",
            "Для зарядки аккумулятора",
            "Для работы фар"
        ],
        correct: 0
    },
    {
        question: "Что делает сцепление?",
        answers: [
            "Отключает двигатель от коробки передач",
            "Охлаждает двигатель",
            "Увеличивает давление в шинах",
            "Включает фары"
        ],
        correct: 0
    },
    {
        question: "Что показывает тахометр?",
        answers: [
            "Скорость мотоцикла",
            "Обороты двигателя",
            "Температуру шин",
            "Уровень топлива"
        ],
        correct: 1
    },
    {
        question: "Для чего нужен ABS?",
        answers: [
            "Для увеличения мощности",
            "Для предотвращения блокировки колёс при торможении",
            "Для уменьшения расхода топлива",
            "Для охлаждения тормозов"
        ],
        correct: 1
    },
    {
        question: "Какой привод чаще всего используется на мотоциклах?",
        answers: [
            "Цепной",
            "Ременной",
            "Гусеничный",
            "Электрический"
        ],
        correct: 0
    },
    {
        question: "Что такое эндуро?",
        answers: [
            "Тип мотоцикла для бездорожья",
            "Вид тормозной системы",
            "Тип двигателя",
            "Марка шин"
        ],
        correct: 0
    },
    {
        question: "Для чего нужен радиатор?",
        answers: [
            "Для охлаждения двигателя",
            "Для увеличения скорости",
            "Для запуска двигателя",
            "Для работы тормозов"
        ],
        correct: 0
    },
    {
        question: "Что означает первая передача?",
        answers: [
            "Самая высокая передача",
            "Самая низкая передача",
            "Передача заднего хода",
            "Нейтраль"
        ],
        correct: 1
    },
    {
        question: "Что такое крутящий момент?",
        answers: [
            "Сила, с которой двигатель способен вращать вал",
            "Температура двигателя",
            "Скорость вращения колеса",
            "Вес мотоцикла"
        ],
        correct: 0
    },
    {
        question: "Для чего проверяют натяжение цепи?",
        answers: [
            "Для правильной и безопасной работы привода",
            "Чтобы увеличить объём двигателя",
            "Чтобы улучшить работу фар",
            "Чтобы снизить температуру воздуха"
        ],
        correct: 0
    },
    {
        question: "Что такое нейтральная передача?",
        answers: [
            "Передача с максимальной скоростью",
            "Состояние, при котором двигатель не передаёт тягу на колесо",
            "Задняя передача",
            "Самая мощная передача"
        ],
        correct: 1
    },
    {
        question: "Для чего нужна передняя вилка?",
        answers: [
            "Для работы подвески переднего колеса",
            "Для подачи топлива",
            "Для охлаждения двигателя",
            "Для переключения передач"
        ],
        correct: 0
    },
    {
        question: "Что делает traction control?",
        answers: [
            "Помогает предотвратить пробуксовку колеса",
            "Увеличивает объём двигателя",
            "Включает поворотники",
            "Охлаждает тормозные диски"
        ],
        correct: 0
    },
    {
        question: "Что такое quickshifter?",
        answers: [
            "Система, позволяющая быстрее переключать передачи",
            "Система охлаждения",
            "Тип тормозов",
            "Тип шин"
        ],
        correct: 0
    },
    {
        question: "Что происходит при торможении двигателем?",
        answers: [
            "Мотоцикл замедляется за счёт сопротивления двигателя",
            "Двигатель выключается",
            "Включается ABS",
            "Увеличивается скорость"
        ],
        correct: 0
    }
];


let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 15;
let timer;


const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");

const progressBar = document.getElementById("progress-bar");

const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");

const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const totalCount = document.getElementById("total-count");

const scorePercent = document.getElementById("score-percent");
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");


totalQuestionsElement.textContent = questions.length;
totalCount.textContent = questions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz() {

    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}


function showQuestion() {

    clearInterval(timer);

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    currentQuestionElement.textContent = currentQuestion + 1;

    answersElement.innerHTML = "";

    for (let i = 0; i < question.answers.length; i++) {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = question.answers[i];

        button.dataset.answer = i;

        button.addEventListener("click", function () {
            checkAnswer(i);
        });

        answersElement.appendChild(button);
    }


    const progress = ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";


    timeLeft = 15;

    timeElement.textContent = timeLeft;

    timerElement.classList.remove("danger");


    timer = setInterval(function () {

        timeLeft--;

        timeElement.textContent = timeLeft;


        if (timeLeft <= 5) {
            timerElement.classList.add("danger");
        }


        if (timeLeft <= 0) {

            clearInterval(timer);

            wrongAnswers++;

            disableAnswers();

            setTimeout(function () {
                nextQuestion();
            }, 700);
        }

    }, 1000);
}


function checkAnswer(answerIndex) {

    clearInterval(timer);

    const question = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer");


    for (let i = 0; i < buttons.length; i++) {

        buttons[i].disabled = true;


        if (i === question.correct) {
            buttons[i].classList.add("correct");
        }

    }


    if (answerIndex === question.correct) {

        correctAnswers++;

    } else {

        wrongAnswers++;

        buttons[answerIndex].classList.add("wrong");
    }


    setTimeout(function () {
        nextQuestion();
    }, 800);
}


function disableAnswers() {

    const buttons = document.querySelectorAll(".answer");

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].disabled = true;

        if (i === questions[currentQuestion].correct) {
            buttons[i].classList.add("correct");
        }
    }
}


function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        showResult();

    } else {

        showQuestion();

    }
}


function showResult() {

    clearInterval(timer);

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");


    correctCount.textContent = correctAnswers;
    wrongCount.textContent = wrongAnswers;
    totalCount.textContent = questions.length;


    const percent = Math.round(
        (correctAnswers / questions.length) * 100
    );


    scorePercent.textContent = percent + "%";


    if (percent >= 90) {

        resultIcon.textContent = "🏆";
        resultMessage.textContent = "Отличный результат! Ты реально разбираешься в мотоциклах.";

    } else if (percent >= 70) {

        resultIcon.textContent = "🔥";
        resultMessage.textContent = "Очень неплохо! Знания уже на хорошем уровне.";

    } else if (percent >= 50) {

        resultIcon.textContent = "👍";
        resultMessage.textContent = "Нормальный результат. Есть куда прокачиваться.";

    } else {

        resultIcon.textContent = "🏍️";
        resultMessage.textContent = "Похоже, пора немного подтянуть знания о мотоциклах.";

    }
}


function restartQuiz() {

    resultScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    startScreen.classList.add("active");

}