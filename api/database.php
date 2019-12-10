<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $mysql = new mysqli('localhost', 'u0793434_default', 'hgn_QJ1F', 'u0793434_default');

  if ($mysql->connect_errno) {
    die('Unable to connect to database');
  }

  mysqli_set_charset($mysql, "utf8");
?>