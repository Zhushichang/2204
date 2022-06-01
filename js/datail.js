 // 获取节点
 var smallObj = document.querySelector('.small');
 var maskObj = document.querySelector('.mask');
 var bigObj = document.querySelector('.big');
 var imgObj = document.querySelector('.bigimg');
 var boxObj = document.querySelector('.preview_img');

 // 移入则显示
 smallObj.onmouseover = function() {
     maskObj.style.display = 'block';
     bigObj.style.display = 'block';
 }
 smallObj.onmouseout = function() {
     maskObj.style.display = 'none';
     bigObj.style.display = 'none';
 };
 // 鼠标移动则方块移动
 smallObj.onmousemove = function(eve) {
     var mouseX = eve.pageX; //鼠标位置
     var mouseY = eve.pageY;
     // 获取box的位置
     var boxL = boxObj.offsetLeft; //小div的left值
     var boxT = boxObj.offsetTop;

     var maskW = maskObj.offsetWidth; //遮罩的宽
     var maskH = maskObj.offsetHeight;

     // 最后计算的距离就是小黄块，相对于图的
     var tmpX = mouseX - boxL - maskW / 2; //小黄快并让鼠标居中
     var tmpY = mouseY - boxT - maskH / 2;
     // 设置目标距离
     var targetX = smallObj.offsetWidth - maskW; //设置最大距离不能超过
     var targetY = smallObj.offsetHeight - maskH;
     // 判断是否到达最大距离
     if (tmpX > targetX) tmpX = targetX;
     if (tmpY > targetY) tmpY = targetY;

     if (tmpX < 0) tmpX = 0;
     if (tmpY < 0) tmpY = 0;

     maskObj.style.left = tmpX + 'px';
     maskObj.style.top = tmpY + 'px';

     //黄色盒子覆盖到哪里,对应的大盒子里图片展示哪里
     //  mask移动的距离 / mask移动的最大距离 == img移动的距离 / img移动的最大距离
     //img移动的距离 = mask移动的距离 / mask移动的最大距离 * img移动的最大距离
     var bigTargetX = imgObj.offsetWidth - bigObj.offsetWidth;
     var bigTargetY = imgObj.offsetHeight - bigObj.offsetHeight;
     var bigX = tmpX / targetX * bigTargetX;
     var bigY = tmpY / targetY * bigTargetY;

     // 设置最终大图位置
     //  console.log(bigX, bigY)
     imgObj.style.left = -bigX + 'px';
     imgObj.style.top = -bigY + 'px';

 }