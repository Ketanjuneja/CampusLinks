Meteor.publish("posts",function(userid){
	return Posts.find({});
})
Meteor.publish("likes",function(postid){
	return Likes.find({post:postid});
})
Meteor.publish("appusers",function(){
	return Meteor.users.find();
})

Meteor.methods({
	//{text:'',owner:'',date:'',parent:''}
	'addPost':function(options){
		var post = {
			text:options.text,
			owner:Meteor.userId(),
			date:new Date(),
			parent:options.parent
		}
		Posts.insert(post);
	},
	'removePost':function(id){
		Posts.remove({_id:id});
	},
	'removeAllPosts':function(){
		Posts.remove({});
	},
	'addNames':function(){
		
	},
		'createAdmin':function(option){
		Roles.addUsersToRoles(Meteor.userId(),option.roles);
			

	},
	'pDel':function(uid){
	Posts.remove({_id:uid});
		Posts.remove({parent:uid});
	},
	'uDel':function(uid) {
		
		// body...
	},
	'Fupd':function  (file,uid) {
	
		// body...
	}	
})
