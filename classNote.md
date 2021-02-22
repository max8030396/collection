# 2/21
```javascript
function handleApiAjax() {
    var $insertDom = $('.s3_block_left_ul');

    $.ajax({
      url: "http://demo2740101.mockable.io/starklab/news/",
      dataType: "json",
      async: true,
      type: "GET",
      beforeSend: function() {
        console.log('beforeSend');
      },
      success: function(res) {
        console.log('success', res.news[0]);

        for (var i = 0; i < res.news.length; i += 1) {
          $insertDom.append('<li>' + res.news[i] + '</li>')
        }

      },
      complete: function(res) {
        console.log('ccccc', res.status);

        if (res.status === 200) {
          alert('OK!!!')
        } else {
          alert('GG!!!')
        }
      },
      error: function() {
        console.log('error');
      }
    });
  }
  ```
