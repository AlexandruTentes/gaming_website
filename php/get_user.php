<?php
    session_start();

    $user_id = isset($_SESSION['user']) ? $_SESSION['user'] : NULL;

    if($user_id != NULL)
    {
        require_once("connect.php");

        $connection = connection();

        $sql = "SELECT id, account_name, account_email FROM Accounts WHERE id = '" . $user_id . "'";
        $result = $connection->query($sql);
        
        if($row = mysqli_fetch_row($result))
        {
            $size = sizeof($row);
            $index = 1;

            foreach($row as $data)
            {
                echo $data . ($index < $size ? " " : "");
                $index = $index + 1;
            }
        }
    }
?>