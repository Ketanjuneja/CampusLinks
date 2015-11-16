Template.pinterest2a.articles = function(){
var id=Session.get('id');
   
      
	return Articles2.find({owner:id});
}

Template.article2a.numlikes = function(){
	return Likes2.find({article:this._id}).count();
}
Template.article2a.likethis = function(){
	var curlike = Likes2.findOne({muser:Meteor.userId(),article:this._id});
	if(curlike)
	return "You Found this useful "
}
Template.pinterest2a.updated = function(){
	return Session.get('updated');
}
Template.pinterest2a.rendered = function(){
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