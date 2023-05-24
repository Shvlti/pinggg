let gameState = "start";


let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');

let border = document.querySelector('.border');

let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');

let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');

let message = document.querySelector('.message');

let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = initial_ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let border_coord = border.getBoundingClientRect();

let paddle_common = document.querySelector('.paddle').getBoundingClientRect();


let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener("keydown", (e) => {   
    if(e.key == "Enter"){
        gameState = gameState == "start" ? "play" : "start";
        document.querySelector('.message').textContent = "Game Started";
        requestAnimationFrame(() => {
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
            dxd = Math.floor(Math.random() * 2);
            dyd = Math.floor(Math.random() * 2);
            moveBall(dx, dy, dxd, dyd)
        })
    }
    if(gameState == "play"){
        if(e.key == 'w'){
            paddle_1.style.top = Math.max(
                border_coord.top,
                paddle_1_coord.top - window.innerHeight * 0.06
            ) + 'px';
            paddle_1_coord = paddle_1.getBoundingClientRect();
        }
    }
    if(gameState == "play"){
        if(e.key == 's'){
            paddle_1.style.top = Math.min(
                border_coord.bottom - paddle_common.height,
                paddle_1_coord.top + window.innerHeight * 0.06
            ) + 'px';
            paddle_1_coord = paddle_1.getBoundingClientRect();
        }
    }
    if(gameState == "play"){
        if(e.key == 'ArrowUp'){
            paddle_2.style.top = Math.max(
                border_coord.top,
                paddle_2_coord.top - window.innerHeight * 0.06
            ) + 'px';
            paddle_2_coord = paddle_2.getBoundingClientRect();
        }
    }
    if(gameState == "play"){
        if(e.key == 'ArrowDown'){
            paddle_2.style.top = Math.min(
                border_coord.bottom - paddle_common.height,
                paddle_2_coord.top + window.innerHeight * 0.06
            ) + 'px';
            paddle_2_coord = paddle_2.getBoundingClientRect();
        }
    }
})

function moveBall(dx, dy, dxd, dyd){
    if(ball_coord.top <= border_coord.top){
        dyd = 1;
    }
    if(ball_coord.bottom >= border_coord.bottom){
        dyd = 0;
    }
    if(ball_coord.left <= paddle_1_coord.right && ball_coord.top >= paddle_1_coord.top && ball_coord.bottom <= paddle_1_coord.bottom){
        dxd = 1;
        dx = Math.floor(Math.random() *4) +3;
        dy = Math.floor(Math.random() *4) +3;
    }
    else if(ball_coord.right >= paddle_2_coord.left && ball_coord.top >= paddle_2_coord.top && ball_coord.bottom <= paddle_2_coord.bottom){
        dxd = 0;
        dx = Math.floor(Math.random() *4) +3;
        dy = Math.floor(Math.random() *4) +3;
    }
    if(ball_coord.left <= border_coord.left || ball_coord.right >= border_coord.right) {
        if(ball_coord.left <= border_coord.left){
            score_2.innerHTML = +score_2.innerHTML + 1;
        }
        if(ball_coord.right >= border_coord.right){
            score_1.innerHTML = +score_1.innerHTML + 1;
        }
        gameState = 'start';
        ball_coord = initial_ball_coord;
        ball.style = initial_ball.style;
        message.innerHTML = 'Press Enter to Play';
        return;
    }
    ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBall(dx, dy, dxd, dyd)
    })
}