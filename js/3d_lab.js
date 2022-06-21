var words=[];
for (let i = 0; i < 200; i++) {
    let str='❄';
    words.push(str)  
    console.log(words);
}
    

// 生成指定范围随机数（保留小数点后两位）
function randomNum(min,max){
    var num=(Math.random() * (max - min + 1) + min).toFixed(2);
    return num;
}

// 初始函数
function init(){
    var container=document.querySelector('.containers');
    var f=document.createDocumentFragment(); //创建文档片段对象
words.forEach(w => {
        var word_box=document.createElement('div');
        var word=document.createElement('div');

        word.innerText=w;
        word.classList.add('word');

        // 随机生成色相值（0为红色、120为绿色、240为蓝色、360为红色）
        var hue=randomNum(0,240);
        word.style.color='hsl('+hue+',100%,65%)';

        word_box.classList.add('word-box');
        // 生成随机数值，并赋值给自定义属性
        word_box.style.setProperty('--margin-top',randomNum(-40,20)+'vh');
        word_box.style.setProperty('--margin-left',randomNum(6,35)+'vw');
        word_box.style.setProperty('--animation-duration',randomNum(8,30)+'s');
        word_box.style.setProperty('--animation-delay',randomNum(-30,0)+'s');

        word_box.appendChild(word);
        f.appendChild(word_box);
    })
    container.appendChild(f);
}

// 绑定加载事件
window.addEventListener('load',init);
