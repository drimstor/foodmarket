  
/* ___________________________________________________________________ */


$(document).ready(function(){


	// Слайдер
	
		$('.slider').slick({
			arrows:false,
			dots:false,
			slidesToShow:5,
			autoplay:true,
			speed:1000,
			autoplaySpeed: 3000,
			centerMode: true,
			responsive:[
				{
					breakpoint: 768,
					settings: {
						slidesToShow:1
					}
				},
				{
					breakpoint: 550,
					settings: {
						slidesToShow:1
					}
				}
			]
		});
	});
	