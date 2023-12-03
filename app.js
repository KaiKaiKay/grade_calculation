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
let allSelects = document.querySelectorAll("select"); //靜態nodelist
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
    credit.addEventListener("change", () => {
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

let addButton = document.querySelector(".plus-btn"); addButton.addEventListener("click", () => {
    let newForm = document.createElement("form");
    let newDiv = document.createElement("div");
    newDiv.classList.add("grader");

    //製作五個元素:input*3 select button
    //第一個 input
    let newInput1 = document.createElement("input");
    newInput1.setAttribute("type", "text");
    newInput1.setAttribute("list", "opt");
    newInput1.setAttribute("placeholder", "class category");
    newInput1.classList.add("class-type");

    //第二個 input
    let newInput2 = document.createElement("input");
    newInput2.setAttribute("type", "text");
    newInput2.setAttribute("placeholder", "class number");
    newInput2.classList.add("class-number");

    //第三個 input
    let newInput3 = document.createElement("input");
    newInput3.setAttribute("type", "number");
    newInput3.setAttribute("placeholder", "credits");
    newInput3.setAttribute("min", "0");
    newInput3.setAttribute("max", "6");
    newInput3.classList.add("class-credit");
    //更新GPA
    newInput3.addEventListener("change", () => {
        setGPA()
    });

    //第四個 select
    let newSelect = document.createElement("select");
    newSelect.classList.add("select");
    var opt1 = document.createElement("option");
    opt1.setAttribute("value", "");
    let textNode1 = document.createTextNode("");
    opt1.appendChild(textNode1);
    var opt2 = document.createElement("option");
    opt2.setAttribute("value", "A");
    let textNode2 = document.createTextNode("A");
    opt2.appendChild(textNode2);
    var opt3 = document.createElement("option");
    opt3.setAttribute("value", "A-");
    let textNode3 = document.createTextNode("A-");
    opt3.appendChild(textNode3);
    var opt4 = document.createElement("option");
    opt4.setAttribute("value", "B+");
    let textNode4 = document.createTextNode("B+");
    opt4.appendChild(textNode4);
    var opt5 = document.createElement("option");
    opt5.setAttribute("value", "B");
    let textNode5 = document.createTextNode("B");
    opt5.appendChild(textNode5);
    var opt6 = document.createElement("option");
    opt6.setAttribute("value", "B-");
    let textNode6 = document.createTextNode("B-");
    opt6.appendChild(textNode6);
    var opt7 = document.createElement("option");
    opt7.setAttribute("value", "C+");
    let textNode7 = document.createTextNode("C+");
    opt7.appendChild(textNode7);
    var opt8 = document.createElement("option");
    opt8.setAttribute("value", "C");
    let textNode8 = document.createTextNode("C");
    opt8.appendChild(textNode8);
    var opt9 = document.createElement("option");
    opt9.setAttribute("value", "C-");
    let textNode9 = document.createTextNode("C-");
    opt9.appendChild(textNode9);
    var opt10 = document.createElement("option");
    opt10.setAttribute("value", "D+");
    let textNode10 = document.createTextNode("D+");
    opt10.appendChild(textNode10);
    var opt11 = document.createElement("option");
    opt11.setAttribute("value", "D");
    let textNode11 = document.createTextNode("D");
    opt11.appendChild(textNode11);
    var opt12 = document.createElement("option");
    opt12.setAttribute("value", "D-");
    let textNode12 = document.createTextNode("D-");
    opt12.appendChild(textNode12);
    var opt13 = document.createElement("option");
    opt13.setAttribute("value", "F");
    let textNode13 = document.createTextNode("F");
    opt13.appendChild(textNode13);

    newSelect.appendChild(opt1);
    newSelect.appendChild(opt2);
    newSelect.appendChild(opt3);
    newSelect.appendChild(opt4);
    newSelect.appendChild(opt5);
    newSelect.appendChild(opt6);
    newSelect.appendChild(opt7);
    newSelect.appendChild(opt8);
    newSelect.appendChild(opt9);
    newSelect.appendChild(opt10);
    newSelect.appendChild(opt11);
    newSelect.appendChild(opt12);
    newSelect.appendChild(opt13);

    //讓新建立的form也被監聽 並跟著變動
    newSelect.addEventListener("change", (e) => {
        setGPA();
        changeColor(e.target);
    })

    //第五個 button
    let newButton = document.createElement("button");
    newButton.classList.add("trash-button");
    let newItag = document.createElement("i");
    newItag.classList.add("fas");
    newItag.classList.add("fa-trash");

    //把newItag append到newInput1
    newButton.appendChild(newItag);

    newButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.style.animation = "scaleDown 0.5s ease forwards";
        e.target.parentElement.parentElement.addEventListener("animationend", (e) => {
            e.target.remove();
            setGPA();
        });
    });

    //把newInput1 2 3 append到newDiv
    newDiv.appendChild(newInput1);
    newDiv.appendChild(newInput2);
    newDiv.appendChild(newInput3);

    //把newSelect append到newDiv
    newDiv.appendChild(newSelect);

    //把newButton append到newDiv
    newDiv.appendChild(newButton);

    //把newDiv append到newForm
    newForm.appendChild(newDiv);

    //把newForm append到<div class="all-inputs">
    document.querySelector(".all-inputs").appendChild(newForm);

    newForm.style.animation = "scaleUp 0.5s ease forwards";
});

//垃圾桶刪除動作
let allTrash = document.querySelectorAll(".trash-button");
//點擊後要做的事情：把整列form刪掉
allTrash.forEach(trash => {
    trash.addEventListener("click", (e) => {
        //e.target: <button class="trash-button">
        //e.target.parentElement: <div class="grader">
        //e.target.parentElement.parentElement: <form>
        e.target.parentElement.parentElement.classList.add("remove"); //先縮小
    });
});
allTrash.forEach(trash => {
    let form = trash.parentElement.parentElement;
    //監聽transition結束這個事件 結束後才觸發remove()
    form.addEventListener("transitionend", (e) => {
        e.target.remove();
        setGPA();
    });
});