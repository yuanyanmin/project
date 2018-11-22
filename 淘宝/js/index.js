/*js*/

/*
* backToTop1
*/

$(document).ready(function(){
	$(document).scroll(function(){                    //滚动时触发
		var top = $(document).scrollTop();            //获取滚动条到顶部的垂直高度
		var height = $(window).height();              //获得可视浏览器的高度
		if(top > 100){
			$('#backtoTop1').show(200,function(){
				$('#backtoTop1').css({
					top : height + top - 100
				});
			});
		}
	});

	/*点击回到顶部*/
	$('#backtoTop-up').click(function() {
		/* Act on the event */
		$('html,body').animate({
			scrollTop:0
		},500);
	});

	/*点击回到底部*/
	$('#backtoTop-down').click(function() {
		/* Act on the event */
		$('html,body').animate({
			scrollTop:$(document).height()
		},500);
	});
});

/*
* 下拉框
*/

(function(){
	var num = 0;
	$('[data-toggle=arrowdown]').hover(function(){
		var _id = $(this).attr('id');
		num = _id.substring(5,_id.length);
		$(this).find('span')
				.removeClass('run-down')
				.addClass('run-up');
		$('#nav-box'+num).slideDown(500);
	},function(){
		$(this).find('span')
				.removeClass('run-up')
				.addClass('run-down');
		$('#nav-box'+num).hide();
	});

	$('[data-toggle=hidden-box]').hover(function(){
		var _id = $(this).attr('id');
		num = _id.substring(7,_id.length);
		$(this).addClass('nav-hover')
			.find('span')
			.removeClass('run-down')
			.addClass('run-up');
		$("#nav-box"+num).show();
	},function(){
		$(this).removeClass('nav-hover')
			.find('span')
			.removeClass('run-up')
			.addClass('run-down');
		$("#nav-box"+num).slideUp(500);
	});
})(jQuery);


//search-box
(function(){
	$('.search-box').hover(function(){
		$(this).find('span')
			.addClass('down-icon-circle').css({
				background:'#f50 url(img/arrow-white.png) no-repeat center center'
		});
	},function(){
		$(this).find('span')
			.removeClass('down-icon-circle').css({
				background:''
			});
	});
})(jQuery);

//滚动出现固定导航
(function(){
	$(window).scroll(function() {
		/* Act on the event */
		var scTop = $(window).scrollTop(),
			$scS = $('.scroll-search'),
			$frS = $('.fix-right-sub'),
			rW;
		rW = ($(window).width() - 1190) / 2;

		scTop >= 200 ? $scS.slideDown(500) : $scS.slideUp(500);

		if(scTop >= 2700 && scTop < 4400){
			$frS.css({
				position:'fixed',
				top:'-541px',
				right:rW,
				marginTop:''
			});
		}else if(scTop >= 4400){
			$frS.css({
				position:'',
				marginTop:1728
			});
		}else{
			$frS.css({
				position:''
			});
		}
	});
})(jQuery);

//关二维码
(function(){
	$('.close-code').click(function(event) {
		/* Act on the event */
		$('.two-code').fadeOut(500);
	});
})();

//product-box
(function(){
	$('.product-box').hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).css({
			zIndex:3
		});
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$(this).css({
			zIndex:''
		});
	});
})();

//product-show
(function(){
	$('.product-box').hover(function(){
		$(this).find('.share-weitao').fadeIn(500);
	},function(){
		$(this).find('.share-weitao').fadeOut(500);
	});
})();

//service
(function(){
	$('.service-cell').hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).children('.service-i').find('img').animate({
			marginTop:'-10px'
		},500);
		$(this).children('.service-i').find('img').animate({
			marginTop: '6px'
		},500);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		return false;
	});
})();

//service-cell
(function(){
	$('.service-cell[id]').hover(function(){
		var _id,num;

		_id = $(this).attr('id');
		num = _id.substring(8,_id.length);

		$('.service-box').css({
			bottom:-50
		}).hide();

		$('#service-box-'+num).show().animate({
			bottom:0
		},500);

		$('.service-cell[id]').css({
			borderBottomBorder:''
		});

		$('this').css({
			borderBottomBorder:'#fff'
		})
	},function(){

	});
})();


//close-service
(function(){
	$('.service-head > .fa-times').click(function(event) {
		$('.service-box').fadeOut(500);
	});
})();

//dynamic
(function(){
	$('.dynamic').hover(function() {
		/* Stuff to do when the mouse enters the element */
		$(this).find('.follow').fadeIn(500);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$(this).find('.follow').fadeOut(500);
	});
})();

//more-btn
(function(){
	var flag = 1;
	$('.more-btn').click(function(event) {
		/* Act on the event */
		if(flag){
			$(this).css({
				background:'#f40 url(img/up.png) no-repeat 90% center'
			});
			$('.sub-nav').css({
				height:'145px'
			});
			flag = 0;
		}else{
			$('.sub-nav').css({
				height:''
			});
			$(this).css({
				background:''
			});
			flag = 1;
		}
	});
})();

//my-card
(function(){
	$('.arrow-right').click(function(event) {
		/* Act on the event */
		$('.card-info ul').animate({
			marginLeft: '-205px'
		},500);
	});
	$('.arrow-left').click(function(event) {
		/* Act on the event */
		$('.card-info ul').animate({
			marginLeft: '0'
		},500);
	});
})();

//msg-close
(function(){
	$('.close-msg').click(function(event) {
		/* Act on the event */
		$('.read-info').css({
			textAlign:'center'
		}).html('还没有新消息...');
	});
})();

//tab-nav
(function(){
	$('.li-nav').hover(function() {
		var _id,num;

		_id = $(this).attr('id');
		num = _id.substring(3,_id.length);

		$('.li-nav').removeClass('li-nav-hover');
		$('.hiddenBox').hide();
		$('#box-'+num).fadeIn(500);
	}, function() {
		$(this).addClass('li-nav-hover');
	});
})();

//hidden-title
(function(){
	$('.hidden-title > a').hover(function(){
		$(this).next().css({
			color:'#f40'
		});
	},function(){
		$(this).next().css({
			color:''
		})
	});
})();

//sidebar

(function(){
	var scTop = 0,
		beginH = 138,
		wW = $(window).width(),
		classN,
		num;

	$(window).scroll(function(){
		scTop = $(window).scrollTop();
		beginH = 138;
		switch(scTop){
			case 600: beginH -= 45;break;
			case 500: beginH -= 50;break;
			case 400: beginH -= 55;break;
			case 300: beginH -= 60;break;
			default : beginH = 138;break;
		}
	});

	$('.side-li > li').hover(function(){
		$(this).find('h3').css({border:'none'})
			.end().find('span').css({color:'#f40'});

		classN = $(this).attr('class');
		num = classN.substring(2,classN.length);

		switch (scTop){
            case 0: if(num > 14){ beginH += 120}else if(num >= 12){beginH += 41}; break;
            case 100: if(num == 1){beginH -= 27}else if(num == 16){beginH += 7}; break;
            case 200: num < 5 ? beginH -= 60 : beginH -= 30; break;
            case 300: num < 8 ? beginH -= 60 : beginH -= 40; break;
            case 400: num <= 11 ? beginH -= 50 : beginH += 10; break;
            case 500: num < 14 ? beginH -= 50 : ''; break;
            case 600: num <= 16 ? beginH -= 50 : ''; break;
            default : beginH = 138;break;
        }

        $('.hiden-box').show()
        	.css({
        		left:((wW-1190) / 2 + 149),
        		top : beginH
        	}).animate({width:'729px'}, 300);

        $('.hiden-box > li').hide();
        $('#hiden-'+num).fadeIn(500);
        beginH = 138;	
	},function(){
		$('this').find('h3').css({border:''})
			.end().find('span').css({color:''});
		$('.hiden-box').hide().css({width:'0'});
	});

	$('.hiden-box').hover(function(){
		$('.s_'+num).css({
			border: '1px solid #f40',
            borderRight: '1px solid #fff'
		}).find('h3').css({
			border:'none'
		}).end().find('span').css({
			color: '#f40'
		});
		$(this).show().css({
			width:'729px'
		});
	},function(){
		$('.s_'+num).css({
			border:'',
			borderRight:''
		}).find('h3').css({
			border:''
		}).end().find('span').css({
			color:''
		});

		$(this).animate({width:0}, 200).hide(500);
	});
})();

