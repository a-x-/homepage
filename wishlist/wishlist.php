<?php
$text = file_get_contents ("wishlist.md");

require_once 'php-markdown-lib/Michelf/MarkdownExtra.inc.php';
use \Michelf\MarkdownExtra;

$html = MarkdownExtra::defaultTransform($text);

//
// Extract menu 
preg_match_all(
  '#<li\s*.*?\s*>([a-z0-9_"`\'\-() .,/]+)#i',
  $html,
  $match
); // --> $match

echo "<!doctype html>
  <meta charset=utf8>
  <title>Wish list</title>
  <link href='wishlist.css' rel='stylesheet'>
  <div class='toc'><ol><li>
" 
. join(
  '<li>',
   $match[1]
)
. "
  </ol></div>
  <div class='list'>
    $html
  </div>
";
