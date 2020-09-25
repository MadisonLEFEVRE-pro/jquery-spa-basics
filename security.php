<?php

session_start();

/**
 * @info $_GET
 */

if (isset($_SESSION['security'])) {
    echo json_encode([
        'user' => $_SESSION['security']
    ]);

    exit;
}

echo json_encode([]);
