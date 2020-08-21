<?php
require_once( 'database.php' );
require_once( 'post.php' );
session_start();
Database::init();

$action = $_REQUEST['action'];
$response = array();

switch( $action ) {

    case 'login':
    $name = $_REQUEST['userName'];
    $userPassword = $_REQUEST['password'];
    $check = Database::sqlQuery( "SELECT * FROM users WHERE userName='$name';" )->fetch( PDO::FETCH_ASSOC );
    //check whether passwords equals n set session variables. No registration->no hashing, but should be done.
    if ( isset( $check['pass'] ) && $userPassword === $check['pass'] ) {
        $_SESSION['id'] = $check['id'];
        $_SESSION['name'] = $check['userName'];
        $response['username'] = $_SESSION['name'];
    } else {
        $response['username'] = false;
    }
    break;

    case 'updateChat':
    $id = $_REQUEST['last_id'];
    //get posts with highest id
    $posts = Database::sqlQuery( "SELECT posts.post_text, posts.id, users.userName FROM posts 
    JOIN users ON posts.authorId=users.id WHERE posts.id>'$id';" )->fetchAll( PDO::FETCH_ASSOC );
    //return all the messages
    $response['postsArr'] = $posts;
    break;

    case 'newPost' :
    //if loggged in
    if ( isset( $_SESSION['id'] ) ) {
        ( new Post( $_REQUEST['message'], $_SESSION['id'] ) )->save();
        $response['isLoggedIn'] = true;
    } else {
        $response['isLoggedIn'] = false;
    }
    break;

    case 'isLoggedIn':
    if ( isset( $_SESSION['id'] ) ) {
        $response['isLoggedIn'] = true;
        $response['userName'] = $_SESSION['name'];
    } else {
        $response['isLoggedIn'] = false;
    }
    break;
}

echo json_encode( $response );
?>