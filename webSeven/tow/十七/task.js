/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function $( obj ){//获取id 
	return obj.substring(0,1) === '#' ? document.getElementById( obj.substring(1,obj.length) ) : document.getElementById( obj );
};
function $name( parent , name ){ //bytag name
	return parent.getElementsByTagName( name );
};
function band( obj , ev , fn ){ //事件绑定函数
	return obj.addEventListener ? obj.addEventListener( ev , fn ,false ) : obj.attchEvent( 'on' + ev , fn);
};
function setStyle( obj , json ){//设置属性 
	for( var attr in json ){ 
		obj.style[attr] = json[attr];
	}
};
function gui( arr ){ //递归处理数据
	var data = [];
	var add = 0;
	if( arr.length < 7 )
	{ 
		for(var i=0; i<arr.length; i++){ 
			add += arr[i];
		}
		data.push( Math.floor(add/7) );
		
		return data;
	}
	for(var i=0; i<7; i++){ 
		add += arr[i];
	}
	arr.splice(0,7);
	data.push( Math.floor(add/7) )
	return data.concat ( gui(arr) )
}
var dataObj = document.getElementsByClassName('aqi-chart-wrap')[0];//低版本不兼容
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart( ) {
	var len = 0;
	var Width = chartData.width;
	dataObj.innerHTML = '';
	for( var attr in chartData){
		var json =   chartData[attr];
		for( var arr in json ){ 
			
			len = len + Width + 4;
			var div = document.createElement('div');
			setStyle(
				div,
				{ 
					width : Width + 'px',
					height : json[arr] + 'px',
					background : 'green',
					position : 'absolute',
					bottom : '0px',
					left : len + 'px',
				}
			);
			div.title = '时间:' + arr+' 颗粒度:'+json[arr];
			dataObj.appendChild( div );
		}
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(ev) {
	
	var ev = ev.srcElement || ev.target;
	var date = ev.parentNode.innerHTML.substring(0,1);
	// 确定是否选项发生了变化 
	
	// 设置对应数据
	
	if( date === '日' )
	{ 
		pageState.nowGraTime = 'day';
		
	}else if( date === '周' )
	{ 
		pageState.nowGraTime = 'week';
		console.log( pageState )
	}else if( date === '月' )
	{ 
		pageState.nowGraTime = 'month';
	}
	initAqiChartData(); 
	// 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化 
	if( this.value )
	{ 
		pageState.nowSelectCity = this.value;
	};
	// 设置对应数据
	initAqiChartData(); 	
	// 调用图表渲染函数
	renderChart() 
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	
	band( $('#form-gra-time') , 'change' , graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	$('#city-select').innerHTML = '';
	
	for( var attr in aqiSourceData ){ 
		var option = document.createElement('option');
		option.innerHTML = attr;
		$('#city-select').appendChild(option);
	}
	
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	band( $('#city-select') , 'change' , citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	// 记录当前页面的表单选项
	/*var pageState = {
	  nowSelectCity: -1,
	  nowGraTime: "day"
	}*/
	chartData = {};
	var city = pageState.nowSelectCity;
	var data = aqiSourceData[city];	
	if( pageState.nowGraTime === 'day' )
	{ 
		chartData[city] = data;	
		chartData['width'] = 10;	
	}else if( pageState.nowGraTime === 'week' )
	{ 
		var arr = [];
		for( var attr in data ){ 
			arr.push(data[attr]);
		};
		var week = gui(arr);
		data = {};
		for(var i=0; i<week.length; i++){ 
			data['2016年第'+ (i+1) + '周'] = week[i];
		};
		chartData[city] = data;	
		chartData['width'] = 30;	
	}else if( pageState.nowGraTime === 'month' )
	{ 
		var arr = [] , num = [] , datas = [] ,one = 0 ,tow = 0 , three = 0;
		for( var attr in data ){ 
			arr.push(attr);
		};
		for( var attr in data ){ 
			num.push(data[attr]);
		};
		for(var i=0; i<arr.length; i++){
			
			if( arr[i].substring(6,7) == '1' )
			{ 
				one += num[i]/30;
			}else if( arr[i].substring(6,7) == '2')
			{ 
				tow += num[i]/28;
			}else if( arr[i].substring(6,7) == '3' )
			{ 
				three += num[i]/30;
			};
		};
		datas = [ 
			Math.floor(one),
			Math.floor(tow),
			Math.floor(three)
		];
		data = {};
		for(var i=0; i<datas.length; i++){ 
			data['2016年第'+ (i+1) + '月'] = datas[i];
		};
		chartData[city] = data;	
		chartData['width'] = 80;
	}
};

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
	renderChart();
}

init();