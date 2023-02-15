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
class Slider {
    movedImgConteiner;
    movedImgConteinerClass;
    fotoChoiser;
    fotoChoiserClass;
    isMouseDown = false;
    lastclientX = 0;
    currentItem = 0;
    imgWidth;
    gap = 10;
    mouseXchange = 0;
    setTimeoutLabel;
    constructor({movedImgConteinerClass, fotoChoiserClass}) {
        this.movedImgConteinerClass = movedImgConteinerClass;
        this.fotoChoiserClass = fotoChoiserClass;
        this.movedImgConteiner = document.querySelector('.' + movedImgConteinerClass);
        this.fotoChoiser = document.querySelector('.' + fotoChoiserClass);
        // отменяю стандартоное поведение при событии drag на фотографиях слайдера:
        this.movedImgConteiner.querySelectorAll('img').forEach(imgElement => {
            imgElement.ondragstart = () => false;
        });
        this.movedImgConteiner.ondragstart = () => false;
        
        // вычисление ширины картинки в слайдере(первичное):
        this.imgWidth = this.movedImgConteiner.querySelector('img').offsetWidth;

        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));

        document.addEventListener('click', this.onClick.bind(this));

    }
    onMouseDown(event) {
        if (!(event.target.tagName == 'IMG' &&
        event.target.parentElement.classList.contains(this.movedImgConteinerClass))) return;
        this.isMouseDown = true;
        this.lastclientX = event.clientX;
        this.currentItem = +event.target.dataset.itemnum;
        this.imgWidth = event.target.offsetWidth;
    }
    onMouseUp(event) {
        if (!this.isMouseDown === true) return;
        this.isMouseDown = false;
        let side = this.mouseXchange > 0 ? 1 : -1;
        let isCorrectChange = (this.currentItem + side >= 0 &&
            this.currentItem + side <= this.movedImgConteiner.children.length - 1);
        if ((Math.abs(this.mouseXchange) > this.imgWidth/2) && isCorrectChange) {
            this.currentItem += side;
        }
        this.move(this.currentItem);
    }
    onMouseMove(event) {
        if (!this.isMouseDown === true) return;
        this.mouseXchange = this.lastclientX - event.clientX;
        let isMovingOut = ((this.currentItem <= 0) && this.mouseXchange < 0) ||
        (this.currentItem >= this.movedImgConteiner.children.length - 1);
        let koef = isMovingOut ? 0.4 : 1;
        let xChange = -this.currentItem*(this.imgWidth + this.gap) - this.mouseXchange*koef;
        this.movedImgConteiner.style.transform = `translateX(${xChange}px)`;
    }
    move(index) {
        if (index < 0 || index > this.movedImgConteiner.children.length - 1) {
            console.error('invalid <index> parametr: ' + index);
        }
        let xPosition = index*(this.imgWidth + this.gap);
        this.movedImgConteiner.style.transition = '0.5s';
        clearTimeout(this.setTimeoutLabel);
        this.movedImgConteiner.style.transform = `translateX(-${xPosition}px)`;
        this.setTimeoutLabel = setTimeout(()=>this.movedImgConteiner.style.transition = 'none',600);
        this.fotoChoiser.querySelectorAll('img').forEach((img) => img.classList.remove('Active'))
        this.fotoChoiser.querySelector(`[data-itemnum="${index}"]`).classList.add('Active');
    }
    onClick(event) {
        if (!(event.target.tagName == 'IMG' &&
        event.target.parentElement.classList.contains(this.fotoChoiserClass))) return;
        this.currentItem = +event.target.dataset.itemnum;
        this.move(this.currentItem);
    }
}

new Slider({
    movedImgConteinerClass: 'ProductFotoGalary__GalaryScreenMovedConteiner',
    fotoChoiserClass: 'ProductFotoGalary__FotoChoiser'
});