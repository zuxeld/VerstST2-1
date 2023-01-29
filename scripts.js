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
function createHendlerFun(DOM_element, CSSclass, CSSclass_modifer,  revers = false, minWinWidth=0, maxWinWidth=Infinity, callback=() =>{}) {
    if (revers === false) {
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_element.classList.add(String(CSSclass) + String(CSSclass_modifer));
                callback(DOM_element, CSSclass, CSSclass_modifer,  revers, minWinWidth, maxWinWidth);
                // console.log('обр соб');
                console.trace();
            }
        }
    } else if (revers === true) {
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_element.classList.remove(String(CSSclass) + String(CSSclass_modifer));
                callback();
                // console.log('обр соб 2');
                console.trace();
            }
        }
    } else if (revers === 'toggle'){
        return function hendlerFun() {
            if (window.innerWidth <= maxWinWidth && window.innerWidth > minWinWidth) {
                DOM_element.classList.toggle(String(CSSclass) + String(CSSclass_modifer));
                callback();
                // console.log('обр соб 2');
                console.trace();
            }
        }
    } else {
        console.error(`Not right value of <revers> parametr: needed
        "true", "false" or "toggle" - expected "` + revers + '"')
    }
}
// ДОМ-элемент с нужным классом:
let CSSclass = "MainMenu__MenuItem--HoldMenuConteiner";
let DOM_elements = document.querySelectorAll('.'+CSSclass);

// console.log(DOM_elements);
// console.table([['сообщение test','ещё сообщение'],['ещё2','ещё3']]);
// console.trace();
// console.warn("message");
// console.dir(DOM_elements); //есть ли отличия от console.log??

let callback = function (DOM_elements) {
    for (let i = 0; i < DOM_elements.length; i++) {
        if (DOM_elements[i] === DOM_element) continue;
        DOM_elements[i]
    }
}
for (let i = 0; i < DOM_elements.length; i++) {
    // let 
    DOM_elements[i].addEventListener("mouseenter", createHendlerFun(DOM_elements[i], CSSclass,'--jsActive', false, 770));
    DOM_elements[i].addEventListener("mouseleave", createHendlerFun(DOM_elements[i], CSSclass,'--jsActive', true,  770));  
    DOM_elements[i].addEventListener("click",      createHendlerFun(DOM_elements[i], CSSclass,'--jsActive', "toggle", 0, 770));
}

// проверка работы функции фильтрации:
TypeFilter([['fghhj', 'string'],["true", 'boolean']])();