//#region DOMContentLoaded
var ua = window.navigator.userAgent,
    isDOMContentLoaded = false,
    DOMContentLoadedListeners = [],
    BeforeInvokeDOMContentLoaded = function() { };

if (IsIE()) {
    document.onreadystatechange = function () {
        if (document.readyState == "interactive")
            invokeOnDOMContentLoaded();
    }
} else {
    document.addEventListener("DOMContentLoaded", function() {
        invokeOnDOMContentLoaded();
    });
}

function invokeOnDOMContentLoaded() {
    BeforeInvokeDOMContentLoaded.call();
    DOMContentLoadedListeners.forEach(function(elem) { elem.call() });
    isDOMContentLoaded = true;
}

function OnDOMContentLoaded(callback) {
    if (isDOMContentLoaded)
        callback.call();
    DOMContentLoadedListeners.push(callback);
}
//#endregion

//#region OnScroll
var OnScrollListeners = [];

window.onscroll = function() {
    OnScrollListeners.forEach(function(elem) { elem.callback.call() });
}

function RemoveOnScroll(elem) {
    if (elem.constructor == String) {
        for (var i = 0; i < OnScrollListeners.length; i++)
            if (OnScrollListeners[i] && OnScrollListeners[i].namespace == elem)
                delete OnScrollListeners[i];
    } else if (elem.constructor == Number) {
        delete OnScrollListeners[elem];
    } else {
        for (var i = 0; i < OnScrollListeners.length; i++)
            if (OnScrollListeners[i] && OnScrollListeners[i] == elem)
                delete OnScrollListeners[i];
    }
}

function OnScroll(callback, namespace) {
    OnScrollListeners.push({ 'callback': callback, 'namespace': namespace });
}

function LockScrolling(enabled) {
    if (enabled) {
        var scrollbarWidth = document.body.clientWidth;

        // document.body.style.top = -window.scrollY + 'px';
        // document.body.classList.add('unscrollable');
        document.body.style.overflowY = 'hidden';

        scrollbarWidth = document.body.clientWidth - scrollbarWidth;
        document.body.style.width = 'calc(100% - ' + scrollbarWidth + 'px)';
    } else {
        // document.body.classList.remove('unscrollable');
        // window.scrollTo(0, document.body.style.top.slice(1, -2));
        // document.body.style.top = null;
        document.body.style.overflowY = 'visible';
        
        document.body.style.width = '100%';
    }
}
//#endregion

const dropdown_services = [
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Физическая охрана', 'attrs': { 'transition': '${services.physical}', 'href': '' } } ] },
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Пультовая охрана<br>Группы быстрого реагирования', 'attrs': { 'transition': '${services.remote}', 'href': '' } } ] },
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Монтаж и обслуживание видеонаблюдения', 'attrs': { 'transition': '${services.video}', 'href': '' } } ] },
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Инкассация', 'attrs': { 'transition': '${services.cash}', 'href': '' } } ] },
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Полиграф<br>Детектор лжи', 'attrs': { 'transition': '${services.polygraph}', 'href': '' } } ] },
    { tag: 'li', content: [ { 'tag': 'a', 'content': 'Монтаж и обслуживание пожарно-охранной сигнализации', 'attrs': { 'transition': '${services.fire}', 'href': '' } } ] }
];
const menu_json = [
    {
        'tag': 'ul',
        'attrs': {
            'id': 'menu'
        },
        'content': [
            { 
                'tag': 'li',
                'attrs': {
                    'class': 'dropdown',
                    'overlay-id': 'services',
                    'to': '/services.html'
                },
                'content': [ 
                    { 'tag': 'a', 'content': 'Наши услуги', 'attrs': { /*'/index.html#scrollto_services'*/ } }
                ] 
            },
            { 
                'tag': 'li', 
                'content': [ 
                    { 'tag': 'a', 'content': 'Наши документы', 'attrs': { 'transition': '', 'href': '/index.html#scrollto_documents' } } 
                ] 
            },
            { 
                'tag': 'li', 
                'content': [ 
                    { 'tag': 'a', 'content': 'Цены на услуги', 'attrs': { 'transition': '', 'href': '/price.html' } } 
                ] 
            },
            { 
                'tag': 'li', 
                'content': [ 
                    { 'tag': 'a', 'content': 'Отзывы', 'attrs': { 'transition': '', 'href': '/feedback.html' } } 
                ] 
            },
            { 
                'tag': 'li', 
                'content': [ 
                    { 'tag': 'a', 'content': 'Вакансия', 'attrs': { 'transition': '', 'href': '/job.html' } } 
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
];
const header = [
    { 'tag': '!--', 'content': '#region header' },
    {
        'tag': 'header'
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
                        'attrs': {
                            'class': 'popup-content'
                        },
                        'content': [
                            { 'tag': 'h2', 'content': 'Мы всегда на связи!' },
                            {
                                'tag': 'b',
                                'attrs': {
                                    'class': 'phone_call',
                                    'data-call': 'more_anal',
                                    'title': 'Нажми для вызова'
                                },
                                'content': '8 (3462) 58-25-40'
                            },
                            { 'tag': '#', 'content': ' - Многоканальный' }, { 'tag': 'br' },
                            {
                                'tag': 'b',
                                'attrs': {
                                    'class': 'phone_call',
                                    'data-call': 'director_anal',
                                    'title': 'Нажми для вызова'
                                },
                                'content': '8 (982) 567-68-70'
                            },
                            { 'tag': '#', 'content': ' - Марейченко Александр Александрович' }, { 'tag': 'br' },
                            {
                                'tag': 'b',
                                'attrs': {
                                    'class': 'phone_call',
                                    'data-call': 'director_anal',
                                    'title': 'Нажми для вызова'
                                },
                                'content': '8 (922) 796-91-57'
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
    },
    {
        'tag': 'div',
        'attrs': {
            'class': 'overlay',
            'overlay-id': 'services'
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
                        'attrs': {
                            'class': 'popup-content'
                        },
                        'content': [
                            { 'tag': 'h2', 'content': [
                                { 'tag': 'a', attrs: { 'style': 'text-decoration: none; color: white;', 'transition': '', 'href': '/services.html' }, content: 'Наши услуги' }
                            ] },
                            { 'tag': 'hr' },
                            { 
                                'tag': 'ul', 
                                'attrs': {
                                    'class': 'menu'
                                },
                                'content': dropdown_services
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
    },
    { 'tag': '!--', 'content': '#endregion' }
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
                    'href': '/index.html'
                },
                'content': [
                    {
                        'tag': 'img',
                        'attrs': {
                            'style': 'height: 100%;',
                            'src': '/media/helmet.svg'
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

BeforeInvokeDOMContentLoaded = function () {
    const body = $(document.body);
    if (IsIE()) {
        body.append(JsonToDOM([
            {
                'tag': 'link',
                'attrs': {
                    'rel': 'stylesheet',
                    'href': '/css/ie-compatible.css'
                }
            }
        ]));
    }
    if (IsPresto()) {
        document.body.innerHTML = "Мистор, да вы ё*аный извращенец, ваш браузер не сможет нормально отобразить этот сайт<br><br>" + ua;
        return;
    }
    
    const elements = (isEmpty(body.attr("inject-static-elements")) ? ["header", "menu", "popups"] : body.attr("inject-static-elements").split(','));
    elements.forEach(function(elem) {
        switch (elem.trim()) {
            case 'header': body.prepend(JsonToDOM(header)); break;
            case 'popups': body.append(JsonToDOM(popups)); break;
            case 'menu': 
                var selected_permanently = body.attr("selected-permanently");
                if (!isEmpty(selected_permanently)) {
                    var li = menu_json[0].content[selected_permanently]
                    if (li.attrs && li.attrs.class)
                        li.attrs.class += " selected-permanently";
                    else
                        li.attrs = { "class": "selected-permanently" };
                }
                if (!IsIE()) {
                    menu_json[0].content[0].content.push({
                        'tag': 'ul',
                        content: dropdown_services
                    });
                }
                $("header").append(JsonToDOM(menu_json));
                break;
        }
    });

    body.append($('<div class="scrolltotop hidden"><div class="rotate"><svg viewBox="0 0 20.23 29.93"><g><path d="M1.11,17.68l9,10,9-10"></path><path d="M10.11,26V0"></path></g></svg></div></div>'));

    InitPreloaderAnimation();
};

function InitPreloaderAnimation() {
    const body = $(document.body);
    
    if (body.attr("debug") != "true")
    if (!IsIE())
    if (isEmpty(document.referrer) || isEmpty(URI().host) || document.referrer.indexOf(URI().host) == -1) {
        $(JsonToDOM(preloader)).insertAfter("header");

        document.body.addEventListener('transitionend', function(ee) {
            if (ee.target == document.body && document.body.style.opacity == 1 && ee.propertyName == "opacity")
                RunPreloaderAnimation();
        });
        return;
    }

    var preloader_copy = preloader;
    preloader_copy[0] = {
        'tag': 'link',
        'attrs': {
            'href': '/css/preloader-static.css',
            'rel': 'stylesheet'
        }
    };
    delete preloader_copy[1].content[1];
    $(JsonToDOM(preloader)).insertAfter("header");
}

function RunPreloaderAnimation() {
    window.scrollTo(0, 0);
    LockScrolling(true, 'RunPreloaderAnimation');

    var logo_box = $("#logo-box");
    var plug = $("#plug");
    var circle = $("#circle");
    var helmet = $("#helmet");
    var label = $("#label");

    'Группа компании "Спарта"'.split('').forEach(function(item, i) {
        label.append('<a class="label-char" style="transition-delay: ' + ((i * 50) + 'ms') + '">' + (item == ' ' ? '&#160;' : item) + '</a>')
    });

    setTimeout(function() {
        circle.addClass("rotate full");

        setTimeout(function() {
            helmet.css({ opacity: 1 });
            circle.removeClass("full");

            setTimeout(function() {
                $(".label-char").css({ transform: 'none' });

                setTimeout(function() {
                    helmet.css({ height: '110px' });
                    logo_box.css({ top: 0, transform: 'none' });
                    label.css({ opacity: 0 });

                    setTimeout(function() {
                        plug.css({ 'pointer-events': 'none' });
                        $("#line").css({ width: '100%' });
                        label.remove();

                        setTimeout(function() {
                            plug.css({
                                opacity: 0,
                                'will-change': 'auto'
                            });
                            logo_box.css({ 'will-change': 'auto' });
                            circle.css({ 'will-change': 'auto' });
                            helmet.css({ 'will-change': 'auto' });

                            LockScrolling(false, 'RunPreloaderAnimation');
                        }, 250);
                    }, 900);
                }, 2000);
            }, 500);
        }, 750);
    }, 100);
}

function JsonToDOM(json) {
    var elements = document.createDocumentFragment();
    for(var item in json) {
        var item_value = json[item];

        var element;
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

//#region BrowserCheck
function IsFirefox() {
    return ua.indexOf("Firefox") != -1;
}

function IsPresto() {
    return ua.indexOf("Presto") != -1;
}

function IsIE() {
    return ua.indexOf("MSIE") != -1 || ua.indexOf("Edge") != -1 || ua.indexOf(".NET") != -1;
}
//#endregion