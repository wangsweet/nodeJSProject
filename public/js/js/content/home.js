class Home {
    constructor() {
        this.container = $(".content");
        this.container.css({
            background: "#f0f2f5"
        })
        this.init();
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(Home.template);
        this.createEchartmain();
        this.createEchartartsum();
        this.createEchartartact();
        this.createEchartmiddle();
    }

    createEchartmain() {
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y:'center',
                data:['html','js','css'],
                textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'html'},
                        {value:310, name:'js'},
                        {value:234, name:'css'}
                      
                    ]
                }
            ]
        };
        


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        $("#main>div>canvas").css({
            top: -8,
            height: 120,
            fontSize: 12,
            left: 22,
            width: 227
        })
    }
    createEchartartsum() {
        var myChart = echarts.init(document.getElementById('artsum'));
        var option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['html', 'node', 'cdn', 'mdn'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                    splitNumber: 2
                },
                {
                    type: 'value'
                }
            ],
            series: [{
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [76, 52, 200, 334]
            }]
        };
        myChart.setOption(option);
        $("#artsum>div>canvas").css({
            top: -100,
            left: -6,
            height: 200,
            fontSize: 12
        })
    }
    createEchartartact() {
        var myChart = echarts.init(document.getElementById('act'));
        var  option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                data: ['Mon'],
                axisTick: {
                    alignWithLabel: true
                },
                show:false
            }],
            yAxis: {
                type: 'category',
                show:false
            },
            series: [{
                name: '直接访问',
                type: 'bar',
                barWidth: '40%',
                data: [8]
            }]
        };
        myChart.setOption(option);
        $("#act>div>canvas").css({
            left: 3,
            top: -86,
            width: 140,
            height: 200
        })
    }
    createEchartmiddle(){
    var myChart = echarts.init(document.getElementById('middle-canvas'));
    var option = {
        title : {
            text: '图书量',
        },
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'图书量',
                type:'bar',
                data:[245, 432, 643, 123, 533, 583, 135, 162, 326, 200, 623, 332],
            },
            
        ]
    };    
    myChart.setOption(option);
        $("#middle-canvas>div>canvas").css({
            left: 3,
            top: 19,
        })
    }

}
Home.template = `<div class="content-top">
<ul><li class="sum">
<p>图书总数<span>i<i>指标说明</i></span></p>
<p>12450</p>
<p>周同比&nbsp;&nbsp;12%<span></span></p>
<p>日同比&nbsp;&nbsp;11%<span></span></p>
<p>日上传量1234</p>
</li>
<li class="look">
<p>访问量<span>i<i>指标说明</i></span></p>
<div id="main" style="width: 200px;height:100px;"></div>
<p>日访问量1234</p>
</li>
<li class="articlesum">
<p>文章总数<span>i<i>指标说明</i></span></p>
<div id="artsum" style="width: 200px;height:100px;"></div>
<p>阅读率40%</p>
</li>
<li class="activ">
<p>运营活动效果<span>i<i>指标说明</i></span></p>
<div id="act" style="width: 200px;height:100px;"></div>
<p><span>周同比&nbsp;&nbsp;12%</span>&nbsp;<span>日同比&nbsp;&nbsp;11%</span></p>
</li></ul>
</div>
<div class="content-middle">
<div class="middle-title"><ul><li>图书量</li><li>访问量</li></ul><ol><li>今日</li><li>本周</li><li>本月</li><li>全年</li><li><input type="text" size="30" value="2019-10-26——2019-10-26    📅"></li></ol></div>
<div class="middle-content">
<div id="middle-canvas" style=""></div>
<div class="shop-detail">
<h4>门店图书排名</h4>
<ul>
<li><span>1</span>沙阳路0号店<span>323,234</span></li>
<li><span>2</span>沙阳路1号店<span>323,234</span></li>
<li><span>3</span>沙阳路2号店<span>323,234</span></li>
<li><span>4</span>沙阳路3号店<span>323,234</span></li>
<li><span>5</span>沙阳路4号店<span>323,234</span></li>
<li><span>6</span>沙阳路5号店<span>323,234</span></li>
<li><span>7</span>沙阳路6号店<span>323,234</span></li>
<li><span>8</span>沙阳路7号店<span>323,234</span></li>
</ul>
</div>
</div>
</div>`;