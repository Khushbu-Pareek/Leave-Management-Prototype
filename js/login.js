$( document ).ready(function() {
    bindEvents();
});

function bindEvents() {
	$(".loginBtn").on("click", function(e) {
		e.preventDefault();
		loginValidation();
		return false;
	});
}

function loginValidation() {
	var i=0, isValid = false;
	for (i in oEmployeeInfo.employees) {
		if ($("#userName").val() == oEmployeeInfo.employees[i].userName && $("#password").val() == oEmployeeInfo.employees[i].pswrd) {
			isValid = true;
			break;
		}				
	}
	isValid ? (window.location = 'employee.html?id=' + oEmployeeInfo.employees[i].flagType) : 
	alert("Please enter valid username and password!");
}

//Json object with employees details
var oEmployeeInfo = {
	"employees": [{
		"fullName": "Jay Pullur",
		"firstName": "Jay",
		"flagType": 1, //1 means manager
		"userName": "JayP",
		"pswrd": "pass@123"
	}, {
		"fullName": "Sanjay Sharma",
		"firstName": "Sanjay",
		"flagType": 0, //0 means employee
		"userName": "SanjayS",
		"pswrd": "pramati123"
	}]
}
