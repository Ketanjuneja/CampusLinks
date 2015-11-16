Template.pinterest4.articles = function(){
	var search = {};	
	return Articles4.find({owner:Meteor.userId()});
}
Template.pinterest4.adding_interest = function(){
	return Session.get('adding_interest');
}
Template.article4.numlikes = function(){
	return Likes4.find({article:this._id}).count();
}
Template.article4.likethis = function(){
	var curlike = Likes4.findOne({muser:Meteor.userId(),article:this._id});
	if(curlike)
	return "You Found this useful "
}
Template.pinterest4.updated = function(){
	return Session.get('updated');
}
Template.pinterest4.rendered = function(){
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