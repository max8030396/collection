const $ = require('jquery');
require('jqcloud2');
const script1 = document.createElement('script');
const chartJs = "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
const axios = require('axios');
const $searchBtn = $('.searchBtn');
const $description = $('.description');
const $insertDom = $('.s3_block_left_ul');
const $positiveDom = $('.s4_block_positive');
const $negativeDom = $('.s4_block_negative');
const $newsNavBtn = $('.s2_block_nav');
const $barChartDom1 = $('#s4_block_left_box2_barChart1');
const $barChartDom2 = $('#s4_block_right_box2_barChart2');
const $allSection = $('.sec');

window.barChartItem1 = null;
window.barChartItem2 = null;

//文字雲及能量條限制的顯示的數量
const appendLen = 10;

//手機模式預設
let mobilePerBtnWidth = [];
let mobilePerBtnPosX = [];

//當前NAV位置
let currentSelectNewsBtn;
let currentSelectNewsBtnIndex = 0;

//判斷當前是否為第一次載入資料
let currentClickMode = 'firstLoad'; // newsOnly

//用於API
let getNewsValue;
let getChartBarValue;

//用於搜尋欄位
let inputer = $('.s1_inputer');
let keyWords = '';

//預設能量條 數值、下方文字
let positiveLabelWord = [];
let positiveBarValue = [];
let negativeLabelWord =[];
let negativeBarValue = [];

//預設文字雲，需有weight不然會顯示異常
let positiveWords = [
  {text: "利益", weight: 11.5 },
  {text: "成長", weight: 8.5},
  {text: "效能", weight: 9.4},
  {text: "高效", weight: 13},
  {text: "高效能", weight: 7.5},
  {text: "帶動", weight: 9.4},
  {text: "穩定", weight: 8},
  {text: "穩定的", weight: 6.2},
  {text: "人傑", weight: 16.9},
  {text: "上升", weight: 11.3},
];
let negativeWords = [
  {text: "利益", weight: 11.5 },
  {text: "成長", weight: 8.5},
  {text: "效能", weight: 9.4},
  {text: "高效", weight: 13},
  {text: "高效能", weight: 7.5},
  {text: "帶動", weight: 9.4},
  {text: "穩定", weight: 8},
  {text: "穩定的", weight: 6.2},
  {text: "人傑", weight: 14.9},
  {text: "上升", weight: 11.3},
];

//強行寫入能量條PlugIn之CDN
script1.type = "text/javascript"
script1.setAttribute("src", chartJs)
$('head').prepend(script1);


//透過API取得並將資料導入“文字雲”、“能量條之中”,版面關係故限制最多顯示十筆資料
function getChartBar_textCloudData(target, positiveLen, negativeLen) {

  positiveLabelWord = [];
  positiveBarValue = [];
  negativeLabelWord =[];
  negativeBarValue = [];

  if(positiveLen > appendLen) {
    positiveLen = appendLen;
  } else if (positiveLen < appendLen ) {
    positiveWords.splice(positiveLen,10)
    //
  }
  for (let i = 0; i < 10; i = i + 1 ) {
    positiveLabelWord.push(target.positiveValue[i].text)
    positiveBarValue.push(target.positiveValue[i].value)
    console.log('這裡的jqCloud要改1', positiveBarValue)
    positiveWords[i].text = target.positiveValue[i].text

    if (!positiveWords[i]) {
      console.log('TEST GG')
      positiveLabelWord.push('')
      // positiveBarValue.push()
    }
  }

  if(negativeLen > appendLen) {
    negativeLen = appendLen;
  } else if (negativeLen < appendLen) {
    negativeWords.splice(negativeLen,10)
  }

  for (let i = 0; i < 10; i = i + 1 ) {
    if (!negativeWords[i]) {
      console.log('TEST GG')
      negativeLabelWord.push('')
      // positiveBarValue.push()
    } else {
      negativeLabelWord.push(target.negativeValue[i].text)
      negativeBarValue.push(target.negativeValue[i].value)
      console.log('這裡的jqCloud要改')
      negativeWords[i].text = target.negativeValue[i].text
    }
  }
  //取得資料後執行並帶入指定的任務中
  barChart1($barChartDom1, positiveBarValue, 1.5, positiveLabelWord);
  barChart2($barChartDom2, negativeBarValue, 1.5, negativeLabelWord);

  // 文字雲
  positiveCloud(positiveWords)
  negativeCloud(negativeWords)
}

//文字雲基礎設定
function positiveCloud(words) {
  // $('#s4_block_left_box1_cloud1').html('');
  $('#s4_block_left_box1_cloud1').jQCloud(words, {
    autoResize: true,
    colors: ["#800026","#6c757d", "#bd0026", "#00a", "#e31a1c", "#5E503F", "#fc4e2a", "#fd8d3c", "#0D6FB8", "#1b4332"],
    // colors: ["#e7228c", "#e7237c", "#e01671", "#dd0f6c", "#d90866", "#b5179e", "#a514a5", "#9410ab", "#8c0fae", "#830db1"],
    shape: 'rectangular',
    // fontSize: {
    //   from: 0.23,
    //   to: 0.001
    // },
  });

  $('#s4_block_left_box1_cloud1').jQCloud('update', words);
}
function negativeCloud(words) {
  $('#s4_block_right_box1_cloud2').jQCloud(words, {
    colors: ["#800026","#6c757d", "#bd0026", "#00a", "#e31a1c", "#5E503F", "#fc4e2a", "#fd8d3c", "#0D6FB8", "#1b4332"],
    autoResize: true,
    shape: 'rectangular',
  });

  $('#s4_block_right_box1_cloud2').jQCloud('update', words);
}

//預設能量條設定
function barChart1(target, dataValue, borderWidth, labelWord) {
  var ctx = target;
  console.log('barChart1-1', window.barChartItem1);
  if(window.barChartItem1 !== null) {
    window.barChartItem1.destroy();
    console.log('barChart1-2');
    window.barChartItem1 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelWord,
          datasets: [{
            label: '',
            data: dataValue,//數值
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
            borderWidth: borderWidth//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend:{
            display: false
          },
          interaction: {
            mode: 'point'
          }
      }
    });
  } else {
    window.barChartItem1 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelWord,
          datasets: [{
            label: '',
            data: dataValue,//數值
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
            borderWidth: borderWidth//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend:{
            display: false
          },
          interaction: {
            mode: 'point'
          }
      }
    });
  }
}

function barChart2(target, dataValue, borderWidth, labelWord) {
  var ctx = target;
  if(window.barChartItem2 !== null) {
    window.barChartItem2.destroy();
    window.barChartItem2 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelWord,
          datasets: [{
            label: '',
            data: dataValue,//數值
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
            borderWidth: borderWidth//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend:{
            display: false
          },
          interaction: {
            mode: 'point'
          }
      }
    });
  } else {
    window.barChartItem2 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labelWord,
          datasets: [{
            label: '',
            data: dataValue,//數值
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
            borderWidth: borderWidth//外框粗度
        }]
        },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend:{
            display: false
          },
          interaction: {
            mode: 'point'
          }
      }
    });
  }
}

//自動計算半圓形的寬高
function gaugeResize () {
  const circleWrap = $('.s3_block_right');
  const circleBg = $('.circle');
  const circleGreyBg = $('.circleBg');
  let halfCircle = circleBg.width() / 2;
  let halfGreyCircle = circleGreyBg.width() / 2;
  let wrapHeight = circleWrap.height();
  let newTopMoveValue = wrapHeight - halfCircle;
  let newGreyTopMoveValue = wrapHeight - halfGreyCircle;

  // console.log('Check', halfCircle, wrapHeight, newTopMoveValue);
  circleBg.css('top', newTopMoveValue + 'px');
  circleGreyBg.css('top', newGreyTopMoveValue + 'px');
}

//半圓基礎設定
function initGaugePointerDeg(value) {
  const $pointer = $('.pointer');
  let valueToDegree = value * 1.8;
  setTimeout(() => {
    $pointer.css('transform','translate(-100%) rotate(' + valueToDegree + 'deg');
  }, 200);
}

//新增新聞列表
function _appendDataList(target, maxLen, data) {
  for (let i = 0; i < maxLen; i = i + 1 ) {
    // console.log('check i', data[i]);
    target.append('<li><a href = '+ data[i].link +'>' + data[i].value + '</a></li>')
  }
}

//上方新聞列表及情緒溫度計專用API
function _handleApiAjax(dataType,keyWords) {
  $.ajax({
    url: `http://starklab.tw/api/news_get/?search=${keyWords}`,
    dataType: "json",
    async: true,
    type: "GET",
    beforeSend: function() {
      // console.log('beforeSend');
    },
    success: function(res) {
      //判斷當前新聞列表所屬平台
      switch(dataType) {
        case 'ptt':
          getNewsValue = res.news.ptt;
        break;
  
        case 'google':
          getNewsValue = res.news.google;
        break;

        case 'yahoo':
          getNewsValue = res.news.yahoo;
        break;

        default:
        break;
      }

      //判斷為第一次載入or僅更新上方新聞列表
      if (currentClickMode === 'firstLoad') {
        _appendDataList($insertDom, getNewsValue.length, getNewsValue);
        initGaugePointerDeg(res.news.emotionValue)
      } else if (currentClickMode === 'newsOnly') {
        _appendDataList($insertDom, getNewsValue.length, getNewsValue);
      }
      $allSection.removeClass('js_hide');
      
    },
    complete: function(res) {
      // console.log('complete');
    },
    error: function() {
      // console.log('error');
    }
  });

}

//下方文字雲、能量條、看多看空新聞專用API
function _handleApiAjax2(keyWords) {
  $.ajax({
    url: `http://starklab.tw/api/sentiment_score/?search=${keyWords}`,
    dataType: "json",
    async: true,
    type: "GET",
    beforeSend: function() {
      // console.log('beforeSend');
    },
    success: function(res) {
      getChartBarValue = res.chartBar;

      //取得資料後導入文字雲及能量條專用任務中並執行並顯示
      getChartBar_textCloudData(getChartBarValue, getChartBarValue.positiveValue.length, getChartBarValue.negativeValue.length)
      if (currentClickMode === 'firstLoad') {
        _appendDataList($positiveDom, getChartBarValue.positiveNews.length, getChartBarValue.positiveNews);
        _appendDataList($negativeDom, getChartBarValue.negativeNews.length, getChartBarValue.negativeNews);
      }
    },
    complete: function(res) {
      // console.log('complete');
    },
    error: function() {
      // console.log('error');
    }
  });

}

//判斷是否第一次載入及清除目標中的li
function cleanBlockElement(cleanType) {
  currentClickMode = 'firstLoad';

  if (cleanType === 'all') {
    $insertDom.empty('li');
    $positiveDom.empty('li');
    $negativeDom.empty('li');
  } else if (cleanType === 'news') {
    $insertDom.empty('li');
  }
}

//自動計算共有幾個S2_blockNav及給予各自的寬度
function initS2_blockWidth() {
  let s2_blockWidth = $('.s2_block').width();
  let countItem = $('.s2_block_nav').length;
  let s2_navWidth = s2_blockWidth/countItem;
  $('.s2_block_nav').css('width',`${s2_navWidth}`);
}

//自動計算手機版s2_block初始位置、各個nav位置、移動距離計算
function initMobileBtnWidth() {
  let firstPosX = -($('.s2_nav1').width() / 2);
  let movePosX = firstPosX;

  for (let i = 0; i < $('.s2_block_nav').length; i ++) {
    let perWidth = Math.floor($(`.s2_nav${i + 1}`).width());
    mobilePerBtnWidth.push(perWidth + 1);
    if (i === 0) {
      mobilePerBtnPosX.push(firstPosX);
    } else {
      movePosX = movePosX - perWidth;
      mobilePerBtnPosX.push(movePosX);
    }
  }

  $('.s2_block').css('transform', `translateX(-${mobilePerBtnWidth[0] / 2}px)`);
}

//新聞列表區選擇框、當前點選新聞的索引值判斷、debounce、判斷滑動位移的距離、告知上層任務僅需清除此區li非全域
function newsNavBtnOnClick() {
  $newsNavBtn.on('click',function() {
    console.log('hi1')
    currentSelectNewsBtn = $(this);
    $newsNavBtn.removeClass('js_active');
    $(this).addClass('js_active');
    currentSelectNewsBtnIndex = Number($(this).attr('data-index'));
    if ($(window).width() < 730) {
      $('.s2_block').css('transform', `translateX(${mobilePerBtnPosX[currentSelectNewsBtnIndex]}px)`);
    }
  })

  $newsNavBtn.on('click', debounce(function() {
    console.log('hi2')
    cleanBlockElement('news');
    currentClickMode = 'newsOnly';
    let dataType = currentSelectNewsBtn.attr('data-mode');
    console.log('dataType', dataType);
    // if ($(window).width() < 732) {
    //   selectorMobileNavBtn(dataType)
    // }
    _handleApiAjax(dataType, keyWords);
  }, 700));
}

//用戶輸入資料並取得相對應之API、清除說明文字並載入資料、重新點擊搜尋後清除所有資料再載入
function debounceProcess() {
  //此段為預防用戶輸入空資料
  // if(inputer.val() === '') {
  //   alert('請輸入股票代號或名稱')
  //   return
  // }

  //索引資料及清除搜尋欄
  keyWords = inputer.val();
  inputer.val('');

  //清除預設說明文字
  $description.css('display','none')
  cleanBlockElement('all');
  _handleApiAjax('ptt', keyWords);
  _handleApiAjax2(keyWords)
}

//搜尋按鈕debounce
function searchBtnOnClick() {
  $searchBtn.on('click',debounce(debounceProcess, 1000))
}

//debounce
function debounce(func, delay=250) {
  let timer = null;
  console.log('hi5')
  return () => {
    let context = this;
    let args = arguments;
    // let target = $this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay)
  }
}

//手機版滑動套件,設定滑動之基礎配置
function mobileSwipeEvent() {
  $('.s2_block').swipe({
    swipeLeft: function(event, distance, duration, fingerCount, fingerData, currentDirection) {
      currentSelectNewsBtnIndex = currentSelectNewsBtnIndex + 1;
      
      if (currentSelectNewsBtnIndex > 2) { 
        currentSelectNewsBtnIndex = 2;
        // console.log('swipeLeft', currentSelectNewsBtnIndex);
        return;
      }
      // console.log('swipeLeft', currentSelectNewsBtnIndex);
      $(`.s2_nav${currentSelectNewsBtnIndex + 1}`).trigger('click');
    },
    swipeRight: function(event, distance, duration, fingerCount, fingerData, currentDirection) {
      currentSelectNewsBtnIndex = currentSelectNewsBtnIndex - 1;

      if (currentSelectNewsBtnIndex < 0) { 
        currentSelectNewsBtnIndex = 0;
        // console.log('swipeRight', currentSelectNewsBtnIndex);
        return;
      }
      // console.log('swipeRight', currentSelectNewsBtnIndex);
      $(`.s2_nav${currentSelectNewsBtnIndex + 1}`).trigger('click');
    },
    threshold: 30
  });
}

searchBtnOnClick();
newsNavBtnOnClick();
gaugeResize();
initS2_blockWidth();

if ($(window).width() < 730) {
  initMobileBtnWidth();
  // mobileSwipeEvent();
}

$(window).on('resize', function() {
  gaugeResize();
  initS2_blockWidth();
  if($(window).width() < 730) {
    initMobileBtnWidth();
    // mobileSwipeEvent();
  } else if ($(window).width() > 731) {
    $('.s2_block').css('transform', 'none');
  }
})
// $searchBtn.trigger('click');
