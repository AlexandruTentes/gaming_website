<?php
  function connection() {
    require_once("config.inc.php");
    $establish_connection = mysqli_connect($database_host, $database_user,
                           $database_pass, $group_dbname);
    
    if (!$establish_connection)
      echo "Connection error " . mysqli_connect_error();
    else
      return $establish_connection;
  }
?>

