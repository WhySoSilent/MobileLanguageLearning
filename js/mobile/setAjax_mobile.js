//	Version: Mobile 0.1.1 DEV
	// 0.1.1	改写：收到的 JSON 变成了学生回答的数组
var getData_Ajax = {};
getData_Ajax.init = function() {
	function getStudentAnswer() {
		$.ajax({
		   type: "POST",
		   url: GlobalVariables.dataAjaxPath,
		   cache: false,
		   data: "model=mobile",
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	//testing...
				{
					$("#testArea3").html(JSON);
					setTimeout(function(){	$("#testArea3").html("---");	},1000);
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var Anss = eval ("(" + JSON + ")");
					//是不是要判断一下 aAns 对象存不存在？？
					FunctionExecutionObject.addToAnswers(Anss.anss);
				}
			}
		});
		setTimeout(getStudentAnswer,2*1000);
	}
	getStudentAnswer();
}

var sendControlAjax = {};
sendControlAjax.init = function() {
	$( "#mark" ).click( function(event){
							var inputQue = document.getElementById("queInput");
							var inputAns = document.getElementById("ansInput");
							if(inputQue.value == "" && inputAns.value == "") {
								return;
							}
							var markParameter ="mark=1&Q=" +inputQue.value+ "&A=" + inputAns.value ;
							
							$.ajax({
							   type: "POST",
							   url: GlobalVariables.controlAjaxPath,
							   cache: false,
							   data: markParameter,
							   success: function(JSON){
									if( GlobalStatus.test_outputJSON == 1)	//testing...
									{
										$("#testArea3").html(JSON);
										setTimeout(function(){	$("#testArea3").html("---");	},1000);
									}
									if( GlobalStatus.test_evalJsonToObject == 1)
									{
										var returnObject = eval ("(" + JSON + ")");
										//alert("mark return:" + returnObject.get);
									}
								}
							});
							
							$("#testArea2").html("send...");
							setTimeout(function(){$("#testArea2").html("---");},500);
							
							FunctionExecutionObject.mark();
						} );


	$( "#toggleswitch" ).bind( "change", function(event, ui) {
		var OCswitch = document.getElementById("toggleswitch" );
		if(OCswitch.options[0].selected) {		//收集开关关闭时动作
			$.ajax({
			   type: "POST",
			   url: GlobalVariables.controlAjaxPath,
			   data: "collect=0",
			   cache: false,
			   success: function(JSON){
					if( GlobalStatus.test_outputJSON == 1) {	//testing......
						$("#testArea3").html(JSON);
						setTimeout(function(){	$("#testArea3").html("---");	},1000);
					}
					if( GlobalStatus.test_evalJsonToObject == 1)
					{
						var returnObject = eval ("(" + JSON + ")");
						//alert("collect close return:" + returnObject.get);
					}
				}
			});
			$("#testArea").html("collect close");
			FunctionExecutionObject.stopTimer();		//因为暂时还没有超时重发机制，对计时器的停止先放在这里
		}
		if(OCswitch.options[1].selected) {		//收集开关打开时动作
			var anws = $(".aAns");	
			//Ajax 告知服务器‘新问题提出’前要把现有的学生答案们取出，要是在服务器返回“收到”后执行这一步，怕把新来的数据也删了
			//要是能开关打开以后请求数据的 Ajax 才开始工作，就可以不用考虑这个问题，在你删完后  Ajax 才开始工作，服务器会帮你把数据先压着
			$.ajax({
			   type: "POST",
			   url: GlobalVariables.controlAjaxPath,
			   data: "collect=1",
			   cache: false,
			   success: function(JSON){
					
					if( GlobalStatus.test_outputJSON == 1) {	//testing......
						$("#testArea3").html(JSON);
						setTimeout(function(){	$("#testArea3").html("---");	},1000);
					}
					if( GlobalStatus.test_evalJsonToObject == 1)
					{
						var returnObject = eval ("(" + JSON + ")");	
						if(returnObject.get == "ok") {
							//FunctionExecutionObject.clearAnswers(anws);	//确保服务器正确收到才执行
						}
						//alert("collect open return:" + returnObject.get);
					}
				}
			});
			$("#testArea").html("collect open");
			document.getElementById("queInput" ).value = "";
			document.getElementById("ansInput" ).value = "";
			FunctionExecutionObject.clearAnswers(anws);		//测试完这句要移除ttttttttttttttttttttttttttttttttt
		}
	});
	
}

var DynchronizingServerStatus = {};
DynchronizingServerStatus.init = function() {
	$.ajax({
		   type: "POST",
		   url: GlobalVariables.controlAjaxPath,
		   data: "model=mobile&pageLoad=1",
		   cache: false,
		   success: function(JSON){
				if( GlobalStatus.test_outputJSON == 1)	//testing...
				{
					$("#testArea3").html("in success" + JSON);
					setTimeout(function(){	$("#testArea3").html("---");	},3000);
				}
				if( GlobalStatus.test_evalJsonToObject == 1)
				{
					var serverCollectStatus = eval ("(" + JSON + ")");
					if(serverCollectStatus.collectStatus === 1 ) {
						//状态错误，须同步回来！
						//..............................................................
						//要开启开关 计时？？
					}
				}
			}
	});
	//暂时发送一次状态同步请求
}
/* ***********************************************************************************************************************
 *	DEV Document
 *
 *	移动端发出控制JSON,相比PC页面去掉了监控控制的部分，发出的操作成功就会触发手机端自己的动作，控制信号不会从服务器端绕一圈
 *
 *
 *
 */