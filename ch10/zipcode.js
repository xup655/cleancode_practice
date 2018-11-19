var addressCounty = '';

var addressArea = '';

var addressZipCode = '';

var initZipCode = function () {
    $.ajax({
        type : 'POST',
        url  : baseUrl + '/ajax/zipcode/init',
        data : { zipCode: addressZipCode },
        success: function (json) {
            addressCounty = String(json.county);
            addressArea = String(json.area);
            buildAddressCounty();
        },
        dataType: 'json'
    });
};

var buildAddressCounty = function () {
    $.ajax({
        type : 'POST',
        url  : baseUrl + '/ajax/zipcode/county',
        success: addressCountyUpdate,
        dataType: 'json'
    });
}

var addressCountyUpdate = function (json) {
    _build(json, '#addressSelector1', addressCounty);
    addressCountyChange.apply($('#addressSelector1'));
};

var addressCountyChange = function () {
    $.ajax({
        type : 'POST',
        url  : baseUrl + '/ajax/zipcode/area',
        data : { county: $(this).val() },
        success: addressAreaUpdate,
        dataType: 'json'
    });
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
            wa.point = new GLatLng(lat,lng);
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
    var Address = '';

    country == area ? Address = zipCode + country + address : Address = zipCode + country + area + address ;

    return Address;
}
/**
 * 建立選項
 *
 */
var _build = function (json, selector, selectedId) {
    var selected = true;
    
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
        wa.getLatLng(getAddress(),true);
    })

    $('#mapMessage').css('display','none');

});
