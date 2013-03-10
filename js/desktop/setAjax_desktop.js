//	Version: Desktop 0.1.2 DEV
	// 0.1.2	移除了 Core 脚本
var getDataAjax = {};
getDataAjax.init = function() {
	function getStudentAnswer() {
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.dataAjaxPath,
		   data: "model=desktop",
		   cache: false,
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1) {	//testing...
					$("#question").html("in data Success " + JSON);
					setTimeout(function(){	$("#question").html("---");	},3000);
				}
				if( GlobalStatus.test_evalJsonToObject == 1) {
					var Anss = eval ("(" + JSON + ")");
					FunctionExecutionObject.addToAnswers(Anss.anss);
				}
			}
		});
		setTimeout(getStudentAnswer,2*1000);
	}
	getStudentAnswer();
}

var getControlAjax = {};
getControlAjax.init = function() {

	function whitchCode(optJSON) {
		if(optJSON.opt == "mark")	{
			FunctionExecutionObject.daFen(optJSON);
		}
		if(optJSON.opt == "outStanding") {
			FunctionExecutionObject.outstandingDisplay(optJSON) ;
		}
		if(optJSON.opt == "newQuestion") {
			//$("#RobotMrQ").css("background-image","url(../../images/desktop/mrQWork.gif)");
			FunctionExecutionObject.newQuestion();
		}
		if(optJSON.opt == "collectClose") {
			FunctionExecutionObject.closeAnQuestion();
		}
	}
	
	function getControlCode() {
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   data: "model=desktop",
		   cache: false,
		   success: function(whatShouldIDo){
				if( GlobalStatus.test_outputJSON == 1) {	//testing...
					$("#question").html("in success" + whatShouldIDo);
					setTimeout(function(){	$("#question").html("---");	},3000);
				}
				if( GlobalStatus.test_evalJsonToObject == 1) {
					var optJSON = eval ("(" + whatShouldIDo + ")");
					whitchCode(optJSON);
					//alert("control option infos is:" + whatShouldIDo);
				}
			}
		});
		setTimeout(getControlCode,2*1000);
	}
	getControlCode();
}

