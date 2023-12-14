const score = document.querySelector('#result')

let mode = parseInt(localStorage.getItem('calMode')) || 1
document.querySelector('body').dataset.theme = `_${mode}`

let turn = 1
let values = {
    first: '',
    second: '',
    type: ''
}

const numbers = [0,1,2,3,4,5,6,7,8,9]
const actions = ['+','-','*','/']

function newInput(x){
    let temp
    if(numbers.includes(parseInt(x)) || x === '.'){
        if(turn === 1){
            temp = {...values,first: `${values.first}${x}`}
        }else if(turn === 2){
            temp = {...values,second: `${values.second}${x}`}
        }
    }else if(actions.includes(x)){
        if(values.first !== ''){
            temp = {...values, type: x}
            turn = 2
        }
    }
    values = temp
    score.value = turn === 1 ? values.first : values.second
}

function handleReset(){
    values = { first: '', second: '', type: ''}
    score.value = '0.00'
}

function handleResult(){
    let temp = 0
    switch(values.type){
        case '+':{
            temp = parseFloat(values.first) + parseFloat(values.second)
            break
        }
        case '*':{
            temp = parseFloat(values.first) * parseFloat(values.second)
            break
        }
        case '-':{
            temp = parseFloat(values.first) - parseFloat(values.second)
            break
        }
        case '/':{
            temp = parseFloat(values.first) / parseFloat(values.second)
            break
        }
        default:{
            temp = values.first
        }
    }
    let temp2 = {
        first: temp.toString(),
        second: "",
        type: ""
    }
    values = temp2
    turn = 1
    score.value = values.first
}

function handleDelete(){
    if(turn === 1){
        values = {...values,first: values.first.slice(0,-1)}
    }else if(turn === 2){
        values = {...values,second1: values.second.slice(0,-1)}
    }
    score.value = score.value.slice(0, -1)
}

function handleTheme(){
    document.querySelector('.switch').classList.toggle(`theme_${mode}`)
    mode === 3 ? mode = 1 : mode++
    localStorage.setItem('calMode',mode.toString())
    document.querySelector('body').dataset.theme = `_${mode}`
    if(mode > 1){
        document.querySelector('.switch').classList.toggle(`theme_${mode}`)
    }
}
