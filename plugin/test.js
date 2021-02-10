$(document).ready(function() {
  $('.slick-test').slick();

  var scene = document.getElementById('parallax');
  var parallaxInstance = new Parallax(scene);

  $('.test-calculator').calculator({
    placeholder: '周子搖',
    bgColor: '#f00',
  })
})