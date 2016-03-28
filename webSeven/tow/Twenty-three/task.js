(function(){ 

function $( obj ){//获取id
	return obj.substring( 0 , 1) === '#' ? document.getElementById( obj.substring( 1 , obj.length) ) : document.getElementById(obj);
}
function band( obj , ev , fn ){//绑定事件 
	return obj.addEventListener ? obj.addEventListener( ev , fn ,false ) : obj.attachEvent( 'on'+ev , fn );
} 
function filteHTML(str){
	var a = str.replace(/<[^>]*>|&nbsp;/g,"")
	var b = a.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
	var c = b.replace(/\s/g,"");//去除文章中间空格
	return c;
}
function getTextNode(el, fn){
    var childs = el.childNodes;
	var reg = /^\s+|\s+$/g;
	for (var i =  childs.length; i--;) {
		if (childs[i].nodeType === 3 && false === fn((childs[i].nodeValue||'').replace(reg, ''))) {
			break;
		}
	}
}
var oBox = $('#box');
var aqiData = [];//数据
var oDiv = oBox.getElementsByTagName('div');
var status = 0;//状态值 为0的时候表示遍历没有执行。 状态值为1的时候表示遍历正在执行;
var value = '';


//前循环
function aqiReast(){ 
	aqiData = [];
	for( var i=0; i<oDiv.length; i++ ){ 
		aqiData.push( oDiv[i] );
	};
};
//后循环
function aqiAfter(){ 
	aqiData = [];
	for( var i=0; i<oDiv.length; i++ ){ 
		aqiData.unshift( oDiv[i] );
	};
}
//中循环
function aqiCenter(){ 
	aqiData = [];
	for( var i=0; i<oDiv.length; i++ ){ 
		aqiData.push( oDiv[i] );
	};
	var index = Math.floor( aqiData.length/2 );
	var left = aqiData.splice(0, index);
	aqiData = aqiData.concat( left ); 
};
//渲染dom
function aqiRender(){
	console.log( aqiData );
	var i = 0;
	clearInterval( timer );
	var timer = setInterval(function(){
		if( i > 0){
			getTextNode(aqiData[i-1], function (text){
				var color = value === text ? '#f60' :  '#fff';
				aqiData[i-1].style.backgroundColor = color;
			});
		}
		if( i === aqiData.length ){
			status = 0;
			value = '';
			alert('完了吆！')
			clearInterval( timer );
			return ;
		}
		aqiData[i].style.backgroundColor = 'pink';
		i++;
	},500);	
}

function aqiHeadle( fn ){ 
	if( status === 0 ){ 
		fn();
		aqiRender();
		status = 1;
	}else{ 
		alert('遍历正在进行~~~');
		return ;
	}
};

//前循环按钮点击事件
function before(){
	aqiHeadle( aqiReast )
}
//中循环按钮点击事件
function center(){
	aqiHeadle( aqiCenter )
}
//后循环按钮点击事件
function after(){
	aqiHeadle( aqiAfter )
}
//搜索按钮点击事件
function aqiSearch(){
	if( status === 0 ){ 
		value = $('#btn4').value;
		value = filteHTML( value );	
	}
	aqiHeadle(aqiReast);
};
function init(){	 
	//给前循环按钮绑定事件
	band( $('#btn1') , 'click' , before);
	//给中循环按钮绑定事件
	band( $('#btn2') , 'click' , center);
	//给后循环按钮绑定事件
	band( $('#btn3') , 'click' , after);
	//给搜索按钮加上点击事件
	band( $('#btn5') , 'click' , aqiSearch);
}
init();












})()