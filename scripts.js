console.log("гл. скрипт подключён");

// функция для фильтрации типа данных:
function TypeFilter(argArray) {
    for (let i = 0; i < argArray.length; i++) {
        if (typeof argArray[i][0] !== argArray[i][1]) {
            // let errObj = TypeError;
            // errObj.message = 'Custom type filtration failed!';
            return function () {
                console.error(`Custom type filtration failed:
                Type is not <` + String(argArray[i][1]) + '>');
            } 
        }
    }
}

// функция-генератор функций-обработчиков:
function createHendlerFun(DOM_el, CSSclass, CSSclass_modifer,  revers = false, minWinWidth=0, maxWinWidth=Infinity) {
    if (revers === false) {
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_el.classList.add(String(CSSclass) + String(CSSclass_modifer));
                console.log('обр соб');
            }
        }
    } else if (revers === true) {
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_el.classList.remove(String(CSSclass) + String(CSSclass_modifer));
                console.log('обр соб 2');
            }
        }
    } else if (revers === 'toggle'){
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_el.classList.toggle(String(CSSclass) + String(CSSclass_modifer));
                console.log('обр соб 2');
            }
        }
    } else {
        console.error(`Not right value of <revers> parametr: needed
        "true", "false" or "toggle" - expected "` + revers + '"')
    }
}
// ДОМ-элемент с нужным классом:
let CSSclass = "MainMenu__MenuItem--HoldMenuConteiner";
let DOM_el = document.querySelectorAll('.'+CSSclass);
console.log(DOM_el);
for (let i = 0; i < DOM_el.length; i++) {
    DOM_el[i].addEventListener("mouseenter", createHendlerFun(DOM_el[i], CSSclass,'--jsActive', false, 770));
    DOM_el[i].addEventListener("mouseleave", createHendlerFun(DOM_el[i], CSSclass,'--jsActive', true, 770));  
    DOM_el[i].addEventListener("click", createHendlerFun(DOM_el[i], CSSclass,'--jsActive', "toggle", 0, 770));
}

// проверка работы функции фильтрации:
TypeFilter([['fghhj', 'string'],["true", 'boolean']])();