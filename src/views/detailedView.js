import {elements} from './base'

export const listDetails=(data)=>{
	
	let img="./img/default.jpg";
	if(!data.feature_image.includes("None"))
		img=data.feature_image;

	const markup=`<div class="detailed__title_container">
				<h1>${data.title}</h1>
				</div>
				<div class="detailed__image_container">
				<img src="${img}" class="detailed_image">
				</div>
				<div class="detailed_article_container">
				<p>
				${data.article}
				</p>
				</div>`;
	elements.container.insertAdjacentHTML('beforeend',markup);			


};