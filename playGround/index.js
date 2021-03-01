$(document).ready(() => {

function 要怎麼套入文字雲() {
  function randomSelectorColor() {
    var colors = [   //顏色資料庫
      "#e7228c",
      "#e7237c", 
      "#e01671", 
      "#dd0f6c", 
      "#d90866", 
      "#b5179e", 
      "#a514a5", 
      "#9410ab", 
      "#8c0fae", 
      "#830db1",
      "#800026",
      "#6c757d", 
      "#bd0026", 
      "#00a", 
      "#e31a1c", 
      "#5E503F", 
      "#fc4e2a", 
      "#fd8d3c", 
      "#0D6FB8", 
      "#1b4332"
    ]
    function getRandom (num) { //取得隨機數
      return Math.floor(Math.random() * num);
    }
    var i = colors.length
    var finalColor = colors[getRandom(i)];
    var boxColor = $('.colorDiv');
    boxColor.css('background-color',`${finalColor}`);
    // console.log(finalColor);
  } 
  setInterval(randomSelectorColor,1000)//每秒變色
}
  
  //時鐘
  function 動態時鐘 (){
    function getDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var date = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
      var ampm = '';
      var output = $('#time')
      
      if (hour > 12 ){
        hour = '0'+ (hour%12)
        ampm = 'pm';
      } else {
        ampm = 'am';
      }

      if (sec < 10) {
        sec = '0' + sec
      } else if (min < 10) {
          min = '0' + min
       }
      output.text(year + '/' + (month + 1) + '/' + date + ' ' + hour + ':' + min + ':' + sec + ampm); 
      refresh ();
    }
    function refresh () {
      setTimeout(getDate,1000);
    }
    getDate();
  }
  
  
  
  //倒數計時器
  function 倒數計時器() {
  var countdown = function(due) {
    var now = new Date();
    
    var reset = due.getTime() - now.getTime();
    var m = Math.floor(reset/1000/60)%60
    var h = Math.floor(reset/1000/60/60)%24
    var d = Math.floor(reset/1000/60/60/24);
    var count = [d,h,m]
    return count;
    // var s = Mathfloor(reset/1000)
  }
  var goal = new Date();
  goal.setDate(1);
  goal.setHours(23);
  goal.setMinutes(59);
  console.log(countdown(goal));

  }


  // setInterval(() => {
  //   min - goalMin
  //   if(min <= 0){
  //     console.log(min)
  //   }
  // }, 1000);

  倒數計時器()
  動態時鐘();
  要怎麼套入文字雲();
})