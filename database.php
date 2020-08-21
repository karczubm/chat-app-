<?php
include( 'dbconfig.php' );

class Database {
    private static $instance;
    private $PDO;

    private function __construct() {
        $this->PDO = new PDO( 'mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASSWORD );
        $this->PDO->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }

    //only one instance can be
    public static function init() {
        if ( !self::$instance ) {
            self::$instance = new self();
        }
    }

    public static function sqlQuery( string $query ) {
        return self::$instance->PDO->query( $query );
    }

}

?>