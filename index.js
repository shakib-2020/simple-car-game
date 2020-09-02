const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);

startScreen.addEventListener('click',start);


let player = { speed : 5, score: 0 };

let keys = {ArrowUp : false,ArrowDown : false,ArrowLeft : false,ArrowRight : false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
   // console.log(e.key)
   // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
   // console.log(e.key)
//    console.log(keys);

}
function isCollide(a,b){
 aRact = a.getBoundingClientRect();
 bRact = b.getBoundingClientRect();

    return !((aRact.bottom < bRact.top) || (aRact.top > bRact.bottom) || (aRact.right < bRact.left) || (aRact.left > bRact.right))

}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y>=700){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top =item.y +"px";

    })
}
function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "<---GAME OVER ---> <br> Your final score is " + player.score+ "<br> Press here to restart the game.";

}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){
        if(isCollide(car, item)){
            console.log("BOOM!! hit");
           playSound("hit");
           endGame();
        }

        if(item.y>=750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350 ) + "px";

        }

        item.y += player.speed;
        item.style.top =item.y +"px";

    })
}



function gamePlay(){
    // console.log("Hay I am clicked.");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > ( road.top + 90)){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 85)){player.y +=  player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -=  player.speed}
        if(keys.ArrowRight && player.x < (road.width - 65)){player.x +=  player.speed}

         // if(keys.ArrowDown||keys.ArrowLeft||keys.ArrowRight||keys.ArrowUp){
         //   playSound("pass");
         // }

        car.style.top=player.y +"px";
        car.style.left=player.x +"px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);

        player.score++;
        let ps = player.score -2;
        score.innerHTML = "Score: " +ps;
    }

}

function start(){
    playSound("start");

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
    let roadline = document.createElement('div');
    roadline.setAttribute('class','lines');
    roadline.y = (x*150) ;
    roadline.style.top =roadline.y +"px";
    gameArea.appendChild(roadline);

    }



    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText = "Hey! i am ur car buddy."
    gameArea.appendChild(car);


    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    // console.log("Top position" + car.offsetTop);
    // console.log("Left position" + car.offsetLeft);
    for(x=0;x<3;x++){
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y =((x+1)*350) * -1;
    enemyCar.style.top =enemyCar.y +"px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";
    gameArea.appendChild(enemyCar);

    }
}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();

}

function playSound(name){
    var audio = new Audio("sound/"+name+".wav");
    audio.play();
}
