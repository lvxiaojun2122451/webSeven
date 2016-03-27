
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

var direction = 0;  //控制方向     0为从左侧  1为右侧
var port = 0 	//控制进出 0为进 ， 1为出
var html = [];
var aqiData = [];//数据

//渲染图标
function aqiRender(){
	var argu = arguments;
	console.log( aqiData )  
	var str = '';
	for( var i=0; i<aqiData.length; i++ ){ 
		str += '<div index='+i+'>'+aqiData[i][0]+'</div>';
	};
	$('#box').innerHTML = str;
};

//添加数据
function aqiArr(){
	console.log( html.length  )
	if( aqiData.length < 60 ){ 
		if( direction === 0 ){//左侧 
			if( port === 0 ){ 
				for(var i=html.length-1; i>=0; i--){ 
					aqiData.unshift( [html[i]] )
				} //unshift给数组前面添加内同 IE67不支持
			}else if( port === 1 ){ 
				aqiData.shift();
			}
		}else if( direction === 1 ){//右侧 
			if( port === 0 ){
				for(var i=0; i<html.length; i++){ 
					aqiData.push( [html[i]] )
				}
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
	html = [];
	var myarray = val.split(/[\n\r\t\s,，、;；]+/g);
	for(var i=0; i<myarray.length; i++){ 
		html.push( [ myarray[i] ] )
	};
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
//box的事件
function removeThis(ev){ 
	var ev = ev.srcElement || ev.target;
	var index = ev.getAttribute('index');
	aqiData.splice(index,1);
	aqiRender();
}
function aqiRandom(){ 
	var val = $('#search').value;
	var arr = val.split('');
	var child = $('#box').children
	for( var i=0; i<child.length; i++){ 
		child[i].style.color = '#000';
		child[i].style.backgroundColor = 'pink';
	};
	for( var i=0; i<child.length; i++){ 
		var index = child[i].innerHTML.split('');
		for( var j=0; j<index.length; j++){ 
			for(var n=0; n<arr.length; n++){ 
				if( arr[n] === index[j] ){
					 
					child[i].style.color = '#fff';
					child[i].style.backgroundColor = '#f60';
				}
			}
		}
	}
};

function init(){ 
	
	//给左入绑定事件
	band( $$('input')[0] , 'click' , aqiLeftEnter);
	//给右入绑定事件
	band( $$('input')[1] , 'click' , aqiRightEnter);
	//给左出绑定事件
	band( $$('input')[2] , 'click' , aqiLeftLeave);
	//给右出绑定事件
	band( $$('input')[3] , 'click' , aqiRightLeave);
	//给查询绑定事件
	band( $$('input')[5] , 'click' , aqiRandom);
	
	//给box下面的div绑定点击事件，利用时间委托
	band( $('#box'), 'click' , removeThis);
}


init();

})()



























