/**
 * 這次的章節主要是整合前面的種點 (筆者也說這是一份自我檢視的清單)
 * 因此，所有的條件都應該符合 (符合我們挑選出的便利貼 即可)
 */

 $(function(){
    //  從php來的宣告，已知有: message、urls、token...等
    var JS_VARS = JSON.parse(shops);

    // 如果message不是空的，就alert出message
    if (JS_VARS.message != '') {
        alert(JS_VARS.message);
    }

    // 監聽decode鈕
    $('.js_decode_btn').click(function(){
        // 取得input (要 decode 的) val
        var text = $.trim($('.js_decode_text').val());

        // 把text送去token，type是 decode
        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': 'decode',
            _token: JS_VARS.token
        }, function(result){
            // 把回傳值顯示在 (encode 後的) input
            $('.js_encode_text').val(result.YSecurity_text)
        }, 'json');
    });

    // 監聽encode鈕
    $('.js_encode_btn').click(function(){
        // 取得input (要 encode 的) val
        var text = $.trim($('.js_encode_text').val());

        // 把text送去token，type是 encode
        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': 'encode',
            _token: JS_VARS.token
        }, function(result){
            // 把回傳值顯示在 (decode 後的) input
            $('.js_decode_text').val(result.YSecurity_text)
        }, 'json');
    });

    // 監聽 encode copy 鈕
    $('.js_encode_copy').click(function(){
        // 取得 (encode 的) text
        var field = document.getElementById('encode_text')
            field.focus()
            field.select();
        var isCopysuccess = copySelectionText();

        if (isCopysuccess) {
            alert('已複製成功');
        } else {
            alert('複製失敗，請手動複製');
        }
    });

    // 監聽 decode copy 鈕
    $('.js_decode_copy').click(function(){
        // 取得 (decode 的) text
        var field = document.getElementById('decode_text')
            field.focus()
            field.select();
        var isCopysuccess = copySelectionText();

        if (isCopysuccess) {
            alert('已複製成功');
        } else {
            alert('複製失敗，請手動複製');
        }
    });

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
