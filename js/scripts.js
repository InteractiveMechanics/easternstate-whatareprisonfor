var pieData = [ { value: 86, color:"#198cff", label: "Rehabilitation" }, { value : 8, color : "#C1ECFA", label: "Deterrence" }, { value : 3, color : "#FFAAAA", label: "Retribution" }, { value : 3, color : "#FF0000", label: "Incapacitation" } ];
var pieOptions = { segmentShowStroke : false, animation: false }

var idleTime = 0;

var intervalID;

var incapacitation_text = "Eastern State Penitentiary housed a maximum-security population convicted of serious crimes, including assault, armed robbery and murder. The courts sent these men and women here&mdash;<span class='underline'>incapacitating</span> them&mdash;to increase public safety.";
var incapacitation_image = "assets/icons/icon-incapacitation.svg";

var deterrence_text = "The grim, castle-like walls of Eastern State Penitentiary were designed to intimidate. The designers wanted to frighten the general population&mdash;thus <span class='underline'>deterring</span> criminal behavior.";
var deterrence_image = "assets/icons/icon-deterrence.svg";

var rehabilitation_text = 'Eastern State Penitentiary helped lead a worldwide movement to value <span class="underline">rehabilitation</span> over retribution in prison operations. The word "penitentiary" means a place of spiritual remorse, or penance.';
var rehabilitation_image = "assets/icons/icon-rehabilitation.svg";

var retribution_text = "Although committed to rehabilitation, Eastern State's founders also believed that society must enforce <span class='underline'>retribution</span> on those who commit serious crimes.";
var retribution_image = "assets/icons/icon-retribution.svg";

var square_order = [];

var jsonData = JSON.parse('{"important_value":[{"most_important":"Deterrence","percent":"40.0000"},{"most_important":"Incapacitation","percent":"20.0000"},{"most_important":"Rehabilitation","percent":"20.0000"},{"most_important":"Retribution","percent":"20.0000"}],"reflected_value":{"value_reflected":"no","percent":"40.0000"},"factor_value":{"other_factor":"Profit Motive","percent":"60.000000000"},"summary":{"most_important":"Deterrence","most_important_percent":"40.0000","value_reflect":"unsure","value_reflect_percent":"40.0000"},"percentages":[{"value_reflected":"unsure","percent":"100.0000"}]}');

var interactiveJsonData = {};
var flipIndex = 0;

var request = $.ajax({
  url: "./data/get.php",
  type: "GET",
  dataType: "html"
});

request.done(function(data) {
	var json_data = JSON.parse(data);
	interactiveJsonData = json_data;
	
	var value = json_data.important_value[0].value;
	var percent = parseInt(json_data.important_value[0].percent);
	$('.most-important-note p').html(percent + '% of visitors think that <span class="underline">'+value+'</span> should be the highest priority of our prison system.');
	
	var maxIndex = 0;
	if(value == "Incapacitation") {
	 	$('.most-important-graphic img').attr('src', incapacitation_image);
	 	
	 	maxIndex = getMaxPositionFromArray(json_data.incapacitation);
	 	var sureness = surenessValue(json_data.incapacitation[maxIndex].value, value);
	 	$('.values-note p').html('.... And '+ parseInt(json_data.incapacitation[maxIndex].percent) +'% ' + sureness);
	 	
	 	//for(i = 0; i < json_data.incapacitation.length; i++) {
			var item = json_data.incapacitation[maxIndex];
		
			if(item.value == 'unsure') {
				$('.graphic li.unsure').html('<span class="larger grey">'+ parseInt(item.percent) +'%</span> <br /> Unsure');
				$('.graphic li.unsure').show();
			}
		
			if(item.value == 'yes') {
				$('.graphic li.is-valued').html('<span class="larger green">'+ parseInt(item.percent) +'%</span> <br /> Effective');
				$('.graphic li.is-valued').show();
			}
		
			if(item.value == 'no') {
				$('.graphic li.not-valued').html('<span class="larger red">'+ parseInt(item.percent) +'%</span> <br /> Not Effective');
				$('.graphic li.not-valued').show();
			}
		//}
 	}
 	
 	if(value == "Deterrence") {
	 	$('.most-important-graphic img').attr('src', deterrence_image);
	 	
	 	maxIndex = getMaxPositionFromArray(json_data.deterrence);
	 	var sureness = surenessValue(json_data.deterrence[maxIndex].value, value);
	 	$('.values-note p').html('.... And '+ parseInt(json_data.deterrence[maxIndex].percent) +'% ' + sureness);
	 	
	 	//for(i = 0; i < json_data.deterrence.length; i++) {
			var item = json_data.deterrence[maxIndex];
		
			if(item.value == 'unsure') {
				$('.graphic li.unsure').html('<span class="larger grey">'+ parseInt(item.percent) +'%</span> <br /> Unsure');
				$('.graphic li.unsure').show();
			}
		
			if(item.value == 'yes') {
				$('.graphic li.is-valued').html('<span class="larger green">'+ parseInt(item.percent) +'%</span> <br /> Effective');
				$('.graphic li.is-valued').show();
			}
		
			if(item.value == 'no') {
				$('.graphic li.not-valued').html('<span class="larger red">'+ parseInt(item.percent) +'%</span> <br /> Not Effective');
				$('.graphic li.not-valued').show();
			}
		//}
 	}
 	
 	if(value == "Rehabilitation") {
	 	$('.most-important-graphic img').attr('src', rehabilitation_image);
	 	
	 	maxIndex = getMaxPositionFromArray(json_data.rehabilitation);
	 	var sureness = surenessValue(json_data.rehabilitation[maxIndex].value, value);
	 	$('.values-note p').html('.... And '+ parseInt(json_data.rehabilitation[maxIndex].percent) +'% ' + sureness);
	 	
	 	//for(i = 0; i < json_data.rehabilitation.length; i++) {
			var item = json_data.rehabilitation[maxIndex];
		
			if(item.value == 'unsure') {
				$('.graphic li.unsure').html('<span class="larger grey">'+ parseInt(item.percent) +'%</span> <br /> Unsure');
				$('.graphic li.unsure').show();
			}
		
			if(item.value == 'yes') {
				$('.graphic li.is-valued').html('<span class="larger green">'+ parseInt(item.percent) +'%</span> <br /> Effective');
				$('.graphic li.is-valued').show();
			}
		
			if(item.value == 'no') {
				$('.graphic li.not-valued').html('<span class="larger red">'+ parseInt(item.percent) +'%</span> <br /> Not Effective');
				$('.graphic li.not-valued').show();
			}
		//}
 	}
 	
 	if(value == "Retribution") {
	 	$('.most-important-graphic img').attr('src', retribution_image);
	 	
	 	maxIndex = getMaxPositionFromArray(json_data.retribution);
	 	var sureness = surenessValue(json_data.retribution[maxIndex].value, value);
	 	$('.values-note p').html('.... And '+ parseInt(json_data.retribution[maxIndex].percent) +'% ' + sureness);
	 	
	 	//for(i = 0; i < json_data.retribution.length; i++) {
			var item = json_data.retribution[maxIndex];
		
			if(item.value == 'unsure') {
				$('.graphic li.unsure').html('<span class="larger grey">'+ parseInt(item.percent) +'%</span> <br /> Unsure');
				$('.graphic li.unsure').show();
			}
		
			if(item.value == 'yes') {
				$('.graphic li.is-valued').html('<span class="larger green">'+ parseInt(item.percent) +'%</span> <br /> Effective');
				$('.graphic li.is-valued').show();
			}
		
			if(item.value == 'no') {
				$('.graphic li.not-valued').html('<span class="larger red">'+ parseInt(item.percent) +'%</span> <br /> Not Effective');
				$('.graphic li.not-valued').show();
			}
		//}
 	}
 	
 	var max_obj = highestOtherReason(json_data.other_reasons[0]);
 	$('.factor-note p').html(parseInt(max_obj.percent) + '% of visitors think that <span class="underline">'+ max_obj.value +'</span> has contributed to the recent prison boom.');
	if(max_obj.value == 'Profit Motive') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-economic.svg');
	}
	
	if(max_obj.value == 'No Other Objectives') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-nootherreason.svg');
	}
	
	if(max_obj.value == 'Racial Control') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-racial.svg');
	}
	
	if(max_obj.value == 'Hiding Addiction & Poverty') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-hidingpoverty.svg');
	}
	
	var pieData = [ 
		{ value: parseInt(json_data.important_value[0].count), color:"#D31E2A", label: json_data.important_value[0].value }, 
		{ value : parseInt(json_data.important_value[1].count), color : "#E4777C", label: json_data.important_value[1].value }, 
		{ value : parseInt(json_data.important_value[2].count), color : "#811727", label: json_data.important_value[2].value }, 
		{ value : parseInt(json_data.important_value[3].count), color : "#9D7E8B", label: json_data.important_value[3].value } 
	];
	
	console.log(pieData);
	
	var pieOptions = { segmentShowStroke : false, animation: false }
	
	var countries= document.getElementById("chart").getContext("2d");
    var myChart = new Chart(countries).Pie(pieData, pieOptions);
    document.getElementById('ChartLegend').innerHTML = myChart.generateLegend();
    
    var other_reasons = json_data.other_reasons[0];
    console.log(other_reasons);
    
    var secondPieData = [ 
	    { value : parseInt(other_reasons.profit[0].count), color : "#811727", label: other_reasons.profit[0].name },
	    { value : parseInt(other_reasons.racial[0].count), color : "#9D7E8B", label: other_reasons.racial[0].name },
	    { value : parseInt(other_reasons.poverty[0].count), color : "#E4777C", label: other_reasons.poverty[0].name },
		{ value : parseInt(other_reasons.something_else[0].count), color : "#D31E2A", label: other_reasons.something_else[0].name },
		{ value: parseInt(other_reasons.objective[0].count), color:"#D3D3D3", label: other_reasons.objective[0].name }
		 
	];
    
    var counties = document.getElementById("final-pie-chart").getContext("2d");
    var myCountiesChart = new Chart(counties).Pie(secondPieData, pieOptions);
    document.getElementById('FinalChartLegend').innerHTML = myCountiesChart.generateLegend();
    
    $('p.visitor_count').html('Thank you for sharing your thoughts. <strong>'+ addCommas(interactiveJsonData.count) +' people have voted to date.</strong>');
});

	function addCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function getUnderlineColor() {
		if(interactiveJsonData.important_value[0].value == square_order[0]) {
			return "#D31E2A";
		}
		
		if(interactiveJsonData.important_value[1].value == square_order[0]) {
			return "#E4777C";
		}
		
		if(interactiveJsonData.important_value[2].value == square_order[0]) {
			return "#811727";
		}
		
		if(interactiveJsonData.important_value[3].value == square_order[0]) {
			return "#9D7E8B";
		}
	}


function getScreenViewName(screen) {
	
	if(page == '.did-you-know-screen') {
		return 'Did You Know Screen?'
	}
	
	if(page == '.pie-stat-screen') {
		return 'First Pie Chart Screen'
	}
	
	if(page == '.other-reason-screen') {
		return 'Other Reasons Screen'
	}
	
	if(page == '.why-else-screen') {
		return 'Why Else Screen?'
	}
	
	if(page == '.final-screen') {
		return 'Second Pie Chart Screen'
	}
	
	if(page == '.pre-final-screen') {
		return 'Summary Screen'
	}
	
	if(page == '.final-done-screen') {
		return 'Final Screen'
	}
	
}

function sendGAEvent(screen) {
	ga('send', 'screenview', {
	  'appName': 'What are prisons for?',
	  'screenName': screen
	});
}

function surenessValue(value, term) {
	
	if(term == "Deterrence") {
		
		if(value = 'no') {
		return 'of those visitors think that our prisons <span class="underline">do not effectively</span> deter crime.';
		}

		if(value = 'unsure') {
			return 'of those visitors are unsure if our prisons effectively deter crime.';
		}

		if(value = 'yes') {
			return 'of those visitors think that our prisons <span class="underline">effectively</span> deter crime.';
		}
		
	}
	
	if(term == "Rehabilitation") {
		
		if(value = 'no') {
		return 'of those visitors think that our prisons <span class="underline">do not effectively</span> rehabilitate people.';
		}

		if(value = 'yes') {
			return 'of those visitors think that our prisons <span class="underline">effectively</span> rehabilitate people.';
		}

		if(value = 'unsure') {
			return 'of those visitors are unsure if our prisons effectively rehabilitate people.';
		}
		
	}
	
	if(term == "Retribution") {
		
		if(value = 'no') {
		return 'of those visitors think that our prisons <span class="underline">do not provide</span> appropriate retribution to lawbreakers.';
		}

		if(value = 'unsure') {
			return 'of those visitors are unsure if our prisons provide appropriate retribution to lawbreakers.';
		}

		if(value = 'yes') {
			return 'of those visitors think that our prisons <span class="underline">provide</span> appropriate retribution to lawbreakers.';
		}
		
	}
	
	if(term == "Incapacitation") {
		
		if(value = 'yes') {
		return 'of those visitors think that our prisons <span class="underline">incapacitate</span> dangerous people in effective and fair numbers.';
		}

		if(value = 'unsure') {
			return 'of those visitors are unsure if our prisons incapacitate dangerous people in effective and fair numbers.';
		}

		if(value = 'no') {
			return 'of those visitors think that our prisons <span class="underline">do not incapacitate</span> dangerous people in effective and fair numbers.';
		}
		
	}
	
}


function capture_data(redirect) {
	var value_reflected = $('.options button.active').text().toLowerCase().trim();
	
	if(square_order.length > 0) {
			
	    if(redirect) {
			var objRequest = {
				'most_important': square_order[0],
				'second_most_important': square_order[1],
				'third_most_important': square_order[2],
				'least_important': square_order[3],
				'value_reflected': value_reflected ? value_reflected : '',
				'profit_motives_selected': $('.reason-options li.economic').hasClass('selected') ? 1 : 0,
				'racial_control_selected': $('.reason-options li.racial').hasClass('selected') ? 1 : 0,
				'addiction_poverty_selected': $('.reason-options li.poverty').hasClass('selected') ? 1 : 0,
				'no_objective_selected': $('.reason-options li.somethingelse').hasClass('selected') ? 1 : 0,
				'something_else_selected': $('.reason-options li.nootherreason').hasClass('selected') ? 1 : 0,
				'something_else': $('.reason-options li.somethingelse').hasClass('selected') ? $('input.txt').val() : '', 
				'web_or_exhibit': 'web'
			};
		
			var request = $.ajax({
				url: "./data/post_data.php",
				type: "POST",
				data: objRequest,
				dataType: "html"
			});
		
			request.done(function(msg) {
				window.location.href = window.location.pathname;
			});
		
			request.fail(function(jqXHR, textStatus) {
				window.location.href = window.location.pathname;
			});		
	    } else {
		    var objRequest = {
				'most_important': square_order[0],
				'second_most_important': square_order[1],
				'third_most_important': square_order[2],
				'least_important': square_order[3],
				'value_reflected': value_reflected ? value_reflected : '',
				'profit_motives_selected': $('.reason-options li.economic').hasClass('selected') ? 1 : 0,
				'racial_control_selected': $('.reason-options li.racial').hasClass('selected') ? 1 : 0,
				'addiction_poverty_selected': $('.reason-options li.poverty').hasClass('selected') ? 1 : 0,
				'no_objective_selected': $('.reason-options li.nootherreason').hasClass('selected') ? 1 : 0,
				'something_else_selected': $('.reason-options li.somethingelse').hasClass('selected') ? 1 : 0,
				'something_else': $('.reason-options li.somethingelse').hasClass('selected') ? $('input.txt').val() : '', 
				'web_or_exhibit': 'web'
			};
		
			var request = $.ajax({
				url: "./data/post_data.php",
				type: "POST",
				data: objRequest,
				dataType: "html"
			});
		
			request.done(function(msg) {
				console.log(msg);
			});
		
			request.fail(function(jqXHR, textStatus) {
				console.log(textStatus);
			});
	    }
	    
	}
 }

function getMaxPositionFromArray(arr) {
	var maximum = parseInt(arr[0].percent);
	var index = 0;
	
	
	for(i = 1; i < arr.length; i++) {
		if (arr[i].percent > maximum) {
			maximum = parseInt(arr[i].percent);
			index = i;
		}
		
	}
	
	return index;
}

function highestOtherReason(obj) {
	var other_reasons = obj;
	
	var max_obj = {
		'value': '',
		'percent': 0
	}
	
	if(other_reasons.objective[0].percent > max_obj.percent) {
		max_obj = {
			'value': 'No Other Reason',
			'percent': parseInt(other_reasons.objective[0].percent)
		};	
	}
	
	if(other_reasons.profit[0].percent > max_obj.percent) {
		max_obj = {
			'value': 'Profit Motive',
			'percent': parseInt(other_reasons.profit[0].percent)
		};	
	}
	
	if(other_reasons.poverty[0].percent > max_obj.percent) {
		max_obj = {
			'value': 'Hiding Addiction & Poverty',
			'percent': parseInt(other_reasons.poverty[0].percent)
		};	
	}
	
	if(other_reasons.racial[0].percent > max_obj.percent) {
		max_obj = {
			'value': 'Racial Control',
			'percent': parseInt(other_reasons.racial[0].percent)
		};	
	}
	
	return max_obj;
}

function preSetup() {
	setupViewWithDBInfo();
	$('.bottom-row').hide();
	$('.screen').show();
	
	intervalID = setInterval(function(){
		
		$('.card').removeClass('flip');
		setTimeout(function(){
			var a = $('.card');
			a[flipIndex].classList.add('flip')
			flipIndex += 1;
			if(flipIndex > 3) {
				flipIndex = 0;
			}
		}, 1000)
		
		
	}, 3200);
	
}

function setViewBasedOnSqaure(value) {
	var important_values = jsonData.important_value;
	for(var i = 0; i < important_values.length; i++) {
		
		if(important_values[i].most_important == value) {
			var border_color = "border-color: " + getUnderlineColor(important_values[i].most_important); + ";"
			$('.pie-stat-screen .chart-detail h1').html(
				'<span class="percentage">'+ parseInt(important_values[i].percent) +'% of visitors</span> agree that <span class="underline"' + border_color + '>'+ important_values[i].most_important.toLowerCase() +'</span> should be the most important role of prisons.'
			);
			break;	
		}
	}
}

function getSureness() {
	
	if(jsonData.summary.value_reflect = 'no') {
		return 'think that <strong>'+ jsonData.summary.most_important +'</strong> is not valued enough';
	}
	
	if(jsonData.summary.value_reflect = 'unsure') {
		return 'aren\'t sure if <strong>'+ jsonData.summary.most_important +'</strong> is valued enough';
	}
	
	if(jsonData.summary.value_reflect = 'yes') {
		return 'think that <strong>'+ jsonData.summary.most_important +'</strong> is valued enough';
	}
	
}

function setupViewWithDBInfo() {
	
	/*for(i = 0; i < jsonData.percentages.length; i++) {
		var item = jsonData.percentages[i];
		
		if(item.value_reflected == 'unsure') {
			$('.graphic li.unsure').html('<span class="larger grey">'+ parseInt(item.percent) +'%</span> Unsure');
		}
		
		if(item.value_reflected == 'yes') {
			$('.graphic li.is-valud').html('<span class="larger green">'+ parseInt(item.percent) +'%</span> Is Valued');
		}
		
		if(item.value_reflected == 'no') {
			$('.graphic li.not-valued').html('<span class="larger red">'+ parseInt(item.percent) +'%</span> Not Valued');
		}
	}
	
	//Majority Most Important
	var max = getMaxIndex();
	var value = jsonData.summary.most_important;
	
	//$('.values-note p').html('..... and '+ parseInt(jsonData.summary.value_reflect_percent) +'% of those visitors ' + getSureness());
	
	if(value == "Incapacitation") {
	 	$('.most-important-graphic img').attr('src', incapacitation_image);
 	}
 	
 	if(value == "Deterrence") {
	 	$('.most-important-graphic img').attr('src', deterrence_image);
 	}
 	
 	if(value == "Rehabilitation") {
	 	$('.most-important-graphic img').attr('src', rehabilitation_image);
 	}
 	
 	if(value == "Retribution") {
	 	$('.most-important-graphic img').attr('src', retribution_image);
 	}
	
	//Other Factors
	$('.factor-note p').html(parseInt(jsonData.factor_value.percent) + '% of visitors think that <strong>'+ jsonData.factor_value.other_factor +'</strong> has contributed to the recent prison boom.');
	if(jsonData.factor_value.other_factor == 'Profit Motive') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-economic.svg');
	}
	
	if(jsonData.factor_value.other_factor == 'No Other Objectives') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-nootherreason.svg');
	}
	
	if(jsonData.factor_value.other_factor == 'Racial Control') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-racial.svg');
	}
	
	if(jsonData.factor_value.other_factor == 'Hiding Addiction & Poverty') {
		$('.factor-graphic img').attr('src', 'assets/icons/icon-hidingpoverty.svg');
	}*/
}



function getMaxIndex() {
	var important_values = jsonData.important_value;
	var maximum = parseInt(important_values[0].percent);
	var index = 0;
	
	for(i = 1; i < important_values.length; i++) {
		
		if (important_values[i].perent > maximum) {
			maximum = parseInt(important_values[i].percent);
			index = i;
		}
		
	}
	
	return index;
}

var ExitTimer;
function showDoneModal() {
	$("#modal-content, #modal-background").addClass("active");
	ExitTimer = setTimeout(function(){ window.location.href = window.location.pathname; }, 20000);
}

function introSetup() {
	$('.btn-intro').click(function(){
		//sendGAEvent('Icon Ordering Screen');
		$('.home-screen .next').show();
		clearInterval(intervalID);
		$('.home-screen h1').html('What <span class="underline">should</span> our prisons do?');
		$('p.main-screen-intro').html("In your opinion, what is the most important job of our prison system?<br>Drag the icons to vote.");
		$('.btn-intro').hide();
		$('.more-info').hide();
		$('.animation').removeClass('card-wrapper');
		$('.animation').addClass('bottom-row');
		$('.bottom-row').show();
		$('.animation').hide();
	
		$('.home-icon').removeClass('faded');
		$('.home-icon a').attr('href', '#open-modal');
		
		$('.squareGroup li').droppable({
		   drop: function(event,ui){
		
		       var droppable = $(this);
		        var draggable = ui.draggable;
		
		    console.log(draggable.attr('id') + ' is ' + droppable.attr('id'));
		
		    droppable.attr('data-current', draggable.attr('id') );
		
            var squareWidth = droppable.width();
            var squareHeight = droppable.height();
            ui.draggable.css({width: squareWidth, height: squareHeight});
		
		    //slides .square into place, centers content
		    var $this = $(this);
		    ui.draggable.position({
		      my: "center",
		      at: "center",
		      of: $this,
		      using: function(pos) {
		        $(this).animate(pos, 200, "linear");
		        }
		    });
		
		      // adds highlight outline when dragged in place
		      ui.draggable.addClass( 'placed' );
		      ui.draggable.data('droppedin',$(this));
		
		      //prevents multiple .squares from being placed in same container
		      $(this).droppable('disable');
		
		       //alert function
		       setTimeout(function() {
		            var dragID = ui.draggable;
		
		// order of items
		       if (!$(".ui-droppable").not(".ui-droppable-disabled").length) {
		        	var result = "";
					$('.squaredotted').each(function(el){
		            	console.log($(this).attr('data-current'));
						result += $(this).attr('data-current') + ',';
		         	});
				 	//alert(result);
				 	
				 	square_order = result.split(",");
				 	var border_color = getUnderlineColor();
				 	if(square_order[0] == "Incapacitation") {
					 	$('.did-you-know .selected-square img').attr('src', incapacitation_image);
					 	$('.did-you-know .details p').html(incapacitation_text);
					 	
					 	$('.question-section .question h1').html('Do you think the U.S. prison system <span class="underline" style="border-color: '+ border_color +'">incapacitates</span> dangerous people in effective and fair numbers?');
					 	
					 	setViewBasedOnSqaure("Incapacitation");
				 	}
				 	
				 	if(square_order[0] == "Deterrence") {
					 	$('.did-you-know .selected-square img').attr('src', deterrence_image);
					 	$('.did-you-know .details p').html(deterrence_text);	
					 	
					 	$('.question-section .question h1').html('Do you think the U.S. prison system succeeds in <span class="underline" style="border-color: '+ border_color +'">deterring</span> crime in a fair and effective way?');
					 	
					 	setViewBasedOnSqaure("Deterrence");
				 	}
				 	
				 	if(square_order[0] == "Rehabilitation") {
					 	$('.did-you-know .selected-square img').attr('src', rehabilitation_image);
					 	$('.did-you-know .details p').html(rehabilitation_text);
					 	
					 	$('.question-section .question h1').html('Do you think the U.S. prison system succeeds in <span class="underline" style="border-color: '+ border_color +'">rehabilitating</span> men and women before their release?');
					 	
					 	setViewBasedOnSqaure("Rehabilitation");
				 	}
				 	
				 	if(square_order[0] == "Retribution") {
					 	$('.did-you-know .selected-square img').attr('src', retribution_image);
					 	$('.did-you-know .details p').html(retribution_text);
					 	
					 	$('.question-section .question h1').html('Do you think that U.S. prisons succeed in delivering the right amount of <span class="underline" style="border-color: '+ border_color +'">retribution</span> against lawbreakers?');
					 	
					 	setViewBasedOnSqaure("Retribution");
				 	}
				 	
				 	$('.did-you-know .details h1').text(square_order[0] + ' at ESP');
				 	$('span.value-enough').text(square_order[0].toLowerCase());
				 	
				 	
				 	if(interactiveJsonData.important_value[0].value == square_order[0]) {
					 	var arr = interactiveJsonData.important_value[0];
					 	
					 	$('.chart-detail .detail h1').html( 
					 		parseInt(arr.percent) + 
					 		'% of visitors agree that <span class="underline" style="border-color:#D31E2A;">'+ 
					 		arr.value.toLowerCase() +
					 		'</span> should be the most important role of prisons.');
				 	}
				 	
				 	if(interactiveJsonData.important_value[1].value == square_order[0]) {
					 	var arr = interactiveJsonData.important_value[1];
					 	
					 	$('.chart-detail .detail h1').html( 
					 		parseInt(arr.percent) + 
					 		'% of visitors agree that <span class="underline" style="border-color:#E4777C;">'+ 
					 		arr.value.toLowerCase() +
					 		'</span> should be the most important role of prisons.');
				 	}
				 	
				 	if(interactiveJsonData.important_value[2].value == square_order[0]) {
					 	var arr = interactiveJsonData.important_value[2];
					 	
					 	$('.chart-detail .detail h1').html( 
					 		parseInt(arr.percent) + 
					 		'% of visitors agree that <span class="underline" style="border-color:#811727;">'+ 
					 		arr.value.toLowerCase() +
					 		'</span> should be the most important role of prisons.');
				 	}
				 	
				 	if(interactiveJsonData.important_value[3].value == square_order[0]) {
					 	var arr = interactiveJsonData.important_value[3];
					 	
					 	$('.chart-detail .detail h1').html( 
					 		parseInt(arr.percent) + 
					 		'% of visitors agree that <span class="underline" style="border-color:#9D7E8B;">'+ 
					 		arr.value.toLowerCase() +
					 		'</span> should be the most important role of prisons.');
				 	}
				 	
				 	
				 	$('.home-screen .next').removeClass('disabled');
		        } else {
			        if(!$('.home-screen .next').hasClass('disabled')) {
						$('.home-screen .next').addClass('disabled');
					}
		        }
		      }, 400);
		  }
		});
		
		
		//.square draggable
		$(".square").draggable({
		
		    stack: ".square",
		    revert: function (event, ui) {
		           $(this).data("ui-draggable").originalPosition = {
		               width: 112,
		               height: 112
		           }
		           return !event;
		    },
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
		
			    //if not placed remove class
			    if($(this).data('droppedin')){
				    $(this).data('droppedin').droppable('enable');
				    $(this).data('droppedin',null)
				    $(this).removeClass( 'placed' )
			    }
		
		    },
		
		    //snap to container
		    snap: ".squaredotted",
		    //snap inside container
		    snapMode: "inner",
		    //fix snap problems with smaller containers
		    snapTolerance: 11,
		    // change size of image to fit container
		    snapped: function(event, ui) {
		        var squareWidth = ui.snapElement.width();
		        var squareHeight = ui.snapElement.height();
		
		
		        ui.helper.css({width: squareWidth, height: squareHeight});
			}
		});

		/*$('.squareGroup li').droppable({tolerance: "fit",
			drop: function(event,ui){
				ui.draggable.addClass( 'placed' );
		
				ui.draggable.data('droppedin',$(this));
		
				$(this).droppable('disable');
		
				if (!$(".ui-droppable").not(".ui-droppable-disabled").length) {
					$('.home-screen .next').removeClass('disabled');
				} else {
					if(!$('.home-screen .next').hasClass('disabled')) {
						$('.home-screen .next').addClass('disabled');
					}
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
		
		    },
		    snap: ".squaredotted",
		    snapMode: "inner",
		    snapTolerance: 11,
		    snapped: function(event, ui) {
		        var squareWidth = ui.snapElement.width();
		        var squareHeight = ui.snapElement.height();
		        ui.helper.css({width: squareWidth, height: squareHeight});
			}
		});*/
		
		$('.bordered-boxes').show();
		$('.home-screen .navigation').show();
	
	});
}

function nextButtonSetup() {
	$('.next').click(function(){
		
	  if(!$(this).hasClass('disabled')) {
	      var class_name = $(this).data('divclass');
	      if(class_name) {
		      
		      
		   // var screen = getScreenViewName(class_name);  
		   // sendGAEvent(screen);
		    
	        $(class_name).addClass('animated fadeOutLeft');
	
	        if(class_name == '.home-screen') {
	          $(class_name).one('webkitAnimationEnd animationend', function(){
	           /* $('.selected-square').show();
	            $('.selected-square').addClass('animated fadeIn');
	            $('.did-you-know .details').show();
				$('.did-you-know .details').addClass('animated fadeIn');*/
	          });
	        }
	        
	        if(class_name == '.final-screen') {
		        
		        setTimeout(function(){
			    
			    	$('.first-section').fadeIn('400').promise().done(function() {
				    	
				    	setTimeout(function(){
					    	
					    	$('.second-section').fadeIn('400').promise().done(function() {
						    	
						    	setTimeout(function(){
							    	$('.third-section').fadeIn('slow');
							    	$('.pre-final-screen .next-button').removeClass('disabled');
							    }, 550);
							});
							
					    }, 550);
					});
			    
			    }, 900);
		        
	        }
	
	        if(class_name == '.did-you-know-screen') {
	          $(class_name).one('webkitAnimationEnd animationend', function(){
		            $('.question-section').show();
		            $('.question-section').addClass('animated fadeIn');
		        });
	        }
	        
	        if(class_name == '.why-else-screen') {
		        capture_data(false);
	        }
	      }
    	}
    });
}

function checkScreenSize() {
	var rightSize =  document.body.clientWidth >= 980 && document.body.clientHeight >= 768;
	
	if(!rightSize) {
		$('.error-screen').show();
	}
}

var timeout = [];
function resetTimeout () {
    if (timeout) {
        $.each(timeout, function(index, value){
            clearTimeout(value);
            timeout.splice(index, 1);
        });
    }
    timeout.push(setTimeout(showDoneModal, 120000));
}

$(document).ready(function(){
	//sendGAEvent('Home Screen');
	checkScreenSize();
	
	preSetup();
	
	introSetup();

    // HIDE ME FOR WEB
    $(document).on('click tap drag', resetTimeout);
    
	
	$('#modal-background, #modal-content').click(function(){
		$("#modal-content, #modal-background").removeClass("active");
		clearTimeout(ExitTimer);
		idleTime = 0;
	});
	
    $('.card').click(function(){
      clearInterval(intervalID);
      if($(this).hasClass('flip')) {
	  	$('.card').removeClass('flip');   
      } else {
	      $('.card').removeClass('flip');
	      $(this).addClass("flip");
      }
    });

    /*$('.card .close-icon').click(function(event){
      event.stopPropagation(); //Fire event to stap .card click event from firing
      clearInterval(intervalID);
      $(this).parents(".card").removeClass("flip");
    });*/

    $('.options button').click(function(){
    	$('.options button').removeClass('active');
		$(this).addClass('active');
      
		if($('.pie-stat-screen .next-button').hasClass('disabled')) {
			$('.pie-stat-screen .next-button').removeClass('disabled');
      	}
    });

    $('.tooltip-li img').click(function(){
      $('.tooltip').toggle()
    });

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
		
		if(e.keyCode == 13) {
  			$('.tooltip').hide();	
		}
	});

	$('.reason-options ul li').click(function(){
		
		var type = $(this).data('type');
		
		if(type == "nootherreason") {
			$('.reason-options ul li').addClass('non-active');
			$('.reason-options ul li').removeClass('selected');
		}
		
		
		if(type != "nootherreason") {
			if($('.reason-options ul li.nootherreason').hasClass('selected')) {
				$('.reason-options ul li').removeClass('selected');	
				
				if(type == 'somethingelse') {
					$(this).toggleClass('selected');
				}
			}
		}
		
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
    nextButtonSetup();
    
    $('.btn-finish').click(function(){
	    window.location.href = window.location.pathname;
    });
    
    $('.btn-back-home').click(function(){
	    if(square_order.length > 0) {
			capture_data(true);
		} else {
			window.location.href = window.location.pathname;
		}
    });
});