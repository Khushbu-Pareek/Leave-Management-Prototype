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
	isValid ? (window.location = 'employee.html') : alert("Shit!");
}

//Json object with employees details
var oEmployeeInfo = {
	"employees": [{
		"fullName": "Jay Pullur",
		"firstName": "Jay",
		"isManager": 1,
		"isHr": 0,
		"isAdmin": 0,
		"userName": "JayP",
		"pswrd": "pass@123"
	}, {
		"fullName": "Sanjay Sharma",
		"firstName": "Sanjay",
		"isManager": 0,
		"isHr": 0,
		"isAdmin": 0,
		"userName": "SanjayS",
		"pswrd": "pramati123"
	}]
}
