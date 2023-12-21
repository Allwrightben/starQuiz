const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreArea = document.getElementById('scoreArea');
const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
let totalQuestions = 10;
let score = 0;
let shuffledQuestions, currentQuestionIndex

document.addEventListener("DOMContentLoaded", function () {

    openButton.addEventListener('click', () => {
        modal.showModal()
    })

    closeButton.addEventListener('click', () => {
        modal.close()
    })



    //event listeners for the start and next buttons. 
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })
})

/**
 * The startGame function is responsible for starting the game. 
 * It hides the start button, shuffles the questions, sets the 
 * current question index to 0, shows the question container, 
 * and sets the next question.
 */
function startGame() {
    //sets score to 0 and desplays it
    score = 0;
    document.getElementById('score').innerText = 'Score:' + score;
    //sets number of questions left back to 10 and displays it
    totalQuestions = 10;
    document.getElementById('question-count').innerText = 'Questions left: ' + totalQuestions;
    scoreArea.classList.remove('hide')
    //hides the start button after the game has started
    startButton.classList.add('hide')
    //shuffles through questions to make the quiz different everytime.
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    //give 10 random questions from available questions
    shuffledQuestions = shuffledQuestions.slice(0, 10)
    //set question index to 0
    currentQuestionIndex = 0
    //displays questions after the game starts
    questionContainerElement.classList.remove('hide')
    //chooses the 1st/next question
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    answerButtonsElement.classList.remove('disbtn')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    totalQuestions--;
    document.getElementById('question-count').innerText = 'Questions left: ' + totalQuestions;
    Array.from(answerButtonsElement.children).forEach(button => {
        answerButtonsElement.classList.add('disbtn')
    });
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score + '/10';
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        if (score >= 8) {
            alert('Congratulations! You scored ' + score + ' out of 10. You did great!');
        } else if (score >= 6) {
            alert('You scored ' + score + ' out of 10. You did well, try again!');
        } else {
            alert('You scored ' + score + ' out of 10. Better luck next time!');
        }
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

let questions = [{
        question: 'Where was Darth Vader born?',
        answers: [{
                text: 'Tatooine',
                correct: true
            },
            {
                text: 'Naboo',
                correct: false
            },
            {
                text: 'Earth',
                correct: false
            },
            {
                text: 'Alderan',
                correct: false
            },
        ]
    },
    {
        question: "What colour was Mace Windo's light saber?",
        answers: [{
                text: 'Orange',
                correct: false
            },
            {
                text: 'Green',
                correct: false
            },
            {
                text: 'Blue',
                correct: false
            },
            {
                text: 'Purple',
                correct: true
            },
        ]
    },
    {
        question: 'Star Wars takes place in a galaxy... Where?',
        answers: [{
                text: 'Andromeda',
                correct: false
            },
            {
                text: 'Far, far away',
                correct: true
            },
            {
                text: 'The Milky Way',
                correct: false
            },
            {
                text: 'Middle Earth',
                correct: false
            },

        ]
    },
    {
        question: 'The teddy-bear-like creatures seen in "Return of the Jedi" are called what?',
        answers: [{
                text: 'Teddy Bears',
                correct: false
            },
            {
                text: 'Jawas',
                correct: false
            },
            {
                text: 'Ewoks',
                correct: true
            },
            {
                text: 'Wookies',
                correct: false
            },

        ]
    },
    {
        question: "Who is Luke's father?",
        answers: [{
                text: 'Mace Windo',
                correct: false
            },
            {
                text: 'Anakin',
                correct: true
            },
            {
                text: 'Qui-gon',
                correct: false
            },
            {
                text: 'C3PO',
                correct: false
            },

        ]
    },
    {
        question: 'In Episode 4, what crucial secret does R2-D2 carry in his memory?',
        answers: [{
                text: 'A love letter to C3PO',
                correct: false
            },
            {
                text: 'Darth Vaders true identity',
                correct: false
            },
            {
                text: 'Location of the rebels',
                correct: false
            },
            {
                text: 'Death Star plans',
                correct: true
            },

        ]
    },
    {
        question: 'What year was the first Star Wars movie released?',
        answers: [{
                text: '1877',
                correct: false
            },
            {
                text: '1977',
                correct: true
            },
            {
                text: '1979',
                correct: false
            },
            {
                text: '1981',
                correct: false
            },

        ]
    },
    {
        question: 'The ancient enemy of the Jedi are called?',
        answers: [{
                text: 'The Hutts',
                correct: false
            },
            {
                text: 'Imperials',
                correct: false
            },
            {
                text: 'Sith',
                correct: true
            },
            {
                text: 'Storm Troopers',
                correct: false
            },

        ]
    },
    {
        question: "Who was Darth Vader's apprentice?",
        answers: [{
                text: 'Ahsoka',
                correct: true
            },
            {
                text: 'Starkiller',
                correct: false
            },
            {
                text: 'Asajj Ventress ',
                correct: false
            },
            {
                text: 'Obi-Wan',
                correct: false
            },

        ]
    },
    {
        question: "Who was count Dooku's Master?",
        answers: [{
                text: 'Qui-gon',
                correct: false
            },
            {
                text: 'Jordan White',
                correct: false
            },
            {
                text: 'Mace Windo',
                correct: false
            },
            {
                text: 'Yoda',
                correct: true
            },

        ]
    },
    {
        question: "Who was the apprentice of Darth Plagueis the wise?",
        answers: [{
                text: 'Mace Windo',
                correct: false
            },
            {
                text: 'Boba Fett',
                correct: false
            },
            {
                text: 'Stuart Crang',
                correct: false
            },
            {
                text: 'Sheev palpatine',
                correct: true
            },

        ]
    },
    {
        question: "In which movie did Princess Leia wear the infamous gold bikini?",
        answers: [{
                text: 'Episode 2',
                correct: false
            },
            {
                text: 'Episode 4',
                correct: false
            },
            {
                text: 'Episode 6',
                correct: true
            },
            {
                text: 'Episode 8',
                correct: false
            },

        ]
    },
    {
        question: "What was Obi-Wan Kenobi's relationship to Luke Skywalker?",
        answers: [{
                text: "Luke's second cousin",
                correct: false
            },
            {
                text: 'A jedi talent scout',
                correct: false
            },
            {
                text: 'He was a mentor to his father',
                correct: true
            },
            {
                text: 'His uncle',
                false: false
            },

        ]
    },
    {
        question: "Luke Skywalker lost which body part in “Episode IV: The Empire Strikes Back",
        answers: [{
                text: 'His finger',
                correct: false
            },
            {
                text: 'His head',
                correct: false
            },
            {
                text: 'His leg',
                correct: false
            },
            {
                text: 'His hand',
                correct: true
            },

        ]
    },
    {
        question: "Who ordered that Han Solo be frozen in carbonite?",
        answers: [{
                text: 'Adam Yule',
                correct: false
            },
            {
                text: 'Boba Fett',
                correct: false
            },
            {
                text: 'Jabba the Hutt',
                correct: false
            },
            {
                text: 'Darth Vader',
                correct: true
            },

        ]
    },
    {
        question: "Who did R2-D2 not work with over the course of the nine films?",
        answers: [{
                text: 'Admiral Akbar',
                correct: true
            },
            {
                text: 'Luke Skywalker',
                correct: false
            },
            {
                text: 'Queen Amadala',
                correct: false
            },
            {
                text: 'Rey',
                correct: false
            },

        ]
    },
    {
        question: "Rey was revealed to be the granddaughter of who?",
        answers: [{
                text: 'Jack Shoebridge',
                correct: false
            },
            {
                text: 'Obi-Wan Kenobi',
                correct: false
            },
            {
                text: 'The Emperor',
                correct: true
            },
            {
                text: 'Han Solo',
                correct: false
            },

        ]
    },
    {
        question: "What is Kylo Ren's real name?",
        answers: [{
                text: 'Ben Organa',
                correct: false
            },
            {
                text: 'Ben Kenobi',
                correct: false
            },
            {
                text: 'Ben Skywalker',
                correct: false
            },
            {
                text: 'Ben Solo',
                correct: true
            },

        ]
    },
    {
        question: "What is the real name of Baby yoda?",
        answers: [{
                text: 'Fred',
                correct: false
            },
            {
                text: 'Grogu',
                correct: true
            },
            {
                text: 'Goku',
                correct: false
            },
            {
                text: 'Gollum',
                correct: false
            },

        ]
    },
    {
        question: "Mandalorians often use this line?",
        answers: [{
                text: '"There can be only two"',
                correct: false
            },
            {
                text: '"Control the controlables"',
                correct: false
            },
            {
                text: '"May the force be with you"',
                correct: false
            },
            {
                text: '"This is the way"',
                correct: true
            },

        ]
    },
]