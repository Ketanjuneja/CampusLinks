Template.pinterest.articles = function(){
	var search = {};	
	return Articles.find(search,{limit:20});
}
Template.pinterest.adding_interest = function(){
	return Session.get('adding_interest');
}
Template.article.numlikes = function(){
	return Likes.find({article:this._id}).count();
}
Template.article.likethis = function(){
	var curlike = Likes.findOne({muser:Meteor.userId(),article:this._id});
	if(curlike)
	return "You Found this useful "
}
Template.pinterest.updated = function(){
	return Session.get('updated');
}
Template.pinterest.rendered = function(){
	setTimeout(function(){
		masonize(function(){
		});
		
	},1000)
	$('.search-query input').focus();
	
}
Template.article.proname=function(){
var x=Articles.findOne({_id:this._id});
console.log(x.owner);
var y=Cred.findOne({owner:x.owner});
return y['name'];	
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