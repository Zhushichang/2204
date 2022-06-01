var div = document.querySelector('.grid-col2')
var imgs = div.querySelectorAll('.t-img li')
var btns = div.querySelectorAll('.circle li')
var goPrev = document.querySelector('.arrow-l')
var goNext = document.querySelector('.arrow-r')
var index = 0 // 当前图片的下标，默认为0
var lastIndex = 0 // 上一张图片的下标，默认为0
var timer = null
Array.from(btns).forEach((li, i) => {
    // console.log(li);
    li.onclick = function() {
        lastIndex = index;
        index = i;
        chenge();
    }
});
goNext.onclick = function() {
    lastIndex = index;
    index++;
    if (index == imgs.length) {
        index = 0;
    }
    chenge();
}
goPrev.onclick = function() {
    lastIndex = index;
    index--;
    if (index == -1) {
        index = imgs.length - 1;
    }
    chenge();
};
set();

function set() {
    timer = setInterval(function() {
        lastIndex = index;
        index++;
        if (index == imgs.length) {
            index = 0;
        }
        chenge();
    }, 3000);
}
goPrev.parentNode.onmouseover = function() {
    clearInterval(timer)
}
goPrev.parentNode.onmouseout = function() {
    set();
};
//定义一个添加class
function chenge() {
    imgs[lastIndex].classList.remove("ac");
    btns[lastIndex].classList.remove("ac");

    imgs[index].classList.add("ac");
    btns[index].classList.add("ac");
}