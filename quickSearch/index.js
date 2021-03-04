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
    {text: "利益", weight: 11.5, link: 'http://github.com/mistic100/jQCloud'},
    {text: "成長", weight: 8.5, link: 'http://www.strangeplanet.fr'},
    {text: "效能", weight: 9.4, link: 'http://piwigo.org'},
    {text: "高效", weight: 13, link: 'http://piwigo.org'},
    {text: "高效能", weight: 7.5, link: 'http://piwigo.org'},
    {text: "帶動", weight: 9.4, link: 'http://piwigo.org'},
    {text: "穩定", weight: 8, link: 'http://piwigo.org'},
    {text: "穩定的", weight: 6.2, link: 'http://piwigo.org'},
    {text: "人傑", weight: 16.9, link: 'http://piwigo.org'},
    {text: "上升", weight: 11.3, link: 'http://piwigo.org'},
    /* ... */
  ];

  $('#s4_block_left_box1_cloud1').jQCloud(words, {
    autoResize: true,
    colors: ["#e7228c", "#e7237c", "#e01671", "#dd0f6c", "#d90866", "#b5179e", "#a514a5", "#9410ab", "#8c0fae", "#830db1"],
    });
  $('#s4_block_right_box1_cloud2').jQCloud(words, {
    // autoResize: true,
    colors: ["#800026","#6c757d", "#bd0026", "#00a", "#e31a1c", "#5E503F", "#fc4e2a", "#fd8d3c", "#0D6FB8", "#1b4332"],
    });


  function handleApiAjax() {
    var $insertDom = $('.s3_block_left_ul');
    var $positive = $('.s4_block_left_box3_ul');
    var $negative = $('.s4_block_right_box3_ul');
    $.ajax({
      url: "http://demo2740101.mockable.io/starklab/news/",
      dataType: "json",
      async: true,
      type: "GET",
      beforeSend: function() {
        console.log('beforeSend');
      },
      success: function(res) {
        console.log('success' , res.news[0]);

        for (var i = 0; i < res.news.length; i = i + 1 ) {
          $insertDom.append('<li>' + res.news[i] + '</li>')
        }
        for (var j = 0; j < res.positive.length; j = j + 1 ) {
          $positive.append('<li>' + res.positive[j] + '</li>')
        }
        for (var k = 0; k < res.negative.length; k = k + 1 ) {
          $negative.append('<li>' + res.negative[k] + '</li>')
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

  function barChart1() {
    var ctx = document.getElementById('s4_block_left_box2_barChart1');
    var s4_block_left_barChart1 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['利益', '成長', '效能', '高效', '高效能', '帶動' , '穩定', '穩定的', '人傑' , '上升'],//圖表數量及名稱
          datasets: [{
            label: '',//圖表上方說明
            data: [5, 19, 3, 5, 2, 3 , 9, 26, 12, 17],//數值
            backgroundColor: [
                'rgba(45, 0, 247, 0.7)',//主顏色
                'rgba(106, 0, 244, 0.7)',
                'rgba(137, 0, 242, 0.7)',
                'rgba(161, 0, 242, 0.7)',
                'rgba(177, 0, 232, 0.7)',
                'rgba(188, 0, 221, 0.7)',
                'rgba(209, 0, 209, 0.7)',
                'rgba(219, 0, 182, 0.7)',
                'rgba(229, 0, 164, 0.7)',
                'rgba(242, 0, 137, 0.7)'
            ],
            borderColor: [
                'rgba(45, 0, 247, 1)',//外框顏色
                'rgba(106, 0, 244, 1)',
                'rgba(137, 0, 242, 1)',
                'rgba(161, 0, 242, 1)',
                'rgba(177, 0, 232, 1)',
                'rgba(188, 0, 221, 1)',
                'rgba(209, 0, 209, 1)',
                'rgba(219, 0, 182, 1)',
                'rgba(229, 0, 164, 1)',
                'rgba(242, 0, 137, 1)'
            ],
            borderWidth: 1.5//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
  }

  function barChart2() {
    var ctx = document.getElementById('s4_block_right_box2_barChart2');
    var s4_block_right_barChart2 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['利益', '成長', '效能', '高效', '高效能', '帶動' , '穩定', '穩定的', '人傑' , '上升'],//圖表數量及名稱
          datasets: [{
            label: '',//圖表上方說明
            data: [5, 19, 3, 5, 2, 3 , 9, 26, 12, 17],//數值
            backgroundColor: [
                'rgba(45, 0, 247, 0.7)',//主顏色
                'rgba(106, 0, 244, 0.7)',
                'rgba(137, 0, 242, 0.7)',
                'rgba(161, 0, 242, 0.7)',
                'rgba(177, 0, 232, 0.7)',
                'rgba(188, 0, 221, 0.7)',
                'rgba(209, 0, 209, 0.7)',
                'rgba(219, 0, 182, 0.7)',
                'rgba(229, 0, 164, 0.7)',
                'rgba(242, 0, 137, 0.7)'
            ],
            borderColor: [
                'rgba(45, 0, 247, 1)',//外框顏色
                'rgba(106, 0, 244, 1)',
                'rgba(137, 0, 242, 1)',
                'rgba(161, 0, 242, 1)',
                'rgba(177, 0, 232, 1)',
                'rgba(188, 0, 221, 1)',
                'rgba(209, 0, 209, 1)',
                'rgba(219, 0, 182, 1)',
                'rgba(229, 0, 164, 1)',
                'rgba(242, 0, 137, 1)'
            ],
            borderWidth: 1.5//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
  }

  navChoose();
  handleApiAjax();
  barChart1();
  barChart2();
})