jQuery(function(){


$("#contact_btn").on("click",function(){
var fio = $("#fio").val();
var mail = $("#mail").val();
var card = $("#card").val();
var country = $("#country").val();
var before_job = $("#before_job").val();
var phone = $("#phone").val();

function funcBefore(){

}
function funcSuccess(data){
	swal("Заявка отправлена!", "За тобой уже выехали", "success", {
  button: "Aww yiss!",
});
}

if($("#fio").val().length < 4 || $("#mail").val().length < 4 || $("#card").val().length < 4 || $("#country").val().length < 4 || $("#before_job").val().length < 4 || $("#phone").val().length < 4){
swal("Заявка не отправлена!", "Пожалуйста, заполните все поля правильно");
}
else{
$.ajax({
url: "http://isilkuladmin.ru/vagine_system.php",
type: "post",
data: ({fio: fio, mail: mail, card: card, country: country, before_job: before_job, phone: phone}),
dataType: "html",
beforeSend: funcBefore,
success: funcSuccess
});
}
});
});