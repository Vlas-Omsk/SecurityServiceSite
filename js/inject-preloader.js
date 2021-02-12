document.addEventListener("DOMContentLoaded", function () {
    if (!document.referrer.includes(document.URL)){
        $('<link href="css/preloader.css" rel="stylesheet"/>' + `
        <div id="plug"></div>
        <div id="logo-box">
            <a id="helmet" href="index.html"><img style="height: 100%;" src="media/helmet.svg"/></a>
            <div id="label"></div>
            <div id="circle"></div>
        </div>`).insertAfter("header");

        setTimeout(() => {
            var logo_box = document.getElementById('logo-box');
            var plug = document.getElementById('plug');
            var circle = document.getElementById('circle');
            var helmet = document.getElementById('helmet');
            var label = document.getElementById('label');

            "ЧОП Спарта".split('').forEach(function(item, i) {
                label.innerHTML += `<a class="label-char">${item == ' ' ? '&#160;' : item}</a>`
            });

            circle.style.width = "60vh";
            circle.style.height = "60vh";
            circle.style.borderRadius = "30%";
            circle.style.transform = 'rotateZ(90deg)';

            setTimeout(() => {
                helmet.style.opacity = 1;
                
                circle.style.width = "0";
                circle.style.height = "0";

                setTimeout(() => {
                    Array.prototype.forEach.call(document.getElementsByClassName("label-char"), function(item, i) {
                        item.style.transitionDelay = (i * 50) + 'ms';
                        item.style.transform = 'none';
                    });
                    setTimeout(() => {
                        helmet.style.height = '110px';
                        logo_box.style.top = '0';
                        plug.style.opacity = 0;
                        label.style.opacity = 0;

                        setTimeout(() => {
                            var line = document.getElementById('line');
                            line.style.width = '100%';
                            label.remove();
                        }, 500);
                
                        setTimeout(() => {
                            plug.style.pointerEvents = 'none';
                        }, 500);
                    }, 1000);
                }, 500);
            }, 750);
        }, 1000);
    }
    else
    {
        $('<link href="css/preloader-static.css" rel="stylesheet"/>' + `
        <div id="logo-box">
            <a id="helmet" href="index.html"><img style="height: 100%;" src="media/helmet.svg"/></a>
            <div id="circle"></div>
        </div>`).insertAfter("header");
    }
});