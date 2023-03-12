const getRandomNumInRange = (min, max) => {
    return((Math.random()*(max - min) + min).toFixed(0))
}

const getTask = () => {
    const random_value_1 = getRandomNumInRange(0, 100)
    const random_value_2 = getRandomNumInRange(0, 100)
    const symbol = (Math.random() > 0.5) ? '+' : '-'
    const task = `${random_value_1} ${symbol} ${random_value_2}`

    game_state.right_answer = eval(task)

    return task
}

const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const user_task = gameElements[1]
const user_answer = gameElements[2]
const btngame = gameElements[3]

const game_state = {
    task_in_process: false,
    right_answer: null,
}


const startGameFunc = () => {
    if(!game_state.task_in_process){
        user_answer.value = null
        title.innerText = 'Игра началась!'
        user_task.innerText = getTask()
        user_answer.hidden = false
        btngame.innerText = 'Проверить!'
        game_state.task_in_process = true
    } else {
        const isRight = game_state.right_answer == user_answer.value
        user_task.innerText = user_task.innerText + ' = ' + game_state.right_answer
        title.innerText = (isRight) ? 'Вы победили!' : 'Вы проиграли =('
        btngame.innerText = 'Начать'
        game_state.task_in_process = false
    }

}

btngame.addEventListener("click", startGameFunc)
user_answer.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        startGameFunc()
    }
    else if (e.key === "Escape"){
        user_answer.blur()
    }
})

const choosedEl = document.querySelectorAll(".choosed_block-container > div")
const counterEl = document.querySelector(".choosed_block span")

const choosedState = {
    countElements: 0, 
}

const changeCount = (value) => {
    choosedState.countElements += value
    counterEl.innerText = choosedState.countElements
}

const eventFunc =  (e) => {
    // Когда кликаем - выбрать элемент - выделить его с помощью класса
    // Запустить счетчик
    // Механика отмены
    if (e.target.className === ""){
        e.target.className = 'choosed_element'
        changeCount(+e.target.innerText)  
    } else {
        e.target.className = ""
        changeCount(-e.target.innerText)
    }
}

for (let i = 0; i < choosedEl.length; i++){
    choosedEl[i].addEventListener('click', eventFunc)
}

choosedEl[2].removeEventListener("click", eventFunc)