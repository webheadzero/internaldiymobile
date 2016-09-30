$(document).ready(function()
{
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

	if(navigator.onLine){
		saveToLokalData();
	}else{
		loadData();
	}

	Highcharts.setOptions({
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        },
        tooltip: {
            yDecimals: 2
        }
    });
    $('#dashboard-logo').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight:false,
        autoplay: true,
        autoplaySpeed: 5000,
        dots:false,
        arrows:true,
        pauseOnHover:false,
        swipe:true,
        prevArrow:'<button type="button" class="slick-arrow prev"><i class="md md-arrow_back"></i></button>',
        nextArrow:'<button type="button" class="slick-arrow next"><i class="md md-arrow_forward"></i></button>',
    });

    $('.btn').click(function(){
        nativeclick.trigger();
    });
	
});

function errorAlert()
{
    $('.error-alert').addClass('in');
}

function chartTransaksiNpd(data)
{               
    var jumlah=[],
        bulan=[];

    for(i=0;i<12;i++){
        bulan[i]    = data.bulan[i];
        jumlah[i]   = parseInt(data.jumlah[i]);
    }

    $('#chart-transaksi-npd').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: '',
            style:{
                fontFamily:'norpeth',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: bulan,
            crosshair: true,
            labels:{
                style:{
                    fontFamily:'norpeth',
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
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                style:{
                    fontFamily:'norpeth',
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
                '<td style="padding:0"><b>{point.y} Buah</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            areaspline: {
                lineWidth:'0',
                marker:{
                    enabled:false
                }
            }
        },
        series: [
        {
            name: 'NPD',
            color:'#3498db',
            data: jumlah
        }]
    });
}

function chartTransaksi(data)
{
    var realisasi=[], 
        pengajuan=[], 
        bulan=[];

    for(i=0;i<12;i++){
        bulan[i]        = data.bulan[i];
        realisasi[i]    = parseInt(data.realisasi[i]);
        pengajuan[i]    = parseInt(data.pengajuan[i]);
    }

    $('#chart-transaksi').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: '',
            style:{
                fontFamily:'norpeth',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: bulan,
            crosshair: true,
            labels:{
                style:{
                    fontFamily:'norpeth',
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
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                style:{
                    fontFamily:'norpeth',
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
            valuePrefix: 'Rp. ',
            valueSuffix: ',00',
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="background:{series.color};width:5px;">&nbsp;</td><td style="padding:0 0 0 5px;">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
                name: 'Pengajuan', 
                color:'#3498db', 
                data: pengajuan
            },
            {
                name: 'Realisasi',
                color:'#2ecc71',
                data: realisasi
            },
        ]
    });
}

function chartKasDiBidang(data)
{
    var up=[], 
        tu=[], 
        bidang=[];

    for(i=0;i<data.length;i++){
        bidang[i]   = data[i].nama_singkat;
        up[i]       = parseInt(data[i].jumlah_up);
        tu[i]       = parseInt(data[i].jumlah_tu);
    }
    
    $('#chart-kas-dibidang').highcharts({
        colors: ["#d35400", "#1abc9c"],
        chart: {
            type: 'column',
        },
        title: {
            text: '',
            style:{
                fontFamily:'norpeth',
                color:'#333',
                textTransform:'uppercase',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text: '',
                style:{
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            categories: bidang,
            crosshair: true,
            labels:{
                enabled:true,
                style:{
                    fontFamily:'norpeth',
                    color:'#aaa',
                    textTransform:'uppercase',
                    fontWeight:'bold',
                    fontSize:'11'
                },
                rotation:-30,
                x:0,
                y:13
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
                    fontFamily:'norpeth',
                    color:'#333',
                    textTransform:'uppercase',
                    fontWeight:'bold'
                }
            },
            labels:{
                style:{
                    fontFamily:'norpeth',
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
            enabled:true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
        },
        tooltip: {
            valuePrefix: 'Rp. ',
            valueSuffix: ',00',
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: "UP",
            data: up,
        },{
            name: "TU",
            data: tu,
        }]
    });
}

function loadData()
{
	var data = JSON.parse(window.localStorage.getItem('dataKeuangan'));

	if(data != null){
		$('.card').addClass('loading');
		setValue(data);
	}else{
		saveToLokalData();
	}
}

function saveToLokalData()
{
	$('.card').addClass('loading');
	$.ajax({
        url: 'http://bappeda.jogjaprov.go.id/si_internal/api/eksekutif',
        type: "post",
        data: {'access-token' : '134UvLg7QilJxg/8CXZVKp0.f1WZn7puwLy2LYgzaiB7Zh61eUYSl72'},
		async: true,
        dataType: "json",
        success: function(data) {
			var currentdate = new Date(); 
        	var datetime = "Last update : " +currentdate.getDate()+"/"+(currentdate.getMonth()+1)+"/"+currentdate.getFullYear()+" "
							                +currentdate.getHours()+":"+currentdate.getMinutes()+" Wib";

        	window.localStorage.setItem('dataKeuangan', JSON.stringify(data));
        	window.localStorage.setItem('lastUpdateKeuangan', datetime);
        	setValue(data);
        },
        error: function (textStatus, errorThrown) {
        	if(window.localStorage.getItem('dataKeuangan') != null){
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
	chartTransaksiNpd(data.grafikSebaranNpdBuah);
    chartKasDiBidang(data.grafikKasDiBidang);
    chartTransaksi(data.grafikSebaranNpdRp);

    $('#jml_pengajuan_npd_rp').html(data.transaksi['jumlah_pengajuan']);
    $('#jml_pengajuan_npd').html(data.transaksi['npd_pengajuan']+' NPD');
    $('#jml_realisasi_npd_rp').html(data.transaksi['jumlah_realisasi']);
    $('#jml_realisasi_npd').html(data.transaksi['npd_realisasi']+' NPD');
    $('#sisa_kas_bappeda').html(data.sisaKas['jumlah_kas']);
    $('#kas_disub_bidang').html(data.kasDiSubBidang['jumlah_total']);
    $('#kas_up_disub_bidang').html('UP = '+ data.kasDiSubBidang['jumlah_up']);
    $('#npd_up_disub_bidang').html(data.kasDiSubBidang['jumlah_npd_up']+' NPD');
    $('#kas_tu_disub_bidang').html('TU = '+ data.kasDiSubBidang['jumlah_tu']);
    $('#npd_tu_disub_bidang').html(data.kasDiSubBidang['jumlah_npd_tu']+' NPD');
    $('#kas_belum_gu').html(data.kasBelumDiGanti['jumlah_total']);
    $('#npd_belum_gu').html(data.kasBelumDiGanti['jumlah_npd']+' NPD');
    $('#persen_belum_gu').html(data.kasBelumDiGanti['jumlah_persen']+' %');
    $('#ls_bappeda').html(data.ls['jumlah_ls']);
    $('#npd_ls_bappeda').html(data.ls['jumlah_npd']+' NPD');
    $('#ls_bappeda').html(data.ls['jumlah_ls']);
    $('#npd_terlambat').html(data.keterlambatan['jumlah_npd']);
    $('#bidang_terlambat').html(data.keterlambatan['jumlah_bidang']);

    $('.sebaran_kas_disub_bidang').find('tr').remove();
    $.each(data.sebaranKasDiBidang, function(i, field){
        var row = '<tr>'
                        +'<td width="15"><div style="width:10px;height:10px;border-radius:3px;"><li class="fa fa-circle text-danger"></li></div></td>'
                        +'<td align="left">'+ field.nama_singkat +'</td>'
                        +'<td align="right">'+ field.jumlah_total +'</td>'
                        +'<td align="right">'+ field.jumlah_npd +' NPD</td>'
                    +'</tr>';
        $('.sebaran_kas_disub_bidang').append(row);
    });

	setTimeout(function(){
		$('.card').removeClass('loading');
	    $('.error-alert').removeClass('in');
    }, 500);

	infoUpdate(window.localStorage.getItem('lastUpdateKeuangan'));
}

function infoUpdate(text)
{
	setTimeout(function(){
		$('#info-last-update').html(text);
	}, 1200);
}