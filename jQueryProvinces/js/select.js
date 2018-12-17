// 获取 省 市 镇
var province=$("#province"),city=$("#city"),town=$("#town");

// 获取 省 的下拉菜单
for(var i=0;i<provinceList.length;i++){
    addEle(province,provinceList[i].name);
}

// 增加节点函数
function addEle(ele,value){
    var optionStr="";
    optionStr="<option value="+value+">"+value+"</option>";
    ele.append(optionStr);
}

// 移除节点函数
function removeEle(ele){
    ele.find("option").remove();
    var optionStar="<option value="+"请选择"+">"+"请选择"+"</option>";
    ele.append(optionStar);
}

// 定义 省 市
var provinceText,cityText,cityItem;

// 省级 触发 下拉事件
province.on("change",function(){
	
	// 获取当前省的值
    provinceText=$(this).val();
	
	// 获取选中的 省份，并返回对应的 下标
    $.each(provinceList,function(i,item){
        if(provinceText == item.name){
            cityItem=i;
            return cityItem
        }
    });
	
	// 清空现有列表内容
    removeEle(city);
    removeEle(town);
	
	// 将 市 列表 加载进来
    $.each(provinceList[cityItem].cityList,function(i,item){
        addEle(city,item.name)
    })
});

// 市级 触发 下拉事件
city.on("change",function(){
	
	// 获取当前市的值
    cityText=$(this).val();
	
	// 清空镇列表
    removeEle(town);
	
	// 获取选中的 市份，并返回对应的 下标
    $.each(provinceList,function(i,item){
        if(provinceText == item.name){
            cityItem=i;
            return cityItem
        }
    });
	
	// 将 镇 列表 加载进来
    $.each(provinceList[cityItem].cityList,function(i,item){
        if(cityText == item.name){
            for(var n=0;n<item.areaList.length;n++){
                addEle(town,item.areaList[n])
            }
        }
    });
});