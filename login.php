<?php
session_start();

/**
 * @var $_POST['email']
 * @var $_POST['password']
 */

/** Si l'utilisateur est déjà connecté, retourne l'utilisateur connecté. */
if (isset($_SESSION['security'])) {
    echo json_encode([
        'user' => $_SESSION['security']
    ]);

    exit;
}

/** @info Si l'email ou le mdp n'est pas renseigné retourne une erreur. */
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    echo json_encode([
        "error" => 'You did not submit either the email or the password'
    ]);

    exit;
}

$data = file_get_contents(__DIR__ . '/data/user.json');
$data = json_decode($data, true);

$emails = [];
foreach($data as $datum) {
    $emails[] = $datum['email'];
}

/** @info Si l'email ne fait pas partie des emails acceptable, retourne une erreur */
if (!in_array($_POST['email'], $emails)) {
    echo json_encode([
        "error" => 'No email found in our database'
    ]);
    exit;
}

/** @info Si le mdp n'est pas paris, retourne une erreur */
if ($_POST['password'] !== 'paris') {
    echo json_encode([
        "error" => 'Wrong password.'
    ]);

    exit;
}

$data = file_get_contents(__DIR__ . '/data/user.json');
$data = json_decode($data, true);

$_SESSION['security'] = $data[$_POST["email"]];

/** @info retourne l'utilisateur connecté */
echo json_encode([
    'user' => $_SESSION['security']
]);
exit;


