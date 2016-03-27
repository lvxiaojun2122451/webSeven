
(function(){
	
function $( obj ){ //获取id
	return obj.substring(0,1) == '#' ? document.getElementById(obj.substring(1,obj.length)) : document.getElementById(obj);
}
function $$( tagName ){//获取tagname 
	return document.getElementsByTagName( tagName );
}
function band( obj , ev , fn ){ //事件绑定函数
	return obj.addEventListener ? obj.addEventListener( ev , fn , false ) : obj.attachEvent( 'on' + ev , fn );
}
function setStyle( obj , json ){ //设置样式
	for( var attr in json ){ 
		obj.style[attr] = json[attr];
	}
}

var direction = 0;  //控制方向     0为从左侧  1为右侧
var port = 0 	//控制进出 0为进 ， 1为出
var html = ''; //当前的文本

//渲染图表
function aqiRender(){
	var oDiv = document.createElement('div');
	oDiv.innerHTML = html;
	if( direction === 0 ){//左侧 
		if( port === 0 ){ 
			if( $('#box').innerHTML == '' ){ 
				$('#box').appendChild(oDiv);
			}else{ 
				$('#box').insertBefore(oDiv , $('#box').children[0] )	
			}
		}else if( port === 1 ){ 
			$('#box').removeChild($('#box').children[0])
		}
	}else if( direction === 1 ){//右侧 
		if( port === 0 ){
			$('#box').appendChild(oDiv)	

		}else if( port === 1 ){ 
			$('#box').removeChild($('#box').lastElementChild)
		}
	}
}

	
//进入判断文本域处理函数
function aqiEnter(){
	
	var val = $('#text').value;
	var type = /^[0-9]*[1-9][0-9]*$/;
	
	if( val === '' || !type.test( val) ){ 
		alert('请输入正确的格式');
		return;
	};
	
	html = val;
	aqiRender()
}
function aqiBox(){
	if( $('#box').innerHTML == '' ){ 
		alert('已没有内容了哦！')
		return
	}
	aqiRender();
}

//出去判断处理函数
function aqiLeave(){ 
	
	aqiRender()
};	 

//左出按钮点击事件
function aqiLeftLeave(){
	port = 1;
	direction = 0;
	aqiBox();
}

//左入按钮点击事件
function aqiLeftEnter(){
	port = 0; 
	direction = 0;
	aqiEnter();
}

//右出按钮点击事件
function aqiRightLeave(){
	port = 1; 
	direction = 1;
	aqiBox();
}
//右入按钮点击事件
function aqiRightEnter(){
	port = 0; 
	direction = 1;
	aqiEnter();
}
//box的事件
function removeThis(ev){ 
	var ev = ev.srcElement || ev.target;
	
	$('#box').removeChild( ev )

}

function init(){ 
	
	//给左入绑定事件
	band( $$('input')[1] , 'click' , aqiLeftEnter);
	//给右入绑定事件
	band( $$('input')[2] , 'click' , aqiRightEnter);
	//给左出绑定事件
	band( $$('input')[3] , 'click' , aqiLeftLeave);
	//给右出绑定事件
	band( $$('input')[4] , 'click' , aqiRightLeave);
	
	//给box下面的div绑定点击事件，利用时间委托
	band( $('#box'), 'click' , removeThis);
}


init();





})()



























