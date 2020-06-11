
$(document).ready(function(){
   
    var colors=['#000000','#FFFFFF','#0915F5','#FFFFFF','#FFFE54','#F7F7F7'];
    var fontColor=['#F7F7F7','#0915F5',"#FFFE54","#C42A29","#000000",'#333333']
    var fontSize=['24px','36px','48px']
    var idx=0;
    var index=0;
    $('.changefbgcolor').on('click',function(){
        $('body').css('background-color',colors[idx]);
        console.log(colors[idx])
        idx++;
        if(idx==colors.length)idx=0;

        $('body').css('color',fontColor[index]);
        console.log(fontColor[index])
        index++;
        if(index==fontColor.length)index=0;
    });
    $('.changefont').on('click',function(){
        $('body').css('font-size',fontSize[idx]);
        console.log(fontSize[idx])
        idx++;
        if(idx==fontSize.length)idx=0;
    });
});