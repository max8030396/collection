console.log('Hello!');

const $target = $('.wrapper');
let count = 1;
const isStart = false;

const numArray = [1, 2, 3, 4, 5];
const nameArray = ['victor', 'ziping', 'jim'];

const testObject = {
  name: ['victor', 'ziping', 'jim'],
  count: [1, 2, 3, 4, 5],
  text: 'hello world',
  num: 99,
};

// 這是for回圈
function forLoopFunc(insertArray, showTest) {
  for (let i = 0; i < insertArray.length; i = i + 1) {
    console.log(showTest, insertArray[i]);
  }
}

function testSetTimeOutAndInterval() {
  setTimeout(() => {
    console.log('setTimeout');
  }, 2000);
  
  if (isStart === true) {
    setInterval(() => {
      count = count + 1;
      console.log('setInterval', count);
    }, 1000);
  }
}


forLoopFunc(testObject.count, 'aaa');
forLoopFunc(testObject.name, 'bbb');

testSetTimeOutAndInterval();




