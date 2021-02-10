$(document).ready(function() {
    $('.slick-Test').slick();

    var scene = document.getElementById('parallax');
    var parallaxInstance = new Parallax(parallax);

    $('.test-calculator').calculator();
})