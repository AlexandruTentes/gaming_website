<?php

    session_start();

    $userID = isset($_SESSION['user']) ? $_SESSION['user'] : NULL;
    
    if($userID != NULL)
        die("You are already connected!");

    $input_validation = true;
    $id = $_POST["id"];
    $password = $_POST["password"];

    if(empty($id))
        $input_validation = false;

    if(empty($password))
        $input_validation = false;

    if($input_validation != false)
    {
        require_once("connect.php");
        $connection = connection();

        $sql = "SELECT id FROM Accounts WHERE account_id = '" . $id . "' AND account_password = '" . $password . "'";
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
        {
            $_SESSION["user"] = $row[0];
            die("1");
        }
        else
            die("ID or Password is wrong");
    }
    else
        die("Please fill in all the fields");
?>