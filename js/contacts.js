function funcBefore(){

}

function funcSuccess(data) {
    if(data == "success"){  
        swal("Заявка отправлена!", "", "success", {
            button: "Готово!",
        });
    } else {
        swal("Ошибка. Заявка не отправлена!");
    }
}

//#region Validation
String.prototype.IsValidEmail = function() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this);
};

String.prototype.IsValidPhone = function() {
    ///^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return /^[+]*[\s?0-9]{0,2}[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(this) && this.length > 4;
};

String.prototype.IsValidFIO = function() {
    return this.split(' ').Where(function(elem) { return !isEmpty(elem) }).length >= 3;
};

String.prototype.IsValid = function() {
    return !isEmpty(this) && this.length >= 3;
};
//#endregion

OnDOMContentLoaded(function() {
    var fio =        $("#fio"),
        mail =       $("#mail"),
        card =       $("#card"),
        country =    $("#country"),
        before_job = $("#before_job"),
        phone =      $("#phone");
    
    $(".contacts form p input[type=text]").each(function (_, elem) {
        elem = $(elem);
        elem.on("change paste keyup", function() { elem.removeClass("invalid"); })
    });

    $("#contact_btn").on("click", function() {
        var errors = false;
        if (!mail.val().IsValidEmail())
            errors = !!mail.addClass("invalid");
        if (!fio.val().IsValidFIO())
            errors = !!fio.addClass("invalid");
        if (!phone.val().IsValidPhone())
            errors = !!phone.addClass("invalid");
        if (!card.val().IsValid())
            errors = !!card.addClass("invalid");
        if (!country.val().IsValid())
            errors = !!country.addClass("invalid");
        if (!before_job.val().IsValid())
            errors = !!before_job.addClass("invalid");
        if (errors)
            return; //swal("Заявка не отправлена!", "Пожалуйста, заполните все поля правильно");

        $.ajax({
            url: "http://isilkuladmin.ru/vagine_system.php",
            type: "post",
            data: ({ fio: fio.val(), mail: mail.val(), card: card.val(), country: country.val(), before_job: before_job.val(), phone: phone.val() }),
            dataType: "html",
            beforeSend: funcBefore,
            success: funcSuccess
        });
    });
});