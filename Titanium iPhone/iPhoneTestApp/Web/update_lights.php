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
$id = $_POST['id'];
$light = $_POST['light'];



// Select eveything from the lights table where user_id field == the user_id we posted
$sql = "SELECT * FROM lights WHERE user_id = '" . $user_id . "' AND id = '". $id ."'";
$query = mysql_query($sql);

// If we find a match, create an array of data, json_encode it and echo it out
if (mysql_num_rows($query) > 0)
{
  $updatesql = "UPDATE lights SET light = '". $light ."'WHERE id = '". $id ."'"; 
  
  $query2 = mysql_query($updatesql);
  if($query2){
    $sql2 = "SELECT * FROM lights WHERE user_id = '" . $user_id . "' AND id = '". $id ."'";
    $query3 = mysql_query($sql2);
    if (mysql_num_rows($query3) > 0){
      $row = mysql_fetch_array($query3);
      $response = array(
        'status' => true,
        'id' => $row['id'],
        'light' => $row['light'],
        'user_id' => $row['id']
      );
      echo json_encode($response);  
    } else {
      $response = array(
          'user_id' => $user_id,
          'message' => 'Update succesfull, but new Values arent found.',
          'status' => false
        );
      echo json_encode($response);
    }
    
  } else {
      $response = array(
        'user_id' => $user_id,
        'message' => 'Update failed.',
        'status' => false
      );
    echo json_encode($response);
  }
  
}
else
{
  // Else no lights were found
  $response = array(
    'user_id' => $user_id,
    'message' => 'No Lights were found.',
    'status' => false
  );
  echo json_encode($response);
}
?>
