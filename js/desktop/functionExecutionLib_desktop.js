//	Version: Desktop 0.1.2 DEV
	// 0.1.2	移除了 Core 脚本
var FunctionExecutionObject = {
	daFen: function(markJSON) {
		var question = markJSON.Q;
		var answer = markJSON.A;
		if(question != "") {
			$("#question").text(question);
		}
		//alert("Beginng Mark: question:" + question + " ;answer:" + answer +";");
	},
	outstandingDisplay: function(outstandingJSON) {
		var optId = outstandingJSON.id;
		
		alert("outstanding display the student whitch id is :" + optId);
	},
	newQuestion: function() {
		//认为是，javascript 靠几个主要的 id 属性寻找操作的锚点，向里面插入收集到的答案。换一道新的问题重新收集答案意味着把现有数据当成老数据样式化，创建新的答案收集容器并为之添上 id 锚点，但一个页面同id的元素只许一个，所以要移除以前的锚点，以下是通过把 id 属性转换到 class 实现的。这样也为 CSS 文件里对新老数据样式化提供了一种寻找差异的方法
		var content = document.getElementById("content");
		var thisQuesAnswer = document.getElementById("guysAnswer");
		var questionNow = document.getElementById("aQuestion");
		
		$("#RobotMrQ").attr("id","");	//简单的移除机器人Q先生的id
		
				var question = document.getElementById("question");
				var limitTime = document.getElementById("limitTime");
				$(question).addClass("question");	//add class
				$(limitTime).addClass("limitTime");
				$(question).attr("id","");		//remove id
				$(limitTime).attr("id","");	
		
		$(questionNow).addClass("oldQuestion");
		$(thisQuesAnswer).addClass("guysAnswer");
		
		$(thisQuesAnswer).attr("id","");	//remove id
		
		content.insertBefore(FunctionExecutionObject.creatAQuestion(),questionNow);
		$(questionNow).attr("id","");	//remove id
		
		//更新计时器状态
		GlobalStatus.collectON = 0;
		FunctionExecutionObject.startTimer();
		//启动Q先生
	},
	creatAQuestion: function() {
		//注意以下的缩进描述了添加的层次关系
		var aQuestion = document.createElement("div");
		$(aQuestion).attr("id","aQuestion");

			var mrQ = document.createElement("div");
			$(mrQ).addClass("mrQ");
				
				var robot = document.createElement("div");
				$(robot).attr("id","RobotMrQ");
				
				var question = document.createElement("h2");
				$(question).attr("id","question");
					var questionText = document.createTextNode("Give me an answer~");
					question.appendChild(questionText);

				var limitTime = document.createElement("h2");
				$(limitTime).attr("id","limitTime");
					var limitTimeText = document.createTextNode("00:00");
					limitTime.appendChild(limitTimeText);

				var clearFloat = document.createElement("div");
				$(clearFloat).addClass("clearFloat");
				
				mrQ.appendChild(robot);
				mrQ.appendChild(question);
				mrQ.appendChild(limitTime);
				mrQ.appendChild(clearFloat);

			var guysAnswer = document.createElement("div");
			$(guysAnswer).attr("id","guysAnswer");
			
			aQuestion.appendChild(mrQ);
			aQuestion.appendChild(guysAnswer);
			
		return aQuestion;
	},
	addToAnswers: function(answerDatas) {
		for(var i = 0; i< answerDatas.length; i++) {
			var thisAns = answerDatas[i];
			var ansTextNode = document.createTextNode(thisAns.answer);
			var nameTextNode = document.createTextNode(thisAns.name);
			var classTextNode = document.createTextNode(thisAns["class"]);
			var newAnsP = document.createElement("p");
			var newNameP = document.createElement("p");
			var newClassP = document.createElement("p");
			newAnsP.appendChild(ansTextNode);
			newNameP.appendChild(nameTextNode);
			newClassP.appendChild(classTextNode);
			
			$(newAnsP).addClass("stuAnswer");
			$(newNameP).addClass("stuName");
			$(newClassP).addClass("stuClass");
			
			//以下代码添加头像
			var newAvatarImage = document.createElement("img");
			$(newAvatarImage).addClass("avatar");
			$(newAvatarImage).attr("src","images/desktop/default_boy.jpg");
			
			var newAnswerDiv = document.createElement("div");
			$(newAnswerDiv).addClass("aAns");
			newAnswerDiv.appendChild(newAvatarImage);
			newAnswerDiv.appendChild(newAnsP);
			newAnswerDiv.appendChild(newClassP);
			newAnswerDiv.appendChild(newNameP);
			
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
		//stop Robot Mr Q
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
}