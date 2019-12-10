<?php
$request = $_REQUEST;
// Путь для загрузки файлов.
$uploaddir = dirname(__DIR__) . '/uploads/slider/';
// Объект загружаемого файла. 
$file = $_FILES['file'];
// Тип запроса
$type = $request['type'];
// Имя загружаемого файла.
$fileName = basename($file['name']);
// Пути для загрузки. В зависимости от типа файла
$uploadPaths = [
    "images" => "images/",
    "videos" => "videos/"
];

// Возвращает json результат обработки
function response($type, $data) {
    return json_encode([
            "type" => $type,
            "data" => $data
        ]
    );
}


function newState($type, $file) {
    $uploaddir = dirname(__DIR__) . '/uploads/slider/';
    $sliderConfig = json_decode(file_get_contents($uploaddir . "slider-config.json"), true) ?: [];
    $output = [];
    if($type === "image") {
        $output["src"] = "images/" . $file["name"];
        $output["type"] = "image";
        $output["id"] = uniqid();
    } else if($type === "video") {
        $output["src"] = "videos/" .  $file["name"];
        $output["type"] = "video";
        $output["id"] = uniqid();
    }

    $sliderConfig["slider"][] = $output;
    return [
        "allStore" => $sliderConfig,
        "singleItem" => $output
    ];
}
function addFileToConfig($file) {
    $uploaddir = dirname(__DIR__) . '/uploads/slider/';
    file_put_contents($uploaddir . "slider-config.json", json_encode($file));
}

if($type === "create") {
    // Проверяем тип файла и загружаем.
    if(stristr($file['type'], 'image/')) {
        if (move_uploaded_file($file['tmp_name'], $uploaddir . $uploadPaths["images"] . $fileName)) {
            // Добавление в конфиг новой информации
            $allStore = newState("image", $file)["allStore"];
            $responseSingleItem = json_encode(newState("image", $file)["singleItem"]);
            addFileToConfig($allStore);
            echo response("success",  $responseSingleItem);
        } else {
            echo response("error", "Ошибка загрузки! Попробуйте обновить страницу и повторить");
        }
    }else if (stristr($file['type'], 'video/')) {
        if (move_uploaded_file($file['tmp_name'], $uploaddir . $uploadPaths["videos"] . $fileName)) {
            // Добавление в конфиг новой информации
            $allStore = newState("video", $file)["allStore"];
            $responseSingleItem = json_encode(newState("video", $file)["singleItem"]);
            addFileToConfig($allStore);
            echo response("success",  $responseSingleItem);
        } else {
            echo response("error", "Ошибка загрузки! Попробуйте обновить страницу и повторить");
        }
    } else {
        echo response("error", "Можно загружать только изображения или видео");
    }
} elseif ($type === "delete") {
    $data = json_decode(file_get_contents($uploaddir . "slider-config.json"), true) ?: [];
    $newState = ["slider" => []];

    foreach($data["slider"] as $item) {
        if($item["id"] !== $request["delete_id"]) {
            $newState["slider"][] = $item;
        }
    }
    addFileToConfig($newState);
    echo response("success", $newState);
}