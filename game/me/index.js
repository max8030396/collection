$(document).ready(() => {

  const dev = false;

	const $startBtn = $('.mask') //遮罩
	const $window = $(window);
	const $man = $('.man');
  const $scene = $('.wrapper');
  const $scoreBoard = $('.point');
  const $scoreTimer = $('.timer');

  let $manStatus = {
    posX:0,
    posY: $scene.height() - $man.height()
  }
  console.log('H', $manStatus.posY);
  //各磚塊狀態、值
	let $stone = [
    {
      target: $('.stone-1'),
      posX:getRandomArbitrary(0, $scene.width() - 47),
      posY: -120,
      speed:getRandomArbitrary(5,12)
    },
    {
      target: $('.stone-2'),
      posX:getRandomArbitrary(0, $scene.width() - 47),
      posY: -120,
      speed:getRandomArbitrary(5,12)
    },
    {
      target: $('.stone-3'),
      posX:getRandomArbitrary(0, $scene.width() - 47),
      posY: -120,
      speed:getRandomArbitrary(5,12)
    }
  ];

  let currentTime = 120; //倒數計時秒數
	let isActive = false; //遊戲是否啟動
  let moveLong = 0;
  let manSpeed = 100;//移動速度
  let $maxSceneWidth = $scene.width() - $man.width();
  let scroePoint = 0; //分數

  // 取得隨機素質
	function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  // 遊戲初始化設定
	function startGameInit() {

    for(let i = 0; i < $stone.length; i = i + 1) {
      $stone[i].target.css('left', `${$stone[i].posX}px`);
    }

		$startBtn.click(function () {
			$startBtn.hide();
      isActive = true;
      // console.log('StartGame', $startBtn,isActive);
      $scoreTimer.text(`剩 ${currentTime} 秒`);
      const pointTimer = setInterval(() => {
        currentTime = currentTime - 1;
        if (currentTime < 0) {
          isActive = false;
          alert(`你的得分是 ${scroePoint} 分`);
          clearInterval(pointTimer);
          return;
        }
        $scoreTimer.text(`剩 ${currentTime} 秒`);
      }, 1000);
		})
  }
  
  //人物移動控制
	function manKeyPressControl() {

		$window.on('keypress', function (e) {
			if (e.keyCode === 97 || e.keyCode === 12551) {
        // alert('to left')
				moveLong = moveLong - manSpeed;
				if (moveLong <= 0) { moveLong = 0; }
				// console.log('moveLong', moveLong);
				$man.css('left', `${moveLong}px`);
			}
			if (e.keyCode === 100 || e.keyCode === 12558) {
				// alert('to right')
				moveLong = moveLong + manSpeed;
				if (moveLong >= $maxSceneWidth) { moveLong = $maxSceneWidth; }
				// console.log('how', moveLong);
				$man.css('left', `${moveLong}px`);
			}

		})
	}

  //隨機磚塊掉落
	function randomFallStone() {
		requestAnimationFrame(randomFallStone);
		if (!isActive){
			return;
		}
		
    for(let i = 0; i < $stone.length; i = i + 1) {
      $stone[i].posY = $stone[i].posY + $stone[i].speed;
      if ($stone[i].posY >= 500) {
        $stone[i].posY = -120;
        $stone[i].posX = getRandomArbitrary(0, $scene.width() - 47);
        $stone[i].speed = getRandomArbitrary(5,12);
        scroePoint = scroePoint + 1;
       }
      $stone[i].target.css('top', `${$stone[i].posY}px`);
      $stone[i].target.css('left', `${$stone[i].posX}px`);
    }
    $scoreBoard.text(`得分 ${scroePoint}`);
	}

	startGameInit();
	manKeyPressControl();
	randomFallStone();
})

// 加上簡單、困難難易度選擇（不能直接開始一定要選擇）o
// 磚塊掉落後顏色更換
// 挑戰撞擊判斷
// 結束重新開始按鈕


//TEST

let $stoneLeft = $('.stone').position().left;
let $stoneTop = $('.stone').position().top;
let $stoneLeftWidth = $stoneLeft + 47;
let $manLeft = $('.man').position().left;
let $manLeftWidth = $('.man').position().left + 47;



if($stoneTop === $man) {
  if($stoneLeft >= $manLeft&&stoneLeft <= $manLeftWidth||$stoneLeftWidth >= $manLeft&$stoneLeftWidth <= $manLeftWidth) {
    console.log('目前高度', $manLeft);
    isActive = false;
    alert('撞到囉');
    return;
  }
} else {
  isActive = true;
  alert('沒事');
}




if($stone[i].posY >= 290) {
  alert('撞到囉');
}







function stoneImpact () {
  $.each($(".stone"),function() {
    stoneA[0] = $(this).position().top;
    stoneB[1] = $(this).position().left;
    stoneC[2] = $(this).position().top + $(this).height();
    stoneD[3] = $(this).position().left + $(this).width();

    for(let i = 0, i < $('.stone').length; i = i + 1;){
      manA[]
      manB[]
      manC[]
      manD[]
    }
  })
}

const blockHit = new Array;
let $manLeft = $('.man').position().left;
let $manTop = $('.man').position().top;
let $manLeftWidth = $manLeft + 47;

$('.stone').each(function(){
  blockHit[0] = $(this).position().left;
  blockHit[1] = $(this).position().top;
  blockHit[2] = $(this).position().left + 47;

  for(let i = 0;i < $('.stone').length);i = i + 1){
    if($manTop === 395){
      if(blockHit[0] >= $manLeft&&blockHit[0] <= $manLeftWidth||$blockHit[2] >= $manLeft&&blockHit[2] <= $manLeftWidth){
        isActive = false;
        alert('撞到囉');
        return;
      }
    }
  }
})


///成功一顆
let $stoneLeft = $('.stone').position().left;
let $stoneTop = $('.stone').position().top;
let $stoneLeftWidth = $stoneLeft + 47;
// let $stoneLeftHeight = $stoneTop - 105;
let $manLeft = $('.man').position().left;
let $manTop = $('.man').position().top;
let $manLeftWidth = $manLeft + 47;
// let $manLeftHeight = $manTop + 105;
// console.log('石頭高度Y', $stoneTop);
// console.log('石頭底部X1.X2', $stoneLeft,$stoneLeftWidth);
// console.log('人物高度Y', $manTop);
// console.log('人物頂部X1.X2', $manLeft,$manLeftWidth);

if($stoneTop >= $manTop) {
  if($stoneLeft >= $manLeft&&$stoneLeft <= $manLeftWidth||$stoneLeftWidth >= $manLeft&$stoneLeftWidth <= $manLeftWidth) {
    isActive = false;
    alert('撞到囉');
    return;
  }
}

//
if($stone[i].posY >=290 ) {
  if(posX >= $manLeft&&$posX <= $manLeftWidth||$posX1 >= $manLeft&&$posX1 <= $manLeftWidth){
    isActive = false;
    alert('撞到囉');
    return;
  }
}
//
const stoneBox = new Array;
const manBox = new Array;
function hittest (){
  $.each($('.stone'), function(){
    stoneBox[0] = $(this).position().left;
    stoneBox[1] = $(this).position().top;
    stoneBox[2] = $(this).position().left + $(this).width();
    stoneBox[3] = $(this).position().top + (this).height();
  })
  for(let i = 0;i < $('.stone'.length; i = i + 1;) {
 
  })
}
const $hitBox = [
  stoneLeft = $('.stone').position().left,
  stoneTop = $('.stone').position().top,
  $stoneLeftWidth = $('.stone').position().left + 47,
]
const $playerBox = [
  manLeft = $('.man').position().left,
  manTop = $('.man').position().top,
  manLeftWidth = $('.man').position().left + 47
]

if($('.stone').eq(i).children('div').hasclass('stone')){
  $(this).alart('撞到囉')
}



//////
function crashTest (){
  const stoneBox[
    x = $('.stone')
  ]

  需要去追尋三個石頭的Ｙ軸
  三個石頭到達一個值後判斷
}