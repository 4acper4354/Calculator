let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen')
const buttons = document.querySelectorAll('.calc-button')

buttons.forEach(button => button.addEventListener('click', buttonClick))

function buttonClick() {
    buttonValue = this.getAttribute('value')
    if(isNaN(buttonValue)) {
        operatorFunc(buttonValue)
    } else {
        numberFunc(buttonValue)
    }
    screen.textContent = buffer
}
function operatorFunc(value) {
    switch(value) {
        case 'C':
            runningTotal = 0
            buffer = "0"
            break
        case '=':
            if(previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = runningTotal
            runningTotal = 0;
            break;
        case 'x':
        case '/':
        case '+':
        case '-':
            handleMath(value)
            break;
    }
}
function handleMath(symbol) {
    if(buffer === 0) {
        return
    }

    const intBuffer = parseInt(buffer)

    if(runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }
    previousOperator = symbol
    buffer = '0'
}
function flushOperation(Buffer) {
    switch(previousOperator) {
        case '+':
            runningTotal += Buffer
            break
        case '-':
            runningTotal -= Buffer
            break
        case 'x':
            runningTotal *= Buffer
            break
        case '/':
            runningTotal /= Buffer
            break
    }     
}
function numberFunc(value) {
    if(buffer=== "0") {
        buffer = value
    } else {
        buffer += value
    }
}