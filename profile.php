<?php

session_start();

if (!isset($_SESSION['security'])) {
    echo json_encode([
        'error' => 'Access denied. Vous devez être connecté pour afficher cette page.'
    ]);

    exit;
}

if (empty($_POST)) {
    echo json_encode([
        'user' => $_SESSION['security']
    ]);

    exit;
}

foreach (['name', 'firstName', 'email', 'age'] as $prop) {
    if (!isset($_POST[$prop]) || $_POST[$prop] === '') {
        echo json_encode([
            'error' => 'La propriété ' . ucfirst($prop) . ' est obligatoire.'
        ]);

        exit;
    }
}

$file = __DIR__ . '/data/user.json';
$data = file_get_contents($file);
$data = json_decode($data, true);

$user = $_SESSION['security'];
$newUser = array_merge($user, $_POST);

$_SESSION['security'] = $newUser;

unset($data[$user['email']]);
$data[$newUser['email']] = $newUser;

file_put_contents($file, json_encode($data));
