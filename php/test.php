<?php

    $text = $_POST["text"];
    $pass = $_POST["pass"];

    $text = str_split($text);
    $pass = str_split($pass);

    echo $text[0] . " --- " . sizeof($pass);

?>