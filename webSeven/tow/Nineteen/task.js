
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
};
function sortAqiData( data ) {//快速排序
	if( data.length <=1 )
	{ 
		return data;
	}
	var len = data.length;
	var center = Math.floor(len/2);
	var index = data.splice( center , 1);
	var left = [];
	var right = [];
	
	for( var i=0; i<data.length; i++)
	{ 
		
		if( data[i]< index )
		{ 
			left.push( data[i] );	
		}else
		{ 
			right.push(data[i]);
		};
		
		
	};//我这里是用的快速排序。可以去百度下快速排序的原理 。
	
	return sortAqiData( left ).concat( [index] , sortAqiData( right ) );
};
function getRandom(min, max){//随机数
    var r = Math.random() * (max - min);
    var re = Math.round(r + min);
    re = Math.max(Math.min(re, max), min)
     
    return re;
};

var direction = 0;  //控制方向     0为从左侧  1为右侧
var port = 0 	//控制进出 0为进 ， 1为出
var html = '';
var aqiData = [];//数据

//渲染图标
function aqiRender(){ 
	var str = '';
	for( var i=0; i<aqiData.length; i++ ){ 
		str += '<div style="left:'+i*14+'px; height:'+aqiData[i]*2+'px;" index='+i+'></div>';
	};
	$('#box').innerHTML = str;
};

//添加数据
function aqiArr(){
	if( aqiData.length < 60 ){ 
		if( direction === 0 ){//左侧 
			if( port === 0 ){ 
				aqiData.unshift( parseInt(html) );//unshift给数组前面添加内同 IE67不支持
			}else if( port === 1 ){ 
				aqiData.shift();
			}
		}else if( direction === 1 ){//右侧 
			if( port === 0 ){
				aqiData.push( parseInt(html) );
	
			}else if( port === 1 ){ 
				aqiData.pop(); 
			}
		};
	}else{ 
		alert('您已经长处长度');
		return; 
	};
	aqiRender();
}

	
//进入判断文本域处理函数
function aqiEnter(){
	
	var val = $('#text').value;
	var type = /^([1-9]\d|100)$/;//10到100的正整数。
	
	if( val === '' || !type.test( val) ){ 
		alert('请输入正确的格式');
		return;
	};
	
	html = val;
	aqiArr()
}
function aqiBox(){
	if( $('#box').innerHTML == '' ){ 
		alert('已没有内容了哦！')
		return
	}
	aqiArr();
}

//出去判断处理函数
function aqiLeave(){ 
	
	aqiArr()
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

//排序按钮点击事件
function aqiSort(){
	if( aqiData.length == 0){ 
		alert('没有内容');
		return;
	}
	aqiData = sortAqiData( aqiData );
	aqiRender();
}
//box的事件
function removeThis(ev){ 
	var ev = ev.srcElement || ev.target;
	var index = ev.getAttribute('index');
	aqiData.splice(index,1);
	aqiRender();
}
//随机50个数字
function aqiRandom(){
	aqiData = []; 
	for(var i=0; i<50; i++ ){ 
		aqiData.push( getRandom(10 , 100) );
	};
	aqiRender();
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
	//给排序绑定事件
	band( $$('input')[5] , 'click' , aqiSort);
	//给随机事件绑定点击事件
	band( $$('input')[6] , 'click' , aqiRandom);
	
	//给box下面的div绑定点击事件，利用时间委托
	band( $('#box'), 'click' , removeThis);
}


init();





})()



























