$(function jmcScript(){
	$('.tooltips').tooltip({
		animation : false 
	});	
	$('nav a').each(function(){
		var title = $(this).text();
		$(this).attr('title',title);
	});

	$('[type=reset]').attr('tabindex','-1');

	$('.navbar-header .mobile-toggler').on('click',function(){
		if($('#jmc_sidebar').hasClass('pull')){
			$('#jmc_sidebar').removeClass('pull');
		} else {
			$('#jmc_sidebar').addClass('pull');
		}
	});
	
});
$(function layout(){
	$('.layout').each(function(){	

		var north 	= $(this).children('.layout-north').outerHeight() || 0,
			south	= $(this).children('.layout-south').outerHeight() || 0,
			east	= $(this).children('.layout-east').outerWidth() || 0,
			west	= $(this).children('.layout-west').outerWidth() || 0;

		$(this).children('.layout-center').css({'top':north, 'right':east, 'bottom':south, 'left':west});
		$(this).children('.layout-west').css({'top':north, 'bottom':south});
		$(this).children('.layout-east').css({'top':north, 'bottom':south});

	});

});

/* Sidebar Toggler */
$(function(){
	$('.sidebar-toggler').click(function(){
		if($('body').hasClass('fullpage')){
			$('body').removeClass('fullpage');
			$(this).children('.fa').removeClass('fa-arrow-down').addClass('fa-bars');
		} else {
			$('body').addClass('fullpage');
			$(this).children('.fa').removeClass('fa-bars').addClass('fa-arrow-down');
		}
	});
});
$(function(){
	$('.nav-sidebar li ul').parent().children('a').click(function(){
		if($(this).next('ul').is(':hidden')){   
			$(this).parent().siblings('li').removeClass('focus').children('ul').hide(200);
			$(this).parent().addClass('focus').children('ul').show(200);
		} else {
			$(this).parent().removeClass('focus').children('ul').hide(200);
		}
	});
});
$(function pathway(){
	if($('.breadcrumb li').length > 1){
		var primary 	= $('.breadcrumb li').eq(1).text().replace(/ /g,''),
			secondary	= $('.breadcrumb li').eq(2).text().replace(/ /g,''),
			third		= $('.breadcrumb li').eq(3).text().replace(/ /g,'');

		$('.nav-sidebar > li > a').filter(function() {
	        var text = $(this).text().replace(/ /g,''); 
	        return text == primary;
	    }).parent().addClass('active');

	    $('.nav-sidebar > li > ul > li > a').filter(function() {
	        var text = $(this).text().replace(/ /g,''); 
	        var parentText = $(this).parents('li.active').children('a').text().replace(/ /g,''); 

	        return (text == secondary) && (parentText == primary);
	    }).parent().addClass('active').parents('li').addClass('focus').children('ul').show();

	    $('.nav-sidebar > li > ul > li > ul > li > a').filter(function() {
	        var text = $(this).text().replace(/ /g,''); 
	        return (text == third);
	    }).parent().addClass('active').parents('li').addClass('active').children('ul').show();

	} else {
		$('.nav-sidebar > li > a').parent().eq(0).addClass('active');
	}
});

$(function sweetAlert(){
	$('.confirmation').live('click', function(){
		var title 		= $(this).data('title') || 'Alert',
			message		= $(this).data('message') || 'Are You Sure?',
			type  		= $(this).data('type') || 'warning',
			cancel  	= $(this).data('cancel') || true,
			confirm  	= $(this).data('confirm') || true,
			cancelText 	= $(this).data('cancelText') || 'Cancel',
			confirmText = $(this).data('confirmText') || 'OK',
			autoClose 	= $(this).data('autoClose') || true,
			href		= $(this).attr('href');
		
		swal({   
            title: title,   
            text: message,   
            type: type,   
            showCancelButton: cancel,  
            showConfirmButton: confirm,  
            cancelButtonText:cancelText,
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: confirmText,   
            closeOnConfirm: autoClose
        }, function(){
            location.href=href;
        });
        return false;
	});
	
	$('.information').live('click', function(){
		var title 		= $(this).data('title') || 'Information',
			message		= $(this).data('message'),
			confirmText = $(this).data('confirmText') || 'OK';
		
		swal({   
            title: title,   
            text: message,   
            type: 'info',   
            showConfirmButton : true,
            confirmButtonText: confirmText,
            confirmButtonColor: "#0997f7",  
    		closeOnConfirm: true
        });
        return false;
	});

	$('.submit-confirmation').on('click',function(e){
	    e.preventDefault();
	    var form = $(this).parents('form');

	    var title 		= $(this).data('title') || 'Alert',
			message		= $(this).data('message') || 'Are You Sure?',
			type  		= $(this).data('type') || 'warning',
			cancel  	= $(this).data('cancel') || true,
			confirm  	= $(this).data('confirm') || true,
			cancelText 	= $(this).data('cancelText') || 'Cancel',
			confirmText = $(this).data('confirmText') || 'OK',
			autoClose 	= $(this).data('autoClose') || true;

		swal({   
            title: title,   
            text: message,   
            type: type,   
            showCancelButton: cancel,  
            showConfirmButton: confirm,  
            cancelButtonText:cancelText,
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: confirmText,   
            closeOnConfirm: autoClose
        }, function(isConfirm){   
            if (isConfirm) form.submit();
        });
        return false;
	})
	
});

function noticeSuccess(message){
	var message = message || 'Proses Berhasil';

    sweetAlert({
    	title 	: 'Success',
    	text 	: message,
    	type	: 'success',
    	timer	: 2000,
    	showCancelButton : false,
    	showConfirmButton : false
    });
}

function noticeFailed(message){
	var message = message || 'Terjadi kesalahan.!';

    sweetAlert({
    	title 	: 'Error',
    	text 	: message,
    	type	: 'error',
    	timer	: 30100,
    	showCancelButton : false,
    	showConfirmButton : true,   
        confirmButtonText: 'Refresh',
        confirmButtonColor: "#DD6B55", 
    	closeOnConfirm: true
    }, function(isConfirm){   
        if (isConfirm) loadData();
    });
}
function noticeInfo(message){
    sweetAlert({
    	title 	: 'Informasi',
    	text 	: message,
    	type	: 'info',
    	showConfirmButton : true,
        confirmButtonColor: "#0997f7",
    	closeOnConfirm: true
    });
}

$(function longshadow(){
	$('.textshadow').each(function(){
		var bg = $(this).data('bgcolor');
		$(this).attr('style','text-shadow:'+bg+' 1px 1px,'+bg+' 2px 2px,'+bg+' 3px 3px,'+bg+' 4px 4px,'+bg+' 5px 5px,'+bg+' 6px 6px,'+bg+' 7px 7px,'+bg+' 8px 8px,'+bg+' 9px 9px,'+bg+' 10px 10px,'+bg+' 11px 11px,'+bg+' 12px 12px,'+bg+' 13px 13px,'+bg+' 14px 14px,'+bg+' 15px 15px,'+bg+' 16px 16px,'+bg+' 17px 17px,'+bg+' 18px 18px,'+bg+' 19px 19px,'+bg+' 20px 20px,'+bg+' 21px 21px,'+bg+' 22px 22px,'+bg+' 23px 23px,'+bg+' 24px 24px,'+bg+' 25px 25px,'+bg+' 26px 26px,'+bg+' 27px 27px,'+bg+' 28px 28px,'+bg+' 29px 29px,'+bg+' 30px 30px,'+bg+' 31px 31px,'+bg+' 32px 32px,'+bg+' 33px 33px,'+bg+' 34px 34px,'+bg+' 35px 35px,'+bg+' 36px 36px,'+bg+' 37px 37px,'+bg+' 38px 38px,'+bg+' 39px 39px,'+bg+' 40px 40px,'+bg+' 41px 41px,'+bg+' 42px 42px,'+bg+' 43px 43px,'+bg+' 44px 44px,'+bg+' 45px 45px,'+bg+' 46px 46px,'+bg+' 47px 47px,'+bg+' 48px 48px,'+bg+' 49px 49px,'+bg+' 50px 50px,'+bg+' 51px 51px,'+bg+' 52px 52px,'+bg+' 53px 53px,'+bg+' 54px 54px,'+bg+' 55px 55px,'+bg+' 56px 56px,'+bg+' 57px 57px,'+bg+' 58px 58px,'+bg+' 59px 59px,'+bg+' 60px 60px,'+bg+' 61px 61px,'+bg+' 62px 62px,'+bg+' 63px 63px,'+bg+' 64px 64px,'+bg+' 65px 65px,'+bg+' 66px 66px,'+bg+' 67px 67px,'+bg+' 68px 68px,'+bg+' 69px 69px,'+bg+' 70px 70px,'+bg+' 71px 71px,'+bg+' 72px 72px,'+bg+' 73px 73px,'+bg+' 74px 74px,'+bg+' 75px 75px,'+bg+' 76px 76px,'+bg+' 77px 77px,'+bg+' 78px 78px,'+bg+' 79px 79px,'+bg+' 80px 80px,'+bg+' 81px 81px,'+bg+' 82px 82px,'+bg+' 83px 83px,'+bg+' 84px 84px,'+bg+' 85px 85px,'+bg+' 86px 86px,'+bg+' 87px 87px,'+bg+' 88px 88px,'+bg+' 89px 89px,'+bg+' 90px 90px,'+bg+' 91px 91px,'+bg+' 92px 92px,'+bg+' 93px 93px,'+bg+' 94px 94px,'+bg+' 95px 95px,'+bg+' 96px 96px,'+bg+' 97px 97px,'+bg+' 98px 98px,'+bg+' 99px 99px,'+bg+' 100px 100px');
	});
	$('.boxshadow').each(function(){
		var bg = $(this).data('bgcolor');
		$(this).attr('style','box-shadow:'+bg+' 1px 1px,'+bg+' 2px 2px,'+bg+' 3px 3px,'+bg+' 4px 4px,'+bg+' 5px 5px,'+bg+' 6px 6px,'+bg+' 7px 7px,'+bg+' 8px 8px,'+bg+' 9px 9px,'+bg+' 10px 10px,'+bg+' 11px 11px,'+bg+' 12px 12px,'+bg+' 13px 13px,'+bg+' 14px 14px,'+bg+' 15px 15px,'+bg+' 16px 16px,'+bg+' 17px 17px,'+bg+' 18px 18px,'+bg+' 19px 19px,'+bg+' 20px 20px,'+bg+' 21px 21px,'+bg+' 22px 22px,'+bg+' 23px 23px,'+bg+' 24px 24px,'+bg+' 25px 25px,'+bg+' 26px 26px,'+bg+' 27px 27px,'+bg+' 28px 28px,'+bg+' 29px 29px,'+bg+' 30px 30px,'+bg+' 31px 31px,'+bg+' 32px 32px,'+bg+' 33px 33px,'+bg+' 34px 34px,'+bg+' 35px 35px,'+bg+' 36px 36px,'+bg+' 37px 37px,'+bg+' 38px 38px,'+bg+' 39px 39px,'+bg+' 40px 40px,'+bg+' 41px 41px,'+bg+' 42px 42px,'+bg+' 43px 43px,'+bg+' 44px 44px,'+bg+' 45px 45px,'+bg+' 46px 46px,'+bg+' 47px 47px,'+bg+' 48px 48px,'+bg+' 49px 49px,'+bg+' 50px 50px,'+bg+' 51px 51px,'+bg+' 52px 52px,'+bg+' 53px 53px,'+bg+' 54px 54px,'+bg+' 55px 55px,'+bg+' 56px 56px,'+bg+' 57px 57px,'+bg+' 58px 58px,'+bg+' 59px 59px,'+bg+' 60px 60px,'+bg+' 61px 61px,'+bg+' 62px 62px,'+bg+' 63px 63px,'+bg+' 64px 64px,'+bg+' 65px 65px,'+bg+' 66px 66px,'+bg+' 67px 67px,'+bg+' 68px 68px,'+bg+' 69px 69px,'+bg+' 70px 70px,'+bg+' 71px 71px,'+bg+' 72px 72px,'+bg+' 73px 73px,'+bg+' 74px 74px,'+bg+' 75px 75px,'+bg+' 76px 76px,'+bg+' 77px 77px,'+bg+' 78px 78px,'+bg+' 79px 79px,'+bg+' 80px 80px,'+bg+' 81px 81px,'+bg+' 82px 82px,'+bg+' 83px 83px,'+bg+' 84px 84px,'+bg+' 85px 85px,'+bg+' 86px 86px,'+bg+' 87px 87px,'+bg+' 88px 88px,'+bg+' 89px 89px,'+bg+' 90px 90px,'+bg+' 91px 91px,'+bg+' 92px 92px,'+bg+' 93px 93px,'+bg+' 94px 94px,'+bg+' 95px 95px,'+bg+' 96px 96px,'+bg+' 97px 97px,'+bg+' 98px 98px,'+bg+' 99px 99px,'+bg+' 100px 100px');
	});

});

$(function scrollMenu(){
	if($('.nav-sidebar').find('li').hasClass('active')){
    var pos = $('.nav-sidebar li.active').last().offset();
    var navpos = $('.nav-sidebar').offset();
	var nowpos = parseInt($.cookie("activetop"))-parseInt(pos.top);
	$('#jmc_sidebar .layout-center.scroll').scrollTop(nowpos*-1);
	$('.nav-sidebar').find('a').click(function(){
		$.cookie("activetop", ($(this).offset().top));				
	});
	}
});