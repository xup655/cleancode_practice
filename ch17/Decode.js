/**
  * 
  * 修改了原本dirty code
  * 
  * 1. SRP單一職責: 原本的code在複製時，加碼判斷成功與否，並顯示訊息
  * 2. 不傳過多參數: 因原結構有高度重複，所以提煉共用函式getConvertText，傳入action參數，就知道要執行的是加密還是解密
  * 3. 只留有用的註解: 蚊組定義團隊的codiing style，在註解定義好參數的型別、簡寫視野大的類別做的事情
  * 
  */
 
 $(function(){
    var JS_VARS = JSON.parse(shops);

    if (JS_VARS.message != '') {
        alert(JS_VARS.message);
    }

    /**
     * 
     * @param {object} action
     */
    function getConvertText(action){
        var output = (action == 'decode') ? 'encode' : 'decode';

        var text = $.trim($('.js_' + action + '_text').val());

        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': action,
            _token: JS_VARS.token
        }, function(result){
            $('.js_' + output +'_text').val(result.YSecurity_text)
        }, 'json');                     
    }

    $('.js_decode_btn').click(function(){
        getConvertText('decode');
    });

    $('.js_encode_btn').click(function(){
        getConvertText('encode');
    });

    /**
     * 
     * @param {string} action 
     */
    function copyText(action) {
        var field = $('#' + action + '_text')
            field.focus()
            field.select();

        resultMsg();
    }

    function resultMsg() {
        if (isCopysuccess) {
            alert('已複製成功');
        } else { 
            alert('複製失敗，請手動複製');
        }
    }

    var isCopysuccess = function(){
        var isSuccess;
        try{
            isSuccess = document.execCommand("copy");
        } catch(e){
            isSuccess = false;
        }
        return isSuccess;
    }

    $('.js_encode_copy').click(function(){
        copyText('encode');
    });

    $('.js_decode_copy').click(function(){
        copyText('decode');
    });
});