const $ = require('jquery');
const Chart = require('chart.js')

require('jqcloud2');

const axios = require('axios');
const $searchBtn = $('.searchBtn');
const $insertDom = $('.s3_block_left_ul');
const $positiveDom = $('.s4_block_positive');
const $negativeDom = $('.s4_block_negative');
const $newsNavBtn = $('.s2_block_nav');
const $barChartDom1 = $('#s4_block_left_box2_barChart1');
const $barChartDom2 = $('#s4_block_right_box2_barChart2');
const $allSection = $('.sec');
//fuc8
let mobilePerBtnWidth = [];
//fuc8 & 9
let mobilePerBtnPosX = [];
//fuc 9
let currentSelectNewsBtn;
//fuc9 & 13
let currentSelectNewsBtnIndex = 0;
//fuc 5 & 6 & 9
let currentClickMode = 'firstLoad'; // newsOnly

// 新聞類別選單
const words = [
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
];

// 文字雲初始化01
$('#s4_block_left_box1_cloud1').jQCloud(words, {
  autoResize: true,
  colors: ["#e7228c", "#e7237c", "#e01671", "#dd0f6c", "#d90866", "#b5179e", "#a514a5", "#9410ab", "#8c0fae", "#830db1"],
  // shape: 'rectangular',
  // fontSize: {
  //   from: 0.23,
  //   to: 0.001
  // },
});

// 文字雲初始化02
$('#s4_block_right_box1_cloud2').jQCloud(words, {
  colors: ["#800026","#6c757d", "#bd0026", "#00a", "#e31a1c", "#5E503F", "#fc4e2a", "#fd8d3c", "#0D6FB8", "#1b4332"],
  autoResize: true,
  // shape: 'rectangular',
});

//能量條表底部文字
let labelWord = ['利益', '成長', '效能', '高效', '高效能', '帶動' , '穩定', '穩定的', '人傑' , '上升'];

//1.能量條表
function barChart(target, dataValue, borderWidth, labelWord) {
  var ctx = target;
  var barChart = new Chart(ctx, {
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
        }
    }
  });
  // console.log(s4_block_left_barChart1.data.datasets[0].data[1])
}

//2.自動計算半圓形的寬高
function gaugeResize () {
  const circleWrap = $('.s3_block_right');
  const circleBg = $('.circle');
  const circleGreyBg = $('.circleBg');
  var halfCircle = circleBg.width() / 2;
  var halfGreyCircle = circleGreyBg.width() / 2;
  var wrapHeight = circleWrap.height();
  var newTopMoveValue = wrapHeight - halfCircle;
  var newGreyTopMoveValue = wrapHeight - halfGreyCircle;

  // console.log('Check', halfCircle, wrapHeight, newTopMoveValue);
  circleBg.css('top', newTopMoveValue + 'px');
  circleGreyBg.css('top', newGreyTopMoveValue + 'px');
}

//3.半圓基礎設定
function initGaugePointerDeg(value) {
  const $pointer = $('.pointer');
  let valueToDegree = value * 1.8;
  setTimeout(() => {
    $pointer.css('transform','translate(-100%) rotate(' + valueToDegree + 'deg');
  }, 200);
}

//4.新增新聞列表
function _appendDataList(target, maxLen, data) {
  for (let i = 0; i < maxLen; i = i + 1 ) {
    // console.log('check i', data[i]);
    target.append('<li><a href = '+ data[i].link +'">' + data[i].value + '</a></li>')
  }
}

let getNewsValue;
let getChartBarValue;

//5.AJAX Function
function _handleApiAjax(dataType) {
  // let getNewsValue;

  // console.log('getNewsValue', getNewsValue);

  $.ajax({
    url: "http://demo2740101.mockable.io/starklab/news/",
    dataType: "json",
    async: true,
    type: "GET",
    beforeSend: function() {
      // console.log('beforeSend');
    },
    success: function(res) {
      getChartBarValue = res.chartBar;
      switch(dataType) {
        case 'ptt':
          getNewsValue = res.news.ptt;
          console.log('AJAX GET PTT', getNewsValue);
        break;
  
        case 'google':
          getNewsValue = res.news.google;
          // console.log('AJAX GET google', getNewsValue);
        break;

        case 'yahoo':
          getNewsValue = res.news.yahoo;
          // console.log('AJAX GET yahoo', getNewsValue);
        break;

        default:
        break;
      }
      // console.log('getNewsValue', getNewsValue);
      barChart($barChartDom1, res.chartBar.positiveValue, 1.5, labelWord);
      // barChart($barChartDom2, res.chartBar.negativeValue, 1.5, labelWord);
      window.barChart;
      if (currentClickMode === 'firstLoad') {
        _appendDataList($insertDom, getNewsValue.length, getNewsValue);
        _appendDataList($positiveDom, getChartBarValue.positiveNews.length, getChartBarValue.positiveNews);
        _appendDataList($negativeDom, getChartBarValue.negativeNews.length, getChartBarValue.negativeNews);
        initGaugePointerDeg(res.news.emotionValue)
      } else if (currentClickMode === 'newsOnly') {
        console.log('getNewsValue',dataType)
        _appendDataList($insertDom, getNewsValue.length, getNewsValue);
      }
      $allSection.removeClass('js_hide');
      
    },
    complete: function(res) {
      // console.log('complete');
    },
    error: function() {
      console.log('error');
    }
  });
}

//6.判斷是否第一次載入及清除目標中的li
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

//7.自動計算共有幾個S2_blockNav及各自的寬度
function initS2_blockWidth() {
  let s2_blockWidth = $('.s2_block').width();
  let countItem = $('.s2_block_nav').length;
  let s2_navWidth = s2_blockWidth/countItem;
  $('.s2_block_nav').css('width',`${s2_navWidth}`);
}

//8.自動計算手機版s2_block初始位置、各個nav位置、移動距離計算
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
  // $('.s2_block').css('transform', `translateX(-100px)`);
  // console.log('mobilePerBtnWidth', mobilePerBtnWidth, mobilePerBtnPosX);
}

//9.新聞列表區選擇框、當前點選新聞的索引值判斷、debounce、判斷滑動位移的距離、告知上層任務僅需清除此區li非全域
function newsNavBtnOnClick() {
  $newsNavBtn.click(function() {
    currentSelectNewsBtn = $(this);
    $newsNavBtn.removeClass('js_active');
    $(this).addClass('js_active');
    currentSelectNewsBtnIndex = Number($(this).attr('data-index'));
    if ($(window).width() < 730) {
      $('.s2_block').css('transform', `translateX(${mobilePerBtnPosX[currentSelectNewsBtnIndex]}px)`);
    }
  })
  $newsNavBtn.click(debounce(function() {
    cleanBlockElement('news');
    currentClickMode = 'newsOnly';
    let dataType = currentSelectNewsBtn.attr('data-mode');
    console.log('dataType', dataType);
    // if ($(window).width() < 732) {
    //   selectorMobileNavBtn(dataType)
    // }
    _handleApiAjax(dataType);
  }, 700));
}
//10.debounce程序,清除所有資料，並重新載入資料，預設載入資料為ptt
function debounceProcess() {
  cleanBlockElement('all');
  _handleApiAjax('ptt');
}

//11.搜尋按鈕debounce
function searchBtnOnClick() {
  $searchBtn.click(debounce(debounceProcess, 500))
}

//12.debounce
function debounce(func, delay=250) {
  let timer = null;
  
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

//13.手機版滑動套件,設定滑動之基礎配置
function mobileSwipeEvent() {
  $('.s2_block').swipe({
    swipeLeft: function(event, distance, duration, fingerCount, fingerData, currentDirection) {
      currentSelectNewsBtnIndex = currentSelectNewsBtnIndex + 1;
      
      if (currentSelectNewsBtnIndex > 2) { 
        currentSelectNewsBtnIndex = 2;
        console.log('swipeLeft', currentSelectNewsBtnIndex);
        return;
      }
      console.log('swipeLeft', currentSelectNewsBtnIndex);
      $(`.s2_nav${currentSelectNewsBtnIndex + 1}`).trigger('click');
    },
    swipeRight: function(event, distance, duration, fingerCount, fingerData, currentDirection) {
      currentSelectNewsBtnIndex = currentSelectNewsBtnIndex - 1;

      if (currentSelectNewsBtnIndex < 0) { 
        currentSelectNewsBtnIndex = 0;
        console.log('swipeRight', currentSelectNewsBtnIndex);
        return;
      }
      console.log('swipeRight', currentSelectNewsBtnIndex);
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
  mobileSwipeEvent();
}

$(window).on('resize', function() {
  gaugeResize();
  initS2_blockWidth();
  if($(window).width() < 730) {
    initMobileBtnWidth();
    mobileSwipeEvent();
  } else if ($(window).width() > 731) {
    $('.s2_block').css('transform', 'none');
  }
})

$searchBtn.trigger('click');
