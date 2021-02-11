document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        var logo_box = document.getElementById('logo-box');
        var plug = document.getElementById('plug');
        logo_box.style.height = '110px';
        logo_box.style.top = '0';
        plug.style.opacity = 0;

        setTimeout(() => {
            var line = document.getElementById('line');
            line.style.width = '100%';
        }, 500);

        setTimeout(() => {
            plug.style.pointerEvents = 'none';
        }, 500);
    }, 1000);
});