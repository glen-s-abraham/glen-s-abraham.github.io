import {elements} from './base';
export const toggleActive=target=>{
	for(let i=0;i<elements.navLinks.length;i++){
		elements.navLinks[i].classList.remove('active');
	}
	target.classList.add('active');

};

const renderList=(data)=>{
	let img="./img/default.jpg";
	if(!data.feature_image.includes("None"))
		img=data.feature_image;
	
	
	const markup=`<div class="card" data-id="${data.id}">
				<div class="card__image_container">
				<img src="${img}" class="card__image">
				</div>
				<div class="card__title_container">
				<h1>${data.title}</h6>
				</div>
				<div class="card__descreption_container">
				<p>${data.article}</p>
				</div>
				</div>`;
	elements.container.insertAdjacentHTML('beforeend',markup);	

};

export const listData=(lists)=>{
	elements.container.innerHTML='';
	lists.forEach(renderList);

};