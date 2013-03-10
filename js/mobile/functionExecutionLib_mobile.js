var FunctionExecutionObject = {
	clearAnswers: function(anws) {	//想想能不能直接把 innerHTML 清掉呢
	//opt: 1) 清除问题描述	2) 删除所有答案	3) 重新计时
		$("#question").html("Mr Q:");
		
		var anwserBox = document.getElementById("guysAnswer");
		
		for(var i = 0; i < anws.length; i++) {
			anwserBox.removeChild(anws[i]);
		}
		
		//重新计时
		FunctionExecutionObject.startTimer();
	},
	
	mark: function() {
		//
		var queInput = document.getElementById("queInput");
		if( queInput.value != "" ) {
			$("#question").text("Mr Q: " + queInput.value);
		}
		//手机端简单的打分
	},
	
	addToAnswers: function(answerDatas) {
		for(var i = 0; i< answerDatas.length; i++) {
			var thisAns = answerDatas[i];
			var ansTextNode = document.createTextNode(thisAns.answer);
			var nameTextNode = document.createTextNode(thisAns.name);
			var classTextNode = document.createTextNode(thisAns.class);
			var newAnsP = document.createElement("p");
			var newNameP = document.createElement("p");
			var newClassP = document.createElement("p");
			newAnsP.appendChild(ansTextNode);
			newNameP.appendChild(nameTextNode);
			newClassP.appendChild(classTextNode);
			
			$(newAnsP).addClass("stuAnswer");
			$(newNameP).addClass("stuName");
			$(newClassP).addClass("stuClass");
			//手机版这里去掉了添加头像的代码
			var newAnswerDiv = document.createElement("div");
			$(newAnswerDiv).addClass("aAns");
			newAnswerDiv.appendChild(newClassP);
			newAnswerDiv.appendChild(newNameP);
			newAnswerDiv.appendChild(newAnsP);
					var newClearDiv = document.createElement("div");
					$(newClearDiv).addClass("clearFloat");
					newAnswerDiv.appendChild(newClearDiv);
				
			//如果要打分，改动必须在这里添加...
			var theQuestionBox = document.getElementById("guysAnswer");
			theQuestionBox.appendChild(newAnswerDiv);
		}
	},
	closeAnQuestion: function() {
		FunctionExecutionObject.stopTimer();
		//close data Ajax
		GlobalStatus.collectON = 0;
	},
	startTimer: function() {
		Timer.clear();
		GlobalVariables.timer = setInterval(FunctionExecutionObject.runningTimer, 1000);
	},
	runningTimer: function() {
		Timer.ss += 1;
		if( Timer.ss === 60 ) {
			Timer.mm += 1;
			Timer.ss = 0;
		}
		var TextOfTime = ((Timer.mm < 10) ? "0" :"" )+ Timer.mm + ":" + ((Timer.ss < 10) ? "0" :"" )+ Timer.ss;
		$("#limitTime").text(TextOfTime);
	},
	stopTimer: function() {
		clearInterval(GlobalVariables.timer);
	}
};