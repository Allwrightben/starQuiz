let startButton = document.getElementById('start-btn')
let questionContainerElement = document.getElementById('question-container')

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('start the bloody game')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {

}

function selectAnswer () {

}

