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

  const myData = [
    {key:'num1', value: 100 },
    {key:'num2', value: 10 },
    {key:'num3', value: 87 },
    {key:'num4', value: 40 },
    {key:'num5', value: 35 },
    {key:'num6', value: 23 }
    // {key:自定義, value: 數值 }
  ]

  $('#barChart').simpleBarGraph({
      data: myData,
      rowsCount: 5,
      barsColor:'#fa9',
      rowCaptionsWidth:'16px',
      height:'400px',
      // delay<a href="https://www.jqueryscript.net/animation/">Animation</a>: 10
    });
  
  var ctx = document.getElementById('barChar');
  var barChar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['black', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' , 'black'],//圖表數量及名稱
        datasets: [{
          label: '圖表1',//圖表上方說明
          data: [5, 19, 3, 5, 2, 3 ,99],//數值
          backgroundColor: [
              'rgba(255, 99, 132)',//主顏色
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)'
          ],
          borderColor: [
              'rgba(000, 0, 132, 1)',//外框顏色
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 0//外框粗度
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
  
  


})