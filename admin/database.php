<?php

  $mysql = new mysqli('localhost', 'u0793434_default', 'hgn_QJ1F', 'u0793434_default');
  //$mysql = new mysqli('localhost', 'root', '', 'u0793434_default');
  if ($mysql->connect_errno) {
    die('Unable to connect to database');
  }

  mysqli_set_charset($mysql, "utf8");
?>