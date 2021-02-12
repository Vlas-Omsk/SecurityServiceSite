 // Модальное окно

// открыть по кнопке
$('.js-button-anal').click(function() { 
    
    $('.js-overlay-anal').fadeIn();
    $('.js-overlay-anal').addClass('disabled');
});

// закрыть на крестик
$('.js-close-anal').click(function() { 
    $('.js-overlay-anal').fadeOut();
    
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
    var popup = $('.js-popup-anal');
    if (e.target!=popup[0]&&popup.has(e.target).length === 0){
        $('.js-overlay-anal').fadeOut();
        
    }
});












    // Модальное окно

// открыть по кнопке
$('.js-button-campaign').click(function() { 
    
    $('.js-overlay-campaign').fadeIn();
    $('.js-overlay-campaign').addClass('disabled');
});

// закрыть на крестик
$('.js-close-campaign').click(function() { 
    $('.js-overlay-campaign').fadeOut();
    
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
    var popup = $('.js-popup-campaign');
    if (e.target!=popup[0]&&popup.has(e.target).length === 0){
        $('.js-overlay-campaign').fadeOut();
        
    }
});



// Phone Call (ne phone govno, a phone vuzov)

$(".phone_call").on("click",function(){
let id_tel = $(this).attr("data-call");
console.log("you eblan");
if(id_tel == "more_anal")
location.replace("tel:+73462582540");
else
location.replace("tel:+7982 567-68-70");
});