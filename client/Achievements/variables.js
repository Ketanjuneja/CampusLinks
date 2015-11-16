Template.pinterest1.articles = function(){
	var search = {};	
	return Articles1.find({owner:Meteor.userId()});
}
Template.pinterest1.adding_interest = function(){
	return Session.get('adding_interest');
}
Template.article1.numlikes = function(){
	return Likes1.find({article:this._id}).count();
}
Template.article1.likethis = function(){
	var curlike = Likes1.findOne({muser:Meteor.userId(),article:this._id});
	if(curlike)
	return "You Found this useful "
}
Template.pinterest1.updated = function(){
	return Session.get('updated');
}
Template.pinterest1.rendered = function(){
	setTimeout(function(){
		masonize(function(){
		});
		
	},1000)
	$('.search-query input').focus();
	
}

function masonize(callback){
	var $container = $('#gutter-opt-demo3');
	// initialize
	$container.masonry({
	  itemSelector: '.item',
	  gutter:20
	});
	var msnry = $container.data('masonry');
	if(callback){callback()};
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}