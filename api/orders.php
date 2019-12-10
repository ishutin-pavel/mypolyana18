<?php
  include 'database.php';

  $orders = [];

  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  switch ($method) {
    case 'GET':
      $query = "
      SELECT
        orders.id, orders.name, orders.phone,
        orders.plot, orders.date, orders.comment
      FROM orders
      ORDER BY id DESC";
      if ($result = $mysql->query($query)) {
        $i = 0;
        while ($order = $result->fetch_assoc()) {
          $orders[$i]['id'] = $order['id'];
          $orders[$i]['name'] = $order['name'];
          $orders[$i]['phone'] = $order['phone'];
          $orders[$i]['plot'] = $order['plot'];
          $orders[$i]['date'] = $order['date'];
          $orders[$i]['comment'] = $order['comment'];
          $i++;
        }
        echo json_encode($orders);
      } else {
        http_response_code(404);
      }
      break;
    case 'POST':
        $postdata = file_get_contents("php://input");
      //if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);

        if (trim($request->name) === '' || trim($request->phone) === '') {
          return http_response_code(400);
        }

        $name = mysqli_real_escape_string($mysql, trim($request->name));
        $phone = mysqli_real_escape_string($mysql, trim($request->phone));
        $plot = mysqli_real_escape_string($mysql, (int)$request->plot);
        $date = mysqli_real_escape_string($mysql, trim($request->date));
        $comment = mysqli_real_escape_string($mysql, trim($request->comment));

        $query = "INSERT INTO orders (
        `name`, `phone`, `plot`, `date`, `comment`) 
        VALUES
        ('".$name."', '".$phone."', '".$plot."','".date('d.m.y')."', '".$comment."')";

        if ($mysql->query($query)) {
          http_response_code(201);
        } else {
          echo $mysql->error;
          http_response_code(422);
        }

        $from = "info@mypolyana18.ru";
        $to = "kpolyana18@yandex.ru";
        $subject = $comment;
        $message = "Цель: ".$comment."\n\nИмя: ".$name."\n\nНомер: ".$phone."\n\n";
        if ($plot > 0)
          $message .= "Номер участка: ".$plot;
        $headers = "From:".$from;
        mail($to,$subject,$message,$headers);
      //}
      break;
    case 'PUT':
      $query = "UPDATE plot SET status = '".$_GET['status']."' WHERE id = '".$_GET['id']."'";
      if ($mysql->query($query)) {
        http_response_code(201);
      } else {
        echo $mysql->error;
        http_response_code(422);
      }
      break;
    case 'DELETE':
      $query = "DELETE FROM orders WHERE id = '".$_GET['id']."'";
      if ($mysql->query($query)) {
        http_response_code(200);
      } else {
        echo $mysql->error;
        http_response_code(422);
      }
      break;
  }
?>