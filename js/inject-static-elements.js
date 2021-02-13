const addbegin = `
<!--#region header-->
<header>
    <ul>
        <li>
            <a class="js-button" overlay-id="anal">Наши услуги</a>
        </li>
        <li>
            <a href="documents.html">Наши документы</a>
        </li>
        <li>
            <a href="price.html">Цены на услуги</a>
        </li>
        <li>
            <a href="feedback.html">Отзывы</a>
        </li>
        <li>
            <a href="job.html">Вакансия</a>
        </li>
        <li>
            <a class="js-button" overlay-id="campaign">Контакты</a>
        </li>
    </ul>
</header>
<div class="logo">
    <div id="line"></div>
</div>
<!--#endregion-->`;

const addend = `
<!--#region popups-->
<div class="overlay" overlay-id="campaign">
    <div class="popup">
        <h2>Мы всегда на связи!</h2>
        <b class="phone_call" data-call="more_anal" title="Нажми для вызова">8 3462 58-25-40</b> - Многоканальный <br/> 
        <b class="phone_call" data-call="director_anal" title="Нажми для вызова">8 982 567-68-70</b> – Генеральный директор <br/>
        Почта: <b>sparta3462@mail.ru</b>
        <hr/>
        <h2>Как нас найти:</h2>
        <p>628400 Сургут ул. 30 лет Победы д. 66 оф.3.3</p>
        <div id="map_gandonchir">
        <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4c666137a789879324855a25fe39b7165bb84d5b038e753664468339a2d47cb0&amp;width=320&amp;height=240&amp;lang=ru_RU&amp;scroll=true"></script>
        </div>
        <div class="close-popup"></div>
    </div>
</div>

<div class="overlay" overlay-id="anal">
    <div class="popup">
        <h2>Наши услуги</h2>
        <hr/>
        <ul>
            <li class="menu_li"><a href="" class="menu_a">Физическая охрана</a></li>
            <li class="menu_li"><a href="" class="menu_a">Пультовая охрана</a></li>
            <li class="menu_li"><a href="" class="menu_a">Система видеонаблюдения</a></li>
            <li class="menu_li"><a href="" class="menu_a">Охрано-пожарной система</a></li>
            <li class="menu_li"><a href="" class="menu_a">Инкассация</a></li>
            <li class="menu_li"><a href="" class="menu_a">Полиграф детектор лжи</a></li>
        </ul>
    
        <div class="close-popup"></div>
    </div>
</div>
<!--#endregion-->`;

document.addEventListener("DOMContentLoaded", function () {
    var body = $(document.body);
    body.prepend(addbegin);
    body.append(addend);

    if (!document.referrer.includes(document.URL)){
        $(`<div id="plug"></div>
        <div id="logo-box">
            <a id="helmet" href="index.html"><img style="height: 100%;" src="media/helmet.svg"/></a>
            <div id="label"></div>
            <div id="circle"></div>
        </div>`).insertAfter("header");

        RunPreloaderAnimation();
    }
    else
    {
        $(`<link href="css/preloader-static.css" rel="stylesheet"/>
        <div id="logo-box">
            <a id="helmet" href="index.html"><img style="height: 100%;" src="media/helmet.svg"/></a>
            <div id="circle"></div>
        </div>`).insertAfter("header");
    }
});

async function RunPreloaderAnimation() {
    var logo_box = document.getElementById('logo-box');
    var plug = document.getElementById('plug');
    var circle = document.getElementById('circle');
    var helmet = document.getElementById('helmet');
    var label = document.getElementById('label');

    "ЧОП Спарта".split('').forEach(function(item, i) {
        label.innerHTML += `<a class="label-char">${item == ' ' ? '&#160;' : item}</a>`
    });

    await sleep(1000);

    circle.style.width = "60vh";
    circle.style.height = "60vh";
    circle.style.borderRadius = "30%";
    circle.style.transform = 'rotateZ(90deg)';

    await sleep(750);

    helmet.style.opacity = 1;
    circle.style.width = "0";
    circle.style.height = "0";
    circle.style.borderRadius = "0";

    await sleep(500);

    Array.prototype.forEach.call(document.getElementsByClassName("label-char"), function(item, i) {
        item.style.transitionDelay = (i * 50) + 'ms';
        item.style.transform = 'none';
    });

    await sleep(1000);

    helmet.style.height = '110px';
    logo_box.style.top = '0';
    label.style.opacity = 0;

    await sleep(500);

    plug.style.pointerEvents = 'none';
    var line = document.getElementById('line');
    line.style.width = '100%';
    label.remove();

    await sleep(250);

    plug.style.opacity = 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}