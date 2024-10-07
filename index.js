var lifestyleCoefArray = [
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
var submitClicked = false;
var caloryCalculatorForm = document.getElementById("calory-calculator-form");
var inputLifestyle = document.getElementById("input-lifestyle");
var inputWeight = document.getElementById("input-weight");
var inputHeight = document.getElementById("input-height");
var inputDescription = document.getElementById("input-description");
var inputAge = document.getElementById("input-age");
var inputGenderMale = document.getElementById("input-gender-male");
var inputGenderFemale = document.getElementById("input-gender-female");
var selectGoal = document.getElementById("select-goal");
var inputHarrisBenedict = document.getElementById("input-bmr-harris-benedict");
var inputMifflinStJeor = document.getElementById("input-bmr-mifflin-st-jeor");
var lifestyleDescription = document.getElementById("lifestyle-description");
var resultContainer = document.getElementById('result-container');
var result = document.getElementById('result');
var warning = document.getElementById('warning');
caloryCalculatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    calculateCalories();
    resultContainer.classList.remove("hidden");
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
var calculateCalories = function () {
    var weight = parseFloat(inputWeight.value);
    var height = parseFloat(inputHeight.value);
    var age = parseFloat(inputAge.value);
    var goal = selectGoal.value;
    var calories = 0;
    for (var i = 0; i < lifestyleCoefArray.length; i++) {
        if (parseInt(inputLifestyle.value) === lifestyleCoefArray[i].inputValue) {
            if (inputGenderMale.checked) {
                var bmrHarrisBenedict = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                var bmrMifflinStJeor = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                var bmr = inputHarrisBenedict.checked ? bmrHarrisBenedict : bmrMifflinStJeor;
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
                var bmrHarrisBenedict = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                var bmrMifflinStJeor = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                var bmr = inputHarrisBenedict.checked ? bmrHarrisBenedict : bmrMifflinStJeor;
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
            result.textContent = "\u0414\u043B\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0446\u0435\u043B\u0438 \u0412\u0430\u043C \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u043E\u0442\u0440\u0435\u0431\u043B\u044F\u0442\u044C ".concat(calories.toString(), " \u043A\u0430\u043B\u043E\u0440\u0438\u0439 \u0432 \u0434\u0435\u043D\u044C.");
            if ((inputGenderMale.checked && (calories < 1500 || calories > 3000)) || (inputGenderFemale.checked && (calories < 1200 || calories > 2500))) {
                warning.textContent = "Предупреждение: данная суточная норма калорий может быть опасна для организма.";
            }
            else {
                warning.textContent = "";
            }
        }
    }
};
caloryCalculatorForm.addEventListener('reset', function (e) {
    resultContainer.classList.add("hidden");
});
inputLifestyle.addEventListener('change', function () {
    for (var i = 0; i < lifestyleCoefArray.length; i++) {
        if (parseInt(inputLifestyle.value) === lifestyleCoefArray[i].inputValue) {
            lifestyleDescription.textContent = lifestyleCoefArray[i].lifestyleDescription;
        }
    }
});
