<?php
  include 'database.php';

  $plots = [];

  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  switch ($method) {
    case 'GET':
      $query = "SELECT * FROM plots";
      if (isset($_GET['id']) && !empty($_GET['id']))
        $query .= " WHERE id = '".$_GET['id']."'";
      $query .= " ORDER BY id DESC";
      if ($result = $mysql->query($query) or die($mysql->error)) {
        $i = 0;
        while ($item = $result->fetch_assoc()) {
          $plots[$i]['id'] = $item['id'];
          $plots[$i]['price'] = $item['price'];
          $plots[$i]['price_otp'] = $item['price_otp'];
          $plots[$i]['price_comp'] = $item['price_comp'];
          $plots[$i]['area'] = $item['area'];
          $plots[$i]['coordinates'] = $item['coordinates'];
          $plots[$i]['status'] = $item['status'];
          $i++;
        }
        echo json_encode($plots);
      } else {
        http_response_code(404);
      }
      break;
    case 'PUT':
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if (trim($request->id) === '' || trim($request->status) === '') {
        return http_response_code(400);
      }

      $id = mysqli_real_escape_string($mysql, (int)$request->id);
      $price = mysqli_real_escape_string($mysql, (int)$request->price);
      $status = mysqli_real_escape_string($mysql, (int)$request->status);

      $query = "UPDATE plots SET price = '".$price."', status = '".$status."' WHERE id = '".$id."'";

      if ($mysql->query($query)) {
        http_response_code(200);
      } else {
        echo $mysql->error;
        http_response_code(422);
      }
  }
?>