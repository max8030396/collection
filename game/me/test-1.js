$(document).ready(() => {
  
const $window = $(window);
const $man = $('.man');
const $scene = $('.wrapper');
const $maxSceneWidth = $scene.width() - $man.width();
const $easy = $('#E');
const $normal = $('#N');
const $hard = $('#H');
const $reset = $('.reset');
const $startPress = $('.startPress');
const $mask = $('.mask');

let isActive = false;
let moveLong = 0;
let moveSpeed = 50;

//遊戲初始化設定
function startGameInit (){

  $startPress.hide();
  $reset.hide();
  function modeSelection () {
      //重新選擇模式
    $reset.click(() => {
      $easy.show();
      $hard.show();
      $normal.show();
      $reset.hide();
      $startPress.hide();
      // isActive = false;
    })

    //簡單模式
    $easy.click(() => {
      $normal.hide();
      $hard.hide();
      $reset.hide();
      if ($normal.hide(),$normal.hide()) {
        $startPress.show();
        $reset.show();
      }
      $startPress.click(() => {
        $mask.hide();
        isActive = true;
      })
    })

    //普通模式
    $normal.click(() => {
      $easy.hide();
      $hard.hide();
      $reset.hide();
      if ($easy.hide(),$hard.hide()) {
        $startPress.show();
        $reset.show();
      }
      $startPress.click(() => {
        $mask.hide();
        isActive = true;
        isActive = true;
      })
    })

    //困難模式
    $hard.click(() => {
      $easy.hide();
      $normal.hide();
      $reset.hide();
      if ($easy.hide(),$normal.hide()) {
        $startPress.show();
        $reset.show();
      }
      $startPress.click(() => {
        $mask.hide();
        isActive = true;
        isActive = true;
      })
    })
  }
  modeSelection();
}
//人物控制
function manKeyPressControl () {
//人物左移動
  $window.on('keypress', (e) => {
    if (e.keyCode === 97 || e.keyCode === 12551) {
      moveLong = moveLong - moveSpeed;
      if (moveLong <= 0) {moveLong = 0};
      $man.css('left', `${moveLong}px`);
    }
//人物右移動
    if (e.keyCode === 100 || e.keyCode === 12558) {
      moveLong = moveLong + moveSpeed;
      if (moveLong >= $maxSceneWidth) {moveLong = $maxSceneWidth};
      $man.css('left', `${moveLong}px`);
    }

  })
}
















  startGameInit();
  manKeyPressControl();

})