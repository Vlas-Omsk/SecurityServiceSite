//#region Popups
document.addEventListener("DOMContentLoaded", function () {
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
});
//#endregion

//#region OnScroll
function isOnVisibleSpace(element) {
    var bodyHeight = window.innerHeight;
    var elemRect = element.getBoundingClientRect();
    var offset = elemRect.top;// - bodyRect.top;
    //Full visible
    //if (offset < 0) return false;
    //if (elemRect.bottom > bodyHeight) return false;
    if (offset > bodyHeight) return false;
    return true;
}

var listenedElements = [];
document.addEventListener("DOMContentLoaded", () => {
    $(document).on('scroll', function() {
        listenedElements.forEach((item, index) => {
            if (item == null)
                return;

            var result = isOnVisibleSpace(item.el);

            // обработчик выпадения из зоны видимости
            if (item.el.isOnVisibleSpace && !result) {
                item.el.isOnVisibleSpace = false;
                item.outVisibleSpace(item.el);
                return;
            }
            // обработчик попадания в зону видимости
            if (!item.el.isOnVisibleSpace && result) {
                item.el.isOnVisibleSpace = true;
                item.inVisibleSpace(item.el);

                if (item.outVisibleSpace == null)
                    listenedElements[index] = null;
                return;
            }
        });
    });
});

function onVisibleSpaceListener(dom_elements, inVisibleSpace, outVisibleSpace) {
    if (Array.isArray(dom_elements))
        Array.from(dom_elements).forEach((el) => 
            listenedElements.push({
                el: el,
                inVisibleSpace: inVisibleSpace,
                outVisibleSpace: outVisibleSpace
            }));
    else
        listenedElements.push({
            el: dom_elements,
            inVisibleSpace: inVisibleSpace,
            outVisibleSpace: outVisibleSpace
        });
}

document.addEventListener("DOMContentLoaded", () => {
    onVisibleSpaceListener(Array.from($("*[OnScrollVisible], *[OnScrollHidden]")), (el) => el_VisibleChanged(el, "OnScrollVisible"), (el) => el_VisibleChanged(el, "OnScrollHidden"));
});

function el_VisibleChanged(el, attribute) {
    var attr = el.getAttribute(attribute);
    if (attr != undefined && attr != "") {
        var split = attr.split(";");
        var Timeout = -1;    
        split.forEach((elem) => {
            elem = elem.trim();
            if (Timeout != -1) {
                setTimeout(el_Action, Timeout, el, elem)
                Timeout = -1;
            } else
                Timeout = el_Action(el, elem);
            console.log(elem, Timeout);
        });
    }
}

function el_Action(el, str) {
    if (str != undefined && str != "")
        switch (str[0]) {
            case '+': el.classList.add(str.substring(1)); break;
            case '-': el.classList.remove(str.substring(1)); break;
            case '~': return Number(str.substring(1));
        }
    return -1;
}
//#endregion

//#region Transitions
window.onload = () => {
    document.body.style.opacity = 1;
};

document.addEventListener("DOMContentLoaded", () => {
    $("*[transition]").each((i, elem) => {
        elem.onclick = (e) => {
            e.preventDefault();
            if (elem.getAttribute("transition") != undefined && elem.getAttribute("transition") != "")
                TransitionTo(elem.getAttribute("transition"));
            else
                TransitionTo(elem.getAttribute("href"));
        }
    });
});

function TransitionTo(href) {
    document.body.addEventListener('transitionend', function(ee) {
        if (ee.target == document.body)
            window.location.href = href;
    });
    document.body.style.opacity = 0;
}
//#endregion