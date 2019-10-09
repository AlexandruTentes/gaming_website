<?php
    require_once("connect.php");

    $connection = connection();

    $input_validation = true;

    $name = $_POST["name"];
    $id = $_POST["id"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $email = $_POST["email"];

    if(empty($name))
        die("Please pick an in-game name!");
    else
    {
        $sql = "SELECT id FROM Accounts WHERE account_name = '" . $name . "'";
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
            die("Name already in use!");

        if(sizeof(str_split($name)) < 2)
            die("Please pick a longer name!");
        else
        if(sizeof(str_split($name)) > 10)
            die("Please pick a name shorter than 10 characters!");
    }

    if(empty($id))
        die("Please add an ID to login with!");
    else
    {
        $sql = "SELECT id FROM Accounts WHERE account_id = '" . $id . "'";
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
            die("Pick a more secured ID!");

        if(sizeof(str_split($id)) < 6)
            die("IDs have to be at least 6 characters long!");
        else
        if(sizeof(str_split($id)) > 12)
            die("IDs have to be at max 12 characters long!");
    }

    if(sizeof(str_split($password)) < 8)
        die("Passwords have to be at least 8 characters long!");
    else
    if(sizeof(str_split($password)) > 16)
        die("Pick a shorter password! Max 16 characters long!");

    if (empty($password) || empty($repassword))
        die("Please fill all password fields!");

    if ($password != $repassword)
        die("Passwords do not match!");

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL))
        die("Invalid email!");
    else
    {
        $sql = "SELECT id FROM Accounts WHERE account_email = '" . $email . "'";
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
            die("Email already in use!");
    }

    session_start();

    $user = isset($_SESSION['user']) ? $_SESSION['user'] : NULL;

    if($user != NULL)
        die("You are already connected!");

    $sql = "INSERT INTO Accounts(account_id, account_password, account_name, account_email, privileges_level)
            VALUES('$id', '$password', '$name', '$email', '0')";

    $error = 0;

    if($connection->query($sql))
    {
        $sql = "SELECT id FROM Accounts WHERE account_id = '$id'";
        $error = $connection->query($sql)->fetch_row()[0];
    }

    $connection->close();

    if($error != 0)
    {
        $_SESSION["user"] = $error;
        die("1");
    }
    else
        die("An unexpected error occured!");
?>