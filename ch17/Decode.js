 $(function(){
    var JS_VARS = JSON.parse(shops);

    if (JS_VARS.message != '') {
        alert(JS_VARS.message);
    }

    $('.js_decode_btn').click(function(){
        transformText('decode', 'encode');
    });

    $('.js_encode_btn').click(function(){
        transformText('encode', 'decode');
    });

    /**
     * 
     * @param {string} inputVal 
     * @param {string} output 
     */
    function transformText(inputVal, output){
        var text = $.trim($('.js_' + inputVal + '_text').val());

        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': inputVal,
            _token: JS_VARS.token
        }, function(result){
            $('.js_' + output +'_text').val(result.YSecurity_text)
        }, 'json');                     
    }

    $('.js_encode_copy').click(function(){
        clickBtn(encode);
    });

    $('.js_decode_copy').click(function(){
        clickBtn(decode);
    });

    function clickBtn(action) {
        var field = $('#' + action + '_text')
            field.focus()
            field.select();
        var isCopysuccess = copySelectionText();

        resultMsg(isCopysuccess, '複製');
    }

    /**
     * 
     * @param {boolean} isSuccess 
     * @param {string} action 
     */
    function resultMsg(isSuccess, action) {
        if (isSuccess) {
            alert('已' + action + '成功');
        } else { 
            alert(action + '失敗，請手動' + action);
        }
    }

    function copySelectionText(){
        var copysuccess;
        try{
            copysuccess = document.execCommand("copy");
        } catch(e){
            copysuccess = false;
        }
        return copysuccess;
    }
});
