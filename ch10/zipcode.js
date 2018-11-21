var addressCounty = '';

var addressArea = '';

var addressZipCode = '';

var postUrl = function(administration, handler, postData) {
    var postData = postData ? postData : {} ;

    $.ajax({
        type : 'POST',
        url  : baseUrl + '/ajax/zipcode/' + administration,
        data : postData,
        success: handler,
        dataType: 'json'
    });
}

var initZipCode = function () {
    var postData = { zipCode: addressZipCode };
    postUrl('init', addressInit, postData);
};

var addressInit = function (json) {
    addressCounty = String(json.county);
    addressArea = String(json.area);
    buildAddressCounty();
}

var buildAddressCounty = function () {
    postUrl('county', addressCountyUpdate);
}

var addressCountyChange = function () {
    var postData = { county: $(this).val() };
    postUrl('area', addressAreaUpdate, postData);
};

var addressCountyUpdate = function (json) {
    _build(json, '#addressSelector1', addressCounty);
    addressCountyChange.apply($('#addressSelector1'));
};

var addressAreaUpdate = function (json) {
    _build(json, '#addressAreaSelector', addressArea);
    addressAreaChange.apply($('#addressAreaSelector'));
};

var addressAreaChange = function () {
    $('#addressZipCode').val($(this).val());

    //GoogleMap
    if($('#map').length > 0){

        wa = new WaMap();
        wa.base();

        var zoom = parseInt($('#zoom').val());
        var lat = $('#lat').val();
        var lng = $('#lng').val();

        if(zoom && lat && lng){
            wa.point = new GLatLng(lat, lng);
            wa.zoom = zoom;
            wa.base();
            wa.dragable = true;
            wa.addMarker();
            wa.addControl('small');
            wa.__dragend();
            wa.__moveend();

        }else{
            if(getAddress()) {
                $('#div_zoom').css('display','none');
                wa.dragable = true;
                wa.getLatLng(getAddress(),true);
            }
        }

        wa.update();

    }
};

var getAddress = function(){
    var country = $('#addressSelector1 option[@selected]').html();
    var area = $('#addressSelector2 option[@selected]').html();
    var address = $('#user_address').attr('value');
    var zipCode = $('#addressZipCode').val();

    return (country == area) ? zipCode + country + address : zipCode + country + area + address;
}

var _build = function (json, selector, selectedId) {
    /*var selected = true;*/

    $(selector).removeOption(/./);
    for (id in json) {
        se = (String(selectedId) == String(id)) ? true : false;
        $(selector).addOption(id, json[id], se);
    }
}

$(document).ready(function () {
    $('#addressSelector1').change(addressCountyChange);
    $('#addressSelector2').change(addressAreaChange);
    initZipCode();

    $('#button_getlatlng').click(function(){
        try {
            wa.getLatLng(getAddress(),true);
            throw "getAddress() error"
        } catch (e) {
            logMyErrors(e);
        }
    })

    $('#mapMessage').css('display','none');

});