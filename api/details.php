<?php
  include 'database.php';

  $details = [];

  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  switch ($method) {
    case 'GET':
      $query = "SELECT id, details FROM houses";
      if ($result = $mysql->query($query)) {
        $i = 0;
        while ($item = $result->fetch_assoc()) {
          $details[$i]['id'] = $item['id'];
          $details[$i]['details'] = $item['details'];
          $i++;
        }
        echo json_encode($details);
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

        $from = "mail@mail.mypolyana.ru";
        $to = "amiravkhadiev@gmail.com";
        $subject = $comment;
        $message = "Цель: ".$comment."\n\nИмя: ".$name."\n\nНомер: ".$phone."\n\n";
        if ($plot > 0)
          $message .= "Номер участка: ".$plot;
        $headers = "From:".$from;
        mail($to,$subject,$message,$headers);
      //}
      break;
    case 'PUT':
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if (trim($request->name) === '') {
        return http_response_code(400);
      }

      $id = mysqli_real_escape_string($mysql, (int)$request->id);
      $name = mysqli_real_escape_string($mysql, trim($request->name));
      $values = mysqli_real_escape_string($mysql, trim($request->values));
      $prices = mysqli_real_escape_string($mysql, trim($request->prices));

      $query = "UPDATE details
      SET name = '".$name."', values_ = '".$values."', prices = '".$prices."'
      WHERE id = '".$id."'";

      if ($mysql->query($query)) {
        http_response_code(200);
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