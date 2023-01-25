console.log("гл. скрипт подключён");

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