$(document).ready(function() {
  var inputName = '#inputer';
  var plusBtnName = '.btn1';
  var minusBtnName = '.btn2';
  var resultBtnName = '.btn3';

  // input get value
  // var inputer = document.getElementById('inputer');
  var inputer = $(inputName);
  var plusBtn = $(plusBtnName);
  var minusBtn = $(minusBtnName);
  var resultBtn = $(resultBtnName);

  var step1Value = '';
  var step2Value = '';
  
  // var saveValue = ''
  // saveValue = saveValue + inputer.val();

  var howToCount = '+';

  // var inputerText = inputer.value;
  // console.log('test', inputer, plusBtn, minusBtn, resultBtn);

  plusBtn.on('click', function () {
    howToCount = '+';

    if (inputer.val() === '') {
      alert('e04!不會打第一個數字喔！');
    } else {
      console.log('Click + !!!!', inputer.val());
      step1Value = inputer.val();
      console.log('step1Value', step1Value, howToCount);
      inputer.val('');
    }
  });

  minusBtn.on('click', function () {
    howToCount = '-';
    
    if (inputer.val() === '') {
      alert('e04!不會打第一個數字喔！');
    } else {
      console.log('Click - !!!!', inputer.val());
      step1Value = inputer.val();
      console.log('step1Value', step1Value, howToCount);
      inputer.val('');
    }
  });

  resultBtn.on('click', function () {
    if (inputer.val() === '') {
      alert('e04!不會打第二個數字喔！');
    } else {
      console.log('Click = !!!!', inputer.val());
      step2Value = inputer.val();
      console.log('step2Value', Number(step2Value));
      
      if (howToCount === '+') {
        var finalValue = Number(step1Value) + Number(step2Value);
        inputer.val(finalValue);
      }

      if (howToCount === '-') {
        var finalValue = Number(step1Value) - Number(step2Value);
        inputer.val(finalValue);
      }
      console.log('運算出來的結果是： ', finalValue);
    }
  });

  // * 是乘
  // / 是除

})

