
var queue = new createjs.LoadQueue(true);
var loadImgList = [];
function getNum(num,imgsrc){
  var prefix = imgsrc;
  var src="";
  num = num+'';
  if(num.length==1){
    src = prefix+"0"+num;
  }else if(num.length==2){
    src = prefix+num;
  }
  return src;
}
function getStr(num,id_prefix,endnum,imgsrc,hz){
  var count =0;
  for(var i=num;i<endnum;i++){
    count++
    var str = {id:""+id_prefix+count+"",src:""+getNum(i,imgsrc)+hz};
    loadImgList.push(str);
  }
}
function preload(){
  //追加图片
  if(window.screen.height > 800) {
    getStr(0,"s1_",20,"images/Page1X/Page1_",".jpg");
    getStr(0,"s3_",28,"images/countX/Countdown_",".jpg");
    $("#s1_canvas").attr("height",1290);
    $("#s3_canvas").attr("height",1290);
    $("#homePage").css({background:"url('../images/Page1X/Page1_00.jpg') 0 0 no-repeat"});
    $("#lihePage").css({background:"url('../images/lihe-bgX.jpg') 0 0 no-repeat"});
    $("#endPage,#fPage,#tPage").css({background:"url('../images/linqX.jpg') 0 0 no-repeat"});
    $(".form-btn").css({top:1060});
    $(".share").css({top:1060});
    $(".endtext").css({top:880});
    $(".stext").css({top:1012});
    $(".tz").css({top:1060});
    $(".box").css({minHeight:1290});
  }else {
    getStr(0,"s1_",20,"images/Page1/Page1_",".jpg");
    getStr(0,"s3_",28,"images/count/Countdown_",".jpg");
  }
  getStr(0,"s2_",5,"images/222/OrbExplode_",".png");
  queue.installPlugin(createjs.Sound);
   queue.on("progress", handleLoadStart);
   queue.on("complete", handleComplete);
   queue.setMaxConnections(5);
   queue.loadManifest(loadImgList);
}

function handleLoadStart(event) {
  document.getElementById("loading_text").innerHTML = Math.floor(queue.progress * 100) + "%";
}
function handleComplete() {
  TweenMax.to("#loading",0.5,{autoAlpha:0,onComplete:function() {
    animation();
    TweenMax.to(".text-left",1,{left:90});
    TweenMax.to(".text-right",1,{right:90});
  }});
  TweenMax.to("#homePage",1,{autoAlpha:1,onComplete:function() {
    $(".rule-pop").show(500);
  }});
}
