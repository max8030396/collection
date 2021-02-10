$(document).ready(() => {
  const PTT = $('.s2_nav1')
  const Google = $('.s2_nav2')
  const Yahoo = $('.s2_nav3')
  const s2_block_nav = $('.s2_block_nav');
  

  function navClickSwitch(){
    s2_block_nav.on('click', function(){
      $(this).addClass('js_active').siblings().removeClass('js_active')
    })
  }

  



  navClickSwitch();
})