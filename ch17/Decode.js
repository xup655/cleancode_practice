$(function(){
    var JS_VARS = JSON.parse(shops);

    if (JS_VARS.message != '') {
        alert(JS_VARS.message);
    }

    $('.js_decode_btn').click(function(){
        var text = $.trim($('.js_decode_text').val());

        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': 'decode',
            _token: JS_VARS.token
        }, function(result){
            $('.js_encode_text').val(result.YSecurity_text)
        }, 'json');
    });

    $('.js_encode_btn').click(function(){
        var text = $.trim($('.js_encode_text').val());
        $.post(JS_VARS.urls.YSecurity, {
            'text': text,
            'type': 'encode',
            _token: JS_VARS.token
        }, function(result){
            $('.js_decode_text').val(result.YSecurity_text)
        }, 'json');
    });

    $('.js_encode_copy').click(function(){
        var field = document.getElementById('encode_text')
            field.focus()
            field.select();
        var copysuccess = copySelectionText();

        if (copysuccess) {
            alert('已複製成功');
        } else {
            alert('複製失敗，請手動複製');
        }
    });

    $('.js_decode_copy').click(function(){
        var field = document.getElementById('decode_text')
            field.focus()
            field.select();
        var copysuccess = copySelectionText();

        if (copysuccess) {
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
