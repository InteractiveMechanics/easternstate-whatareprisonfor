var pieData = [ { value: 86, color:"#198cff", label: "Rehabilitation" }, { value : 8, color : "#C1ECFA", label: "Deterrence" }, { value : 3, color : "#FFAAAA", label: "Retribution" }, { value : 3, color : "#FF0000", label: "Incapacitation" } ];
var pieOptions = { segmentShowStroke : false, animation: false }


function preSetup() {
	
}


$(document).ready(function(){
	$('.bottom-row').hide();
	$('.home-screen .next').show();
	$('.screen').show();
	
	$('.btn-intro').click(function(){
	$('.btn-intro').hide();
	$('.more-info').hide();
	$('.animation').removeClass('card-wrapper');
	$('.animation').addClass('bottom-row');
	$('.bottom-row').show();
	$('.animation').hide();
	
	$('.home-icon').removeClass('faded');
	$('.home-icon a').attr('href', '#open-modal');
	
	//$( ".card" ).unbind();




$('.squareGroup li').droppable({tolerance: "fit",
	drop: function(event,ui){
		ui.draggable.addClass( 'placed' );

		ui.draggable.data('droppedin',$(this));

		$(this).droppable('disable');

		if (!$(".ui-droppable").not(".ui-droppable-disabled").length) {
			$('.home-screen .next').show();
		}
   	}
});

  $(".square").draggable({
       
    stack: ".square",

    drag: function(event, ui) {
        var draggable = $(this).data("ui-draggable");
        $.each(draggable.snapElements, function(index, element) {
            ui = $.extend({}, ui, {
                snapElement: $(element.item),
                snapping: element.snapping
            });
            if (element.snapping) {
                if (!element.snappingKnown) {
                    element.snappingKnown = true;
                    draggable._trigger("snapped", event, ui);


                }
            } else if (element.snappingKnown) {
                element.snappingKnown = false;
                draggable._trigger("snapped", event, ui);


            }
        });
        if($(this).hasClass('placed')){
         	(this).draggable('disable');
         }
    /*if($(this).data('droppedin')){
           $(this).data('droppedin').droppable('enable');
           $(this).data('droppedin',null)
           $(this).removeClass( 'placed' )

   }*/

    },




    snap: ".squaredotted",
    snapMode: "inner",
    snapTolerance: 11,
    snapped: function(event, ui) {
        var squareWidth = ui.snapElement.width();
        var squareHeight = ui.snapElement.height();


        ui.helper.css({width: squareWidth, height: squareHeight});



},


});





$('.bordered-boxes').show();
$('.home-screen .navigation').show();


  });


    $('.card .more-info').click(function(){
      console.log('test');
      $(this).parents(".card").addClass("flip");
    });

    $('.card .close-icon').click(function(event){
      event.stopPropagation(); //Fire event to stap .card click event from firing
      $(this).parents(".card").removeClass("flip");
    });

    $('.options button').click(function(){
      $('.options button').removeClass('active');
      $(this).addClass('active');
    });

    $('.tooltip-li img').click(function(){
      $('.tooltip').toggle()
    });

    /*$('.tooltip-close').click(function(){
      $('.tooltip').hide();
    });

    $('input.btn').click(function(){
      var value = $('input.txt').val();

      if(value) {
        $('.tooltip').hide();
      }
    });*/
    
    $('.tooltip-li').click(function(){
		$(this).toggleClass('selected');
	});
	
	$('.tooltip-close').click(function(){
		$('.tooltip').hide();
	});
	
	$('input.btn').click(function(){
		var value = $('input.txt').val();
		
		if(value) {
  		$('.tooltip').hide();	
		}
	});
	
	$('input.txt').keydown(function (e){
   		var value = $('input.txt').val();
		
		if(value) {
  			$('.tooltip').hide();	
		}
	});

	$('.reason-options ul li').click(function(){
		
		var type = $(this).data('type');
		if(type != 'somethingelse') {
			$('.reason-options ul li').removeClass('active');
			$('.reason-options ul li').addClass('non-active');
			
			var hasClass = $(this).hasClass('selected');
			if(hasClass) {
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected');
			}
		}
		
		if($('div.tooltip').is(':visible') && type != 'somethingelse') {
			$('div.tooltip').hide();
		}
	});

    // Next Button

    $('.next').click(function(){
      var class_name = $(this).data('divclass');
      if(class_name) {
        $(class_name).addClass('fadeOut');

        if(class_name == '.home-screen') {
          $(class_name).one('webkitAnimationEnd animationend', function(){
            $('.selected-square').show();
            $('.selected-square').addClass('animated fadeIn');
            $('.did-you-know .details').show();
          $('.did-you-know .details').addClass('animated fadeIn');
          });
        }

        if(class_name == '.did-you-know-screen') {
          $(class_name).one('webkitAnimationEnd animationend', function(){
            $('.question-section').show();
            $('.question-section').addClass('animated fadeIn');
        });
        }
      }
    });

    var countries= document.getElementById("chart").getContext("2d");
    var myChart = new Chart(countries).Pie(pieData, pieOptions);
    document.getElementById('ChartLegend').innerHTML = myChart.generateLegend();

    var counties = document.getElementById("final-pie-chart").getContext("2d");
    var myCountiesChart = new Chart(counties).Pie(pieData, pieOptions);
    document.getElementById('FinalChartLegend').innerHTML = myCountiesChart.generateLegend();
});
