function swap(sliderid, slideid) {
    $(`.slider:eq(${sliderid})`).attr("slideid", slideid);

    swaptext($(`.slider:eq(${sliderid}) .title h1`), $(`.slider:eq(${sliderid}) div[slide]:eq(${slideid})`).attr('slide'));

    $(`.slider:eq(${sliderid}) *`).removeAttr(`active`);
    $(`.slider:eq(${sliderid}) div[slide]:eq(${slideid}), .slider:eq(${sliderid}) ul.slides li:eq(${slideid})`).attr(`active`, `true`);
}

async function swaptext(title, text) {
    if (title.text() != text) {
        title.css({transform: 'translateY(100%)'});

        await sleep(300);

        title.text(text);
        title.css({transform: 'translateY(0%)'});
    }
}

document.addEventListener("DOMContentLoaded", function () {
    $(".slider").each((indexp, elemp) => {
        var slides = $('<ul class="slides"></ul>');
        $(elemp).children('div[slide]').each((index) => {
            slides.append(`<li onclick='swap(${indexp}, ${index})'></li>`);
        });
        $(elemp).append(slides);
        swap(indexp, 0);

        if ($(elemp).attr("auto-slide") != undefined) {
            var count = $(elemp).children('div[slide]').length;
            var lastid = Number($(elemp).attr("slideid"));
            setInterval(() => {
                var indexactive = Number($(elemp).attr("slideid")) + 1;
                if (lastid == indexactive - 1) {
                    if (indexactive >= count)
                        indexactive = 0;
                    lastid = indexactive;
                    swap(indexp, indexactive);
                } else
                    lastid = indexactive - 1;
            }, $(elemp).attr("auto-slide"));
        }
    });
});