<?php
	
	
	$mysql_hostname = "localhost";
    $mysql_user = "staging_esp";
    $mysql_password = "e_F5ju90";
    $mysql_database = "staging_esp";
	$con = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database);
	
	$most_important = "Select most_important as most_important, (Count(most_important)* 100 / (Select Count(*) From esp_prisons)) as percent From esp_prisons Group By most_important ORDER By percent DESC LIMIT 4";
    $query = mysqli_query($con, $most_important);
	$most_important_array = array();
	
	while($row = mysqli_fetch_assoc($query)){
    	array_push($most_important_array, array(
			'most_important' => $row['most_important'],
			'percent' => $row['percent']	
		));
	};
	
	
	$values_reflected = "Select  value_reflected, (Count(value_reflected)* 100 / (Select Count(*) From esp_prisons)) as percent From esp_prisons Group By value_reflected ORDER By percent DESC LIMIT 1";
	$query = mysqli_query($con, $values_reflected);
	$row = mysqli_fetch_assoc($query); 
	
	$value_reflected_array = array(
		'value_reflected' => $row['value_reflected'],
		'percent' => $row['percent']
	);
	
	
	$other_factor = "SELECT ((Select Count(*) From esp_prisons WHERE profit_motives_selected = 1)* 100 / (Select Count(*) From esp_prisons)) as profit_percent, ((Select Count(*) From esp_prisons WHERE racial_control__selected = 1)* 100 / (Select Count(*) From esp_prisons)) as racial_percent, ((Select Count(*) From esp_prisons WHERE no_objective_selected = 1)* 100 / (Select Count(*) From esp_prisons)) as objective_percent, ((Select Count(*) From esp_prisons WHERE addiction_poverty_selected = 1)* 100 / (Select Count(*) From esp_prisons)) as poverty_percent FROM `esp_prisons` GROUP by profit_percent LIMIT 1";
	$query = mysqli_query($con, $other_factor);
	
	$row = mysqli_fetch_assoc($query);
	$other_factor = get_highest_factor($row);

	$summary = "Select most_important, value_reflected, COUNT(value_reflected) AS value_reflected_count, (COUNT(value_reflected) * 100 / (Select Count(*) from esp_prisons) ) AS value_reflected_percent, (COUNT(most_important) * 100 / (Select Count(*) from esp_prisons) ) AS most_important_percent FROM esp_prisons GROUP BY value_reflected ORDER BY value_reflected_count DESC LIMIT 1;";
	$query = mysqli_query($con, $summary);
	$row = mysqli_fetch_assoc($query);
	
	$summary_array = array(
		'most_important' => $row['most_important'],
		'most_important_percent' => $row['most_important_percent'],
		'value_reflect' => $row['value_reflected'],
		'value_reflect_percent' => $row['value_reflected_percent']
	);
	
	$percentage_array = array();
	$important = $row['most_important'];
	$percentages = "SELECT value_reflected, (COUNT(value_reflected) * 100 / (Select Count(*) from esp_prisons Where most_important = '$important') ) AS value_reflected_percent FROM `esp_prisons` Where most_important = '$important'";
	$query = mysqli_query($con, $percentages);
	
	while($row = mysqli_fetch_assoc($query)){
    	array_push($percentage_array, array(
			'value_reflected' => $row['value_reflected'],
			'percent' => $row['value_reflected_percent']	
		));
	};
	
	
	$data = array("important_value"=>$most_important_array, "reflected_value"=>$value_reflected_array, "factor_value"=>$other_factor,  "summary"=>$summary_array, 'percentages' => $percentage_array);
	print_r(json_encode($data));
	
	
	
	function get_highest_factor($row) {
		$value = max( $row["profit_percent"], $row["racial_percent"], $row["objective_percent"], $row["poverty_percent"] );
		
		if($value == $row["profit_percent"]) {
			return array(
				'other_factor' => 'Profit Motive',
				'percent' => $value
			);
		}
		
		if($value == $row["racial_percent"]) {
			return array(
				'other_factor' => 'Racial Control',
				'percent' => $value
			);
		}
		
		if($value == $row["objective_percent"]) {
			return array(
				'other_factor' => 'No Other Objectives',
				'percent' => $value
			);
		}
		
		if($value == $row["poverty_percent"]) {
			return array(
				'other_factor' => 'Hiding Addiction & Poverty',
				'percent' => $value
			);
		}
	}
	
	
?>