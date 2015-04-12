<?php

class Controller
{
	public function model($model)
	{
		require_once '../app/models/' . $model . '.php';
		return new $model();
	}

	public function view($view, $data = [])
	{
		require_once '../app/views/' . $view . '.php';
	}

	public function apirender($content) 
	{
        header('Content-Type: application/json; charset=utf8');
        echo json_encode($content,JSON_PRETTY_PRINT);
        return true;
    }

	public function load_assets($url)	
	{

	}
}
