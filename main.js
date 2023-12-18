let mouseBack = document.getElementById('mouse');
let ship = mouseBack.getBoundingClientRect();
let traget = document.getElementById('target').getBoundingClientRect();
let hit = 0;
let counterForTarget = 0;
let index = 0;
let classes = ["mon2", "mon3", "mon4", "mon5", "mon6"];
let coloers = ["#00ff6f", "#17703e", "#415313", "#56350f", "#5a220a", "#52220a", "#7a220a", "#5af20a", "#67120a", "#67120a", "#180301", "#00ff6f", "#17703e", "#415313", "#56350f", "#5a220a", "#52220a", "#7a220a", "#5af20a", "#67120a", "#67120a", "#180301"];
const date = new Date();
let hp = document.getElementById('hp');
let urhp = document.getElementById('urhp');
let urHp = 100;
let counter = 0;
// تحكم بالموس
let ssoc = 0;
// move
let moves = ["top", "left", "right", "bottom"];
let indexM = 0;
document.body.addEventListener('mousemove', (e) => {
    // console.log(e.offsetX, e.offsetY)


    if (e.offsetY <= 10 || e.offsetX <= 30) {
        return;
    }
    mouseBack.setAttribute('style', `top:${e.offsetY + "px"};left:${(e.offsetX - 18) + "px"}`);
    // if (ssoc < 5) {
    //     ssoc++;
    //     return;
    // }

    createShot({ offsetX: e.offsetX, offsetY: e.offsetY });


    // createShot({ offsetX: e.offsetX + 2, offsetY: e.offsetY  });

    counter++;
}, 0.00002)

// document.addEventListener('click', (e) => {
//     counter++;
//     createShot({ offsetX: e.x, offsetY: e.y });
// })


function createShot({ offsetY, offsetX }) {
    let div = document.createElement('div')
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width="20px" height="20px" viewBox="0 0 30 30">
<path fill="#454B54" d="M 15 3 C 11.698375 3 9 5.6983746 9 9 L 9 11 C 8.448 11 8 11.448 8 12 L 8 25 A 1.0001 1.0001 0 1 0 8 27 L 22 27 A 1.0001 1.0001 0 1 0 22 25 L 22 12 C 22 11.448 21.552 11 21 11 L 21 9 C 21 5.6983746 18.301625 3 15 3 z M 15 5 C 17.220375 5 19 6.7796254 19 9 L 19 11 L 11 11 L 11 9 C 11 6.7796254 12.779625 5 15 5 z M 12 13 C 12.552 13 13 13.448 13 14 L 13 23 C 13 23.552 12.552 24 12 24 C 11.448 24 11 23.552 11 23 L 11 14 C 11 13.448 11.448 13 12 13 z"></path>
</svg>`
    div.id = "shot";
    div.setAttribute('style', `top:${offsetY + "px"};left:${offsetX + "px"}`);
    setTimeout(() => {
        div.classList.toggle("top")
    }, 0.1)
    document.body.append(div);
    let checker = setInterval(() => {
        let s = div.getBoundingClientRect();
        if (s.top < 0) {
            div.remove();
            clearInterval(checker)
            return;
        }

        if ((s.top === traget.top) || (s.top > traget.top - 10 && s.top < traget.top + 10)) {
            if (s.left >= traget.left && s.right <= traget.right) {
                div.remove()
                // hit
                document.getElementById('target').style.backgroundColor = coloers[hit];
                console.log(document.getElementById('target').style.backgroundColor)
                document.getElementById('target').classList.add('ops')
                setTimeout(() => {
                    document.getElementById('target').classList.remove('ops');
                }, 10);

                hp.textContent = "Hp :" + (100 - ((hit / coloers.length) * 100)).toFixed(2) + "%"
                hit++;

                if (coloers.length <= hit) {
                    endGame(false);
                }
                clearInterval(checker)
            }
        }
        if (s.top === traget.top && (traget.left < s.left && s.right > traget.right)) {
            hit++;
        }
    })
    setTimeout(() => {
        try {
            div.remove();
            clearInterval(checker)
        } catch (error) {
        }
    }, 4000)
}
// /
function createShotForD({ offsetY, offsetX }) {
    let div = document.createElement('div')
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width="10px" height="10px" viewBox="0 0 40 40">
<path fill="#f78f8f" d="M32.4,26.5c0,6.6-5.5,12-12.4,12s-12.4-5.4-12.4-12c0-9,11.3-16.5,11.3-25c2.6,1.2,6.7,5.7,6.7,11.5 c0,2.5-0.5,5-0.5,5c3.1-1,3.1-4.5,3.1-4.5S32.4,19,32.4,26.5z"></path><path fill="#ffeea3" d="M19.8,17.5c0.1,0.5,0.2,1.1,0.2,1.6c0,6.1-6.5,6.5-7.3,11.4c-0.6,3.5,1.3,8,7.1,8c4.3,0,7.7-3.8,7.7-8.4 C27.4,25.5,21.1,17.7,19.8,17.5z"></path><path fill="none" stroke="#c74343" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M32.4,26.5c0,6.6-5.5,12-12.4,12s-12.4-5.4-12.4-12c0-9,11.3-16.5,11.3-25c2.6,1.2,6.7,5.7,6.7,11.5 c0,2.5-0.5,5-0.5,5c3.1-1,3.1-4.5,3.1-4.5S32.4,19,32.4,26.5z"></path>
</svg>`
    div.setAttribute('style', `top:${offsetY + "px"};left:${offsetX + "px"}`);
    div.id = "shot";

    let checker = setInterval(() => {
        let s = div.getBoundingClientRect();
        if (s.top < 0 || s.left < 0 || s.right < 0 || s.bottom < 0) {
            div.remove();
            clearInterval(checker)
            return;
        }

        if ((s.top === ship.top) || (s.top > ship.top - 10 && s.top < ship.top + 10)) {
            if (s.left >= ship.left && s.right <= ship.right) {
                div.remove()
                // hit
                urHp -= 1;
                urhp.textContent = "Hp :" + urHp + "%"
                clearInterval(checker);
                if (urHp < 0)
                    endGame(true)
            }
        }
    })
    setTimeout(() => {
        if (indexM >= moves.length) {
            indexM = 0;
        }
        div.classList.add(moves[indexM]);
        indexM++;
    }, 1)
    document.body.append(div)

    setTimeout(() => {
        div.remove();
    }, 10000)
}

setInterval(() => {
    traget = document.getElementById('target').getBoundingClientRect();
    ship = mouseBack.getBoundingClientRect();
    let s = document.getElementById('mouse').getBoundingClientRect();
    if ((s.top === traget.top) || (s.top > traget.top - 10 && s.top < traget.top + 10)) {
        if (s.left <= traget.left && s.right >= traget.right) {
            urHp -= 10;
            urhp.textContent = "Your HP :" + urHp + "%"
            if (urHp < 0)
                endGame(true)
        }
    }
    // if (ssoc < 1) {
    //     ssoc++;
    //     return;
    // }
    createShotForD({ offsetX: traget.x, offsetY: traget.y })
    // ssoc = 0;
})

// a
setInterval(() => {
    if (index > classes.length) {
        document.getElementById('target').className = ""
        index = 0;
    }
    document.getElementById('target').classList.toggle(classes[index]);
    index++;
}, 10000)

// end the game
function insertFirst(arry, v) {
    for (let i = arry.length - 1; i >= 0; i--) {
        arry[i + 1] = arry[i];
    }
    arry[0] = v;
    return arry
}

function endGame(v) {
    let newDate = new Date();
    let end = (newDate - date) / 1000 + "s";
    let s = localStorage.getItem("scor");
    if (!s) {
        s = [];
    } else {
        s = JSON.parse(s);
    }
    // 

    s = insertFirst(s, `Time :${end} , Clicks:${counter} , Did u Die : ${v}`);
    localStorage.setItem("scor", JSON.stringify(s))

    window.location.replace("/start.html")
}