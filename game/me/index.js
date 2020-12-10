$(document).ready(() => {
    console.log('Game Detect!!');

    const $man = $('.man');
    const $window = $(window);
    const $scene = $('.wrapper');
    const $stone =[
        $('.stone-1'),
        $('.stone-2'),
        $('.stone-3'),
        $('.stone-4'),
        $('.stone-5')
    ];

    
    let movelong = 0;
    let speed = 50;
    let $maxSceneWidth = $scene.width() - $man.width()

    function manKeyPressControll() {
        $window.on('keypress', function(e){
            if (e.keyCode === 97 || e.keyCode === 12551) {
                // alert('往左');
                movelong = movelong - speed;
                if (movelong <= 0 ) {
                    movelong = 0;
                }
                console.log('movelong', movelong);
                $man.css('left',`${movelong}px`);
            } 
            if (e.keyCode === 100 || e.keyCode === 12558){
                // alert('往右');
                movelong = movelong + speed;
                if (movelong >= $maxSceneWidth ) {
                    movelong = $maxSceneWidth;
                }
                console.log('movelong', movelong);
                $man.css('left',`${movelong}px`);
            }
        })
    }
    function randomStoneFall() {

    }








    randomStoneFall();
    manKeyPressControll();
})