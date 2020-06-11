<!DOCTYPE html>
<html lang="zh-CN" style="font-size:100px">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>电子阅读页面</title>
    <link rel="stylesheet" href="{CBL_MANGTU_RES}/home/css/index.css">
    <script>
        function resetFontSize() {
            var baseFontSize = 100
            var designWidth = 750
            var width = window.innerWidth
            var currentFontSize = (width / designWidth) * baseFontSize
            document.getElementsByTagName('html')[0].style.fontSize = currentFontSize + 'px'
        }
        window.onresize = function () {
            resetFontSize()
        };
        resetFontSize()
    </script>
    <style>
        .e-books h3{
            font-size: 0.36rem;
            color:#333;
            text-align: center;
            margin:0.4rem 0 0.2rem 0;
        }
        .e-books h6{
            font-size: 0.28rem;
            color:#333;
            text-align: center;
            margin-bottom:0.4rem;
        }
        .booksList{
            background: #fff;
            position: fixed;
            bottom:0;
            /* display: none; */
        }
        .booksList ul li{
            float:left;
            border-right:1px solid #eeeeee;
            border-bottom:1px solid #eeeeee;
            width:1.875rem;
            text-align: center;
            height: 1.6rem;
        }
        .booksList ul li img{
            width:0.48rem;
            height:0.48rem;
            margin-top:0.3rem;
            margin-bottom:0.2rem;
        }
        .booksList ul li p{
            font-size: 0.24rem;
            color:#666;
        }
    </style>
</head>

<body>
<div class="e-books" style="overflow-y:auto;">
    <h3>{$title}</h3>
    <h6>{$ChapterName}</h6>
    <input type="text" value="" id="audiotime" style="display:none;"/>
    <div style="padding:0 0.3rem;line-height: 0.5rem;">
        <div style='padding-bottom: 2.6rem;' id="content" class="rd-txt">{$content}</div>
    </div>
</div>
<audio id="shVideo" controls="controls" autoplay="autoplay" src="" style="display: none" @timeupdate="updateTime"></audio>
<div class="booksList">
    <ul class="clearfix">
        <li onclick="control();"><a class="kaishi" role="button"><img src="{CBL_MANGTU_RES}/home/images/zantimg.png" alt="暂停" class="zanimg"><p>暂停</p></a></li>
        <li><a role="button"><img src="{CBL_MANGTU_RES}/home/images/muluimg.png" alt="目录" onclick="muluPage()"><p>目录</p></a></li>
        <li><a id="changeFont" role="button"><img src="{CBL_MANGTU_RES}/home/images/textshezimg.png" alt="文本设置" onclick="wenbenPage()"><p>文本设置</p></a></li>
        <li onclick="readsetting();"><a role="button"><img src="{CBL_MANGTU_RES}/home/images/maikefeng-tianchong.png" alt="朗读设置" ><p>朗读设置</p></a></li>
        <li><a role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_comment.png" alt="评论" onclick="pinglunPage()"><p>评论</p></a></li>
        {if $checkcollectChapter == 1}
        <li><a id="shoucImg" role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_collection.png" alt="收藏" class="down"><p id="shouctext">取消收藏</p></a></li>
        {else}
        <li><a id="shoucImg" role="button"><img src="{CBL_MANGTU_RES}/home/images/shoucangimg.png" alt="收藏" ><p id="shouctext">加入收藏</p></a></li>
        {/if}
        {if $shuqianhascollect==null}
        <li class="shuqian"><a><img src="{CBL_MANGTU_RES}/home/images/ic_bookmark@2x.png" alt="书签" id="shuqian" ><p id="shuqiantext">加入书签</p></a></li>
        {else}
        <li class="shuqian"><a><img src="{CBL_MANGTU_RES}/home/images/hasaddshuqian.png" alt="书签" id="shuqian" class="down"><p id="shuqiantext">删除书签</p></a></li>
        {/if}

        <li onclick="gonextchapter();"><a role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_share.png" alt="分享"><p>下一章</p></a></li>
    </ul>
</div>
<div>
    <img  src="{CBL_MANGTU_RES}/home/images/home.png"  style="width:1rem;height:1rem;position:fixed;top:5%;right:0.4rem;z-index:9999;" onclick="goindex();"  alt="返回首页"  role="button"/>
</div>
<div style="display:none">
    <img class="changefont" src="{CBL_MANGTU_RES}/home/images/changesize.png" style="width:0.62rem;height:0.52rem;position: absolute;bottom:0.2rem;right:1.38rem;" alt="点击改变字体大小" role="button"/>
</div>
<script type="text/javascript" src="{CBL_MANGTU_RES}/home/js/jquery.min.js"></script>
<!--<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>-->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script>
    var getvoice_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'getvoice'));}";
    var getvoice1_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'getvoice1'));}";
    var addreadlog_url = "{php echo $this->createMobileUrl('user',array('type'=>'AddReadLog'));}";
    var et = setTimeout(function(){
	    var DbCode='{$DbCode}';
	    var SysId='{$SysId}';
	    var ChapterIndex='{$ChapterIndex}';
        $.ajax({
            type : 'post',
            url : addreadlog_url,
            data:{DbCode:DbCode,SysId:SysId,ResType:2,ChapterIndex:ChapterIndex,credits:2},
            dataType : 'json',
            success : function(data) {
                console.log(data);
            },
        });
    }, 1000*120);
   
    /*function geaudio(pid){
        $.ajax({
            type : 'post',
            url : getvoice_url,
            data:{content:content},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    $('#ebookvoice').attr('src',data.src);
                }
            },
        });
    }*/
    $.each($(".rd-txt p"),function(){

        if(!$(this).text()){
            $(this).remove();
        };
        if($(this).text().length<2){
            $(this).remove();
        }
    });
    var i = 0 ;
    var txt = $(".rd-txt p").eq(i).text();//获取要转换的文字
   
    $(".rd-txt p").eq(i).css("color","#2580EE");
    var audio = document.getElementById('shVideo');
    txt = txt.replace(/\"/g, "");
    var url = getvoice1_url+"&txt="+txt;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.overrideMimeType('audio\/mp3; charset=x-user-defined');
    xhr.responseType = "blob";
    xhr.send();
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;
            console.log(blob);
            audio.onload = function(e) {
                window.URL.revokeObjectURL(audio.src);
            };
            audio.src = window.URL.createObjectURL(blob);

        }
    }

     //audio.src='{CBL_MANGTU_RES}/home/audio/audio.mp3'
    // 解决ios音乐不自动播放的问题
	 function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            var globalAudio=document.getElementById("shVideo");
            globalAudio.play();
        });
    };
	autoPlayAudio();
    //$("body").append('<audio id="shVideo" controls="controls" autoplay="autoplay" src="'+getvoice_url+'&txt='+zhuanmas+'" style="display: none"></audio>');

    slmsbf();

    function slmsbf(){
        zhuanma = '';
        audio.addEventListener('ended', function () {
            audio.src=null;
            i++;
            var aaa = $(".rd-txt p").length;
            console.log('总章节：'+aaa);
            console.log('当前章节：'+i);
           if(colorParam=='黑白对比度'){
	  		  $("#content").children('p').css("color", '#F7F7F7');
		  	}
		  	if(colorParam=='白蓝对比度'){
		  		 $("#content").children('p').css("color", '#0915F5');
		  	}
		  	if(colorParam=='蓝黄对比度'){
		  		  $("#content").children('p').css("color", '#FFFE54');
		  	}
		  	if(colorParam=='白红对比度'){
		  		  $("#content").children('p').css("color", '#C42A29');
		  	}
		  	if(colorParam=='白黑对比度'){
		  		 $("#content").children('p').css("color", '#000000');
		  	}
		  	if(colorParam=='黄黑对比度'){
		  		  $("#content").children('p').css("color", '#000000');
		  	}	
            $(".rd-txt p").eq(i).css("color","#2580EE");
           
		    //zhuanmas  = encodeURIComponent(txt);//转码
		    
            txt = $(".rd-txt p").eq(i).text();
            $(".rd-txt p").eq(i).addClass('active')
             $(".rd-txt p").eq(i).siblings().removeClass('active')
		    var top1=$(".active").offset().top;
		    if(top1>404){
		    	 $(".active").eq(i).slideUp('slow');
		    }
            txt = txt.replace(/\"/g, "");
            var url = getvoice1_url+"&txt="+txt;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.overrideMimeType('audio\/mp3; charset=x-user-defined');
            xhr.responseType = "blob";
            xhr.send();
            xhr.onload = function() {
                if (this.status == 200) {
                    var blob = this.response;
                    console.log(blob);
                    audio.onload = function(e) {
                        window.URL.revokeObjectURL(audio.src);
                    };
                    audio.src = window.URL.createObjectURL(blob);
                }
            }
            if(aaa<=i){
                //todo 此处阅读整章完毕，加积分
                console.log('本章阅读完毕');
                var DbCode='{$DbCode}';
                var SysId='{$SysId}';
                var ChapterIndex='{$ChapterIndex}';
                $.ajax({
                    type : 'post',
                    url : addreadlog_url,
                    data:{DbCode:DbCode,SysId:SysId,ResType:2,ChapterIndex:ChapterIndex,credits:10},
                    dataType : 'json',
                    success : function(data) {
                        console.log(data);
                    },
                });
                gonextchapter();
            }
        }, false);
    }

    // 开始暂停按钮
    function control(){
        var audio = document.getElementById('shVideo');

        if(audio!==null){
            if(audio.paused){
                audio.play();// 播放
                $(".zanimg").attr("src",'{CBL_MANGTU_RES}/home/images/zantimg.png');
                $(".zanimg").css({"width":"0.48rem","height":"0.48rem","margin-bottom":'0.2rem'})
                $('.kaishi p').text('暂停')
            }else{
                audio.pause();// 暂停
                $(".zanimg").attr("src",'{CBL_MANGTU_RES}/home/images/kaishi.png');
                $(".zanimg").css({"width":"0.48rem","height":"0.48rem","margin-bottom":'0.2rem'})
                $('.kaishi p').text('开始')
            }
        }
    }
    
    
   
    

</script>


<script>
 var writelog_url = "{php echo $this->createMobileUrl('user',array('type'=>'writeLog'));}";
    function requestFun(url,data){
	   	$.ajax({
			type : 'post',
			url : url,
			data: data,
			dataType : 'json',
			success : function(data) {
				console.log('data',data);
			},
		});
    }
    var mulu_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'catalog'));}";
    var pinglun_url="{php echo $this->createMobileUrl('ebooks',array('type'=>'comment'));}";
    var shuqian_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'addBookmark'));}";
    var shezhi_url = "{php echo $this->createMobileUrl('user',array('type'=>'integral'));}";
    var shouye_url = "{php echo $this->createMobileUrl('index',array('type'=>'index'));}";
    var deleteshuqian_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'deleteBookmark'));}";
    var chapter_url="{php echo $this->createMobileUrl('ebooks',array('type'=>'chapter'));}";
    var readsetting_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'readsetting'));}";
   window.onload=function(){
   		var heights=$(window).height()+'px';
   		console.log(heights)
   		$('.e-books').css('max-height',heights)
		var param = '{$sizeSet}'; 
		 colorParam ="{$textColor}"
	  	if(colorParam=='黑白对比度'){
	  		 $('html,.e-books').css('background-color', '#000');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#F7F7F7');
	  	}
	  	if(colorParam=='白蓝对比度'){
	  		 $('html,.e-books').css('background-color', '#fff');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#0915F5');
	  	}
	  	if(colorParam=='蓝黄对比度'){
	  		 $('html,.e-books').css('background-color', '#0915F5');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#FFFE54');
	  	}
	  	if(colorParam=='白红对比度'){
	  		 $('html,.e-books').css('background-color', '#fff');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#C42A29');
	  	}
	  	if(colorParam=='白黑对比度'){
	  		console.log('你回复了默认')
	  	}
	  	if(colorParam=='黄黑对比度'){
	  		 $('html,.e-books').css('background-color', '#FFFE54');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#000000');
	  	}	
	  	if(param==1){
		$('.changefont').click()
		 
	  	}
	}
	
	$("body").on("touchstart", function(e) {
	    e.preventDefault();
	    startX = e.originalEvent.changedTouches[0].pageX;
	    startY = e.originalEvent.changedTouches[0].pageY;
	    
	});
	// $("body").on("touchmove", function(e) {
	//     e.preventDefault();
	//     moveEndX = e.originalEvent.changedTouches[0].pageX,
	//     moveEndY = e.originalEvent.changedTouches[0].pageY,
	//     X = moveEndX - startX,
	//     Y = moveEndY - startY;
	//     if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
	//         alert("像右滑动");
	//     }
	//     else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
	//         alert("像左滑动");
	//     }
	//     else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
	//         alert("下滑动");
	//     }
	//     else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
	//         alert("上滑动");
	//     }
	//     else{
	//         alert("触摸");
	//     }
	// });
	
     	// 切换字体
	$('.changefont').on('click', function () {
		$('.e-books h3').css('font-size', '0.44rem');
		$('.e-books h6').css('font-size', '0.32rem');
		$('#content p span').css('font-size', '0.38rem');
		$('.booksList li p').css('font-size', '0.30rem');
	})
     $(document).ready(function(){
        $("#item3").click(function(){
            if ($("#item2").css("display")=="none"){
                $("#item2").css("display","block");
            }else{
                $("#item2").css("display","none");
            }
        });
    });
    //收藏
    var image1="{CBL_MANGTU_RES}/home/images/shoucangimg.png";
    var image2="{CBL_MANGTU_RES}/home/images/ic_collection.png"
    var hasshuqian="{CBL_MANGTU_RES}/home/images/hasaddshuqian.png";
    var noshuqian="{CBL_MANGTU_RES}/home/images/ic_bookmark@2x.png"
    var addcollectchapter_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'AddCollectChapter'));}";
    var deletecollectchapter_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'DeleteCollectChapter'));}";

    //通过id="ctr"获取元素click事件
    $("#shoucImg").click(function(){
        //将显示和隐藏两个状态下的显示图标路径放入images变量中
        // var images=['../dist/images/shoucangimg.png','../dist/images/ic_collection.png'];
        //通过class的值来判断控制显示的图标样式
        var Title='{$Title}';
        var DbCode='{$DbCode}';
        var SysId='{$SysId}';
        var CategoryCode='{$CategoryCode}';
        var Chapter='{$ChapterIndex}';
        var ImageUrl = '{$ImageUrl}';
        if($("#shoucImg img").attr("class")=="down"){//todo 取消章节收藏
            $.ajax({
                type : 'post',
                url : deletecollectchapter_url,
                data:{Title:Title,DbCode:DbCode,SysId:SysId,CategoryCode:CategoryCode,Chapter:Chapter},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        $("#shoucImg img").attr("src",image1);
                        $("#shoucImg img").removeClass();
                        $('#shouctext').html('加入收藏')
                    }
                },
            });

        }else{//todo 章节收藏
            $.ajax({
                type : 'post',
                url : addcollectchapter_url,
                data:{Title:Title,DbCode:DbCode,SysId:SysId,CategoryCode:CategoryCode,Chapter:Chapter,ImageUrl:ImageUrl},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        $("#shoucImg img").attr("src",image2);
                        $("#shoucImg img").addClass("down");
                        $('#shouctext').html('取消收藏')
                    }
                },
            });

        }

    });
    $(".shuqian").click(function(){
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var ChapterName = '{$ChapterName}';
        if($("#shuqian").attr("class")=="down"){//todo 删除书签
            var shuqianId = "{$shuqianhascollect['Id']}";
            $.ajax({
                type : 'post',
                url : deleteshuqian_url,
                data:{shuqianId:shuqianId},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        window.location.reload();
                        /*$("#shuqian").attr("src",noshuqian);
                        $("#shuqian").removeClass();
                        $('#shuqiantext').html('加入书签')*/
                    }
                },
            });

        }else{//todo 添加书签
            $.ajax({
                type : 'post',
                url : shuqian_url,
                data:{Title:Title,Identifier:Identifier,Chapter:ChapterIndex,ChapterName:ChapterName},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        window.location.reload();
                        /*$("#shuqian").attr("src",hasshuqian);
                        $("#shuqian").addClass("down");
                        $('#shuqiantext').html('删除书签')*/
                    }
                },
            });
        }

    });
	data11 =  Date.parse(new Date());
	pushHistory();
	window.addEventListener("popstate",function(e){
		var curDate =  Date.parse(new Date());
		var DbCode = '{$DbCode}';
		var SysId = '{$SysId}';
		var Title = "{$data['Title']}";
		var CategoryCode = "{$CategoryCode}";
		$.ajax({
			type : 'post',
			url : writelog_url,
			data:{DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate,CategoryCode:CategoryCode,FangWenType:5},
			dataType : 'json',
			success : function(data) {
				console.log(data);
			},
		});
		window.history.go(-1);
	},false);
	
	function pushHistory(){
		var state={
			title:"title",
			url:"#"
		};
	window.history.pushState(state,"title","#");
	}

    //目录
    function muluPage(){
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var CategoryCode='{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=mulu_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&Title="+Title+"&CategoryCode="+CategoryCode;
    }
    //评论
    function pinglunPage(){
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var CategoryCode = '{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var ResType = 2
        var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=pinglun_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&Title="+Title+"&ChapterIndex="+ChapterIndex+"&ResType="+ResType;
    }
    //我的书签
    function shuqianPage(){
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var ChapterName = '{$ChapterName}';
        $.ajax({
            type : 'post',
            url : shuqian_url,
            data:{Title:Title,Identifier:Identifier,Chapter:ChapterIndex,ChapterName:ChapterName},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    console.log(data.message);
                }else{
                    console.log(data.message);
                }
            },
        });
        //content = JSON.parse(Content);
        //window.location.href=shuqian_url;
    }
    function gonextchapter() {
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = parseInt('{$ChapterIndex}')+1;
        var CategoryCode = '{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var ImageUrl = '{$ImageUrl}';
         var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        window.location.href=chapter_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&ChapterIndex="+ChapterIndex+"&Title="+Title+"&CategoryCode="+CategoryCode+"&ImageUrl="+ImageUrl;

    }
    function readsetting(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        window.location.href=readsetting_url;
    }
    //文本设置
    function wenbenPage(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=shezhi_url;
    }
    //返回首页
    function goindex(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=shouye_url;
    }
</script>



</body>

</html>
<!DOCTYPE html>
<html lang="zh-CN" style="font-size:100px">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>电子阅读页面</title>
    <link rel="stylesheet" href="{CBL_MANGTU_RES}/home/css/index.css">
    <script>
        function resetFontSize() {
            var baseFontSize = 100
            var designWidth = 750
            var width = window.innerWidth
            var currentFontSize = (width / designWidth) * baseFontSize
            document.getElementsByTagName('html')[0].style.fontSize = currentFontSize + 'px'
        }
        window.onresize = function () {
            resetFontSize()
        };
        resetFontSize()
    </script>
    <style>
        .e-books h3{
            font-size: 0.36rem;
            color:#333;
            text-align: center;
            margin:0.4rem 0 0.2rem 0;
        }
        .e-books h6{
            font-size: 0.28rem;
            color:#333;
            text-align: center;
            margin-bottom:0.4rem;
        }
        .booksList{
            background: #fff;
            position: fixed;
            bottom:0;
            /* display: none; */
        }
        .booksList ul li{
            float:left;
            border-right:1px solid #eeeeee;
            border-bottom:1px solid #eeeeee;
            width:1.875rem;
            text-align: center;
            height: 1.6rem;
        }
        .booksList ul li img{
            width:0.48rem;
            height:0.48rem;
            margin-top:0.3rem;
            margin-bottom:0.2rem;
        }
        .booksList ul li p{
            font-size: 0.24rem;
            color:#666;
        }
    </style>
</head>

<body>
<div class="e-books" style="overflow-y:auto;">
    <h3>{$title}</h3>
    <h6>{$ChapterName}</h6>
    <input type="text" value="" id="audiotime" style="display:none;"/>
    <div style="padding:0 0.3rem;line-height: 0.5rem;">
        <div style='padding-bottom: 2.6rem;' id="content" class="rd-txt">{$content}</div>
    </div>
</div>
<audio id="shVideo" controls="controls" autoplay="autoplay" src="" style="display: none" @timeupdate="updateTime"></audio>
<div class="booksList">
    <ul class="clearfix">
        <li onclick="control();"><a class="kaishi" role="button"><img src="{CBL_MANGTU_RES}/home/images/zantimg.png" alt="" class="zanimg"><p>暂停</p></a></li>
        <li><a role="button"><img src="{CBL_MANGTU_RES}/home/images/muluimg.png" alt="" onclick="muluPage()"><p>目录</p></a></li>
        <li><a id="changeFont" role="button"><img src="{CBL_MANGTU_RES}/home/images/textshezimg.png" alt="" onclick="wenbenPage()"><p>文本设置</p></a></li>
        <li onclick="readsetting();"><a role="button"><img src="{CBL_MANGTU_RES}/home/images/maikefeng-tianchong.png" alt="朗读设置" ><p>朗读设置</p></a></li>
        <li><a role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_comment.png" alt="" onclick="pinglunPage()"><p>评论</p></a></li>
        {if $checkcollectChapter == 1}
        <li><a id="shoucImg" role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_collection.png" alt="" class="down"><p id="shouctext">取消收藏</p></a></li>
        {else}
        <li><a id="shoucImg" role="button"><img src="{CBL_MANGTU_RES}/home/images/shoucangimg.png" alt="" ><p id="shouctext">加入收藏</p></a></li>
        {/if}
        {if $shuqianhascollect==null}
        <li class="shuqian"><a><img src="{CBL_MANGTU_RES}/home/images/ic_bookmark@2x.png" alt="" id="shuqian" ><p id="shuqiantext">加入书签</p></a></li>
        {else}
        <li class="shuqian"><a><img src="{CBL_MANGTU_RES}/home/images/hasaddshuqian.png" alt="" id="shuqian" class="down"><p id="shuqiantext">删除书签</p></a></li>
        {/if}

        <li onclick="gonextchapter();"><a role="button"><img src="{CBL_MANGTU_RES}/home/images/ic_share.png" alt=""><p>下一章</p></a></li>
    </ul>
</div>
<div>
    <img  src="{CBL_MANGTU_RES}/home/images/home.png"  style="width:1rem;height:1rem;position:fixed;top:5%;right:0.4rem;z-index:9999;" onclick="goindex();"  alt="返回首页"  role="button"/>
</div>
<div style="display:none">
    <img class="changefont" src="{CBL_MANGTU_RES}/home/images/changesize.png" style="width:0.62rem;height:0.52rem;position: absolute;bottom:0.2rem;right:1.38rem;" alt="点击改变字体大小" role="button"/>
</div>
<script type="text/javascript" src="{CBL_MANGTU_RES}/home/js/jquery.min.js"></script>
<!--<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script>-->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script>
    var getvoice_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'getvoice'));}";
    var getvoice1_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'getvoice1'));}";
    var addreadlog_url = "{php echo $this->createMobileUrl('user',array('type'=>'AddReadLog'));}";
    var et = setTimeout(function(){
	    var DbCode='{$DbCode}';
	    var SysId='{$SysId}';
	    var ChapterIndex='{$ChapterIndex}';
        $.ajax({
            type : 'post',
            url : addreadlog_url,
            data:{DbCode:DbCode,SysId:SysId,ResType:2,ChapterIndex:ChapterIndex,credits:2},
            dataType : 'json',
            success : function(data) {
                console.log(data);
            },
        });
    }, 1000*120);
   
    /*function geaudio(pid){
        $.ajax({
            type : 'post',
            url : getvoice_url,
            data:{content:content},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    $('#ebookvoice').attr('src',data.src);
                }
            },
        });
    }*/
    $.each($(".rd-txt p"),function(){

        if(!$(this).text()){
            $(this).remove();
        };
        if($(this).text().length<2){
            $(this).remove();
        }
    });
    var i = 0 ;
    var txt = $(".rd-txt p").eq(i).text();//获取要转换的文字
	
		  	
		  	
    $(".rd-txt p").eq(i).css("color","#2580EE");
    var audio = document.getElementById('shVideo');
    txt = txt.replace(/\"/g, "");
    var url = getvoice1_url+"&txt="+txt;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.overrideMimeType('audio\/mp3; charset=x-user-defined');
    xhr.responseType = "blob";
    xhr.send();
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;
            console.log(blob);
            audio.onload = function(e) {
                window.URL.revokeObjectURL(audio.src);
            };
            audio.src = window.URL.createObjectURL(blob);

        }
    }

     //audio.src='{CBL_MANGTU_RES}/home/audio/audio.mp3'
    // 解决ios音乐不自动播放的问题
	 function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            var globalAudio=document.getElementById("shVideo");
            globalAudio.play();
        });
    };
	autoPlayAudio();
    //$("body").append('<audio id="shVideo" controls="controls" autoplay="autoplay" src="'+getvoice_url+'&txt='+zhuanmas+'" style="display: none"></audio>');

    slmsbf();

    function slmsbf(){
        zhuanma = '';
        audio.addEventListener('ended', function () {
            audio.src=null;
            i++;
            var aaa = $(".rd-txt p").length;
            console.log('总章节：'+aaa);
            console.log('当前章节：'+i);
           if(colorParam=='黑白对比度'){
	  		  $("#content").children('p').css("color", '#F7F7F7');
		  	}
		  	if(colorParam=='白蓝对比度'){
		  		 $("#content").children('p').css("color", '#0915F5');
		  	}
		  	if(colorParam=='蓝黄对比度'){
		  		  $("#content").children('p').css("color", '#FFFE54');
		  	}
		  	if(colorParam=='白红对比度'){
		  		  $("#content").children('p').css("color", '#C42A29');
		  	}
		  	if(colorParam=='白黑对比度'){
		  		 $("#content").children('p').css("color", '#000000');
		  	}
		  	if(colorParam=='黄黑对比度'){
		  		  $("#content").children('p').css("color", '#000000');
		  	}	
            $(".rd-txt p").eq(i).css("color","#2580EE");
           
		    //zhuanmas  = encodeURIComponent(txt);//转码
		    
            txt = $(".rd-txt p").eq(i).text();
            $(".rd-txt p").eq(i).addClass('active')
             $(".rd-txt p").eq(i).siblings().removeClass('active')
		    var top1=$(".active").offset().top;
		    if(top1>404){
		    	 $(".active").eq(i).slideUp('slow');
		    }
            txt = txt.replace(/\"/g, "");
            var url = getvoice1_url+"&txt="+txt;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.overrideMimeType('audio\/mp3; charset=x-user-defined');
            xhr.responseType = "blob";
            xhr.send();
            xhr.onload = function() {
                if (this.status == 200) {
                    var blob = this.response;
                    console.log(blob);
                    audio.onload = function(e) {
                        window.URL.revokeObjectURL(audio.src);
                    };
                    audio.src = window.URL.createObjectURL(blob);
                }
            }
            if(aaa<=i){
                //todo 此处阅读整章完毕，加积分
                console.log('本章阅读完毕');
                var DbCode='{$DbCode}';
                var SysId='{$SysId}';
                var ChapterIndex='{$ChapterIndex}';
                $.ajax({
                    type : 'post',
                    url : addreadlog_url,
                    data:{DbCode:DbCode,SysId:SysId,ResType:2,ChapterIndex:ChapterIndex,credits:10},
                    dataType : 'json',
                    success : function(data) {
                        console.log(data);
                    },
                });
                gonextchapter();
            }
        }, false);
    }

    // 开始暂停按钮
    function control(){
        var audio = document.getElementById('shVideo');

        if(audio!==null){
            if(audio.paused){
                audio.play();// 播放
                $(".zanimg").attr("src",'{CBL_MANGTU_RES}/home/images/zantimg.png');
                $(".zanimg").css({"width":"0.48rem","height":"0.48rem","margin-bottom":'0.2rem'})
                $('.kaishi p').text('暂停')
        	    document.body.addEventListener('touchmove',bodyScroll,false);
				$('.e-books').css({'overflow-y':'hidden'});
                
            }else{
                audio.pause();// 暂停
                $(".zanimg").attr("src",'{CBL_MANGTU_RES}/home/images/kaishi.png');
                $(".zanimg").css({"width":"0.48rem","height":"0.48rem","margin-bottom":'0.2rem'})
                $('.kaishi p').text('开始')
            	document.body.removeEventListener('touchmove',bodyScroll,false);
				$(".e-books").css({'overflow-y':'auto'});
                 
            }
        }
    }
    
 
    function bodyScroll(event){ 

    	event.preventDefault(); 

	}



</script>


<script>
	var writelog_url = "{php echo $this->createMobileUrl('user',array('type'=>'writeLog'));}";
    function requestFun(url,data){
	   	$.ajax({
			type : 'post',
			url : url,
			data: data,
			dataType : 'json',
			success : function(data) {
				console.log('data',data);
			},
		});
    }
    var mulu_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'catalog'));}";
    var pinglun_url="{php echo $this->createMobileUrl('ebooks',array('type'=>'comment'));}";
    var shuqian_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'addBookmark'));}";
    var shezhi_url = "{php echo $this->createMobileUrl('user',array('type'=>'integral'));}";
    var shouye_url = "{php echo $this->createMobileUrl('index',array('type'=>'index'));}";
    var deleteshuqian_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'deleteBookmark'));}";
    var chapter_url="{php echo $this->createMobileUrl('ebooks',array('type'=>'chapter'));}";
    var readsetting_url = "{php echo $this->createMobileUrl('ebooks',array('type'=>'readsetting'));}";
   window.onload=function(){
   		var heights=$(window).height()+'px';
   		console.log(heights)
   		$('.e-books').css('max-height',heights)
		var param = '{$sizeSet}'; 
		 colorParam ="{$textColor}"
	  	if(colorParam=='黑白对比度'){
	  		 $('html,.e-books').css('background-color', '#000');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#F7F7F7');
	  	}
	  	if(colorParam=='白蓝对比度'){
	  		 $('html,.e-books').css('background-color', '#fff');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#0915F5');
	  	}
	  	if(colorParam=='蓝黄对比度'){
	  		 $('html,.e-books').css('background-color', '#0915F5');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#FFFE54');
	  	}
	  	if(colorParam=='白红对比度'){
	  		 $('html,.e-books').css('background-color', '#fff');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#C42A29');
	  	}
	  	if(colorParam=='白黑对比度'){
	  		console.log('你回复了默认')
	  	}
	  	if(colorParam=='黄黑对比度'){
	  		 $('html,.e-books').css('background-color', '#FFFE54');
	  		 $('.e-books h3,h6,.rd-txt p').css('color', '#000000');
	  	}	
	  	if(param==1){
		$('.changefont').click()
		 
	  	}
	}
	
	$("body").on("touchstart", function(e) {
	    e.preventDefault();
	    startX = e.originalEvent.changedTouches[0].pageX;
	    startY = e.originalEvent.changedTouches[0].pageY;
	    
	});
	// $("body").on("touchmove", function(e) {
	//     e.preventDefault();
	//     moveEndX = e.originalEvent.changedTouches[0].pageX,
	//     moveEndY = e.originalEvent.changedTouches[0].pageY,
	//     X = moveEndX - startX,
	//     Y = moveEndY - startY;
	//     if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
	//         alert("像右滑动");
	//     }
	//     else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
	//         alert("像左滑动");
	//     }
	//     else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
	//         alert("下滑动");
	//     }
	//     else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
	//         alert("上滑动");
	//     }
	//     else{
	//         alert("触摸");
	//     }
	// });
	
     	// 切换字体
	$('.changefont').on('click', function () {
		$('.e-books h3').css('font-size', '0.44rem');
		$('.e-books h6').css('font-size', '0.32rem');
		$('#content p span').css('font-size', '0.38rem');
		$('.booksList li p').css('font-size', '0.30rem');
	})
	
     $(document).ready(function(){
		if(!audio.paused){
			document.body.removeEventListener('touchmove',bodyScroll,false);
			$(".e-books").css({'overflow-y':'auto'});
		}else{
			document.body.addEventListener('touchmove',bodyScroll,false);
			$('.e-books').css({'overflow-y':'hidden'});
			
		}
        $("#item3").click(function(){
            if ($("#item2").css("display")=="none"){
                $("#item2").css("display","block");
            }else{
                $("#item2").css("display","none");
            }
        });
    });
    //收藏
    var image1="{CBL_MANGTU_RES}/home/images/shoucangimg.png";
    var image2="{CBL_MANGTU_RES}/home/images/ic_collection.png"
    var hasshuqian="{CBL_MANGTU_RES}/home/images/hasaddshuqian.png";
    var noshuqian="{CBL_MANGTU_RES}/home/images/ic_bookmark@2x.png"
    var addcollectchapter_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'AddCollectChapter'));}";
    var deletecollectchapter_url ="{php echo $this->createMobileUrl('ebooks',array('type'=>'DeleteCollectChapter'));}";

    //通过id="ctr"获取元素click事件
    $("#shoucImg").click(function(){
        //将显示和隐藏两个状态下的显示图标路径放入images变量中
        // var images=['../dist/images/shoucangimg.png','../dist/images/ic_collection.png'];
        //通过class的值来判断控制显示的图标样式
        var Title='{$Title}';
        var DbCode='{$DbCode}';
        var SysId='{$SysId}';
        var CategoryCode='{$CategoryCode}';
        var Chapter='{$ChapterIndex}';
        var ImageUrl = '{$ImageUrl}';
        if($("#shoucImg img").attr("class")=="down"){//todo 取消章节收藏
            $.ajax({
                type : 'post',
                url : deletecollectchapter_url,
                data:{Title:Title,DbCode:DbCode,SysId:SysId,CategoryCode:CategoryCode,Chapter:Chapter},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        $("#shoucImg img").attr("src",image1);
                        $("#shoucImg img").removeClass();
                        $('#shouctext').html('加入收藏')
                    }
                },
            });

        }else{//todo 章节收藏
            $.ajax({
                type : 'post',
                url : addcollectchapter_url,
                data:{Title:Title,DbCode:DbCode,SysId:SysId,CategoryCode:CategoryCode,Chapter:Chapter,ImageUrl:ImageUrl},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        $("#shoucImg img").attr("src",image2);
                        $("#shoucImg img").addClass("down");
                        $('#shouctext').html('取消收藏')
                    }
                },
            });

        }

    });
    $(".shuqian").click(function(){
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var ChapterName = '{$ChapterName}';
        if($("#shuqian").attr("class")=="down"){//todo 删除书签
            var shuqianId = "{$shuqianhascollect['Id']}";
            $.ajax({
                type : 'post',
                url : deleteshuqian_url,
                data:{shuqianId:shuqianId},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        window.location.reload();
                        /*$("#shuqian").attr("src",noshuqian);
                        $("#shuqian").removeClass();
                        $('#shuqiantext').html('加入书签')*/
                    }
                },
            });

        }else{//todo 添加书签
            $.ajax({
                type : 'post',
                url : shuqian_url,
                data:{Title:Title,Identifier:Identifier,Chapter:ChapterIndex,ChapterName:ChapterName},
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    if(data.code == 0){
                        window.location.reload();
                        /*$("#shuqian").attr("src",hasshuqian);
                        $("#shuqian").addClass("down");
                        $('#shuqiantext').html('删除书签')*/
                    }
                },
            });
        }

    });
	data11 =  Date.parse(new Date());
	pushHistory();
	window.addEventListener("popstate",function(e){
		var curDate =  Date.parse(new Date());
		var DbCode = '{$DbCode}';
		var SysId = '{$SysId}';
		var Title = "{$data['Title']}";
		var CategoryCode = "{$CategoryCode}";
		$.ajax({
			type : 'post',
			url : writelog_url,
			data:{DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate,CategoryCode:CategoryCode,FangWenType:5},
			dataType : 'json',
			success : function(data) {
				console.log(data);
			},
		});
		window.history.go(-1);
	},false);
	
	function pushHistory(){
		var state={
			title:"title",
			url:"#"
		};
	window.history.pushState(state,"title","#");
	}

    //目录
    function muluPage(){
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var CategoryCode='{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=mulu_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&Title="+Title+"&CategoryCode="+CategoryCode;
    }
    //评论
    function pinglunPage(){
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var CategoryCode = '{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var ResType = 2
        var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=pinglun_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&Title="+Title+"&ChapterIndex="+ChapterIndex+"&ResType="+ResType;
    }
    //我的书签
    function shuqianPage(){
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = '{$ChapterIndex}';
        var ChapterName = '{$ChapterName}';
        $.ajax({
            type : 'post',
            url : shuqian_url,
            data:{Title:Title,Identifier:Identifier,Chapter:ChapterIndex,ChapterName:ChapterName},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    console.log(data.message);
                }else{
                    console.log(data.message);
                }
            },
        });
        //content = JSON.parse(Content);
        //window.location.href=shuqian_url;
    }
    function gonextchapter() {
        var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
        var Identifier='{$Identifier}';
        var Title = '{$Title}';
        var ChapterIndex = parseInt('{$ChapterIndex}')+1;
        var CategoryCode = '{$CategoryCode}';
        var curDate2 =  Date.parse(new Date());
        var ImageUrl = '{$ImageUrl}';
         var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        window.location.href=chapter_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&ChapterIndex="+ChapterIndex+"&Title="+Title+"&CategoryCode="+CategoryCode+"&ImageUrl="+ImageUrl;

    }
    function readsetting(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        window.location.href=readsetting_url;
    }
    //文本设置
    function wenbenPage(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=shezhi_url;
    }
    //返回首页
    function goindex(){
    	var DbCode = '{$DbCode}';
        var SysId = '{$SysId}';
		var Title = '{$Title}';
		var CategoryCode = '{$CategoryCode}';
		var curDate2 =  Date.parse(new Date());
    	var reqData={DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:3};
    	requestFun(writelog_url,reqData)
        //content = JSON.parse(Content);
        window.location.href=shouye_url;
    }
</script>



</body>

</html>
