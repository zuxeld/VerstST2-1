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
function fActive_Gen(DOM_el, CSSclass, CSSclass_modifer, revers = true) {
    if (revers) {
        return function fActive() {
            DOM_el.classList.add(String(CSSclass) + String(CSSclass_modifer));
            console.log('обр соб');
        }
    } else {
        return function fActive() {
            DOM_el.classList.remove(String(CSSclass) + String(CSSclass_modifer));
            console.log('обр соб 2');
        }
    }
}
// ДОМ-элемент с нужным классом:
let CSSclass = "MainMenu__MenuItem--HoldMenuConteiner";
let DOM_el = document.querySelectorAll('.'+CSSclass);
console.log(DOM_el);
for (let i = 0; i < DOM_el.length; i++) {
    DOM_el[i].addEventListener("mouseenter", fActive_Gen(DOM_el[i], CSSclass,'--jsActive'));
    DOM_el[i].addEventListener("mouseout", fActive_Gen(DOM_el[i], CSSclass,'--jsActive',false));    
}

// проверка работы функции фильтрации:
TypeFilter([['fghhj', 'string'],["true", 'boolean']])();

// выпададение списоков меню при наведении мыши:
// let elements = 
// // document.onDOMContentLoaded = function() {
//     for (let elem of document.querySelectorAll('.MainMenu__MenuItem--HoldMenuConteiner')) {
//         elem.OnMouseOver = function() {
//             holdedelem = elem.//querySelector('.MainMenu__HoldedMenuItems');
//             console.log(holdedelem.innerHTML);
//             holdedelem.style.visibility = "visible";
//         }
//         // elem.onmouseout = function() {
//         //     elem.style.visibility = "hidden";
//         // }
//         // console.log("1");
//         // elem.style.visibility = "visible";
//         // console.log(elem.innerHTML);
//     }
// }
// document.querySelectorAll('.MainMenu__MenuItem--HoldMenuConteiner')[0].style.visibility = "visible";
// window.scrollX = 1;