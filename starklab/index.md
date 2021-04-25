```javascript
var dataMode = ''
        $s2_block_nav.on('click',function(){
          let $this = $(this);
          dataMode = $this.attr('data-mode');
          switch(dataMode) {
            case 'PTT':
              $this.on('click',function(){
                $($insertDom).empty('li');//要用remove還是empty
              })
              for (var k = 0; k < res.news.ppt.length; k = k + 1 ) {
                $insertDom.append('<li><a href = "'+ res.news.ppt[k].link +'">' + res.news.ppt[k].value + '</a></li>')
              }
            break;
```
按程式碼的邏輯不是應該先讀取
```javascript
  switch(dataMode) {
            case 'PTT': //取得data值
```
```javascript
$this.on('click',function(){
$($insertDom).empty('li');})//先清除我所選到新聞列表底下的li
```
```javascript
for (var k = 0; k < res.news.ppt.length; k = k + 1 ) {
$insertDom.append('<li><a href = "'+ res.news.ppt[k].link +'">' + res.news.ppt[k].value + '</a></li>')} 
//再透過迴圈新增li
```
```javascript
```
```javascript
```