// Модальное окно

// открыть по кнопке
$('.js-button').click(function(e) {
    var overlay_id = $(e.target).attr('overlay-id');
    $(`.overlay[overlay-id="${overlay_id}"]`).fadeIn();
    $(`.overlay[overlay-id="${overlay_id}"]`).addClass('disabled');
});

// закрыть на крестик
$('.close-popup').click(function(e) {
    var overlay_id = $(e.target).parent().parent().attr('overlay-id');
    $(`.overlay[overlay-id="${overlay_id}"]`).fadeOut();
});

// закрыть по клику вне окна
//   #FIXME
$(document).mouseup(function (e) { 
    var popup = $('.popup');
    if (e.target != popup[0] && popup.has(e.target).length === 0){
        $('.overlay').fadeOut();
    }
});

$(".phone_call").on("click",function(){
    let id_tel = $(this).attr("data-call");
    console.log("you eblan");
    if(id_tel == "more_anal")
    location.replace("tel:+73462582540");
    else
    location.replace("tel:+7982 567-68-70");
});