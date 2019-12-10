<?php
  include 'database.php';

  $prices = [];

  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

  switch ($method) {
    case 'GET':
      $query = "SELECT price, price_otp, price_comp FROM plots GROUP BY price ORDER BY status ASC";
      if ($result = $mysql->query($query) or die($mysql->error)) {
        $i = 0;
        while ($item = $result->fetch_assoc()) {
          $prices[$i]['price'] = $item['price'];
          $prices[$i]['price_otp'] = $item['price_otp'];
          $prices[$i]['price_comp'] = $item['price_comp'];
          $i++;
        }
        echo json_encode($prices);
      } else {
        http_response_code(404);
      }
      break;
    case 'PUT':
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if (trim($request->relevant) === '' || trim($request->notRelevant) === '') {
        return http_response_code(400);
      }

      $relevant = mysqli_real_escape_string($mysql, (float)$request->relevant);
      $relevantOtp = mysqli_real_escape_string($mysql, (float)$request->relevantOtp);
      $relevantComp = mysqli_real_escape_string($mysql, (float)$request->relevantComp);
      $notRelevant = mysqli_real_escape_string($mysql, (float)$request->notRelevant);

      $query = "SELECT id FROM plots WHERE status = 0";
      if ($result = $mysql->query($query)) {
        while ($plot = $result->fetch_assoc()) {
          $query = "UPDATE plots SET price = '".$relevant."' WHERE id = '".$plot['id']."'";
          $mysql->query($query);
        }
      }
      $query = "SELECT id FROM plots WHERE status = 1";
      if ($result = $mysql->query($query)) {
        while ($plot = $result->fetch_assoc()) {
          $query = "UPDATE plots SET price = '".$notRelevant."' WHERE id = '".$plot['id']."'";
          $mysql->query($query);
        }
      }
      $query = "UPDATE plots SET price_otp = '".$relevantOtp."', price_comp = '".$relevantComp."'";
      $mysql->query($query);
      http_response_code(200);
  }
?>