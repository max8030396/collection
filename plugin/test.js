$(document).ready(function() {
  $('.slick-test').slick();

  var scene = document.getElementById('parallax');
  var parallaxInstance = new Parallax(scene);

  $('.test-calculator').calculator({
    placeholder: '周子搖',
    bgColor: '#f00',
  })



  
  var words = [
    {text: "台積電", weight: 13, link: 'http://github.com/mistic100/jQCloud'},
    {text: "聯發科", weight: 10.5, link: 'http://www.strangeplanet.fr'},
    {text: "中鋼", weight: 9.4, link: 'http://piwigo.org'},
    {text: "富邦金", weight: 13},
    {text: "玉山金", weight: 10.5},
    {text: "中華", weight: 9.4},
    {text: "遠傳", weight: 8},
    {text: "台哥大", weight: 6.2},
    {text: "華碩", weight: 5},
    {text: "宏碁", weight: 5},
    /* ... */
  ];
  
  $('#testTest').jQCloud(words, {
    autoResize: true,
    colors: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#d0da", "#00a"],
    });
})