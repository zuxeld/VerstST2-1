// выпададение списоков меню при наведении мыши:
// let elements = 
console.log("скрипт подключён");
// document.onDOMContentLoaded = function() {
    for (let elem of document.querySelectorAll('.MainMenu__MenuItem--HoldMenuConteiner')) {
        elem.OnMouseOver = function() {
            holdedelem = elem.//querySelector('.MainMenu__HoldedMenuItems');
            console.log(holdedelem.innerHTML);
            holdedelem.style.visibility = "visible";
        }
        // elem.onmouseout = function() {
        //     elem.style.visibility = "hidden";
        // }
        // console.log("1");
        // elem.style.visibility = "visible";
        // console.log(elem.innerHTML);
    }
// }
// document.querySelectorAll('.MainMenu__MenuItem--HoldMenuConteiner')[0].style.visibility = "visible";
// window.scrollX = 1;