const question = document.querySelector('#question');
const choices = Array. from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availabeQuestions = []

let questions = [
    {
        question: 'Qual é a hablidade atual mais forte de luffy?',
        choice1: 'Gear Four',
        choice2: 'Gear Second',
        choice3: 'Gear Third',
        choice4: 'Nenhuma das anteriores',
        answer: 1,
    },
    {
        question: 'Em que episódio Ace morreu?',
        choice1: 'Episódio 375',
        choice2: 'Episódio 390',
        choice3: 'Episódio 450',
        choice4: 'Episódio 483',
        answer: 4,
    },
    {
        question: 'Quem ficou de proteger durante 2 anos o Navio de Luffy Sunny Go?',
        choice1: 'Rayleigh',
        choice2: 'Kuma',
        choice3: 'Shanks',
        choice4: 'Ace',
        answer: 2,
    },
    {
        question: 'Qual das frutas do diabo luffy ingeriu?',
        choice1: 'Mera Mera no Mi',
        choice2: 'Gomu Gomu no Mi',
        choice3: 'Gura Gura no Mi',
        choice4: 'Nenhuma das anteriores',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availabeQuestions = [... questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availabeQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availabeQuestions.length)
    currentQuestion = availabeQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availabeQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score+=num
    scoreText.innerText = score
}

startGame ()



