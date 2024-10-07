interface LifestyleCoef {
    inputValue: number;
    lifestyleCoef: number;
    lifestyleDescription: string;
}

const lifestyleCoefArray: LifestyleCoef[] = [
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

let submitClicked = false;

const caloryCalculatorForm = document.getElementById("calory-calculator-form") as HTMLFormElement;
const inputLifestyle = document.getElementById("input-lifestyle") as HTMLInputElement;
const inputWeight = document.getElementById("input-weight") as HTMLInputElement;
const inputHeight = document.getElementById("input-height") as HTMLInputElement;
const inputDescription = document.getElementById("input-description") as HTMLInputElement;
const inputAge = document.getElementById("input-age") as HTMLInputElement;
const inputGenderMale = document.getElementById("input-gender-male") as HTMLInputElement;
const inputGenderFemale = document.getElementById("input-gender-female") as HTMLInputElement;
const selectGoal = document.getElementById("select-goal") as HTMLSelectElement;
const inputHarrisBenedict = document.getElementById("input-bmr-harris-benedict") as HTMLInputElement;
const inputMifflinStJeor = document.getElementById("input-bmr-mifflin-st-jeor") as HTMLInputElement;

const lifestyleDescription = document.getElementById("lifestyle-description") as HTMLElement;
let resultContainer = document.getElementById('result-container') as HTMLElement;
let result = document.getElementById('result') as HTMLElement;
let warning = document.getElementById('warning') as HTMLElement;

caloryCalculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateCalories();
    resultContainer.classList.remove("hidden");
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

const calculateCalories = () => {
    const weight = parseFloat(inputWeight.value);
    const height = parseFloat(inputHeight.value);
    const age = parseFloat(inputAge.value);
    const goal = selectGoal.value;

    let calories = 0;

    for (let i = 0; i < lifestyleCoefArray.length; i++) {
        if (parseInt(inputLifestyle.value) === lifestyleCoefArray[i].inputValue) {
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
            } else {
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
            result.textContent = `Для достижения выбранной цели Вам необходимо потреблять ${calories.toString()} калорий в день.`;

            if ((inputGenderMale.checked && (calories < 1500 || calories > 3000)) || (inputGenderFemale.checked && (calories < 1200 || calories > 2500))) {
                warning.textContent = "Предупреждение: данная суточная норма калорий может быть опасна для организма.";
            } else {
                warning.textContent = "";
            }
        }
    }
}

caloryCalculatorForm.addEventListener('reset', (e) => {
    resultContainer.classList.add("hidden");

});

inputLifestyle.addEventListener('change', () => {
    for (let i = 0; i < lifestyleCoefArray.length; i++) {
        if (parseInt(inputLifestyle.value) === lifestyleCoefArray[i].inputValue) {
            lifestyleDescription.textContent = lifestyleCoefArray[i].lifestyleDescription;
        }
    }
});
