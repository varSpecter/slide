;(function($){
	
	var slide = function(){

		"use strict";

		var $slide = $("#slide"),
			$item = $slide.children(), 
        	cIndex = 0, // 현재 인덱스
	        option = { // 슬라이드 옵션 
	            speed: 700 ,
	            ease: "easeOutQuint",
	            width : "100%"
	        },
	        //웹동네 참고
	        motion = function( nIndex ){

		       if( $(":animated").length ) {
		       		return false;
		       };

		       var $cItem = $item.eq(cIndex), //현재 이미지
		       	   $nItem = $item.eq(nIndex); // 다음 이미지	   

		       $cItem.animate({
		           left: (arguments[1] === "prev") ? option.width : "-" + option.width 
		       }, option.speed, option.ease);
		       $nItem.css({
		           left: (arguments[1] === "prev") ? "-" + option.width : option.width
		       });
		       $nItem.animate({
		            left: 0
		       }, option.speed, option.ease);

		       cIndex = nIndex;	// 현재 이미지 인덱스에 다음이미지 인덱스값 넣기.

		       $(".pager-btn a").removeClass()
		       .eq(cIndex).addClass("on");

		       return false;

	        },
	        nextMotion = function(){
	            if(cIndex + 1 >= $item.length) {
	                motion(0);
	            } 
	            else {
	                motion(cIndex + 1);
	            };	        	
	        },
	        prevMotion = function(){
	            if(cIndex === 0) {
	                motion($item.length-1, "prev");
	            } 
	            else {
	                motion(cIndex-1, "prev");
	            };	        	
	        },
	        pagerEvent = function( uIndex ){ 
		        if(uIndex !== cIndex) {
		            (uIndex > cIndex) ? motion(uIndex) : motion(uIndex, "prev");
		        };	        	
	        },
	        keyEvent = function(){
	        	if( event.keyCode === 39 ) { 
	        		nextMotion();
	        	}
	        	else if( event.keyCode === 37 ) {
	        		prevMotion();
	        	}
	        };

	        /* 페이지 버튼 생성 */
	        (function(){
	        	$("#slideWrapper").append(function(){
	        		var obj = $("<ol></ol>")
	        		.addClass("pager-btn clearfix");

	        		for(var i = 0; i < $item.length; i++){
	        			obj.append(
	        				$("<li></li>")
	        				.append(
	        					$("<a></a>")
	        					.attr( { "href" : "#none", "class" : ( !i ) ? "on" : ""} )
	        					.text( i )
	        					.click(function(){

							        if( $(":animated").length ) {
							       		 return false;
							        }

	        						$(".pager-btn a").removeClass();
	        						$(this).addClass("on");

	        						pagerEvent( $(this).parent().index() ); //페이져 버튼 이벤트

	        					})
	        				)
	        			);
	        		}; // for end
	        		return obj;
	        	});// append end
	        }());

	        /* 다음, 이전 버튼 */
	        $("#slide-next").on("click" , nextMotion);
	        $("#slide-prev").on("click" , prevMotion);
	        $("body").on("keydown" , keyEvent);
	        $("a[href='#none']").on( "click" ,function(){ 
	        	return false; 
	        } );
            
	}; //slide end
	$(document).ready(slide);
}( window.jQuery ));