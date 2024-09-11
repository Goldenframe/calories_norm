const lifestyleCoefArray = [{
    inputValue: 0,
    lifestyleCoef: 1.2,
    lifestyleDescription: 'Физическая нагрузка отсутствует или минимальна'
},
{
    inputValue: 1,
    lifestyleCoef: 1.38,
    lifestyleDescription: 'Тренировки средней тяжести 3 раза в неделю'
},
{
    inputValue: 2,
    lifestyleCoef: 1.46,
    lifestyleDescription: 'Тренировки средней тяжести 5 раз в неделю'
},
{
    inputValue: 3,
    lifestyleCoef: 1.55,
    lifestyleDescription: 'Интенсивные тренировки 5 раз в неделю'
},
{
    inputValue: 4,
    lifestyleCoef: 1.64,
    lifestyleDescription: 'Тренировки каждый день'
},
{
    inputValue: 5,
    lifestyleCoef: 1.73,
    lifestyleDescription: 'Интенсивные тренировки каждый день или по 2 раза в день'
},
{
    inputValue: 6,
    lifestyleCoef: 1.9,
    lifestyleDescription: 'Ежедневная нагрузка + физическая работа'
}
]
let submitClicked = false;

document.getElementById('myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitClicked = true;
    calculateCalories();
})

document.getElementById('input-lifestyle').addEventListener('change', () => {
    let inputWeight = parseFloat(document.getElementById('input-weight').value);
    let inputHeight = parseFloat(document.getElementById('input-height').value);
    let inputAge = parseFloat(document.getElementById('input-age').value);
    for (let i = 0; i < lifestyleCoefArray.length; i++) {
        if (document.getElementById('input-lifestyle').value == parseInt(lifestyleCoefArray[i].inputValue)) {
            document.getElementById('lifestyle-description').textContent = lifestyleCoefArray[i].lifestyleDescription;
        }
    }
    if (inputWeight && inputHeight && inputAge) {
        calculateCalories();
    }
}
)

function calculateCalories() {
    if (submitClicked) {
        let inputWeight = parseFloat(document.getElementById('input-weight').value);
        let inputHeight = parseFloat(document.getElementById('input-height').value);
        let inputAge = parseFloat(document.getElementById('input-age').value);
        let result = document.getElementById('result');
        if (inputWeight && inputHeight && inputAge) {
            for (let i = 0; i < lifestyleCoefArray.length; i++) {
                if (document.getElementById('input-lifestyle').value == parseInt(lifestyleCoefArray[i].inputValue)) {
                    console.log(document.getElementById('input-lifestyle').value);
                    console.log(parseInt(lifestyleCoefArray[i].lifestyleCoef));
                    if (document.getElementById('input-gender-male').checked === true) {
                        result.textContent = Math.round((9.99 * inputWeight + 6.25 * inputHeight - 4.92 * inputAge + 5) * parseFloat(lifestyleCoefArray[i].lifestyleCoef));
                    }
                    else {
                        result.textContent = Math.round((9.99 * inputWeight + 6.25 * inputHeight - 4.92 * inputAge - 161) * parseFloat(lifestyleCoefArray[i].lifestyleCoef));
                    }
                }
            }
        }
    }
}

