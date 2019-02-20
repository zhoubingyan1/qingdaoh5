var energy = 0;
var sond_1 = new Audio();
var sond_2 = new Audio();
sond_1.src = "../images/audio/bg-music.mp3";
sond_2.src = "../images/audio/boom.mp3";
sond_1.loop = "loop";
sond_1.play();
$(document).one('click',function() {
    sond_1.play();
});
document.addEventListener('DOMContentLoaded', function () {
	(function audioAutoPlay() {
			document.addEventListener("WeixinJSBridgeReady", function () {
				sond_1.play();
				sond_2.play();
				sond_2.pause();
			}, false);
		})();
    });
    alert($(window).height());
        $(".rule-btn").click(function() {
            $(".rule-pop").show(500);
        })
        $(".rule-pop").click(function() {
            $(this).hide(500);
        })
        $(".res-pop").click(function() {
            $(this).hide(500);
            TweenMax.to("#CanvasBody",1,{autoAlpha:0,onComplete:function() {
                TweenMax.to("#lihePage",1,{autoAlpha:1})
                
                // TweenMax.to("#liheTwoPage",1,{autoAlpha:1,onComplete:function() {
                //     $(".name").val("222");
                //     $(".phone").val("222");
                //     $(".address").val("222");
                // }})
                // TweenMax.to("#endPage",1,{autoAlpha:1})
                // TweenMax.to("#fPage",1,{autoAlpha:1})
                // TweenMax.to("#tPage",1,{autoAlpha:1})
            }})
        })
        $(".wei-pop").click(function() {
            $(this).hide(500);
            stop = false;
            startFall();
            count_down(5);
        })
        $(".share").click(function() {
            $(".share-pop").show(500);
        })
        $(".share-pop").click(function() {
            $(this).hide(500);
        })
        $(".enter-btn").click(function() {
            createjs.Ticker.removeAllEventListeners();
            TweenMax.to(".text-left",1,{left:-90});
            TweenMax.to(".text-right",1,{right:-90});
            TweenMax.to("#homePage",1.5,{autoAlpha:0,onComplete:function() {
                $("#homePage").hide();
                TweenMax.to("#countBox",0,{autoAlpha:1,onComplete:function() {
                    count();
                }})
            }});
        })
        $(".form-btn").click(function() {
            $(".form-pop").show(500);
        })
        $(".close").click(function() {
            $(".form-pop").hide(500);
        })
        $("#submit").click(function() {
            var name = $("#na").val();
            var phone = $("#ph").val();
            var address = $("#add").val();
            if(!$.trim(name)) {
                alert("请输入姓名！")
                return;
            }
            if(!isMobile(phone)) {
                alert("请输入正确的手机号！")
                return;
            }
            if(!$.trim(address)) {
                alert("请输入收货地址！")
                return;
            }
            $(".form-pop").hide(500);
            alert("领取成功！");
        })
        function isMobile(mobile){
            var patt =/^1[34578]{1}\d{9}$/;
            var re = new RegExp(patt);
            if(re.test(mobile)){
                return true;
            }else{
                return false;
            }
        }
        // 开始下落能量核
        var stop = false;
        function startFall() {
            if(stop) {
                return;
            }
            createBeer();
            var time = parseInt(Math.random()*1000+100); 
            setTimeout(startFall,time);
        }
        // 点击能量核
        $("body").on("touchstart",".energy",function(e) {
            var init_left = Math.random()*(document.documentElement.clientWidth-272);
            var left = parseInt($(this).css("left"));
            var top = parseInt($(this).css("top"));
            sond_2.play();
            $(this).children(".nlz").hide();
            $(this).stop().animate({left:"560px",top:"112px",width:0,height:0,opacity:0},500,function() {
                $(this).remove();
                sond_2.pause();
                sond_2.currentTime = 0.0;
                energy++;
                var energyNum = energy>9?energy:'0'+energy;
                $(".num").text(energyNum);
                // createBeer();
            });
            boom(left,top);
                
        })
        // 能量核下落
        function fall(o) {
            var obj = o;
            var w = parseInt(Math.random()*150+100); 
            var left = parseInt(Math.random()*(document.documentElement.clientWidth)); 
            var top = parseInt(Math.random()*(document.documentElement.clientHeight)); 
            var cur_l = parseInt(Math.random()*(document.documentElement.clientWidth-250));
            var cur_t = parseInt(Math.random()*600);
            var last_l = parseInt(Math.random()*(document.documentElement.clientWidth));
            var last_t = parseInt(Math.random()*1000);
            var time =  parseInt(Math.random()*400);
            $(obj).css({left:left,top:top});
            $(obj).animate({top: cur_t,left:cur_l,width:w,height:w},time,function(){
                setTimeout(function(){
                    $(obj).animate({top:last_t,left:last_l,width:0,height:0},300,"swing",function() {
                        $(obj).remove();
                    })
                },time);
            });
        }
        // 创建能量核
        function createBeer() {
            var beer = "<div class='energy'><div class='nlz'></div><div class='pjp'></div></div>";
            beer = $(beer).css({width:0,height:0});
            $('#CanvasBody').append(beer);
            fall(beer);
        } 
        // 能量核爆炸
        function boom(left,top) {
            var canvas = document.createElement("canvas");
            canvas.style.position = "absolute";
            canvas.width = 200;
            canvas.height = 200;
            canvas.style.zIndex = 103;
            canvas.style.left = left+"px";
            canvas.style.top = top+"px";
            var ctxt=canvas.getContext("2d");
            $("#CanvasBody").append(canvas);
            var n = 1;
            var t = setInterval(function(){
                ctxt.clearRect(0,0,canvas.width,canvas.height);
                var a = ctxt.drawImage(queue.getResult("s2_"+n),0,0,200,200);
                n++;
                if(n>5) {
                    ctxt.clearRect(0,0,canvas.width,canvas.height);
                    clearInterval(t);
                    $(canvas).remove();
                }
            },100)
        }
        // 全景开始倒计时
        function count(){
            var s3_canvas = document.getElementById("s3_canvas");
            stage = new createjs.Stage(s3_canvas);
            createjs.Ticker.setFPS(10);
            createjs.Ticker.addEventListener("tick", handleTick);
            var pageIndex=0;
            function handleTick(event) {
                var page = new createjs.Bitmap(queue.getResult("s3_"+pageIndex));
                pageIndex++;
                if(pageIndex > 27){
                createjs.Ticker.removeAllEventListeners();
                TweenMax.to("#countBox",0,{autoAlpha:0});
                TweenMax.to("#CanvasBody",0.5,{autoAlpha:1,onComplete:function() {
                    count_down(5);
                    setTimeout(function(){
                        startFall();
                    },2000)
                }})
                }
                stage.removeAllChildren();
                stage.addChild(page);
                stage.update();
            }
        }
        function animation(){
            var s1_canvas = document.getElementById("s1_canvas");
            stage = new createjs.Stage(s1_canvas);
            createjs.Ticker.setFPS(10);
            createjs.Ticker.addEventListener("tick", handleTick);
            var pageIndex=0;
            function handleTick(event) {
                var page = new createjs.Bitmap(queue.getResult("s1_"+pageIndex));
                pageIndex++;
                if(pageIndex > 19){
                // createjs.Ticker.removeAllEventListeners();
                    pageIndex = 0;
                }
                stage.removeAllChildren();
                stage.addChild(page);
                stage.update();
            }
        }
        function count_down(t) {
            t--;
            var str_t = t<10 ? "0"+t : t;
            if(t<0) { 
                $(".energy").stop();
                $(".energy").remove();
                stop = true;
                if(energy == 0) {
                    $(".wei-pop").show(1000);
                    return
                }
                var energyNum = energy>9?energy:'0'+energy;
                $(".res-pop").show(1000);
                $(".comp-num").text(energyNum);
                return;
            };
            $(".count-down").text("00:"+str_t);
            setTimeout(count_down,1000,t);
        }

    var camera,//摄像机
        scene,//舞台
        renderer,//渲染器
        isUserInteracting = false,//用户是否正在操作
        onMouseDownMouseX = 0, onMouseDownMouseY = 0,//鼠标点击的x和Y坐标
        lon = 0, onMouseDownLon = 0, onPointerDownLon= 0.0,onPointerDownPointerX = 0,//经度
        lat = 0, onMouseDownLat = 0, onPointerDownLat= 0.0,onPointerDownPointerY = 0,//纬度
        phi = 0, theta = 0,//计算相机位置的重要参数
        o = new Orienter(),//陀螺仪方法对象
        new_longitude=0,last_longitude=0,move_longitude=0,//改变的经度的计算
        new_latitude=0,last_latitude=0,move_latitude=0,//改变的纬度的计算
        is_touch=false,is_start=false,isPlay=true,isMusicPlay=true,tsa=100.1,ppl='';

    function init() {/**初始化**/
        var container;
        container = document.getElementById( 'CanvasBody' );//容器
        /**
    * 添加相机
     * @type {THREE.PerspectiveCamera}
     */
    camera = new THREE.PerspectiveCamera( 
        75, // 相机视角的夹角
        window.innerWidth / window.innerHeight,  // 相机画幅比
        1, // 最近焦距
        1000 // 最远焦距
        ); 
        camera.target = new THREE.Vector3( 0, 0, 0 );
    /**
     * 创建场景
     * @type {THREE.Scene}
     */
    scene = new THREE.Scene();
    /**
     *正方体的6个面的资源及相关（坐标、旋转等）设置
     */
    var flipAngle = Math.PI, // 180度
        rightAngle = flipAngle / 2, // 90度
        tileWidth = 512; 
    var sides = [{
        url: "images/2.jpg", //right
        position: [-tileWidth, 0, 0],
        rotation: [0, rightAngle, 0]
    }, {
        url: "images/0.jpg", //left    
        position: [tileWidth, 0, 0],
        rotation: [0, -rightAngle, 0]
    }, {
        url: "images/4.jpg", //top
        position: [0, tileWidth, 0],
        rotation: [rightAngle, 0, Math.PI]
    }, {
        url: "images/5.jpg", //bottom
        position: [0, -tileWidth, 0],
        rotation: [-rightAngle, 0, Math.PI]
    }, {
        url: "images/1.jpg", //front
        position: [0, 0, tileWidth],
        rotation: [0, Math.PI, 0]
    }, {
        url: "images/3.jpg", //back
        position: [0, 0, -tileWidth],
        rotation: [0, 0, 0]
    }];
    for ( var i = 0; i < sides.length; i ++ ) {
        var side = sides[ i ];
        var element = document.getElementById("bg_section_"+i);
        element.width = 1040;
        element.height = 1040; // 2 pixels extra to close the gap.
        // 添加一个渲染器
        var object = new THREE.CSS3DObject( element );
        object.position.fromArray( side.position );
        object.rotation.fromArray( side.rotation );
        scene.add( object );

    }

    renderer = new THREE.CSS3DRenderer(); // 定义渲染器
    renderer.setSize( window.innerWidth, window.innerHeight ); // 定义尺寸
    document.getElementById("CanvasBody").appendChild( renderer.domElement ); // 将场景到加入页面中

        //鼠标、手机touch的各个事件
        document.getElementById("CanvasBody").addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.getElementById("CanvasBody").addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.getElementById("CanvasBody").addEventListener( 'mouseup', onDocumentMouseUp, false );

        document.getElementById("CanvasBody").addEventListener( 'touchstart', onDocumentTouchDown, false );
        document.getElementById("CanvasBody").addEventListener( 'touchmove', onDocumentTouchMove, false );
        document.getElementById("CanvasBody").addEventListener( 'touchend', onDocumentTouchUp, false );
    };
//监听横竖屏重新设置尺寸
function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    function onDocumentMouseDown( event ) {
        // event.preventDefault();
        isUserInteracting = true;
        onPointerDownPointerX = event.clientX;
        onPointerDownPointerY = event.clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
    }
    function onDocumentMouseMove( event ) {
        if ( isUserInteracting === true ) {
            lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
            lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
        }
    }
    function onDocumentMouseUp( event ) {
        isUserInteracting = false;
    }

    //  touch event start
    function onDocumentTouchDown( event ) {
        is_touch=true;

        // event.preventDefault();
        isUserInteracting = true;
        onPointerDownPointerX = event.touches[ 0 ].clientX;
        onPointerDownPointerY = event.touches[ 0 ].clientY;
        if(is_start){
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }
    }
    function onDocumentTouchMove( event ) {
        if(is_start){
            if ( isUserInteracting === true ) {

                lon = ( onPointerDownPointerX - event.touches[ 0 ].clientX ) * 0.1 + onPointerDownLon;
                lat = ( event.touches[ 0 ].clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
            }
        }
    }
    function onDocumentTouchUp( event ) {
        is_touch=false;
    }
    function animate() {//播放动画
        if(isPlay){
            // TWEEN.update();
            update();
            requestAnimationFrame( animate );
        }

    }
    o.onOrient = function (obj) {//重力感应计算角度
        if(is_start){
            //最新经度
            new_longitude = obj.lon;
            move_longitude=new_longitude-last_longitude;

            //最新纬度
            new_latitude = obj.lat;
            move_latitude = last_latitude-new_latitude;

            //判断经纬度
            if(move_longitude>=300){
                move_longitude=move_longitude-361;
            }else if(move_longitude<=-300){
                move_longitude=move_longitude+359;
            }


            if(move_latitude>=300){
                move_latitude=move_latitude-361;
            }else if(move_latitude<=-300){
                move_latitude=move_latitude+359;
            }

            if( is_touch ){
                move_longitude=0;
                move_latitude=0;
            }else{
                move_longitude=move_longitude;
                move_latitude=move_latitude;
            }
            //计算得出重力感应的经纬度
            lon=lon-move_longitude;
            last_longitude = obj.lon;
            lat = lat-move_latitude;
            last_latitude = obj.lat;
        }

    };

    function update() {//更新摄像机位置，旋转平移
        //lat = Math.max( -6, Math.min( 6, lat ) );//设置lat纬度的范围，只在一个范围内旋转
        // phi = THREE.Math.degToRad( 90 - lat );
        // theta = THREE.Math.degToRad( lon );
        lat = Math.max(-85, Math.min(85, lat)); //限制固定角度内旋转
        phi = THREE.Math.degToRad(85-lat);
        theta = THREE.Math.degToRad(lon+180);
        camera.target.x = Math.sin( phi ) * Math.cos( theta );//X轴的坐标
        camera.target.y = Math.cos( phi );//y轴的坐标
        camera.target.z = Math.sin( phi ) * Math.sin( theta ) ;//z轴的坐标
        camera.lookAt( camera.target );
        renderer.render( scene, camera );//重新渲染
    }
    //执行所有
    is_start=true;
    init();
    o.init();
    animate();