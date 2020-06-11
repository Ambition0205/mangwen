 //通过id="ctr"获取元素click事件
 $("#shoucImg1").click(function(){
    //将显示和隐藏两个状态下的显示图标路径放入images变量中
    var images=['../dist/images/shoucangimg.png','../dist/images/ic_collection.png'];
    //通过class的值来判断控制显示的图标样式
    if($("#shoucImg1 img").attr("class")=="down"){
    $("#shoucImg1 img").attr("src",images[0]);
    $("#shoucImg1 img").removeClass();
    $('#shouctext').html('收藏')
    }else{
    $("#shoucImg1 img").attr("src",images[1]);
    $("#shoucImg1 img").addClass("down");
    $('#shouctext').html('已收藏')
    }

  });  