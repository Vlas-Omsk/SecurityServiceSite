//#region DOMContentLoaded
var ua = window.navigator.userAgent;
var DOMContentLoadedListeners = [];

if (IsIE()) {
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            DOMContentLoadedListeners.forEach(function(elem) { elem.call() });
        }
    }
} else {
    document.addEventListener("DOMContentLoaded", function() {
        DOMContentLoadedListeners.forEach(function(elem) { elem.call() });
    });
}

function OnDOMContentLoaded(callback) {
    DOMContentLoadedListeners.push(callback);
}
//#endregion

//#region DOM
const header = [
    { 'tag': '!--', 'content': '#region header' },
    {
        'tag': 'header',
        'content': [
            {
                'tag': 'ul',
                'content': [
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Наши услуги', 'attrs': { 'transition': '', 'href': 'index.html#scrollto_services' } }
                        ] 
                    },
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Наши документы', 'attrs': { 'transition': '', 'href': 'index.html#scrollto_documents' } } 
                        ] 
                    },
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Цены на услуги', 'attrs': { 'transition': '', 'href': 'price.html' } } 
                        ] 
                    },
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Отзывы', 'attrs': { 'transition': '', 'href': 'feedback.html' } } 
                        ] 
                    },
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Вакансия', 'attrs': { 'transition': '', 'href': 'job.html' } } 
                        ] 
                    },
                    { 
                        'tag': 'li', 
                        'content': [ 
                            { 'tag': 'a', 'content': 'Контакты', 'attrs': { 'class': 'js-button', 'overlay-id': 'campaign' } } 
                        ]
                    }
                ]
            }
        ]
    },
    {
        'tag': 'div',
        'attrs': { 'class': 'logo' },
        'content': [
            {
                'tag': 'div',
                'attrs': { 'id': 'line' }
            }
        ]
    },
    { 'tag': '!--', 'content': '#endregion' }
];
const popups = [
    { 'tag': '!--', 'content': '#region popups' },
    {
        'tag': 'div',
        'attrs': {
            'class': 'overlay',
            'overlay-id': 'campaign'
        },
        'content': [
            {
                'tag': 'div',
                'attrs': {
                    'class': 'popup'
                },
                'content': [
                    {
                        'tag': 'div',
                        'content': [
                            { 'tag': 'h2', 'content': 'Мы всегда на связи!' },
                            {
                                'tag': 'b',
                                'attrs': {
                                    'class': 'phone_call',
                                    'data-call': 'more_anal',
                                    'title': 'Нажми для вызова'
                                },
                                'content': '8 3462 58-25-40'
                            },
                            { 'tag': '#', 'content': ' - Многоканальный' }, { 'tag': 'br' },
                            {
                                'tag': 'b',
                                'attrs': {
                                    'class': 'phone_call',
                                    'data-call': 'director_anal',
                                    'title': 'Нажми для вызова'
                                },
                                'content': '8 982 567-68-70'
                            },
                            { 'tag': '#', 'content': ' – Генеральный директор' }, { 'tag': 'br' },
                            { 'tag': '#', 'content': 'Почта: ' }, { 'tag': 'b', 'content': 'sparta3462@mail.ru' },
                            { 'tag': 'hr' },
                            { 'tag': 'h2', 'content': 'Как нас найти:' },
                            { 'tag': 'p', 'content': '628400 Сургут ул. 30 лет Победы д. 66 оф.3.3' },
                            { 
                                'tag': 'div',
                                'attrs': {
                                    'id': 'map_gandonchir'
                                },
                                'content': [
                                    { 
                                        'tag': 'script',
                                        'attrs': {
                                            'type': 'text/javascript',
                                            'charset': 'utf-8',
                                            'async': '',
                                            'src': 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4c666137a789879324855a25fe39b7165bb84d5b038e753664468339a2d47cb0&amp;width=320&amp;height=240&amp;lang=ru_RU&amp;scroll=true'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'tag': 'div',
                        'attrs': {
                            'class': 'close-popup'
                        }
                    }
                ]
            }
        ]
    }
];
const preloader = [
    {
        'tag': 'div',
        'attrs': {
            'id': 'plug'
        }
    },
    {
        'tag': 'div',
        'attrs': {
            'id': 'logo-box'
        },
        'content': [
            {
                'tag': 'a',
                'attrs': {
                    'transition': '',
                    'id': 'helmet',
                    'href': 'index.html'
                },
                'content': [
                    {
                        'tag': 'img',
                        'attrs': {
                            'style': 'height: 100%;',
                            'src': 'media/helmet.svg'
                        }
                    }
                ]
            },
            {
                'tag': 'div',
                'attrs': {
                    'id': 'label'
                }
            },
            {
                'tag': 'div',
                'attrs': {
                    'id': 'circle'
                }
            }
        ]
    }
];

OnDOMContentLoaded(function () {
    const body = $(document.body);
    
    const elements = (isEmpty(body.attr("inject-static-elements")) ? ["header", "popups"] : body.attr("inject-static-elements").split(','));
    elements.forEach(function(elem) {
        switch (elem.trim()) {
            case 'header': body.prepend(JsonToDOM(header)); break;
            case 'popups': body.append(JsonToDOM(popups)); break;
        }
    });

    //#region Preloader
    if ((isEmpty(document.referrer) || isEmpty(URI().host) || !document.referrer.includes(URI().host)) && body.attr("debug") != "true" && isEmpty(URI().hash)) {
        $(JsonToDOM(preloader)).insertAfter("header");

        RunPreloaderAnimation();
    }
    else {
        var preloader_copy = preloader;
        preloader_copy[0] = {
            'tag': 'link',
            'attrs': {
                'href': 'css/preloader-static.css',
                'rel': 'stylesheet'
            }
        };
        delete preloader_copy[1].content[1];
        $(JsonToDOM(preloader)).insertAfter("header");
    }
    //#endregion
});

function RunPreloaderAnimation() {
    $(document).on('scroll.PreloaderAnimation', function() {
        window.scrollTo(0, 0);
    });

    var logo_box = document.getElementById('logo-box');
    var plug = document.getElementById('plug');
    var circle = document.getElementById('circle');
    var helmet = document.getElementById('helmet');
    var label = document.getElementById('label');

    "ЧОП Спарта".split('').forEach(function(item, i) {
        label.innerHTML += '<a class="label-char">' + (item == ' ' ? '&#160;' : item) + '</a>'
    });

    setTimeout(function() {
        circle.style.width = "60vh";
        circle.style.height = "60vh";
        circle.style.borderRadius = "30%";
        circle.style.transform = 'rotateZ(90deg)';

        setTimeout(function() {
            helmet.style.opacity = 1;
            circle.style.width = "0";
            circle.style.height = "0";
            circle.style.borderRadius = "0";

            setTimeout(function() {
                Array.prototype.forEach.call(document.getElementsByClassName("label-char"), function(item, i) {
                    item.style.transitionDelay = (i * 50) + 'ms';
                    item.style.transform = 'none';
                });

                setTimeout(function() {
                    helmet.style.height = '110px';
                    logo_box.style.top = '0';
                    label.style.opacity = 0;

                    setTimeout(function() {
                        plug.style.pointerEvents = 'none';
                        var line = document.getElementById('line');
                        line.style.width = '100%';
                        label.remove();

                        setTimeout(function() {
                            plug.style.opacity = 0;

                            $(document).off('scroll.PreloaderAnimation');
                        }, 250);
                    }, 900);
                }, 1000);
            }, 500);
        }, 750);
    }, 1000);
}

function JsonToDOM(json) {
    let elements = document.createDocumentFragment();
    for(var item in json) {
        var item_value = json[item];

        let element;
        for (var option in item_value) {
            var option_value = item_value[option];

            switch (option) {
                case 'tag':
                    switch (option_value) {
                        case '#':   element = document.createTextNode(null); break;
                        case '!--': element = document.createComment(null); break;
                        default:    element = document.createElement(option_value); break;
                    }
                    break;
                case 'attrs':
                    for (var attr in option_value)
                        element.setAttribute(attr, option_value[attr]);
                    break;
                case 'content':
                    if (Array.isArray(option_value))
                        element.appendChild(JsonToDOM(option_value));
                    else if (element.constructor == Comment.prototype.constructor || element.constructor == Text.prototype.constructor)
                        element.data = option_value;
                    else
                        element.innerHTML = option_value;
            }
        }
        elements.appendChild(element);
    }
    return elements;
}
//#endregion

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
        let id_tel = $(this).attr("data-call");
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
    $(document).on('scroll', function() {
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
    var index = href.indexOf('#');
    return index == -1 ? href : href.substr(0, index);
}

function GetHash(href) {
    var index = href.indexOf('#');
    return index == -1 ? "" : href.substr(index + 1);
}

function TransitionTo(href) {
    var current = TrimHash(window.location.href);
    var new_href = TrimHash(href);

    if (!current.endsWith(new_href)) {
        document.body.addEventListener('transitionend', function(ee) {
            if (ee.target == document.body)
                window.location.href = href;
        });
        document.body.style.opacity = 0;
    } else if (GetHash(window.location.href) != GetHash(href)) {
        window.location.href = href;
    }
}
//#endregion

//#region Hash
window.addEventListener('hashchange', ReadHash);

function ReadHash() {
    const hash = URI().hash.slice(1);
    if (!isEmpty(hash)) {
        console.log('hash: ' + hash);

        if (hash.startsWith("overlay_", ""))
            OpenOverlay(hash.replace("overlay_", ""));
        if (hash.startsWith("scrollto_", ""))
            ScrollTo(hash.replace("scrollto_", ""));
        
        window.location.hash = "";
    }
}
//#endregion

window.onload = function() {
    document.body.style.opacity = 1;

    setTimeout(ReadHash, 300);
};

function ScrollTo(ID) {
    var elem = document.getElementById(ID);
    
    if (window.scrollY != elem.offsetTop) {
        if (IsIE() || IsFirefox())
            smoothScroll(elem.offsetTop);
        else
            window.scrollTo({top: elem.offsetTop, behavior: 'smooth'});
    }
}

const smoothScroll = function(to) {
    if (window.pageYOffset > to - 7 && window.pageYOffset < to + 7) {
        window.scrollTo(0, to);
        return;
    }
    
    setTimeout(function() {
        var iter = window.pageYOffset < to ? to - window.pageYOffset : window.pageYOffset - to;
        iter *= 0.1;
        if (iter < 1) iter = 1;

        window.scrollTo(0, window.pageYOffset < to ? window.pageYOffset + iter : window.pageYOffset - iter);
        smoothScroll(to);
    });
}

function IsFirefox() {
    return ua.indexOf("Firefox") != -1;
}

function IsIE() {
    return ua.indexOf("MSIE") != -1 || ua.indexOf("Edge") != -1 || ua.indexOf(".NET") != -1;
}

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