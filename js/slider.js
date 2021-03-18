var DelayedSwap = false;

function swap(sliderid, slideid, autoswap) {
    if (!autoswap)
        DelayedSwap = true;

    $('.slider:eq(' + sliderid + ')').attr("slideid", slideid);

    swaptext($('.slider:eq(' + sliderid + ') .title h1'), $('.slider:eq(' + sliderid + ') div[slide]:eq(' + slideid + ')').attr('slide'));

    $('.slider:eq(' + sliderid + ') *').removeAttr('active');
    $('.slider:eq(' + sliderid + ') div[slide]:eq(' + slideid + '), .slider:eq(' + sliderid + ') ul.slides li:eq(' + slideid + ')').attr('active', 'true');
}

function swaptext(title, text) {
    if (title.text() != text) {
        title.css({transform: 'translateY(100%)'});

        setTimeout(function() {
            title.text(text);
            title.css({transform: 'translateY(0%)'});
        }, 250);
    }
}

OnDOMContentLoaded(function () {
    $(".slider").each(function(indexp, elemp) {
        var slides = $('<ul class="slides"></ul>');
        $(elemp).children('div[slide]').each(function(index) {
            slides.append("<li onclick='swap(" + indexp + ", " + index + ")'></li>");
        });
        $(elemp).append(slides);
        swap(indexp, 0, true);

        if ($(elemp).attr("auto-slide") != undefined) {
            var count = $(elemp).children('div[slide]').length;
            setInterval(function() {
                if (!DelayedSwap) {
                    var indexactive = Number($(elemp).attr("slideid")) + 1;
                    if (indexactive >= count)
                        indexactive = 0;
                    swap(indexp, indexactive, true);
                } else DelayedSwap = false;
            }, $(elemp).attr("auto-slide"));
        }
    });
});