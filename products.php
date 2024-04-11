<?php

$con = mysqli_connect('tcp://7.tcp.eu.ngrok.io:17912','root','','products');

$sql = "SELECT * FROM images";
$result = mysqli_query($con,$sql);
$video = array();

if($result){
    $x =0;
    if($result && mysqli_num_rows($result)>0){
        while($user_data = mysqli_fetch_assoc($result)){
            $x++;

            $video[] = $user_data;

        }

        echo json_encode($video,JSON_PRETTY_PRINT);
        

    }
}

?>