$(document).ready(() => {
  console.log('Game Detect!!');
  
  const $man = $('.man');
  const $scene = $('.wrapper');
  const $window = $(window);
  const $stone = [
    $('.stone-1'),
    $('.stone-2'),
    $('.stone-3'),
    $('.stone-4'),
    $('.stone-5')
  ];

  let moveLong = 0;
  let fallLong = -200;
  let speed = 20;
  let fallSpeed = 5;
  
  let maxSceneWidth = $scene.width() - $man.width();

  // function getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  // getRandomArbitrary(0, 600);

  function manKeyPressControll() {
    $window.on('keypress', function(e) {
      if (e.keyCode === 97 || e.keyCode === 12551) {
        // alert('往左');
        moveLong = moveLong - speed;
        if (moveLong <= 0) {
          moveLong = 0;
        }
        console.log('moveLong', moveLong);
        $man.css('left', `${moveLong}px`);
      } 
      
      if (e.keyCode === 100 || e.keyCode === 12558) {
        // alert('往右');
        moveLong = moveLong + speed;
        if (moveLong >= maxSceneWidth) {
          moveLong = maxSceneWidth;
        }
        console.log('moveLong', moveLong);
        $man.css('left', `${moveLong}px`);
      }
    })
  }


  function randomStoneFall() {

    setTimeout(() => {
      fallSpeed = 10;
    }, 5000);

    setTimeout(() => {
      fallSpeed = 20;
    }, 10000);
    // setInterval(() => {
    //   fallLong = fallLong + speed;

    //   if (fallLong >= 500) {
    //     fallLong = -200;
    //   }
    //   $stone[0].css('top', `${fallLong}px`);
    // }, 100);
    console.log('redraw');
    fallLong = fallLong + fallSpeed;
    if (fallLong >= 500) {
      fallLong = -200;
    }
    $stone[0].css('top', `${fallLong}px`);

    requestAnimationFrame(randomStoneFall);
  }


  manKeyPressControll();
  randomStoneFall();
})