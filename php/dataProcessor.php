<?php
include './DataHandler.php';

if (isset($_POST['data'])) {
    $jsonStringData = $_POST['data'];
    $dataHandler = new DataHandler();
    $dataHandler->handle($jsonStringData);

    die();
}
