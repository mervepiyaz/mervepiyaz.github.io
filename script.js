function Question(text, sound, images, answer) {
    this.text = text;
    this.sound = sound;
    this.images = images;
    this.answer = answer;
}

Question.prototype.checkTheAnswer = function(userAnswer) {
    return userAnswer === this.answer;
};

let questions = [
    new Question("1-", "sounds/salad.m4a", { a: "images/cupcake.jpeg", b: "images/bread.jpeg", c: "images/salad.jpeg" }, "c"),
    new Question("2-", "sounds/tea.m4a", { a: "images/soup.jpeg", b: "images/tea.jpeg", c: "images/butter.jpeg" }, "b"),
    new Question("3-", "sounds/cheese.m4a", { a: "images/salad.jpeg", b: "images/jam.jpeg", c: "images/cheese.jpeg" }, "c"),
    new Question("4-", "sounds/honey.m4a", { a: "images/honey.jpeg", b: "images/cheese.jpeg", c: "images/tea.jpeg" }, "a"),
    new Question("5-", "sounds/soup.m4a", { a: "images/cupcake.jpeg", b: "images/soup.jpeg", c: "images/honey.jpeg" }, "b"),
    new Question("6-", "sounds/cupcake.m4a", { a: "images/jam.jpeg", b: "images/cupcake.jpeg", c: "images/salad.jpeg" }, "b"),
    new Question("7-", "sounds/marmalade.m4a", { a: "images/jam.jpeg", b: "images/bread.jpeg", c: "images/butter.jpeg" }, "a"),
    new Question("8-", "sounds/butter.m4a", { a: "images/cheese.jpeg", b: "images/tea.jpeg", c: "images/butter.jpeg" }, "c"),
    new Question("9-", "sounds/bread.m4a", { a: "images/bread.jpeg", b: "images/honey.jpeg", c: "images/soup.jpeg" }, "a")
];

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
    this.numCorrectAnswers = 0;
}

Quiz.prototype.fetchQuestion = function() {
    return this.questions[this.questionIndex];
}

const quiz = new Quiz(questions);


document.querySelector(".btn-start").addEventListener("click", function() {
    document.querySelector(".quiz_box").classList.add("active");
    showQuestion(quiz.fetchQuestion());
    showNumberQuestion(quiz.questionIndex + 1, quiz.questions.length);
    document.querySelector(".next_btn").classList.remove("show");
})

document.querySelector(".next_btn").addEventListener("click", function() {
    if (quiz.questions.length != quiz.questionIndex + 1) {
        quiz.questionIndex += 1;
        showQuestion(quiz.fetchQuestion());
        showNumberQuestion(quiz.questionIndex + 1, quiz.questions.length);
        document.querySelector(".next_btn").classList.remove("show");
    } else {
        document.querySelector(".quiz_box").classList.remove("active");
        document.querySelector(".score_box").classList.add("active");
        showScore(quiz.questions.length, quiz.numCorrectAnswers);
    }
});

document.querySelector(".btn_quit").addEventListener("click", function() {
    window.location.reload();
});

document.querySelector(".btn_replay").addEventListener("click", function() {
    quiz.questionIndex = 0;
    quiz.numCorrectAnswers = 0;
    document.querySelector(".btn-start").click();
    document.querySelector(".score_box").classList.remove("active");
})

const option_list = document.querySelector(".option_list");

function showQuestion(soru) {
    const option_list = document.querySelector(".option_list");

    let sound = `<audio controls>
                    <source id="sound" type="audio/mpeg" src="${soru.sound}">
                    Your browser does not support the audio element.
                </audio>`;

    let options = '';

    for (let image in soru.images) {
        options +=
            `
                <div class="option">
                    <span><b style="display:none;">${image}</b><img class="img-thumbnail" id="img1" src="${soru.images[image]}" alt="" width="300"
                            height="300"></span>
                </div>
            `;
    }
    document.querySelector(".question_sound").innerHTML = sound;

    document.querySelector(".option_list").innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(option) {
    const option_list = document.querySelector(".option_list");

    let answer = option.querySelector("span b").textContent;
    let question = quiz.fetchQuestion();

    if (question.checkTheAnswer(answer)) {
        quiz.numCorrectAnswers += 1;
        option.classList.add("correct");
    } else {
        option.classList.add("incorrect");
    }

    for (let i = 0; i < option_list.children.length; i++) {
        console.log(option_list.children[i]);
        option_list.children[i].classList.add("disabled");
    }

    document.querySelector(".next_btn").classList.add("show");
}


function showNumberQuestion(numberQuestion, totalQuestions) {
    let tag = `<span class="badge bg-warning">${numberQuestion} / ${totalQuestions}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

function showScore(totalQuestions, numAnswerQuestions) {
    let tag = `You gave ${numAnswerQuestions} correct answers out of a total of ${totalQuestions} questions.`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}