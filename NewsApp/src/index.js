import {elements,switchView} from './views/base';
import * as listView from './views/listView';
import * as detailedView from './views/detailedView'
import List from './model/List'
import Detailed from './model/Detailed';
const state={};

//controller for list view
const controlList=async(target)=>{
	listView.toggleActive(target);
	switchView('list');
	try{
		state.list=new List(target.id);
		elements.container.innerHTML="";
		elements.container.innerHTML="<h1>Loading....</h1>";
		await state.list.getList();
		elements.container.innerHTML="";
		listView.listData(state.list.result);

	}catch(error)
	{
		alert(error);
	}
};

//details controller	
const controlDetail=async(id)=>{
	
	switchView('detailed');
	try{
		elements.container.innerHTML="";
		elements.container.innerHTML="<h1>Loading....</h1>";
		state.detailed=new Detailed(id);
		await state.detailed.getDetails();
		elements.container.innerHTML="";
		detailedView.listDetails(state.detailed.result);



	}catch(error)
	{
		console.log(error);
	}
	


};	

	
	


//on nav link click
elements.navBar.addEventListener('click',e=>{
	const target=e.target.closest('.navbar__link');
	controlList(target)
});

//onload 
window.addEventListener('load', e => {
  	
  	controlList(elements.activeNavOnload);
});

//on lis click
elements.cardList.addEventListener('click',e=>{
	const target=e.target.parentNode.parentNode;
	if(target.classList.contains('card')){
		let id=target.getAttribute("data-id");
		controlDetail(id);
	}
		
		
});