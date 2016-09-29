$(document).ready(function(){
    $('#sidebar-toggler-button').click(function(){
        if($('#sidebar-mobile').hasClass('active')){
            $('#sidebar-mobile').removeClass('active');
        } else {
            $('#sidebar-mobile').addClass('active');
        }
        return false;
    });
    $('.sidebar-mobile-overlay').click(function() {
        $('#sidebar-mobile').removeClass('active');
    });

	loadData();
	Highcharts.setOptions({
	    lang: {
	        decimalPoint: ',',
	        thousandsSep: '.'
	    },

	    tooltip: {
	        yDecimals: 2,
	    }
	});
    $('#sebaran-chart').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight:false,
        autoplay: false,
        autoplaySpeed: 5000,
        dots:false,
        arrows:true,
        pauseOnHover:false,
        swipe:true,
        prevArrow:'<button type="button" class="slick-arrow prev" style="color:#333;"><i class="md md-arrow_back"></i></button>',
        nextArrow:'<button type="button" class="slick-arrow next" style="color:#333;"><i class="md md-arrow_forward"></i></button>',
    });

    $('.btn').click(function(){
        nativeclick.trigger();
    });
	
});

function errorAlert()
{
    $('.error-alert').addClass('in');
}

function color(i)
{
	var warna;
	warna = ['#34332F', '#3498db', '#DB4F38', '#FB8E2F', '#6EC1B9', '#599988', '#EEC724', '#61594C'];
	return warna[i];
}

function chartDeviasi(data)
{
	var bulan=[],target=[],efisiensi=[],serapan=[],blm_terlaksana=[],blm_spj=[];
	for(i=0;i<data.length;i++){
	    bulan[i] 			= data[i].bulan;
	    target[i]			= parseFloat(data[i].target);
	    efisiensi[i]		= parseFloat(data[i].efisiensi);
	    serapan[i]			= parseFloat(data[i].serapan);
	    blm_terlaksana[i]	= parseFloat(data[i].belum_dilaksanakan);
	    blm_spj[i]			= parseFloat(data[i].belum_spj);
	}

	$('#chart-deviasi').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: '',
            style:{
                fontFamily:'HelveticaNeueLight',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: bulan,
            crosshair: true,
            labels:{
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                },
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        legend:{
            enabled:true,
            layout: 'horizontal',
    		align: 'center',
        	verticalAlign: 'bottom',
            floating: false,
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="background:{series.color};width:5px;">&nbsp;</td><td style="padding:0 0 0 5px;">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} Juta</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            areaspline: {
                lineWidth:'0',
                marker:{
                    enabled:false
                },
                dataLabels: {
                    enabled: false,
                    rotation:-90,
                    x:0,
                    y:-10,
                    verticalAlign:'bottom',
                    align:'center',
                    inside:false,
                    color:'#333',
                    style: {
				        color: '#000',
				        fontSize: '10'
				    },
                },
                enableMouseTracking: true,
            }
        },
        series: [
        {
            name: 'Target',
            color:'#9DD6C7',
            data: target
        },
        {
            name: 'Serapan',
            color:'#74C3AD',
            data: serapan
        },
        {
            name: 'Efisiensi',
            color:'#529880',
            data: efisiensi
        },
        {
            name: 'Belum Terlaksana',
            color:'#F4C038',
            data: blm_terlaksana

        },{
            name: 'Belum SPJ',
            color:'#E9533B',
            data: blm_spj

        }]
    });
}

function chartDeviasiFisik(data)
{
	var nama=[];
	for(i=0;i<data.length;i++){
	    nama[i] 		= data[i].nama_singkat;
	    data[i].name 	= data[i].nama;
	    data[i].y 		= parseInt(data[i].jml_kegiatan);
	    data[i].color 	= color(i);
	}

	$('#chart-deviasi-fisik').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: '',
            style:{
                fontFamily:'HelveticaNeueLight',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: nama,
            crosshair: true,
            labels:{
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#575757',
                    fontWeight:'bold',
                    fontSize:'11'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                enabled:false,
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        legend:{
            enabled:false
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            enabled:false
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            },
            bar: {
                borderWidth:'0',
                marker:{
                    enabled:false
                },
                dataLabels: {
                    enabled: true,
                    x:15,
                    y:0,
                    verticalAlign:'middle',
                    align:'right',
                    inside:false,
                    padding:0,
                    crop:false,
                    color:'#333',
                    overflow: 'none'
                },
                enableMouseTracking: false
            }
        },
        series: [
        {
            name: 'Deviasi Fisik',
            color:'#3498db',
            data: data
        }]
    });
}

function chartDeviasiKeuangan(data)
{
	var nama=[];
	for(i=0;i<data.length;i++){
	    nama[i] 		= data[i].nama_singkat;
	    data[i].name 	= data[i].nama;
	    data[i].y 		= parseInt(data[i].jml_kegiatan);
	    data[i].color 	= color(i);
	}

	$('#chart-deviasi-keuangan').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: '',
            style:{
                fontFamily:'HelveticaNeueLight',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: nama,
            crosshair: true,
            labels:{
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#575757',
                    fontWeight:'bold',
                    fontSize:'11'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                enabled:false,
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        legend:{
            enabled:false
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            enabled:false
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            },
            bar: {
                borderWidth:'0',
                marker:{
                    enabled:false
                },
                dataLabels: {
                    enabled: true,
                    x:15,
                    y:0,
                    verticalAlign:'middle',
                    align:'right',
                    inside:false,
                    padding:0,
                    crop:false,
                    color:'#333',
                    overflow: 'none'
                },
                enableMouseTracking: false
            }
        },
        series: [
        {
            name: 'Deviasi Keuangan',
            color:'#3498db',
            data: data
        }]
    });	
}

function chartSebaranBidang(data)
{
	for(i=0;i<data.length;i++){
	    data[i].name 	= data[i].nama;
	    data[i].y 		= parseInt(data[i].jml_kegiatan);
	    data[i].color 	= color(i);
	}

	$('#chart-subbidang').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '',
            style:{
                fontFamily:'HelveticaNeueLight',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: [],
            crosshair: true,
            labels:{
                enabled:false,
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#aaa',
                    textTransform:'uppercase',
                    fontWeight:'bold',
                    fontSize:'11'
                },
                rotation:-45,
                x:-10,
                y:30
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                style:{
                    fontFamily:'HelveticaNeueLight',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            gridLineWidth:0,
            lineWidth:2,
            lineColor:'#3F3F3F',
            gridLineColor:'#eee'
        },
        legend:{
            enabled:false
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="padding:0"><b> {point.y} </b></td>' +
                '<td style="padding-left:5px"><b>{series.name}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    rotation:-90,
                    x:3,
                    y:-10,
                    verticalAlign:'bottom',
                    align:'center',
                    inside:false,
                    color:'#333'
                },
                enableMouseTracking: true
            }
        },
        series: [
        {
            name: 'Kegiatan',
            data: data
        }]
    });
}

function chartPieKegiatan(data)
{
	for(i=0;i<data.length;i++){
	    data[i].name 	= data[i].nama;
	    data[i].y 		= parseInt(data[i].jml_kegiatan);
	    data[i].color 	= color(i);
	}

	$('#pie-kegiatan').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '',
            style:{
                    'color':'#575757',
                    'fontFamily':'HelveticaNeueLight, sans-serif;',
                    'textTransform':'uppercase',
                    'fontSize':'12px',
                    'fontWeight':'bold'
                }
        },
        tooltip: {
            pointFormat: '<b>{<point class="perc"></point>entage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                borderWidth:0,
                showInLegend:false
            }
        },
        legend:{
            borderWidth:0
        },
        series: [{
            type: 'pie',
            name: 'Deviasi',
            innerSize: '50%',
            data: data
        }]
    });
}

function chartPieDana(data)
{
	for(i=0;i<data.length;i++){
	    data[i].name 	= data[i].nama;
	    data[i].y 		= parseInt(data[i].jml_anggaran);
	    data[i].color 	= color(i);
	}

	$('#pie-dana').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '',
            style:{
                    'color':'#575757',
                    'fontFamily':'HelveticaNeueLight, sans-serif;',
                    'textTransform':'uppercase',
                    'fontSize':'12px',
                    'fontWeight':'bold'
                }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                borderWidth:0,
                showInLegend:false
            }
        },
        legend:{
            borderWidth:0
        },
        series: [{
            type: 'pie',
            name: 'Deviasi',
            innerSize: '50%',
            data: data,
        }]
    });	
}

function loadData()
{
	var data = JSON.parse(window.localStorage.getItem('dataDashboard'));

	$('.card').addClass('loading');
	if(data != null){
		setValue(data);

		setTimeout(function(){
			$('.card').removeClass('loading');
		    $('.error-alert').removeClass('in');
	    }, 1000);
	} else {
		saveToLokalData();
	}

	/*infoUpdate(window.localStorage.getItem('lastUpdateDashboard'));*/
}

function saveToLokalData()
{
	$.ajax({
        url: 'http://bappeda.jogjaprov.go.id/si_internal/api/dashboard',
        type: "post",
        data: {'access-token' : '134UvLg7QilJxg/8CXZVKp0.f1WZn7puwLy2LYgzaiB7Zh61eUYSl72'},
		async: true,
        dataType: "json",
        success: function(data) {
			var currentdate = new Date(); 
        	var datetime = "Last update : " +currentdate.getDate()+"/"+(currentdate.getMonth()+1)+"/"+currentdate.getFullYear()+" "
							                +currentdate.getHours()+":"+currentdate.getMinutes()+" Wib";

        	window.localStorage.setItem('dataDashboard', JSON.stringify(data));
        	window.localStorage.setItem('lastUpdateDashboard', datetime);
        	loadData();
        },
        error: function (textStatus, errorThrown) {
        	if(window.localStorage.getItem('dataDashboard') != null){
	        	loadData();
			} else {
        		errorAlert();
			}
        }
    }).done(function() {

    });
}
	
function setValue(data)
{
	chartDeviasi(data.deviasi);
	chartPieDana(data.program_kegiatan);
	chartDeviasiFisik(data.deviasi_fisik);
	chartPieKegiatan(data.program_kegiatan);
	chartSebaranBidang(data.kegiatan_bidang);
	chartDeviasiKeuangan(data.deviasi_keuangan);

	$('#title_apbd').html(data.target_apbd['title']);
	$('#jml_program_apbd').html(data.target_apbd['jml_program'] + ' <small>Program</small>');
	$('#jml_kegiatan_apbd').html(data.target_apbd['jml_kegiatan'] + ' <small>Kegiatan</small>');
	$('#jml_apbd').html(data.target_apbd['jml_apbd'] + ' M');
	$('.periode_1').html('s/d '+ data.total_deviasi['periode']);
	$('.periode').html(data.total_deviasi['periode']);
	$('#prosentase_deviasi').html(data.total_deviasi['prosentase']+'%');
	$('#nilai_deviasi').html('Rp. '+data.total_deviasi['nilai']+" <br> dari <br> Rp. "+data.total_deviasi['target']);
	$('#prosentase_efisiensi').html(data.total_efisiensi['prosentase']+'%');
	$('#nilai_efisiensi').html('Rp. '+data.total_efisiensi['nilai']+" <br> dari <br> Rp. "+data.total_efisiensi['target']);
	$('#nilai_blm_terlaksana').html('Rp. '+data.total_blm_terlaksana['nilai']);
	$('#prosentase_blm_terlaksana').html(data.total_blm_terlaksana['prosentase']+'%');
	$('#nilai_blm_spj').html('Rp. '+data.total_blm_spj['nilai']);
	$('#prosentase_blm_spj').html(data.total_blm_spj['prosentase']+'%');
	$('#target_bulan_ini').html('Target : Rp. '+data.target_serapan['target']);
	$('#serapan_bulan_ini').html('Serapan : Rp. '+data.target_serapan['serapan']);
	$('#sisa_serapan').html('Rp. '+data.target_serapan['sisa_dana']);
	$('#sisa_waktu').html(data.target_serapan['sisa_waktu']+' Hari');
	$('.circliful').find('span').remove();
	$('.circliful').find('canvas').remove();
	$('.circliful').attr('data-text', parseInt(data.target_serapan['prosentase'])+'%');
	$('.circliful').attr('data-part', parseInt(data.target_serapan['prosentase']));
	$('.circliful').attr('data-percent', parseInt(data.target_serapan['prosentase']));
	$('.circliful').circliful();

	$('#list_sebaran_bidang').find('tr').remove();
	$.each(data.program_kegiatan, function(i, field){
		var row = '<tr>'
	                    +'<td width="15"><div style="background:'+data.target_apbd['color'][i]+';width:10px;height:10px;border-radius:3px;"></div></td>'
	                    +'<td>'+ field.nama_singkat +'</td>'
	                    +'<td class="text-right">Rp. '+ field.jml_anggaran +'. '+ field.jml_program +' Program '+ field.jml_kegiatan +' Kegiatan</td>'
	                	+'</tr>';

		$('#list_sebaran_bidang').append(row);
	});

	$('#list_realisasi').parent().find('.media-0').remove();
	$('#list_realisasi').find('.media').remove();
	if(data.realisasi_terbaru){
    	$.each(data.realisasi_terbaru, function(i, field){
    		var row = '<div class="media">'
                            +'<div class="media-left"><div style="width:15px;height:15px;border-radius:50em;background:#509785;"></div></div>'
                            +'<div class="media-body text-left">'
                                +'<div>'+ field.nama_kegiatan +'</div>'
                                +'<div>Rp. '+ field.total_realisasi +'</div>'
                                +'<div>'+ field.nama_sub_bidang +'</div>'
                            +'</div>'
                        +'</div>';

    		$('#list_realisasi').append(row);
    	});
    } else {
    	$('#list_realisasi').parent().append('<div class="media-0" style="margin-top:25px;">Tidak ada data realisasi</div>');
    }
}

function infoUpdate(text)
{
	setTimeout(function(){
		$('.info-last-update').html(text);
		$('.info-last-update').slideDown("slow");
	}, 2000);
}