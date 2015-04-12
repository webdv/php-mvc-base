<?php

class Home extends Controller
{
	public function index()
	{
		$Crimes = $this->model('Crime');
		$result = $Crimes->orderBy('created_at', 'desc')->take(100)->get();
		$this->apirender($result);
	}
	
	public function search($query = '')	
	{
		$query = $_POST["query"];
		$Crimes = $this->model('Crime');
		$result = $Crimes->where('type', 'LIKE', $query)->get();
		if(!($result->isEmpty()))
			$this->apirender($result);
		else
			$this->apirender(array('Error' => TRUE,'Reason'=>'Possible Empty String or Invalid Input'));
	}
	
	public function crimes($params = '')	
	{
		if(empty($params) && $params >= 1000)
			$params = 1000;
		$Crimes = $this->model('Crime');
		$result = $Crimes->take($params)->get();
		$this->apirender($result);
	}		

}
