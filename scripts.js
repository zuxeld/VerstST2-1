// отчёт о включении в консоли:
console.log("гл. скрипт подключён");

// полезные методы консоли:
// console.log(DOM_elements);
// console.table([['сообщение test','ещё сообщение'],['ещё2','ещё3']]);
// console.trace();
// console.warn("message");
// console.dir(DOM_elements); //есть ли отличия от console.log??

// функция для фильтрации типа данных:(сейчас нигде не используется)
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
// проверка работы функции фильтрации:
// TypeFilter([['fghhj', 'string'],["true", 'boolean']])();


// функция-генератор функций-обработчиков:
function createHendlerFun(HandlerInfo,  ActionWithClassList = 'add', minWinWidth=0, maxWinWidth=Infinity, callback=() =>{}) {
    let isNormalWindowWidth = (minWinWidth, maxWinWidth) => {
        return window.innerWidth <= maxWinWidth &&
        window.innerWidth > minWinWidth;
    }
    return function hendlerFun() {
        if (isNormalWindowWidth(minWinWidth, maxWinWidth)) {
            HandlerInfo.DOM_element.classList[ActionWithClassList](String(HandlerInfo.CSSclass) + String(HandlerInfo.CSSclass_modifer));
            HandlerInfo.callback(HandlerInfo);
        }
    }
}

// -------------------------------------------------

// функция для привязки "стилистических" обработчиков событий
//    (привязаны к классам, добовляют/убирают классы с модификаторами):
function bindDecorationHandlers(BindingClassInfo) {
    let DOM_elements = document.querySelectorAll('.'+BindingClassInfo.CSSclass);
    
    // назначение обработчиков:
    for (let i = 0; i < DOM_elements.length; i++) {
        let HandlerInfo = {
            DOM_element: DOM_elements[i],
            CSSclass: BindingClassInfo.CSSclass,
            CSSclass_modifer: BindingClassInfo.CSSclass_modifer,
            callback: BindingClassInfo.callback,
            DOM_elements: DOM_elements,
        }
        
        for (let j = 0; j < HandlerConfigArray.length; j++) {
            DOM_elements[i].addEventListener(
                HandlerConfigArray[j].HandingEvent, createHendlerFun(
                    HandlerInfo, HandlerConfigArray[j].ActionWithClassList, 
                    HandlerConfigArray[j].minWinWidth,
                    HandlerConfigArray[j].maxWinWidth
                )
            );
        }
    }
} 
// ПЕРВИЧНАЯ ИНИЦИАЛИЗАЦИЯ:
// функция со сторонними действиями помимо добавления/снятия класса, которые выполняет обработчик события
let callbackCloser = function (HandlerInfo) {
    console.log(HandlerInfo);
    for (let i = 0; i < HandlerInfo.DOM_elements.length; i++) {
        if (HandlerInfo.DOM_elements[i] === HandlerInfo.DOM_element) continue;
        HandlerInfo.DOM_elements[i].classList.remove(String(HandlerInfo.CSSclass) + String(HandlerInfo.CSSclass_modifer));
        // console.log(String(HandlerInfo.CSSclass) + String(HandlerInfo.CSSclass_modifer));
    }
}
let BindingClassInfo = {
    CSSclass: "MainMenu__MenuItem--HoldMenuConteiner",
    CSSclass_modifer: '--jsActive',
    callback: callbackCloser,
}
let HandlerConfigArray = [
    {
        HandingEvent: "mouseenter",
        ActionWithClassList: 'add',
        minWinWidth: 770,
        maxWinWidth: Infinity,
    },
    {
        HandingEvent: "mouseleave",
        ActionWithClassList: 'remove',
        minWinWidth: 770,
        maxWinWidth: Infinity,
    },
    {
        HandingEvent: "click",
        ActionWithClassList: 'toggle',
        minWinWidth: 0,
        maxWinWidth: 770,
    },
]

// вызовы функций для привязки "стилистических" обработчико всобытий:
bindDecorationHandlers(BindingClassInfo, HandlerConfigArray);







