<?php

class Post {
    private $text;
    private $authorId;

    public function __construct( $text, $authorId ) {
        $this->text = $text;
        $this->authorId = $authorId;
    }

    public function save() {
        Database::sqlQuery("INSERT INTO posts (authorId, post_text) VALUES ('$this->authorId', '$this->text');");
    }
}
?>