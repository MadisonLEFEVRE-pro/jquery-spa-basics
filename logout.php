<?php
session_start();

/**
 * @var $_POSR['logout']
 */

if (!isset($_POST['logout'])) {
    echo json_encode([
        'error' => 'Forbidden'
    ]);

    exit;
}

unset($_SESSION['security']);

echo json_encode([
    'success' => true
]);
