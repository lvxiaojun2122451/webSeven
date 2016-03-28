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
};
function setStyle( obj ,json ){ 
	for( var attr in json ){ 
		obj.style[attr] = json[attr];
	}
};
var oBox = $('#box');
var aqiData = [];//数据
var oDiv = null;
var status = 0;//状态值 为0的时候表示遍历没有执行。 状态值为1的时候表示遍历正在执行;
var value = '';
var aqiArr = [];

//查找元素是否选中
function aqiSee( obj ){
	
}
//处理选中的元素
function aqiHeadleChoice( obj ){
	var index = null;
	
	for(var i=0; i<aqiArr.length; i++){ 
		if( obj === aqiArr[i] ){
			index = i;
		}
	}
	if( index != null ){
		aqiArr[index].style.backgroundColor = '#fff'; 
		aqiArr.splice(index , 1);
	}else{ 
		aqiArr.push( obj )
	}
	for( var i=0; i<aqiArr.length; i++ ){ 
		aqiArr[i].style.backgroundColor = 'green';
	}
};

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
	aqiArr = [];
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
	oDiv = oBox.getElementsByTagName('div'); 
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
//box绑定事件
function aqiChoice( ev ){ 
	var ev = ev.srcEvent || ev.target;
	aqiHeadleChoice( ev );
};
//删除按钮添加绑定事件
function aqiDelete(){
	if( aqiArr.length == 0 ){ 
		alert('请选择要删除的内容哦！');
		return 
	}
	for( var i=0; i<aqiArr.length; i++ ){ 
		aqiArr[i].parentNode.removeChild( aqiArr[i] );
	};
	aqiArr = [];
};
//添加按钮绑定 的事件
function aqiAdd(){
	var value = $('#btn7').value;
	value = filteHTML(value);
	if( value == '' || aqiArr.length == 0 ){ 
		alert('请选中要添加的元素后者请输入内容哦！')
		return ;
	}
	for( var i=0; i<aqiArr.length; i++ ){
		var oDiv = document.createElement('div');
		 oDiv.innerHTML = value;
		 setStyle( oDiv , {
			backgroundColor : '#fff'
		 });
		aqiArr[i].appendChild( oDiv )
	};
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
	//给box绑定点击事件  通过事件代理来实现选择元素
	band( $('#box') , 'click' , aqiChoice);
	//给删除按钮绑定事件
	band( $('#btn6') , 'click' , aqiDelete);
	//给添加按钮绑定事件
	band( $('#btn8') , 'click' , aqiAdd);
}
init();












})()