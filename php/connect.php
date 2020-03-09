<?php
  function connection()
  {
    require_once("config.inc.php");
    $establish_connection = @mysqli_connect($database_host, $database_user,
                           $database_pass, $group_dbname);

    unset($database_host, $database_user, $database_pass, $group_dbname);
    
    if (!$establish_connection)
      return null;
    else
      return $establish_connection;
  }
?>

