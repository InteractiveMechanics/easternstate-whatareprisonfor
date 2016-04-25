<?php
	
	function make_safe($data) 
	{
		
	   $data = filter_var($data, FILTER_SANITIZE_STRING);
	   return $data; 
	}
	
	
	
	
	$mysql_hostname = "localhost";
    $mysql_user = "staging_esp";
    $mysql_password = "e_F5ju90";
    $mysql_database = "staging_esp";

    $con = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database);
    
        
    $most = make_safe($_POST['most_important']);
	$second = make_safe($_POST['second_most_important']);
	$third = make_safe($_POST['third_most_important']);
	$least = make_safe($_POST['least_important']);
	$value = make_safe($_POST['value_reflected']);
	$profit = make_safe($_POST['profit_motives_selected']);
	$racial = make_safe($_POST['racial_control_selected']);
	$poverty = make_safe($_POST['addiction_poverty_selected']);
	$objective = make_safe($_POST['no_objective_selected']);
	$something = make_safe($_POST['something_else_selected']);
	$something_else = make_safe($_POST['something_else']);
	$web_or_exhibit = make_safe($_POST['web_or_exhibit']);
    
    
    $sql = "INSERT INTO `esp_prisons` (`id`, `date_created`, `most_important`, `second_most_important`, `third_most_important`, `least_important`, `value_reflected`, `profit_motives_selected`, `racial_control_selected`, `addiction_poverty_selected`, `no_objective_selected`, `something_else_selected`, `something_else`, `web_or_exhibit`) VALUES ('', NOW(), '$most', '$second', '$third', '$least', '$value', '$profit', '$racial', '$poverty', '$objective', '$something', '$something_else', '$web_or_exhibit')";
    
    $query = mysqli_query($con, $sql);
	$row = mysqli_fetch_row($query); 
	
?>