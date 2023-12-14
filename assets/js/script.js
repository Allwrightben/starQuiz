let startButton = document.getElementById('start-btn')
let nextButton = document.getElementById('next-btn')
let questionContainerElement = document.getElementById('question-container')
let questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('start the bloody game')
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
        let button = document.createElement('button')
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
    let selectedButton = e.target
    let correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button.dataset.correct)
    })
    nextButton.classList.remove('hide')
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
        question: 'What clour was Mace Windos light saber?',
        answers: [
            {text: 'Orange', correct: false},
            {text: 'Green', correct: false},
            {text: 'Blue', correct: false},
            {text: 'Purple', correct: true},
        ]
    },
    {
        question: 'Star Wars takes plase in a galaxy... Where?',
        answers: [
            {text: 'Andromeda', correct: false},
            {text: 'Far, far away', correct: true},
            {text: 'The Milky Way', correct: false},
            {text: 'Middle Earth', correct: false},
            
        ]
    },
]
