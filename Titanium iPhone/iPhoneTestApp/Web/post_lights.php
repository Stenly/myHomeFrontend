<?php
// Connect to the database(host, username, password)
$con = mysql_connect('internal-db.s114526.gridserver.com','db114526_myhome','myhomefrontend');
if (!$con)
{
  echo "Failed to make connection.";
  exit;
}
// Select the database. Enter the name of your database (not the same as the table name)
$db = mysql_select_db('db114526_myhome');
if (!$db)
{
  echo "Failed to select db.";
  exit;
}

// $_POST['username'] and $_POST['password'] are the param names we sent in our click event in login.js
$user_id = $_POST['user_id'];

if(!isset($_POST['user_id'])){
  die("No Useer ID.");
}

// Select eveything from the users table where username field == the username we posted and password field == the password we posted
$sql = "SELECT * FROM lights WHERE user_id = '" . $user_id . "'";
$query = mysql_query($sql);

// If we find a match, create an array of data, json_encode it and echo it out
if (mysql_num_rows($query) > 0)
{
  $array = new array();  
  while($row = mysql_fetch_object($query)){
    $response = array(
    'id' => $row['id'],
    'pos_x' => $row['pos_x'],
    'pos_y' => $row['poy_y'],
    'light' => $row['light']
  );
  $array[] = $response; 
  } 
  echo json_encode($array);
}
else
{
  // Else the username and/or password was invalid! Create an array, json_encode it and echo it out
  $response = array(
    'logged' => false,
    'message' => 'Invalid Username and/or Password'
  );
  echo json_encode($response);
}
?>
