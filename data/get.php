<?php
	
	
	$mysql_hostname = "localhost";
    $mysql_user = "staging_esp";
    $mysql_password = "e_F5ju90";
    $mysql_database = "staging_esp";
	$con = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database);
	
	$most_important = "SELECT most_important, COUNT(*) as total_count FROM esp_prisons GROUP BY most_important Order By total_count desc";
    $query = mysqli_query($con, $most_important);
	$temp = array();
	$total = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		array_push($temp, array(
			'value' => $row['most_important'],
			'count' => $row['total_count']
		));
		
		$total += $row['total_count'];
	};
	
	$imporant_array = array();
	
	foreach ($temp as $value) {
		
	   	array_push($imporant_array, array(
			'value' => $value['value'],
			'count' => $value['count'],
			'percent' => (($value['count'] / $total) * 100)
		));
	}
	
	/** Deterrence Reflected **/
	$q = "SELECT value_reflected as reflected, count(*) as total_count FROM `esp_prisons` WHERE most_important = 'Deterrence' GROUP By value_reflected order by total_count";
	$query = mysqli_query($con, $q);
	
	$temp = array();
	$total = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		array_push($temp, array(
			'value' => $row['reflected'],
			'count' => $row['total_count']
		));
		
		$total += $row['total_count'];
	};
	
	$deterrence = array();
	foreach ($temp as $value) {
		
	   	array_push($deterrence, array(
			'value' => $value['value'],
			'count' => $value['count'],
			'percent' => (($value['count'] / $total) * 100)
		));
	}
	
	/** Rehabilitation Reflected **/
	$q = "SELECT value_reflected as reflected, count(*) as total_count FROM `esp_prisons` WHERE most_important = 'Rehabilitation' GROUP By value_reflected order by total_count";
	$query = mysqli_query($con, $q);
	
	$temp = array();
	$total = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		array_push($temp, array(
			'value' => $row['reflected'],
			'count' => $row['total_count']
		));
		
		$total += $row['total_count'];
	};
	
	$rehabilitation = array();
	foreach ($temp as $value) {
		
	   	array_push($rehabilitation, array(
			'value' => $value['value'],
			'count' => $value['count'],
			'percent' => (($value['count'] / $total) * 100)
		));
	}
	
	/** Incapacitation Reflected **/
	$q = "SELECT value_reflected as reflected, count(*) as total_count FROM `esp_prisons` WHERE most_important = 'Incapacitation' GROUP By value_reflected order by total_count";
	$query = mysqli_query($con, $q);
	
	$temp = array();
	$total = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		array_push($temp, array(
			'value' => $row['reflected'],
			'count' => $row['total_count']
		));
		
		$total += $row['total_count'];
	};
	
	$incapacitation = array();
	foreach ($temp as $value) {
		
	   	array_push($incapacitation, array(
			'value' => $value['value'],
			'count' => $value['count'],
			'percent' => (($value['count'] / $total) * 100)
		));
	}
	
	/** Retribution Reflected **/
	$q = "SELECT value_reflected as reflected, count(*) as total_count FROM `esp_prisons` WHERE most_important = 'Retribution' GROUP By value_reflected order by total_count";
	$query = mysqli_query($con, $q);
	
	$temp = array();
	$total = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		array_push($temp, array(
			'value' => $row['reflected'],
			'count' => $row['total_count']
		));
		
		$total += $row['total_count'];
	};
	
	$retribution = array();
	foreach ($temp as $value) {
		
	   	array_push($retribution, array(
			'value' => $value['value'],
			'count' => $value['count'],
			'percent' => (($value['count'] / $total) * 100)
		));
	}
	
	
	/** Other Reason Pie Info and Percent Data **/
	$q = "Select COALESCE((Select Count(*) From esp_prisons where profit_motives_selected = 1), 0) as profit_count, COALESCE((Select Count(*) From esp_prisons where racial_control_selected = 1),0) as racial_count, COALESCE((Select Count(*) From esp_prisons where addiction_poverty_selected = 1), 0) as poverty_count, COALESCE((Select Count(*) From esp_prisons where no_objective_selected = 1),0) as no_objective_count, COALESCE((Select Count(*) From esp_prisons where something_else_selected = 1),0) as something_else_count, (COALESCE((Select Count(*) From esp_prisons where profit_motives_selected = 1), 0) + COALESCE((Select Count(*) From esp_prisons where racial_control_selected = 1),0) + COALESCE((Select Count(*) From esp_prisons where addiction_poverty_selected = 1), 0) + COALESCE((Select Count(*) From esp_prisons where no_objective_selected = 1), 0)) as total_count From esp_prisons LIMIT 1";
	
	$query = mysqli_query($con, $q);
	$other_reasons = array();
	
	while($row = mysqli_fetch_assoc($query)){
		
		$profit = array();
		if(isset($row['profit_count'])) {
			
			array_push($profit, array(
				'name' => 'Profit Motives',
				'count' => $row['profit_count'],
				'percent' => (($row['profit_count'] / $row['total_count']) * 100)
			));
		
		}
		
		$racial = array();
		if(isset($row['racial_count'])) {
			
			array_push($racial, array(
				'name' => 'Racial / Political Control',
				'count' => $row['racial_count'],
				'percent' => (($row['racial_count'] / $row['total_count']) * 100)
			));
		
		}
		
		$poverty = array();
		if(isset($row['poverty_count'])) {
			
			array_push($poverty, array(
				'name' => 'Hiding Addiction & Poverty',
				'count' => $row['poverty_count'],
				'percent' => (($row['poverty_count'] / $row['total_count']) * 100)
			));
		
		}
		
		$objective = array();
		if(isset($row['no_objective_count'])) {
			
			array_push($objective, array(
				'name' => 'No Other Objectives',
				'count' => $row['no_objective_count'],
				'percent' => (($row['no_objective_count'] / $row['total_count']) * 100)
			));
		
		}
		
		$something = array();
		if(isset($row['something_else_count'])) {
			
			array_push($something, array(
				'name' => 'Something Else',
				'count' => $row['something_else_count'],
				'percent' => (($row['something_else_count'] / $row['total_count']) * 100)
			));
		
		}
		
		array_push($other_reasons, array(
			'poverty' => $poverty,
			'racial' => $racial,
			'profit' => $profit,
			'objective' => $objective,
			'something_else' => $something
		));
		
	};
	
	/** Retribution Reflected **/
	$q = "SELECT Count(*) as total FROM `esp_prisons`";
	$query = mysqli_query($con, $q);
	
	$total_count = 0;
	
	while($row = mysqli_fetch_assoc($query)){
		$total_count = $row['total'];
	}
	
	$data = array(
		"important_value" => $imporant_array,
		"deterrence" => $deterrence,
		"rehabilitation" => $rehabilitation,
		"incapacitation" => $incapacitation,
		"retribution" => $retribution,
		"other_reasons" => $other_reasons,
		"count" => $total_count
	);
	
	print_r(json_encode($data));
	//print_r($total);
	
	
	function get_highest_factor($row) {
		$value = max( $row["profit_percent"], $row["racial_percent"], $row["objective_percent"], $row["poverty_percent"] );
		
		if($value == $row["profit_percent"]) {
			return array(
				'other_factor' => 'Profit Motives',
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