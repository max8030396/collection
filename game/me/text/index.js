$(document).ready(() => {

	const $startBtn = $('.startPress')
	const $window = $(window);
	const $man = $('.man');
	const $scene = $('.wrapper');
	const $stone = $('.stone');
	const $stone1 = [
		$('stone-1'),
		$('stone-2'),
		$('stone-3'),
		$('stone-4'),
		$('stone-5')
	];
	console.log(Array.isArray($stone1));

	let movelong = 0;
	let speed = 110;
	let $maxSceneWidth = $scene.width() - $man.width();
	let fallLong = -120;
	let fallSpeed = 3;

	function startGame() {
		$startBtn.click(function () {
			$startBtn.hide();
			console.log('StartGame', $startBtn);
		})
	}

	function manKeyPressControl() {


		$window.on('keypress', function (e) {
			if (e.keyCode === 97 || e.keyCode === 12551) {
				// alert('to left')
				movelong = movelong - speed;
				if (movelong <= 0) { movelong = 0; }
				console.log('movelong', movelong);
				$man.css('left', `${movelong}px`);
			}
			if (e.keyCode === 100 || e.keyCode === 12558) {
				// alert('to right')
				movelong = movelong + speed;
				if (movelong >= $maxSceneWidth) { movelong = $maxSceneWidth; }
				console.log('how', movelong);
				$man.css('left', `${movelong}px`);
			}

		})
	}


	function randomFallStone() {

		setTimeout(() => {
			fallSpeed = 7;
		}, 10000);

		setTimeout(() => {
			fallSpeed = 10;
		}, 100000);

		// setInterval(() => {
		//     fallLong = fallLong + fallSpeed;
		//     if (fallLong >= 500) {fallLong = -120}
		//     console.log('test', fallLong);
		//     $stone.css('top', `${fallLong}px`);
		// },500);
		fallLong = fallLong + fallSpeed;
		if (fallLong >= 500) { fallLong = -120 }
		console.log('test', fallLong);
		$stone.css('top', `${fallLong}px`);

		requestAnimationFrame(randomFallStone);
	}

	// function veryHighSpeed (){
	//     setInterval (function() {
	//         fallLong = fallLong + fallSpeed;
	//         if (fallLong >= 500) {fallLong = -120;}
	//         console.log('speed',fallLong);
	//         $stone.css('top', `${fallLong}px`);
	//     },1000);
	// requestAnimationFrame(veryHighSpeed);
	// }







	startGame();
	manKeyPressControl();
	// randomFallStone();
	// veryHighSpeed ();

})


