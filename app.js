// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".slider");
// let animation = document.querySelector("section.animation_wrapper");

// const time_line = new TimelineMax();

// //gsap.fromTo() 
// //parameter1 要控制的對象
// //parameter2 是持續期間
// //parameter3 是控制對象的原始狀態
// //parameter4 是控制對象的動畫結束後狀態
// //parameter5 
// time_line.fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut });
// time_line.fromTo(hero, 1.2, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
// time_line.fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut },"-=1.2");
// time_line.fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// //setTimeout()設定一個定時器，一旦定時器到期，就會執行一個函數或指定的程式碼片段
// window.setTimeout(()=>{
//     animation.style.pointerEvents="none";
// },2500);

//讓整個往案的Enter key 都無法起作用
window.addEventListener("keypress", e => {
    //console.log(e);
    if (e.key == "Enter") {
        //preventDefault() 阻止預設的點擊事件執行
        e.preventDefault();
    }
});

//阻止form內部的button交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach(button => {
    //console.log(button);
    button.addEventListener("click", e => {
        e.preventDefault();
    });
});

//選擇成績分級(select)後 要改的相對顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach(select => {
    select.addEventListener("change", e => {
        //console.log(e.target.value);
        setGPA();
        changeColor(e.target); //e.target 就是<select>
    })
});

//改變成績(credit)後 更新GPA
let credits = document.querySelectorAll(".class-credit");
credits.forEach(credit => { //每一個credit 都是input標籤
credit.addEventListener("change",()=>{
    setGPA();
});
});

function changeColor(target) {
    if (target.value == "A" || target.value == "A-") {
        target.style.backgroundColor = "lightgreen";
        target.style.color = "black";
    }
    else if (target.value == "B" || target.value == "B-" || target.value == "B+") {
        target.style.backgroundColor = "yellow";
        target.style.color = "black";
    }
    else if (target.value == "C" || target.value == "C-" || target.value == "C+") {
        target.style.backgroundColor = "orange";
        target.style.color = "black";
    }
    else if (target.value == "D" || target.value == "D-" || target.value == "D+") {
        target.style.backgroundColor = "skyblue";
        target.style.color = "black";
    }
    else if (target.value == "F") {
        target.style.backgroundColor = "gray";
        target.style.color = "white";
    } else {
        target.style.backgroundColor = "white";
    };
};

function convertor(grade) {
    switch (grade) {
        case "A":
            return 4.0;
        case "A-":
            return 3.7;
        case "B+":
            return 3.4;
        case "B":
            return 3.0;
        case "B-":
            return 2.7;
        case "C+":
            return 2.4;
        case "C":
            return 2.0;
        case "C-":
            return 1.7;
        case "D+":
            return 1.4;
        case "D":
            return 1.0;
        case "D-":
            return 0.7;
        case "F":
            return 0.0;
        default:
            return 0;
    }
}

function setGPA() {
    //console.log("執行gpa中");
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credit");
    let selects = document.querySelectorAll("select");
    let sum = 0; //GPA分子
    let creditSum = 0; //GPA分母

    //計算分母creditSum
    for (let i = 0; i < credits.length; i++) {
        //console.log(credits[i].valueAsNumbe);

        if (!isNaN(credits[i].valueAsNumber)) {
            creditSum += credits[i].valueAsNumber;
        };
    };
    //console.log(creditSum);

    //計算分子sum
    for (let i = 0; i < formLength; i++) {
        //console.log(convertor(selects[i].value));

        //convertor(selects[i].value) 將英文等級轉為數字
        if (!isNaN(credits[i].valueAsNumber)) {
            sum += credits[i].valueAsNumber * convertor(selects[i].value);
        };
    };

    // console.log("creditSum is: " + creditSum);
    // console.log("sum is: " + sum);

    let result;
    //解決分子是零出現NaN的問題
    if (creditSum == 0) {
        result = (0.0).toFixed(2);
    } else {
        result = (sum / creditSum).toFixed(2); //toFixed(2) 到小數點第二位
    };
    document.getElementById("result-gpa").innerText = result;
};
