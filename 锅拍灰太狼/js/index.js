/*js*/
$(function () {
	//点击规则
	$(".rules").click(function() {
		$(".rule").stop().fadeIn('100');
	});

	//关闭规则
	$(".close").click(function() {
		$(".rule").stop().fadeOut('100');
	});

	//游戏开始
	$(".start").click(function() {
		$(this).stop().fadeOut('100');
		// 调用处理进度条的方法
		progressHandler();
        // 调用处理灰太狼动画的方法
		startWolfAnimation();
	});

	//重新开始游戏
	$(".reStart").click(function() {
		console.log('restart')
		$(".mask").stop().fadeOut('100');
		// 调用处理进度条的方法
		progressHandler();
        // 调用处理灰太狼动画的方法
		startWolfAnimation();
	});

	//处理进度条的方法
	function progressHandler() {
		$(".progress").css({
			width:180
		});
		var timer = setInterval(function () {
			//进度条当前的宽度
			var progressWidth = $(".progress").width();
			//减少当前的宽度
			progressWidth -= 1;
			$(".progress").css({
				width:progressWidth
			});

			//监督进度条是否走完
			if(progressWidth <= 0){
				clearInterval(timer);
				//重新显示界面
				$(".mask").stop().fadeIn('100');
				stopWolfAnimation();
			}
		},100);
	}



	var wolfTimer;
	//灰太狼动画
	function startWolfAnimation(){
		// 定义两个数组保存所有灰太狼和小灰灰的图片
		var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        // 定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        //创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");

        //随机获取图片的位置
        var posIndex = Math.round(Math.random() * 8);

        //获取图片显示的位置
        $wolfImage.css({
        	position:"absolute",
        	left:arrPos[posIndex].left,
        	top:arrPos[posIndex].top
        });

        //随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        //设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTime = setInterval(function(){
        	if(wolfIndex > wolfIndexEnd){
        		$wolfImage.remove();
        		clearInterval(wolfTime);
        		startWolfAnimation();
        	}

        	$wolfImage.attr("src",wolfType[wolfIndex]);
        	wolfIndex++;
        },300);

        $(".container").append($wolfImage);      

        gameRules($wolfImage); 	
	}

	//处理游戏规则
	function gameRules($wolfImage){
		$wolfImage.one("click",function() {
			window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
			//当前图片地址
			var $src = $(this).attr("src");
			//根据图片地址判断是否是灰太狼
			var flag = $src.indexOf("h") >= 0;
			if(flag){
				$(".score").text(parseInt($(".score").text()) + 10);
			}else{
				$(".score").text(parseInt($(".score").text()) - 10);
			}
		});
	}


	function stopWolfAnimation(){
		$(".wolfImage").remove();
		clearInterval(wolfTime);
	}

})