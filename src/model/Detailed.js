import axios from 'axios';
import {proxy} from '../config';

export default class Detailed{
	constructor(id){
		this.query=`${proxy}https://glen-newsfeed-api.herokuapp.com/api/news_feed/${id}`
	}
	async getDetails(){
		try{
		 	const res=	await axios(this.query);
			this.result=res.data;

		}catch(error)
		{
			alert(error);
		}
		
		
	}
}