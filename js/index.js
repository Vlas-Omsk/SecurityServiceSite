window.onload = function() {
    document.body.style.opacity = 1;
    window.onscroll();
    FixIEActive();

    setTimeout(ReadHash, 500);
};

//#region Popups
OnDOMContentLoaded(function () {
    // открыть по кнопке
    $('.js-button').click(function(e) {
        var overlay_id = $(e.target).attr('overlay-id');
        OpenOverlay(overlay_id);
    });

    // закрыть на крестик
    $('.close-popup').click(function(e) {
        var overlay_id = $(e.target).parent().parent().attr('overlay-id');
        $('.overlay[overlay-id="' + overlay_id + '"]').fadeOut();
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
        var id_tel = $(this).attr("data-call");
        console.log("you eblan");
        if(id_tel == "more_anal")
            location.replace("tel:+73462582540");
        else
            location.replace("tel:+7982 567-68-70");
    });
});

function OpenOverlay(overlay_id) {
    $('.overlay[overlay-id="' + overlay_id + '"]').fadeIn();
    $('.overlay[overlay-id="' + overlay_id + '"]').addClass('disabled');
}
//#endregion

//#region OnScroll
var menu, content;
function checkMenuPosition() {
    if (!menu)
        menu = document.getElementById("menu");
    if (!content)
        content = document.getElementsByClassName("content")[0];

    if (window.pageYOffset >= 110 && !menu.classList.contains("fixed"))
        menu.classList.add("fixed");
    if (menu.classList.contains("fixed")) {
        if (!content.attributes.dontconsideheightofthemenu)
            content.style.paddingTop = menu.offsetHeight + "px";
        if (window.pageYOffset < 110) {
            content.style.paddingTop = null;
            menu.classList.remove("fixed");
        }
    }
}

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
OnDOMContentLoaded(function() {
    OnScroll(function() {
        checkMenuPosition();

        listenedElements.forEach(function(item, index) {
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
        dom_elements.forEach(function(el) {
            listenedElements.push({
                el: el,
                inVisibleSpace: inVisibleSpace,
                outVisibleSpace: outVisibleSpace
            })
        })
    else
        listenedElements.push({
            el: dom_elements,
            inVisibleSpace: inVisibleSpace,
            outVisibleSpace: outVisibleSpace
        });
}

OnDOMContentLoaded(function() {
    menu = document.getElementById("menu");
    content = document.getElementsByClassName("content")[0];

    onVisibleSpaceListener(
        $("*[OnScrollVisible], *[OnScrollHidden]").toArray(), 
        function(el) { el_VisibleChanged(el, "OnScrollVisible") }, 
        function(el) { el_VisibleChanged(el, "OnScrollHidden") }
    );
});

function el_VisibleChanged(el, attribute) {
    var attr = el.getAttribute(attribute);
    if (!isEmpty(attr)) {
        var split = attr.split(";");
        var Timeout = -1;    
        split.forEach(function(elem) {
            elem = elem.trim();
            if (Timeout != -1) {
                setTimeout(el_Action, Timeout, el, elem)
                Timeout = -1;
            } else
                Timeout = el_Action(el, elem);
        });
    }
}

function el_Action(el, str) {
    if (!isEmpty(str))
        switch (str[0]) {
            case '+': el.classList.add(str.substring(1)); break;
            case '-': el.classList.remove(str.substring(1)); break;
            case '~': return Number(str.substring(1));
        }
    return -1;
}
//#endregion

//#region Transitions
OnDOMContentLoaded(function() {
    $("*[transition]").each(function(i, elem) {
        elem.onclick = function(e) {
            e.preventDefault();
            if (!isEmpty(elem.getAttribute("transition")))
                TransitionTo(elem.getAttribute("transition"));
            else
                TransitionTo(elem.getAttribute("href"));
        }
    });
});

function TrimHash(href) {
    if (isEmpty(href))
        return "";
    var index = href.indexOf('#');
    return index == -1 ? href : href.substr(0, index);
}

function GetHash(href) {
    if (isEmpty(href))
        return "";
    var index = href.indexOf('#');
    return index == -1 ? "" : href.substr(index + 1);
}

function TransitionTo(href) {
    var current = TrimHash(window.location.href);
    var new_href = TrimHash(href);

    if (!current.endsWith(new_href) && new_href) {
        document.body.addEventListener('transitionend', function(ee) {
            if (ee.target == document.body)
                window.location.href = href;
        });
        document.body.style.opacity = 0;
    } else if (GetHash(window.location.href) != GetHash(href) && !isEmpty(GetHash(href))) {
        window.location.href = href;
    }
}
//#endregion

//#region Hash
window.addEventListener('hashchange', ReadHash);

function ReadHash() {
    const hash = URI().hash.slice(1);
    URI().hash = "_";

    if (!isEmpty(hash) && hash != "_") {
        console.log('hash: ' + hash);

        if (hash.startsWith("overlay_", ""))
            OpenOverlay(hash.replace("overlay_", ""));
        if (hash.startsWith("scrollto_", ""))
            ScrollToElem(hash.replace("scrollto_", ""));
    }
}
//#endregion

//#region Scroll Functions
function ScrollToElem(ID) {
    var elem = document.getElementById(ID);
    var to = elem.offsetTop - menu.offsetHeight;

    if (window.pageYOffset != to) {
        if (IsIE() || IsFirefox())
            SmoothScroll(to);
        else
            window.scrollTo({top: to, behavior: 'smooth'})
    }
}

const SmoothScroll = function(top) {
    if (window.pageYOffset > top - 7 && window.pageYOffset < top + 7) {
        window.scrollTo(0, top);
        return;
    }
    
    setTimeout(function() {
        var iter = window.pageYOffset < top ? top - window.pageYOffset : window.pageYOffset - top;
        iter *= 0.1;
        if (iter < 1) iter = 1;

        window.scrollTo(0, window.pageYOffset < top ? window.pageYOffset + iter : window.pageYOffset - iter);
        SmoothScroll(top);
    }, 1);
}
//#endregion

//#region Extension
const isEmpty = function(str) {
    return (!str || str.length === 0 || !str.trim());
};

const URI = function() { return document.location };

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

String.prototype.endsWith = function(str) {
    return this.slice(-str.length) == str;
}

String.prototype.startsWith = function(str) {
    return this.slice(0, str.length) == str;
}

String.prototype.sliceTo = function(str) {
    return this.slice(0, this.indexOf(str));
}

String.prototype.sliceFrom = function(str) {
    return this.slice(this.lastIndexOf(str) + str.length);
}

Array.prototype.Any = function(expr) {
    for (var i = 0; i < this.length; i++) {
        var elem = this[i];
        if (expr(elem))
            return true;
    }
    return false;
}
//#endregion

//#region FixIEActive
// This script fixes the work of the pseudo element :active in IE

const StylesToFix = [
    "css/ie-compatible.css",
    "css/index.css",
    "css/preloader-static.css",
    "css/slider.css"
];

const PseudoelementsToOverride = [
    ":hover"
];

const active_attr = ":active";

function makeid()
{
    var text = "";
    var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
    for( var i=0; i < 7; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var possibleNums ="0123456789";
    for( var j=0; j < 7; j++ ){
        text += possibleNums.charAt(Math.floor(Math.random() * possibleNums.length));
    }
    return text;
}

function AddStyle(selector, text) {
    var root = selector.sliceTo(active_attr);
    var path = selector.sliceFrom(active_attr);
    var style = document.createElement("style");
    var id = makeid();
    style.innerHTML = root + '.' + id + ' ' + path + ' {\r\n' + text + '\r\n}\r\n';
    for (var i = 0; i < PseudoelementsToOverride.length; i++)
        style.innerHTML += root + '.' + id + PseudoelementsToOverride[i] + ' ' + path + ' {\r\n' + text + '\r\n}\r\n';
    $(document.body).prepend(style);

    return id;
}

function FixIEActive() {
    if (!IsIE())
        return;

    console.log("FixIEActive: Stylesheets count: " + document.styleSheets.length);

    for (var stylesheet_id = 0; stylesheet_id < document.styleSheets.length; stylesheet_id++) {
        var stylesheet = document.styleSheets[stylesheet_id];
        
        if (!stylesheet.href || StylesToFix.Any(function(elem) { return stylesheet.href.endsWith(elem); })) {
            try {
                for (var rule_id = 0; rule_id < stylesheet.rules.length; rule_id++) {
                    var rule = stylesheet.rules[rule_id];
                    
                    if (rule.constructor == CSSStyleRule) {
                        if (rule.selectorText.indexOf(active_attr) != -1) {
                            console.log(rule.selectorText);
                            var style_id = AddStyle(rule.selectorText, rule.style.cssText);

                            $(rule.selectorText.sliceTo(active_attr)).each(function(i, elem) {
                                var style_id_copy = style_id;

                                elem = $(elem);
                                elem.mousedown(function() {
                                        if (!elem.hasClass(style_id_copy))
                                            elem.addClass(style_id_copy);
                                    });
                                $(window).mouseup(function() {
                                        elem.removeClass(style_id_copy);
                                    });
                            });
                        }
                    }
                }
            } catch (ex) {
                console.warn("FixIEActive: " + ex.message);
            }
        }
    }
}
//#endregion