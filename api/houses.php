<?php
  include 'database.php';

  $houses = [];

  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  switch ($method) {
    case 'GET':
      $query = "
      SELECT
        *
      FROM houses";
      if ($result = $mysql->query($query)) {
        $i = 0;
        while ($order = $result->fetch_assoc()) {
          $houses[$i]['id'] = $order['id'];
          $houses[$i]['name'] = $order['name'];
          $houses[$i]['sqr_meters'] = $order['sqr_meters'];
          $houses[$i]['images'] = $order['images'];
          $houses[$i]['details'] = $order['details'];
          $i++;
        }
        echo json_encode($houses);
      } else {
        http_response_code(404);
      }
      break;
    case 'PUT':
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if (trim($request->id) === '' || trim($request->name) === '') {
        return http_response_code(400);
      }

      $id = mysqli_real_escape_string($mysql, (int)$request->id);
      $details = mysqli_real_escape_string($mysql, trim($request->details));

      $query = "UPDATE houses SET details = '".$details."' WHERE id = '".$id."'";

      if ($mysql->query($query)) {
        http_response_code(200);
      } else {
        echo $mysql->error;
        http_response_code(422);
      }
  }
?>