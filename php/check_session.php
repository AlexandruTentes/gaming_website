<?php
    session_start();

    $user = isset($_SESSION['user']) ? $_SESSION['user'] : NULL;
    if($user != NULL)
        die($user);
    else
        die("0");
?>