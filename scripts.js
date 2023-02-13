// отчёт о включении в консоли:
console.log("гл. скрипт подключён");

// ЧЕРНОВОЙ БЛОК:

// полезные методы консоли:
// console.log(DOM_elements);
// console.table([['сообщение test','ещё сообщение'],['ещё2','ещё3']]);
// console.trace();
// console.warn("message");
// console.dir(DOM_elements); //есть ли отличия от console.log??


// --------------------------------------------------------------//

// ФУНКЦИОНАЛЬНЫЙ КОД:

// БЛОК MainMenu:
// 1)выпадение/сворачивание всего меню по нажатию кнопки (в реж. планшета/тел.):
let blockElement = document.querySelector('.MainMenu');
blockElement.addEventListener('click', function (event) {
    if (!event.target.classList.contains('MainMenu__ViewButton')) return;
    this.classList.toggle("MainMenu--jsOpened");
});

// 2)начало/завершение "скольжения" блока меню при прокрутке страницы:
{
    let lastPageYOffset = 0;
    let blockElement = document.querySelector('.MainMenu');
    document.addEventListener('scroll', function (event) {
        let trigerHight = 190;
        if (window.pageYOffset > trigerHight &&
            lastPageYOffset < trigerHight) {
                blockElement.classList.add("MainMenu--jsStiky");
                lastPageYOffset = window.pageYOffset;
        } else if (window.pageYOffset < trigerHight &&
            lastPageYOffset > trigerHight){
                blockElement.classList.remove("MainMenu--jsStiky");
                lastPageYOffset = window.pageYOffset;
        }
    });
}


// БЛОК ProductFotoGalary:(слайдер продукта)
// отменяю стандартоное поведение при событии drag на фотографиях слайдера:
let imgElements = document.querySelectorAll(
    `[class*="_FotoChoiserItem"], [class*="_GalaryScreen"],
    [class*="_GalaryScreenItem"]`
    );
console.log(imgElements);
imgElements.forEach(imgElement => {
    imgElement.ondragstart = function() {
        return false;
    };
});

blockElement = document.querySelector('.ProductFotoGalary');
{
    let isMouseDown = false;
    let lastclientX = 0;
    let lastX = 0;
    function isInNeededElem(targetElement) {
        return targetElement.classList.contains('ProductFotoGalary__GalaryScreenMovedConteiner');
    }
    blockElement.addEventListener('mousedown', function (event) {
        if (isInNeededElem(event.target)) {
            isMouseDown = true;
            lastclientX = event.clientX;
            lastX = event.target.getBoundingClientRect().x;
            console.log(lastX);
        };
    });
    blockElement.addEventListener('mouseup', function (event) {
        if (isInNeededElem(event.target)) {
            isMouseDown = false;
        };
    });
    blockElement.addEventListener('mousemove', function (event) {
        if (isInNeededElem(event.target) &&
            isMouseDown === true) {
                event.target.style.left = (lastX - (lastclientX - event.clientX)) + 'px';
                // event.target.getBoundingClientRect().x = lastX - (lastclientX - event.clientX);
                // event.target.parentElement.getBoundingClientRect().x = lastclientX - event.clientX;
                // console.log(event.target.firstChild.offsetLeft);
        };
    });

}