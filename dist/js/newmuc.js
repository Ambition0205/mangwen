var playStatus = 1;
var curDate2 =  Date.parse(new Date());

musicfc = document.getElementById("musicfc"),
volume = 1,
musicLoop = '',
arrMusic = new Array(),
nowPlayNum = musicKey;
onlyLoop = 0,
arrMusicNum = 0,
allTime = 0,
currentnum = 0,
currentTime = 0,
lycArray = new Array();

function createLrc(lycText) {
    lycArray = new Array();
    var medis = lycText;
    if (!lycText) {
        return false;
    }
    var lycs = new Array();
    var medises = medis.split("\n");
    $.each(medises,
    function(i, item) {
        var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
        lycArray.push({
            t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
            c: item.substring(item.indexOf("]") + 1, item.length)
        });
    });

}

function jsonToArray(json) {
    arrMusic = new Array();
    if (json === null && json.toString() === '') {
        console.log('json error');
        return false;
    }
    for (var item in json) {
        arrMusic[item] = json[item];
    }
    attrMusic(arrMusic[nowPlayNum]);
    arrMusicNum = arrMusic.length;
    
}

jsonToArray(musicJson);

setInterval(function() {
    for (i = 0; i < lycArray.length; i++) {
        if (parseInt(lycArray[i].t) <= parseInt(currentTime + 0.1) && parseInt(lycArray[i + 1].t) >= parseInt(currentTime + 0.1)) {
            currentnum = i;
        }
    }
},
1000);

musicfc.ontimeupdate = function() {
    if (lycArray.length > 0) {
        if (currentnum == lycArray.length - 1 && musicfc.currentTime.toFixed(3) >= parseFloat(lycArray[currentnum].t)) {
            $('#lyctext').html(lycArray[currentnum].c);
        }
        if (parseInt(lycArray[currentnum].t) <= parseInt(musicfc.currentTime + 0.1) && parseInt(musicfc.currentTime + 0.1) <= parseInt(lycArray[currentnum + 1].t)) {
            if (musicfc.currentTime > 0) {
                $('#lyctext').html(lycArray[currentnum].c);
            }
            currentnum++;
        }
    }
    allTime = musicfc.duration;
    timeChange(allTime)
    if (allTime) {
        currentTime = musicfc.currentTime;
        $('.circleLight').css('background-color', 'hsla(' + Math.ceil(360 * Math.abs(currentTime / allTime)) + ',80%,50%,0.5)');
        var PlayProgress = Math.round(currentTime / allTime * 10000) / 100;
        $('#PlayProgress').val(PlayProgress);
        $('#currentTime').html(s_to_hs(currentTime));
        $('#PlayProgress').css("background-size", PlayProgress + "% 100%");
    }
};

function autoPlay() {
    playStatus = 1;
    musicfc.play();
    $(".play").attr("src",  "../addons/cbl_mangtu/assets/home/images/kaishiimg.png");
    $('#round_icon').addClass('play-tx2');
}

function stopPlay() {
    playStatus = 0;
    musicfc.pause();
    $(".play").attr("src",  "../addons/cbl_mangtu/assets/home/images/zanting.png");
    $('#round_icon').removeClass('play-tx2');
}

$('.play').click(function() {
    if (playStatus === 0) {
        autoPlay();
    } else {
        stopPlay();
    }
});

$('.play-left').click(function() {
    prevMusic();
    if (playStatus == 1) {
        autoPlay();
    	checkcollect()
    	musicfc.playbackRate=speed[(iNum-1)%speed.length]
    }
});

$('.play-right').click(function() {
    nextMusic();
    if (playStatus == 1) {
        autoPlay();
        checkcollect()//收藏
        $("#div1 ul").children('li').removeClass();
    	$("#div1 ul li").eq(nowPlayNum).addClass('active');
    	musicfc.playbackRate=speed[(iNum-1)%speed.length]
    }
    	
    
});
//收藏

function checkcollect(){
    var ChapterIndex = $("#ChapterIndex").val();
    $.ajax({
        type : 'post',
        url : checkcollect_url,
        data:{Title:Title,ChapterIndex:ChapterIndex},
        dataType : 'json',
        success : function(data) {
            console.log(data);
            if(data.code == 0){
                $("#shoucang").addClass("down");
                $("#shoucang").attr("src", "../addons/cbl_mangtu/assets/home/images/redxin.png")
            }else{
                $("#shoucang").removeClass();
                $("#shoucang").attr("src", "../addons/cbl_mangtu/assets/home/images/sangimg.png")
            }
        },
    });
}
$("#shoucang").click(function() {
    var ChapterIndex = $("#ChapterIndex").val();
    //console.log($("#shoucang").attr("class"));return false;
    if($("#shoucang").attr("class")=="down"){
        $.ajax({
            type : 'post',
            url : deletecollect_url,
            data:{ChapterIndex:ChapterIndex,DbCode:DbCode,SysId:SysId},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    $("#shoucang").removeClass();
                    $("#shoucang").attr("src", "../addons/cbl_mangtu/assets/home/images/sangimg.png")
                }
            },
        });

    }else{
        $.ajax({
            type : 'post',
            url : addcollect_url,
            data:{Title:Title,ChapterIndex:ChapterIndex,DbCode:DbCode,SysId:SysId,CategoryCode:CategoryCode,ImageUrl:ImageUrl},
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code == 0){
                    $("#shoucang").addClass("down");
                    $("#shoucang").attr("src", "../addons/cbl_mangtu/assets/home/images/redxin.png")
                }
            },
        });
    }

});
//留言
$("#liuyan").click(function() {
    var ChapterIndex = $("#ChapterIndex").val();

    console.log('CategoryCode',CategoryCode)
    console.log('data11',data11)
    console.log('curDate2',curDate2)
	$.ajax({
		type : 'post',
		url : writelog_url,
		data:{DbCode:DbCode,Title:Title,SysId:SysId,StartDateTime:data11,EndDateTime:curDate2,CategoryCode:CategoryCode,FangWenType:2},
		dataType : 'json',
		success : function(data) {
			console.log('data',data);
		},
	});
    //content = JSON.parse(Content);
    // window.location.href=pinglun_url+"&DbCode="+DbCode+"&SysId="+SysId+"&Identifier="+Identifier+"&Title="+Title+"&ChapterIndex="+ChapterIndex+"&Identifier="+Identifier;
});
function changsong(chapter){
    nowPlayNum = chapter-1;
    attrMusic(arrMusic[nowPlayNum]);
}

function attrMusic(arr) {
    if (arr && arr.hasOwnProperty('url')) {
        musicfc.src = arr['url'];
        $('#round_icon').attr("src", arr['pic']);
        $('.songname').html(arr['title']);
        $('.songnames').html(arr['author']);
        $('#ChapterIndex').val(arr['ChapterIndex']);
        allTime = musicfc.duration;
        currentTime = musicfc.currentTime;
        $('.fa-play-circle').attr("src",'../addons/cbl_mangtu/assets/home/images/kaishiimg.png')
        createLrc(arr['lyc']);
        currentnum = 0;
    }
}

function prevMusic() {
    nowPlayNum--;
    if (nowPlayNum < 0) {
        nowPlayNum = arrMusic.length - 1;
    }
    $("#div1 ul").children('li').removeClass()
    $("#div1 ul li").eq(nowPlayNum).addClass('active')
    $("#div1 ul").children('li').removeClass().children('img').addClass("none");
    $("#div1 ul li").eq(nowPlayNum).addClass('active').children('img').removeClass('none');
    attrMusic(arrMusic[nowPlayNum]);
    changered();
}

function nextMusic() {
    nowPlayNum++;
    if (nowPlayNum > arrMusicNum) {
        nowPlayNum = 0;
    }
    $.ajax({
        type : 'post',
        url : addhistory_url,
        data:{DbCode:DbCode,SysId:SysId,Title:Title,CategoryCode:CategoryCode,Identifier:Identifier,ImageUrl:ImageUrl,ChapterIndex:nowPlayNum},
        dataType : 'json',
        success : function(data) {
            console.log('data',data);
        },
    });

    $("#div1 ul").children('li').removeClass();
    $("#div1 ul li").eq(nowPlayNum).addClass('active');
    $("#div1 ul").children('li').removeClass().children('img').addClass("none");
    $("#div1 ul li").eq(nowPlayNum).addClass('active').children('img').removeClass('none');
    attrMusic(arrMusic[nowPlayNum]);
    changered();
}

musicfc.addEventListener('ended',
function() {
    if (playStatus == 1) {
        if (onlyLoop == 0) {
            nextMusic();
            autoPlay();

        }
    } else {
        playStatus = 0;
        musicfc.pause();
        $(".play").attr("src",  "../addons/cbl_mangtu/assets/home/images/kaishiimg.png");
        $('#round_icon').removeClass('play-tx2');
    }
    currentnum = 0;
},
false);

function PlayProgress(val) {
    if (allTime && val) {
        musicfc.currentTime = Math.round(allTime * val / 100);
        $('#PlayProgress').css("background-size", val + "% 100%");
    }
}

function cycle(loop) {
    if (loop == true) {
        musicfc.addEventListener("ended", autoPlay, false);
    } else {
        musicfc.removeEventListener("ended", autoPlay, false);
    }
}

function timeChange(time) {
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var second = time % 60;
    seconds = parseInt(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var allTimes = "" + minutes + "" + ":" + "" + seconds + ""
     $('#totalTime').html(allTimes);
    return allTimes;
}
function s_to_hs(time){
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var h;
        var s=Math.ceil(time)
        h  =   Math.floor(s/60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        s  =   s%60;
        //将变量转换为字符串
        h    +=    '';
        s    +=    '';
        //如果只有一位数，前面增加一个0
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
    }
    
var dsq;
var scale = function(btn, bar) {
    this.btn = document.getElementById(btn);
    this.bar = document.getElementById(bar);
    this.step = this.bar.getElementsByTagName("DIV")[0];
};
scale.prototype = {
    start: function(x) {
        var f = this,
        g = document,
        b = window,
        m = Math;
        f.btn.style.left = x + 'px';
        this.step.style.width = Math.max(0, x) + 'px';
    }
}

var scale2 = new scale('progressBtn', 'progressBar');
var colseBar = function() {
    clearInterval(dsq);
    dsq = setTimeout(function() {
        $('#progressBar').hide(1000);
    },
    3000);
}

Sition('round_icon', 'clicked',
function() {
    if (playStatus == 0) {
        autoPlay();
    } else {
        stopPlay();
    }
});

Sition('fcmusic', 'rightDownIng',
function() {
    //autoPlay();
    musicfc.currentTime = currentTime + 5;
    if (musicfc.currentTime > allTime) {
        musicfc.currentTime = allTime;
    }
    currentTime = musicfc.currentTime;
});

Sition('fcmusic', 'leftDownIng',
function() {
    musicfc.currentTime = currentTime - 5;
    if (musicfc.currentTime < 0) {
        musicfc.currentTime = 0;
    }
    currentTime = musicfc.currentTime;
});

Sition('fcmusic', 'rightCenter',
function() {
    nextMusic();
    if (playStatus == 1) {
        autoPlay();
    }
});
Sition('fcmusic', 'leftCenter',
function() {
    prevMusic();
    if (playStatus == 1) {
        autoPlay();
    }
});

Sition('fcmusic', 'leftUp',
function() {
    cycle(true);
    $.alertView("已开启单曲循环");
    onlyLoop = 1;
});
Sition('fcmusic', 'rightUp',
function() {
    cycle(false);
    $.alertView("已关闭单曲循环");
    onlyLoop = 0;
});
Sition('fcmusic', 'upRightIng',
function(ev) {
    volume += 0.02;
    if (volume > 1) {
        volume = 1;
    }
    $('#progressBar').show();
    musicfc.volume = volume;
    var progressWidth = $('.scale_panel').width();
    if (progressWidth >= progressWidth * volume) {
        scale2.start(progressWidth * volume - 8);
    } else {
        scale2.start(progressWidth * volume);
    }
    colseBar();
});
Sition('fcmusic', 'downRightIng',
function(ev) {
    volume -= 0.02;
    if (volume <= 0) {
        volume = 0;
    }
    $('#progressBar').show();
    musicfc.volume = volume;
    var progressWidth = $('.scale_panel').width();
    scale2.start(progressWidth * volume);
    colseBar();
});
Sition('fcmusic', 'downCenter',
function(ev) {
    $('#tools').hide();
});
Sition('fcmusic', 'upCenter',
function(ev) {
    $('#tools').show();
});


function changered(){
    Chapter = $('#div1 ul li.active input').val();
    $.ajax({
        type : 'post',
        url : checkcollectchapter_url,
        data:{Title:Title,ChapterIndex:Chapter},
        dataType : 'json',
        success : function(data) {
            console.log(data);return false;
            if(data.code == 0){
                //todo 表示已收藏，变为i红心
                $("#shoucang").src();
            }
        },
    });
}
