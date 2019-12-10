<?php
  if(isset($_POST['auth']))
  {
      include 'database.php';
      $query = "SELECT `id` FROM `users` WHERE `login`='".$_REQUEST['login']."' AND `password`='".md5($_REQUEST['password'])."'";
      $result = $mysql->query($query);
      $check = $result->fetch_array();
      if($check[0]==null)
      {
        echo 'Неверный логин и пароль';
      }
      else
      {
        $_SESSION['uid'] = $check[0];
      }
  }
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Красная поляна - Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/bootstrap.css">
</head>
<body>
  <?php
    if (isset($_SESSION['uid'])) {
      include 'admin.php';
    } else {
      include 'login.php';
    }
  ?>
</body>
</html>