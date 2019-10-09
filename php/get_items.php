<?php
    require_once("connect.php");

    $connection = connection();

    function retrieve_from_db($querry)
    {
        $sql = $querry;
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
            return $row;
    }

    function array_to_string($array)
    {
        $size = sizeof($array);
        $index = 1;
        $string = "";

        foreach($array as $data)
        {
            $string = $string . ($data . ($index < $size ? " " : ""));
            $index = $index + 1;
        }

        return $string;
    }

    function get_one_user($user_name)
    {
        $row = retrieve_from_db("SELECT * FROM Accounts WHERE software_name='" . $user_name . "'");

        $string = array_to_string($row);
        
        die($string);
    }

    function get_all_users()
    {
        $row = retrieve_from_db("SELECT * FROM Accounts");

        $string = array_to_string($row);
        
        die($string);
    }

    function get_one_software($software_name)
    {
        $row = retrieve_from_db("SELECT * FROM Software WHERE software_name='" . $software_name . "'");

        $string = array_to_string($row);
        
        die($string);
    }

    function get_all_software()
    {
        $row = retrieve_from_db("SELECT * FROM Software");

        $string = array_to_string($row);
        
        die($string);
    }

    function get_one_game($game_name)
    {
        $row = retrieve_from_db("SELECT * FROM Games WHERE game_name='" . $game_name . "'");

        $string = array_to_string($row);
        
        die($string);
    }

    function get_all_games()
    {
        $row = retrieve_from_db("SELECT * FROM Games");

        $string = array_to_string($row);
        
        die($string);
    }
?>