const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")

openButton.addEventListener('click', () => {
    modal.showModal()
})

closeButton.addEventListener('click', () => {
    modal.close()
})

let shuffledQuestions, currentQuestionIndex

//event listeners for the start and next buttons. 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

/**
 * The startGame function is responsible for starting the game. 
 * It hides the start button, shuffles the questions, sets the 
 * current question index to 0, shows the question container, 
 * and sets the next question.
 */

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
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

function resetState(){
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
    }
    if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText ='Restart'
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

let score = 0;

let questions = [
    {
        question: 'Where was Darth Vader born?',
        answers: [
            {text: 'Tatooine', correct: true},
            {text: 'Naboo', correct: false},
            {text: 'Earth', correct: false},
            {text: 'Alderan', correct: false},
        ]
    },
    {
        question: "What colour was Mace Windo's light saber?",
        answers: [
            {text: 'Orange', correct: false},
            {text: 'Green', correct: false},
            {text: 'Blue', correct: false},
            {text: 'Purple', correct: true},
        ]
    },
    {
        question: 'Star Wars takes place in a galaxy... Where?',
        answers: [
            {text: 'Andromeda', correct: false},
            {text: 'Far, far away', correct: true},
            {text: 'The Milky Way', correct: false},
            {text: 'Middle Earth', correct: false},
            
        ]
    },
    {
        question: 'The teddy-bear-like creatures seen in "Return of the Jedi" are called what?',
        answers: [
            {text: 'Teddy Bears', correct: false},
            {text: 'Jawas', correct: false},
            {text: 'Ewoks', correct: true},
            {text: 'Wookies', correct: false},
            
        ]
    },
    {
        question: "Who is Luke's father?",
        answers: [
            {text: 'Mace Windo', correct: false},
            {text: 'Anakin', correct: true},
            {text: 'Darth Vader', correct: true},
            {text: 'C3PO', correct: false},
            
        ]
    },
    {
        question: 'In Episode 4, what crucial secret does R2-D2 carry in his memory?',
        answers: [
            {text: 'A love letter to C3PO', correct: false},
            {text: 'Darth Vaders true identity', correct: false},
            {text: 'Location of the rebels', correct: false},
            {text: 'Death Star plans', correct: true},
            
        ]
    },
    {
        question: 'What year was the first Star Wars movie released?',
        answers: [
            {text: '1877', correct: false},
            {text: '1977', correct: true},
            {text: '1979', correct: false},
            {text: '1981', correct: false},
            
        ]
    },
    {
        question: 'The ancient enemy of the Jedi are called?',
        answers: [
            {text: 'The Hutts', correct: false},
            {text: 'Imperials', correct: false},
            {text: 'Sith', correct: true},
            {text: 'Storm Troopers', correct: false},
            
        ]
    },
    {
        question: "Who was Darth Vader's apprentice?",
        answers: [
            {text: 'Ahsoka', correct: true},
            {text: 'Starkiller', correct: false},
            {text: 'Asajj Ventress ', correct: false},
            {text: 'Obi-Wan', correct: false},
            
        ]
    },
    {
        question: "Who was count Dooku's Master?",
        answers: [
            {text: 'Qui-gon', correct: false},
            {text: 'Exar Kun', correct: false},
            {text: 'Mace Windo', correct: false},
            {text: 'Yoda', correct: true},
            
        ]
    },
    {
        question: "BONUS QUESTION: Who was the apprentice of Darth Plagueis the wise?",
        answers: [
            {text: 'Darth Sideous', correct: true},
            {text: 'The Emperor', correct: true},
            {text: 'Senator Palpatine', correct: true},
            {text: 'Sheev', correct: true},
            
        ]
    },
]
