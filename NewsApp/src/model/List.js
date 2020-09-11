import axios from 'axios'
import {proxy} from '../config'

export default class List{
	constructor(category){
		this.query=`${proxy}https://glen-newsfeed-api.herokuapp.com/api/news_feed/?cat=${category}`;
	}
	async getList(){
		try
		{
			const res=await axios(this.query);
			this.result=res.data;
			
		}catch(error)
		{
			alert(error);
		}

		
	}
}