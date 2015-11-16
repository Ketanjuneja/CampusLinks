	Template.post.likeCount = function(){
	return Likes.find(this._id).count();
}
Template.post.postComments = function(){
	return Posts.find({parent:this._id});
}
Template.post.proname = function () {
		//alert(this._id);
		var x=Posts.findOne({ _id: this._id });
		
           if(typeof x =='undefined')
          { 	alert('gadbad hai daya');
            }
            var z=x.owner;
           //console.log(x);
		
		var proname=Cred.findOne({ owner:z });
          //console.log(proname['name']);
		if(typeof proname == 'undefined')
		{   
			return null; 
		}
		else
		{
			//alert(y.branch);

			return JSON.parse(JSON.stringify(proname['name']));
			
		}
		

	}
	Template.postcomment.pronamec = function () {
		//alert(this._id);
		var x=Posts.findOne({ _id: this._id });
		
           if(typeof x =='undefined')
          { 	alert('gadbad hai daya');
            }
            var z=x.owner;
           console.log(x);
		
		var proname=Cred.findOne({ owner:z });
          console.log(proname['name']);
		if(typeof proname == 'undefined')
		{   
			return null; 
		}
		else
		{
			//alert(y.branch);

			return JSON.parse(JSON.stringify(proname['name']));
			
		}
		

	}

Template.post.events({
	'keyup .comment':function(evt,tmpl){
		if(evt.which === 13){
			var commenttext = tmpl.find('.comment').value;
			var options = {text:commenttext,parent:this._id};
			Meteor.call('addPost',options);
			$('.comment').val('').select().focus();
		}
	},
	'click .adel':function(evt,tmp){
		Meteor.call('pDel',this._id);
		
		
	}
})