<?php
$con = mysql_connect('internal-db.s114526.gridserver.com','db114526_jquery','jquerymobile');
if (!$con)
{
	echo "Failed to make connection.";
	exit;
}

$db = mysql_select_db('db114526_iphone');
if (!$db)
{
	echo "Failed to select db.";
	exit;
}
if(!isset($_POST['username'])){
  die("No Username.");
}
$username 	= $_POST['username'];
$password 	= $_POST['password'];
$names		= $_POST['names'];
$email		= $_POST['email'];

$sql 		= "SELECT username,email FROM users WHERE username = '" . $username . "' OR email = '" . $email . "'";
$query 		= mysql_query($sql);
if (mysql_num_rows($query) > 0)
{
	echo "That username or email already exists";
}
{
	$insert = "INSERT INTO users (username,password,name,email) VALUES ('" . $username . "','" . $password . "','" . $names . "','" . $email . "')";
	$query 	= mysql_query($insert);
	if ($query)
	{
		echo "Thanks for registering. You may now login.";
	}
	else
	{
		echo "Insert failed";
	}
}
?>
