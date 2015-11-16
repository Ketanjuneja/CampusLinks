Template.pinterest3.articles = function(){
	var search = {};	
return Articles3.find({owner:Meteor.userId()});
}
Template.pinterest3.adding_interest = function(){
	return Session.get('adding_interest');
}
Template.article3.numlikes = function(){
	return Likes3.find({article:this._id}).count();
}
Template.article3.likethis = function(){
	var curlike = Likes3.findOne({muser:Meteor.userId(),article:this._id});
	if(curlike)
	return "You Found this useful "
}
Template.pinterest3.updated = function(){
	return Session.get('updated');
}
Template.pinterest3.rendered = function(){
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