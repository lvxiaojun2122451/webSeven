// JavaScript Document
/*
1 , 获取元素的属性。 
	利用的computedStyle和currentStyle
	computedStyle()这个方法是获取元素属性的集合 -- 数据的格式类似于json
	currentStyle这个属性是IE下面的，也是获取元素样式的集合 --数据格式类似于json
*/
function css( obj , str ){ 
	return obj.currentStyle ? obj.currentStyle[str] : getComputedStyle( obj )[str];
}

/* 
2 , 给元素绑定事件
	addEventListener是给标准浏览器下绑定事件  其实的false是代表是否捕获的意思。（捕获相当于冒泡）
	attachEvent 是为了兼容IE6 7 8 
*/
function addEvent( obj , ev , fn ){
	if( typeof obj != 'object' || typeof fn != 'function') return;  
	return obj.addEventListener ? obj.addEventListener( ev , fn , false ) : obj.attachEvent( 'on' + ev , function (){ fn.call( obj ,arguments) } );
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
		return document.documentElement.clientWidth || document.body.clientWidth;
	}else if( str === 'height' ){ 
		return document.documentElement.clientHeight || document.body.clientHeight;
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
	利用正则匹配  看当前class前后是否是独立的。
*/
function getByClass( parent , obj , setClass ){ 
	var arr = [] , tagName = parent.getElementsByTagName( obj ) , re = new RegExp( '\\b' + setClass + '\\b' );
	for(var i=0; i<tagName.length; i++){ 
		if( re.test( tagName[i].className ) ) arr.push( tagName[i] ); continue; 
	};
	return arr;
};

/* 
7 , 快速排序 ，利用了递归 
	blrean为false的时候从大到小  
	blrean为true的时候从小到大
*/
function aqiSort( arr , blrean ){
	if( arr.length <=1 ){
		return arr;	
	}else{ 
		arr = arr.toString().split(',');
	}	
	for(var i=0; i<arr.length; i++){ 
		arr[i] = parseInt( arr[i] )
	};
	var index = Math.floor(arr.length/2);
	var num = parseInt( arr.splice(index , 1) );
	var left = [];
	var right = [];
	for( var i=0; i<arr.length; i++ ){
		arr[i] < num ?  left.push( arr[i] ) : right.push( arr[i] );
	};
	return blrean ? aqiSort(left , blrean).concat( [num] , aqiSort(right , blrean) ) : aqiSort(right ,blrean).concat( [num] , aqiSort(left , blrean) );
};

/* 
7 , 移除class类名
	利用正则的方式 进行匹配删除
*/
function removeClass( obj , getClass){
	var str = obj.className;
	var re = new RegExp('\\b\\s+'+getClass+'\|'+getClass+'\\s+\|'+getClass+'\\b', 'g' );
	str = str.replace( re , '' );
	return obj.className = str;
};

/* 
8 , 添加class类名
	分为俩种情况  一种就是如果它本身没有class的时候 和它本身有class的时候	
*/
function addClass(obj,className)
{ 
	if(obj.className == '')
	{ 
		obj.className = className;
	}else
	{
		var arrClass = obj.className.split(' ');
		var numClass = arrClassName(arrClass,className);
		if(numClass == -1)
		{ 
			obj.className += ' '+className;
		};			
	};
};
function arrClassName(arr,cn)
{ 
	for(var i=0; i<arr.length; i++)
	{ 
		if(arr[i] == cn)
		{ 
			return 1;
		};
	};
	return -1;
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