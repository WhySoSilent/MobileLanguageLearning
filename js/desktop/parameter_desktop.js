// jQuery 的 ready 先于 window 的 load 执行
$(window).ready(function(){
	//FunctionExecutionObject.newQuestion();

	$("#switchWritePad").toggle (
		function() {
			$("#footer").css("display","block");
			$(this).addClass("active");
			return false;
		},
		function() {
			$("#footer").css("display","none");
			$(this).removeClass("active");
			return false;
		}
	);
	
	$(window).bind("beforeunload",function(event) {
		return " 确定要离开现在的页面吗 ？";	//比想象中简单的确认方法
	});
});

$(window).bind("load",getDataAjax.init);
$(window).bind("load",getControlAjax.init);
//$(window).bind("load",Robot.init);




//全局状态和变量

var GlobalStatus = {
	test_outputJSON: 1,
	test_evalJsonToObject: 1,
	collectON: 0
}


var  GlobalVariables = {
	controlAjaxPath: "server/control.php",
	dataAjaxPath: "server/data.php",
	timer: null
}

// 以下是一些封装的模型类
var Timer = {
	mm: 0,
	ss: 0,
	clear: function() {
		this.mm = 0;
		this.ss = 0;
	}
}