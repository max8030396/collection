$(document).ready(() => {
  
const $window = $(window);
const $man = $('.man');
const $scene = $('.wrapper');
const $mask = $('.mask');
// const $easy = $('#E');
// const $normal = $('#N');
// const $hard = $('#H');
const $modeBtn = $('.option');
const $reset = $('.reset');
const $startPress = $('.startPress');
const $scoreTimer = $('.timer');
const $scoreBorad = $('.point');




//磚塊陣列值
const $stone = [
  {
    target: $('.stone-1'),
    posX: getRandomArbitrary(0, $scene.width() - 47),
    posY: -120,
    speed: getRandomArbitrary(3,8),
  },
  {
    target: $('.stone-2'),
    posX: getRandomArbitrary(0, $scene.width() - 47),
    posY: -120,
    speed: getRandomArbitrary(3,8),
  },
  {
    target: $('.stone-3'),
    posX: getRandomArbitrary(0, $scene.width() - 47),
    posY: -120,
    speed: getRandomArbitrary(3,8),
  }
];
let currenTime = 100;
let isActive = false;
let moveLong = 0;
let moveSpeed = 100;
let $maxSceneWidth = $scene.width() - $man.width();
let scorePoint = 0;
let speedIncrease = 0;
let currentMode = '';
//取得隨機素質公式
function getRandomArbitrary(min,max){
  return Math.floor (Math.random() * (max - min) + min);
}

//遊戲初始化設定
  function startGameInit (){
    //開始及重新選擇隱藏
    
    $startPress.hide();
    $reset.hide();
//磚塊Ｘ軸隨機位置
    for (let i = 0; i < $stone.length; i = i +1) {
      $stone[i].target.css('left', `${$stone[i].posX}px`);
    }
    //難度選擇
    function modeSelection () {
        //點擊難度按鈕後做的事情
        function _showCurrentModeBtn(target) {
          $modeBtn.hide();
          target.show();
          $startPress.show();
          $reset.show();
        }

        $modeBtn.on('click', function () {
          let $this = $(this);
          currentMode = $this.attr('data-mode');

          switch (currentMode) {
            case '1':
              break;
            case '2':
              speedIncrease = 3;
              break;
            case '3':
              speedIncrease = 5;
              break;
            default:
              break;
          }
          _showCurrentModeBtn($this);
        });

      // $reset.click(() => {
      //   $easy.show();
      //   $hard.show();
      //   $normal.show();
      //   $reset.hide();
      //   $startPress.hide();
      //   // isActive = false;
      // })

      //簡單模式
      // $easy.click(() => {
      //   $normal.hide();
      //   $hard.hide();
      //   $reset.hide();
      //   if ($normal.hide(),$normal.hide()) {
      //     $startPress.show();
      //     $reset.show();
      //   }
      // })

      //普通模式
      // $normal.click(() => {
      //   $easy.hide();
      //   $hard.hide();
      //   $reset.hide();
      //   speedIncrease = 3;
      //   if ($easy.hide(),$hard.hide()) {
      //     $startPress.show();
      //     $reset.show();
      //   }
      // })

      //困難模式
      // $hard.click(() => {
      //   $easy.hide();
      //   $normal.hide();
      //   $reset.hide();
      //   speedIncrease = 10;
      //   if ($easy.hide(),$normal.hide()) {
      //     $startPress.show();
      //     $reset.show();
      //   }
      // })

    }

    //遊戲是否啟動,時間設定,最終得分
    $startPress.click(() => {
      $mask.hide();
      isActive = true;
      $scoreTimer.text(`剩下${currenTime}秒`);
      const endGame = setInterval(() => {
        currenTime = currenTime - 1;
        if(currenTime < 0) {
          isActive = false
          alert(`你的得分是${scorePoint}`);
          clearInterval(endGame)
          return;
        } 
        $scoreTimer.text(`剩下${currenTime}秒`);
      }, 1000);
      
    })

    modeSelection();
  }

//人物移動控制
  function manKeyPressControl () {
  //人物左移動
    $window.on('keypress', (e) => {
      if (e.keyCode === 97 || e.keyCode === 12551) {
        moveLong = moveLong - moveSpeed;
        if (moveLong <= 0) {moveLong = 0};
        $man.css('left', `${moveLong}px`);
      }
    })
  //人物右移動
    $window.on('keypress', (e) => {
      if (e.keyCode === 100 || e.keyCode === 12558) {
        moveLong = moveLong + moveSpeed;
        if (moveLong >= $maxSceneWidth) {moveLong = $maxSceneWidth};
        $man.css('left', `${moveLong}px`);
      }
    })
  }

//隨機磚塊掉落
  function randomFallStone () {
    requestAnimationFrame(randomFallStone);
    if (!isActive) { return;}
   
    for(let i = 0; i < $stone.length; i = i + 1) {
      $stone[i].posY = $stone[i].posY + $stone[i].speed + speedIncrease;
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
      if($stoneTop >= 290) {
        if($stoneLeft >= $manLeft&&$stoneLeft <= $manLeftWidth||$stoneLeftWidth >= $manLeft&$stoneLeftWidth <= $manLeftWidth) {
          isActive = false;
          alert('撞到囉');
          return;
        }
      }

      // console.log('increase', $stone[i].speed + speedIncrease);
      if ($stone[i].posY >= 500) {
        $stone[i].posY = -120;
        $stone[i].posX = getRandomArbitrary(0,$scene.width() - 47);
        scorePoint = scorePoint + 1;
      }
      $stone[i].target.css('top', `${$stone[i].posY}px`);
      $stone[i].target.css('left', `${$stone[i].posX}px`);
      $scoreBorad.text(`得${scorePoint}分`);
    }
  }


  














  startGameInit();
  manKeyPressControl();
  randomFallStone();
})