/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
function reql( obj ){ 
	return obj.replace(/^\s+|\s+$/g, '');//去除空格
};
function isEmptyObject( obj ){ //判断对象是不是空对象
	for( var attr in obj ){ 
		return false;//如果这里执行了 就说明这不是一个空对象
	};
	return true;
};
function band(obj,ev,fn) { //事件绑定处理函数
	return obj.addEventListener ? obj.addEventListener(ev,fn,false) : obj.attachEvent('on'+ev,fn);
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var oCity = document.getElementById('aqi-city-input');
	var oVal = document.getElementById('aqi-value-input');
	var cityVal = reql(oCity.value);
	var numVal = reql(oVal.value);
	
	if (aqiData[cityVal] != undefined)//这里就是判断输入的城市有值的话说明这个城市是存在的。
	{
		alert("已存在输入城市信息！");
		return;
	 }
	aqiData[cityVal] = numVal;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	
	var oTable = document.getElementById('aqi-table');
	console.log( aqiData )
	oTable.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	if( !isEmptyObject(aqiData) ){ 
		for( var attr in aqiData ){ 
			var otr = document.createElement('tr');
			var otd1 = document.createElement('td');
			var otd2 = document.createElement('td');
			var otd3 = document.createElement('td');
			var oBtn = document.createElement('button');
			otd1.innerHTML = attr;
			otd2.innerHTML = aqiData[attr];
			oBtn.innerHTML = '删除';
			otd3.appendChild(oBtn);
			otr.appendChild(otd1);
			otr.appendChild(otd2);
			otr.appendChild(otd3);
			oTable.appendChild( otr );
		}
	}else{ 
		oTable.innerHTML = '';
	}
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var off = false;
	var oCity = document.getElementById('aqi-city-input');
	var oVal = document.getElementById('aqi-value-input');
	var cityVal = oCity.value;
	var numVal = oVal.value;
	cityVal = reql(cityVal);
	numVal = numVal.replace(/^\s+|\s+$/g, '');//去除空格
	var reg =/^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d]{0,}$/g;//匹配中英文
	var x = /^[0-99999]*$/g;//匹配0~9的数字
	
	if( cityVal === '' ){ 
		alert('请输入城市名称');
	}else if( !reg.test(cityVal) ){ 
		alert('请输入中文或者英文')
	}else{ 
		if( numVal === '' ){ 
			alert('请输入质量指数');
		}else if( !x.test(numVal) ){ 
			alert('请输入整数')
		}else{ 
			off = true;
		};
	};
	if( off ){ 
		addAqiData();
		renderAqiList();
	};
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(ev) {
  	var ev = ev.srcElement || ev.target;//这个是事件委托里面的事件源。
	var par = ev.parentNode.parentNode.firstElementChild.innerHTML;//这个是获取对应的数据。低版本不兼容firstElementChlid
	delete aqiData[par];
	renderAqiList();
}
function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var oBtn = document.getElementById('add-btn');
	band(oBtn,'click',addBtnHandle)
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var oTable = document.getElementById('aqi-table');
	band(oTable,'click',delBtnHandle)
}
init();
