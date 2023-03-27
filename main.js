// 캠버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d") // <canvas> 요소에 대한 2D 드로잉 컨텍스트를 반환하는 메서드
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas)


// 이미지 가져오기 
let backgroundImg, spaceshipImg, bulletImg, enemyImg, gameoverImg;
// 우주선의 좌표가 계속 변동되어야 하기에
let spaceshipX = canvas.width/2-30; // 
let spaceshipY = canvas.height-60;
let bulletList = []

function loadImage () {
  backgroundImg = new Image();
  backgroundImg.src="images/background.gif";
  spaceshipImg = new Image();
  spaceshipImg.src="images/spaceship.png"
  bulletImg = new Image();
  bulletImg.src="images/bullet.png"
  enemyImg = new Image();
  enemyImg.src="images/enemy.png"
  gameoverImg = new Image();
  gameoverImg.src="images/gameover.png"
}

// 이미지를 보여주는 함수 
function render () {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY) // 너비는 필요없죠
  for(i=0; i < bulletList.length;i++) {
    ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y)
  } // 총알이 담겨지는 것을 볼 수 있ㅅ브니다. 
}

function main() {
  update() // 여기서 부릅니다. 업데이트를 적용해주어야 하기 때문입니다. 움직이기 위해서 불러줘야 합니다. 
  render(); // 그려주고 
  requestAnimationFrame(main)  // 프레임을 미친듯이 호출  
}


// 방향키를 누르면 
let keysDown={}
function setupKeyboardListener() {
  document.addEventListener("keydown", function(event){
    // console.log("무슨키가 눌렸어?", event.keyCode)
    // 화살표가 좌상우하 37, 38, 39, 40 
    // 스페이시는 32 로 불려집니다.  
    // 이는 0과 1 밖에 모르는 컴퓨터는 숫자로 이를 알기 때문이다. 
    // 숫자로 반환할 수 있다면, 이를 저장해 놓을 공간이 필요합니다. 
    keysDown[event.keyCode] = true
    console.log("키다운액체에 들어간 값은", keysDown);
    // 그런데 키를 때는 순간 필요없어진 값은 삭제되어야 겠죠? 
  })
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode] // 이를 퉁해서 값이 하나만 유지되도록 한다.
    // console.log("버튼 클릭후", keysDown);

  // 촟알 만들기가 여기에 생성됩니다. 
  if(event.keyCode == 32) {
    createBullet()
  }

  })
}

// 방향키의 값을 구할 수 있다면, 해당 값으로 제어해보자. x,y 값에 변화를 주기 
function update () {
  if( 39 in keysDown) {
    spaceshipX += 2 // 속도를 조절할 수 있습니다. 
  }
  if( 37 in keysDown) {
    spaceshipX -= 2
  }
  if( 38 in keysDown) {
    spaceshipY -= 2
  }
  if( 40 in keysDown) {
    spaceshipY += 2
  }
  // 그런데 고민은, 공간 밖으로 나가면 안될 것입니다. max를 정하면 되지 않을까? 
  // 위에서 제어한다고 생각했는데, 그게 아니라 아래에서 제어합니다. 
  if (spaceshipX <= 0) {
    spaceshipX=0
  }
  if (spaceshipX >= canvas.width-60) {
    spaceshipX=canvas.width-60
  }
  if (spaceshipY <= 0) {
    spaceshipY=0
  }
  if (spaceshipY >= canvas.height-60) {
    spaceshipY=canvas.height-60
  }
  
  for (i=0;i< bulletList.length; i++) {
    bulletList[i].update();
  }
}

// 총알발사하기 
// 스페이스바는 keyCode 32 였습니다. 위로 올라간다는 것은 Y 좌표가 줄어든다는 것을 말합니다. 
// 총알을 관리할 배열을 만들자 [bullet1, bullet2, bullet3, bullet4] = b
// 그리고 이 총알을 render 해주면 됩니다. 
// 총알의 시작점은 spaceship 의 현재 좌표가 되겠지?  
// 이것을 class 라고 하는데, 이를 함수로 제작해봅시다. 
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알의 위치값 세팅
// 3. 그 값을 배열에 저장


function Bullet () {
  this.x = 0;
  this.y = 0;
  this.init=function() {
    this.x = spaceshipX;
    this.y = spaceshipY
    bulletList.push(this)
  }
  this.update = function () {
    this.y -= 7;
  }
  // 초기값을 변경해 준다. 
}

function createBullet() {
  // 함수를 따로 만드는 이유는 함수는 하나의 역할을 담고 있어야 합니다. 
  // console.log("총알생성"); 60번쨰 줄
  let b = new Bullet();
  b.init()

}



loadImage();
setupKeyboardListener()  
main(); // render()가 한 번이 아니라, 무수히 반복되어야 하기에 requestAnimationFrame 를 통해서 재귀함수를 사용하는 것입니다. 

