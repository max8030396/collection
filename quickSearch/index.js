$(document).ready(() => {
  const s2_block_nav = $('.s2_block_nav');
  
  function navChoose(){
    s2_block_nav.on('click', function(){
      // $(this).addClass('js_active').siblings().removeClass('js_active') IE舊版本不支援
      s2_block_nav.removeClass('js_active');
      $(this).addClass('js_active');
    })
  }
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

  $('#cloud1').jQCloud(words, {
    autoResize: true,
    colors: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#d0da", "#00a"],
    });
  $('#cloud2').jQCloud(words, {
    autoResize: true,
    colors: ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#d0da", "#00a"],
    });


  function handleApiAjax() {
    var $insertDom = $('.s3_block_left_ul');

    $.ajax({
      url: "http://demo2740101.mockable.io/starklab/news/",
      dataType: "json",
      async: true,
      type: "GET",
      beforeSend: function() {
        console.log('beforeWhenSend');
      },
      success: function(res) {
        console.log('success' , res.news[0]);

        for (var i = 0; i < res.news.length; i = i + 1 ) {
          $insertDom.append('<li>' + res.news[i] + '</li>')
        }

      },
      complete: function(res) {
        console.log('complete');
      },
      error: function() {
        console.log('error');
    }
    });
  }
  
navChoose();
handleApiAjax();
})