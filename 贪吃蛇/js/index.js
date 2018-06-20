//自调用函数---食物的
(function(){
	var elements = [];   //用来保存每个小方块食物的

	function Food(x,y,width,height,color){
		this.x = x;
		this.y = y;
		this.width = width || 20;
		this.height = height || 20;
		this.color = color || "green";
	}

	//为原型添加初始化方法(在页面上显示食物)
	Food.prototype.init = function(map){
		//先删除食物
		remove();

		var div = document.createElement('div');
		map.appendChild(div);

		//设置div样式
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
		div.style.position = "absolute";

		//随机产生横纵坐标
		this.x = parseInt(Math.random()*(map.offsetWidth/this.width)) * this.width;
		this.y = parseInt(Math.random()*(map.offsetHeight/this.height)) * this.height;

		div.style.top = this.y + 'px';
		div.style.left = this.x + 'px';

		//将div加入到数组elements中
		elements.push(div);
	}

	//私有函数--删除食物
	function remove(){
		for(var i = 0;i<elements.length;i++){
			var ele = elements[i];
			//找到子元素的父元素，删除子元素
			ele.parentNode.removeChild(ele);
			//把elements中子元素删掉
			elements.splice(i,1);
		}
	}

	window.Food = Food;
}());


//自调用函数---小蛇
(function(){
	var elements = [];
	//小蛇的构造函数
	function Snake(width,height,direction){
		//蛇的每个部分的宽
		this.width = width || 20;
		this.height = height || 20;

		this.direction = direction || "right";

        //小蛇的身体
		this.body=[
			{x:3,y:2,color:"red"},
			{x:2,y:2,color:"orange"},
			{x:1,y:2,color:"orange"}
		];	
	}

	//为原型添加方法---小蛇初始化方法
	Snake.prototype.init = function(map){
		//先删除小蛇
		remove();
		//循环遍历div
		for(var i = 0;i<this.body.length;i++){
			var obj = this.body[i];
			var div = document.createElement("div");
			map.appendChild(div);

			div.style.position = 'absolute';
			div.style.width = this.width + "px";
			div.style.height = this.height + 'px';
			div.style.left = obj.x * this.width + "px";
			div.style.top = obj.y * this.height + 'px';
			div.style.backgroundColor = obj.color;

			elements.push(div);
		}
	}

	//为原型添加方法---小蛇动起来
	Snake.prototype.move = function(food,map){
		//改变小蛇身体的坐标移动
		var i = this.body.length - 1;
		for(;i>0;i--){
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		//判断方向--改变小蛇的头的坐标位置
		switch(this.direction){
			case "right":
				this.body[0].x += 1;
				break;
			case "left":
				this.body[0].x -= 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}

		//判断又没用吃到食物
		var headX = this.body[0].x * this.width;
		var headY = this.body[0].y * this.height;

		var foodX = food.x;
		var foodY = food.y;

		if(headX == foodX && headY == foodY){
			//获取小蛇的尾巴
			var last = this.body[this.body.length - 1];
			//复制蛇尾，加入到body中
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			});

			//食物删除，重新初始化
			food.init(map); 
		}
	}

	//删除小蛇的私有函数
	function remove(){
		var i = elements.length - 1;
		for(;i>=0;i--){
			var ele = elements[i];
			ele.parentNode.removeChild(ele);
			elements.splice(i,1);
		}
	}
	window.Snake = Snake;
}());

//自调 用函数---游戏对象
(function(){
	//游戏的构造函数
	function Game(map){
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}

	Game.prototype.init = function(){
		//食物初始化
		this.food.init(this.map);
		//小蛇初始化
		this.snake.init(this.map);

		//调用小蛇自移动的方法
		this.runSnake(this.food,this.map);

		//调用按键方法
		this.bindKey();
		//小蛇移动
		// this.snakel.move(this.food,this.map);
		// this.snake.init(this.map);

		// setInterval(function(){
		// 	that.snake.move(that.food,that.map);
		// 	that.snake.init(that.map);
		// },150);
	}

	//设置小蛇可以自动的跑起来
	Game.prototype.runSnake = function(food,map){
		//自动的去移动
		var timer = setInterval(function(){
			this.snake.move(food,map);
			this.snake.init(map);

			//横纵坐标的最大值
			var maxX = map.offsetWidth / this.snake.width;
			var maxY = map.offsetHeight / this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			if(headX < 0 || headX >= maxX){
				clearInterval(timer);
				alert('Game Over');
			}
			if(headY < 0 || headY >= maxY){
				clearInterval(timer);
				alert('Game Over');
			}

		}.bind(that),150);
	}

	//用户按键
	Game.prototype.bindKey = function () {
		document.addEventListener("keydown",function (e) {
			switch (e.keyCode){
				case 37:
					this.snake.direction = "left";
					break;
				case 38:
					this.snake.direction = "top";
					break;
				case 39:
					this.snake.direction = "right";
					break;
				case 40:
					this.snake.direction = "bottom";
					break;
			}
		}.bind(that),false);
	};
	window.Game = Game;
	
}());
 
var fd = new Food();
fd.init(document.querySelector(".map"));

var snake = new Snake();

snake.init(document.querySelector(".map"));  //先在地图上看到小蛇

var gm = new Game(document.querySelector(".map"));
gm.init();

/*setInterval(function(){
	snake.move(fd,document.querySelector(".map"));
	snake.init(document.querySelector(".map"));
},150);*/

/*
snake.move(fd,document.querySelector(".map"));   //走一步
snake.init(document.querySelector(".map"));    //初始化---重新化---先删除之前的，把现在的小蛇显示。

snake.move(fd,document.querySelector(".map"));
snake.init(document.querySelector(".map"));

snake.move(fd,document.querySelector(".map"));
snake.init(document.querySelector(".map"));

snake.move(fd,document.querySelector(".map"));
snake.init(document.querySelector(".map"));
*/