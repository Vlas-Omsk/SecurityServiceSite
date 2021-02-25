const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

Array.prototype.forEach.call(accordionItemHeaders, function(accordionItemHeader) {
    accordionItemHeader.addEventListener("click", function(event) {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.height = accordionItemBody.scrollHeight + "px";
            setTimeout(function() {
                accordionItemBody.style.height = 'auto';
            }, 200);
        } else {
            var rect = accordionItemBody.getBoundingClientRect();
            accordionItemBody.style.height = rect.height + 'px';
            setTimeout(function() {
                accordionItemBody.style.height = 0;
            }, 10);
        }
    });
});