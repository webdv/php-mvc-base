<?php

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = New Capsule();

$capsule->addConnection([
	'driver' =>	'mysql',
	'host' =>	'localhost',
	'username' =>	'',
	'password' =>	'',
	'database' =>	'',
	'charset' =>	'utf8',
	'collation' =>	'utf8_unicode_ci'
]);


$capsule->bootEloquent();
