"use strict";
const lifestyleCoefArray = [
    {
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
];
let hasSubmitted = false;
const caloryCalculatorForm = document.getElementById("calory-calculator-form");
const inputLifestyle = document.getElementById("input-lifestyle");
const inputWeight = document.getElementById("input-weight");
const inputHeight = document.getElementById("input-height");
const inputAge = document.getElementById("input-age");
const inputGenderMale = document.getElementById("input-gender-male");
const inputGenderFemale = document.getElementById("input-gender-female");
const selectGoal = document.getElementById("select-goal");
const inputHarrisBenedict = document.getElementById("input-bmr-harris-benedict");
const lifestyleDescription = document.getElementById("lifestyle-description");
const resultContainer = document.getElementById('result-container');
const result = document.getElementById('result');
const warning = document.getElementById('warning');
caloryCalculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hasSubmitted = true;
    if (!updateResult())
        return;
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
const calculateCalories = () => {
    const weight = inputWeight.valueAsNumber;
    const height = inputHeight.valueAsNumber;
    const age = inputAge.valueAsNumber;
    const goal = selectGoal.value;
    let calories = 0;
    for (let i = 0; i < lifestyleCoefArray.length; i++) {
        if (inputLifestyle.valueAsNumber === lifestyleCoefArray[i].inputValue) {
            if (inputGenderMale.checked) {
                const bmrHarrisBenedict = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                const bmrMifflinStJeor = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                const bmr = inputHarrisBenedict.checked ? bmrHarrisBenedict : bmrMifflinStJeor;
                switch (goal) {
                    case "rapidWeightLoss":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) - 1000;
                        break;
                    case "moderateWeightLoss":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) - 500;
                        break;
                    case "moderateWeightGain":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) + 500;
                        break;
                    case "rapidWeightGain":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) + 1000;
                        break;
                    default:
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef);
                        break;
                }
            }
            else {
                const bmrHarrisBenedict = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                const bmrMifflinStJeor = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                const bmr = inputHarrisBenedict.checked ? bmrHarrisBenedict : bmrMifflinStJeor;
                switch (goal) {
                    case "rapidWeightLoss":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) - 1000;
                        break;
                    case "moderateWeightLoss":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) - 500;
                        break;
                    case "moderateWeightGain":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) + 500;
                        break;
                    case "rapidWeightGain":
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef) + 1000;
                        break;
                    default:
                        calories = Math.round(bmr * lifestyleCoefArray[i].lifestyleCoef);
                        break;
                }
            }
            result.textContent = Number.isFinite(calories) && calories > 0
                ? `Расчётная оценка: ${calories} ккал в день.`
                : "Для этих значений не удалось получить корректную оценку.";
            if ((inputGenderMale.checked && (calories < 1500 || calories > 3000)) || (inputGenderFemale.checked && (calories < 1200 || calories > 2500))) {
                warning.textContent = "Предупреждение: данная суточная норма калорий может быть опасна для организма.";
            }
            else {
                warning.textContent = "";
            }
        }
    }
};
function updateLifestyleDescription() {
    var _a;
    const lifestyle = lifestyleCoefArray.find(item => item.inputValue === inputLifestyle.valueAsNumber);
    lifestyleDescription.textContent = (_a = lifestyle === null || lifestyle === void 0 ? void 0 : lifestyle.lifestyleDescription) !== null && _a !== void 0 ? _a : "";
}
function hideResult() {
    resultContainer.classList.add("hidden");
    result.textContent = "";
    warning.textContent = "";
}
function updateResult() {
    if (!caloryCalculatorForm.checkValidity()) {
        hideResult();
        return false;
    }
    calculateCalories();
    resultContainer.classList.remove("hidden");
    return true;
}
caloryCalculatorForm.addEventListener("input", (event) => {
    if (event.target === inputLifestyle)
        updateLifestyleDescription();
    if (hasSubmitted)
        updateResult();
});
caloryCalculatorForm.addEventListener("reset", () => {
    hasSubmitted = false;
    hideResult();
    queueMicrotask(updateLifestyleDescription);
});
updateLifestyleDescription();
