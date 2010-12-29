<?php
// Check $_POST['user_id']

if(!isset($_POST['user_id'])){
  die("No User ID.");
}

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

// $_POST['user_id'] is the param names we sent in our click event in lights.js
$user_id = $_POST['user_id'];



// Select eveything from the lights table where user_id field == the user_id we posted
$sql = "SELECT * FROM lights WHERE user_id = '" . $user_id . "'";
$query = mysql_query($sql);

// If we find a match, create an array of data, json_encode it and echo it out
if (mysql_num_rows($query) > 0)
{
  $array = array();  
  while($row = mysql_fetch_object($query)){
    $response = array(
    'id' => $row->id,
    'pos_x' => $row->pos_x,
    'pos_y' => $row->pos_y,
    'light' => $row->light
  );
  $array[] = $response; 
  } 
  echo json_encode($array);
}
else
{
  // Else no lights were found
  $response = array(
    'user_id' => $user_id,
    'message' => 'No Lights.',
    'status' => false
  );
  echo json_encode($response);
}
?>
