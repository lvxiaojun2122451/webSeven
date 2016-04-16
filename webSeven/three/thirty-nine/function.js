// JavaScript Document
/*
1 , 获取元素的属性。 
	利用的computedStyle和currentStyle
	computedStyle()这个方法是获取元素属性的集合 -- 数据的格式类似于json
	currentStyle这个属性是IE下面的，也是获取元素样式的集合 --数据格式类似于json
*/
function css( obj , str ){ 
	return obj.currentStyle ? obj.currentStyle[str] : getComputedStyle(obj)[str];
}

/* 
2 , 给元素绑定事件
	addEventListener是给标准浏览器下绑定事件  其实的false是代表是否捕获的意思。（捕获相当于冒泡）
	attachEvent 是为了兼容IE6 7 8 
*/
function band( obj , ev , fn ){ 
	return obj.addEventListener ? obj.addEventListener( ev , fn , false ) : obj.attachEvent( 'on' + ev , fn );
};

/* 
3 , animate
*/
function animate( obj , json , date , fx , fn ){ 
	var iCur = {} , off = true , startTime = ( new Date() ).getTime() ;
	for( var attr in json ){ 
		if( attr === 'opacity' ){ 
			iCur[attr] = Math.round( css( obj , 'opacity') * 100 );
		}else{ 
			iCur[attr] = parseInt( css( obj , attr ) ); 
		}
	}
	clearInterval( obj.timer );
	obj.timer = setInterval(function(){
		
		var changeTime = ( new Date() ).getTime();
		var t = date - Math.max( 0 , ( startTime - changeTime + date ) );
		for(var attr in json){ 
						
			var value = Tween[fx]( t , iCur[attr] , ( json[attr] - iCur[attr] ) , date );
			
			if( attr === 'opacity' ){ 
				obj.style.opacity = value/100;
				obj.style.fliter = 'alpha(opacity='+value+')'
			}else{ 
				obj.style[attr] = value + 'px';
			}		
		
		};
		if( t === date){
			off = true; 
			clearInterval( obj.timer );
			fn && fn.call( obj );
		}	
	
	},13);
};


/* 
4 , 获取浏览器的宽高
	利用de是document.documentElement.client
*/
function viewWindow( str ){ 
	if( str === 'width' ){ 
		return document.documentElement.clientWidth;
	}else if( str === 'height' ){ 
		return document.documentElement.clientHeight;
	}else{ 
		return alert('错了错了')
	}
};

/* 
5 , 设置元素的属性
	利用json
*/
function setStyle(obj , json){ 
	for( var attr in json){ 
		return obj.style[attr] = json[attr];
	};
};

/* 
6 , 获取class
*/
function getByClass(id,tagName,className)
{ 
	var iClass = id.getElementsByTagName(tagName);
	var arr = [];
	
	for(var i=0; i<iClass.length; i++)
	{ 
		var ccc = iClass[i].className.split(' ');
		for(var j=0; j<ccc.length; j++)
		{ 
			if(ccc[j] == className)
			{ 
				arr.push(iClass[i]);
				break;
			};
		};
	};
	
	return arr;
};

function aqiSort( arr , blrean ){ 
	
	if( arr.length <= 1){
		return arr;
	};
	var str = '';
	for( var i=0; i<arr.length; i++ ){ 
		str += arr[i] + '|';
	};
	var b = str.split('|');
	b.pop(1);
	var index = Math.floor(b.length/2);
	var num = parseInt( b.splice( index , 1 )[0] );
	var left = [];
	var right = [];
	for( var i=0; i<b.length; i++ ){ 
		if( b[i] < num ){ 
			left.push( parseInt( b[i] ) )	
		}else{ 
			right.push( parseInt( b[i] ) )
		};
	};
	return blrean ? aqiSort(left , blrean).concat( [num] , aqiSort(right , blrean) ) : aqiSort(right , blrean).concat( [num] , aqiSort(left , blrean) ) 
};




















//Tween算法
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};