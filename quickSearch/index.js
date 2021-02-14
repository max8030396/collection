$(document).ready(() => {
  const s2_block_nav = $('.s2_block_nav');
  
  function navChoose(){
    s2_block_nav.on('click', function(){
      // $(this).addClass('js_active').siblings().removeClass('js_active') IE舊版本不支援
      s2_block_nav.removeClass('js_active');
      $(this).addClass('js_active');
    })
  }

  navChoose();
})