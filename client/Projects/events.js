
Template.article3.events({
	'click .like':function(evt,tmpl){
		var curlike = Likes3.findOne({muser:Meteor.userId(),article:tmpl.data._id});
		if(!curlike){
			Likes3.insert({muser:Meteor.userId(),article:tmpl.data._id});				
		} 
		Session.set('updated',new Date());

	},
	'click .adel':function(evt,tmpl){
	   Articles3.remove({_id:this._id});

	}

})

Template.nav3.events({
	'click .addInterest':function(evt,tmpl){
		evt.preventDefault();
		//alert('here');
	},
	'click .save':function(evt,tmpl){
		var description = tmpl.find('.description').value;
		var name = tmpl.find('.name').value;
		var url = tmpl.find('.url').value;
		var height = 350;
		Articles3.insert({description:description,name:name,src:url,height:height,width:'25%',owner:Meteor.userId()});
		window.location.reload();
	},
	'click .cancel':function(evt,tmpl){
		Session.set('adding_interest',false);
	}
	
})
Template.addform3.events({
	'click .save':function(evt,tmpl){
		var description = tmpl.find('.description').value;
		var name = tmpl.find('.name').value;
		var url = tmpl.find('.url').value;
		var height = 350;
		Articles3.insert({description:description,name:name,src:url,height:height,width:'25%',owner:Meteor.userId()});
		Router.go('/messages');
		
	},
	'click .cancel':function(){
		Session.set('adding_interest',false);
	},
	'click .close':function(){
		Session.set('adding_interest',false);
	}
})
