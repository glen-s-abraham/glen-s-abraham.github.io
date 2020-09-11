export const elements={
	navBar:document.querySelector('.navbar'),
	activeNavOnload:document.querySelector('.navbar__link.active'),
	navLinks:document.querySelectorAll('.navbar__link'),
	container:document.querySelector('.container'),
	cardList:document.querySelector('.container.list'),
	
};

export const switchView=(name)=>{
	if(name=='list'){
		elements.container.classList.remove('detailed');
		elements.container.classList.add('list');
	}
	else if(name=='detailed')
	{
		elements.container.classList.remove('list');
		elements.container.classList.add('detailed');
	}	



}; 