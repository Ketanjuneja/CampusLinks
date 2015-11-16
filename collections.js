	Posts = new Meteor.Collection('posts');
	Likes = new Meteor.Collection('likes');
	Articles = new Meteor.Collection('articles');
	Init=new Meteor.Collection('access');
	Cred=new Meteor.Collection('profile');
	Fman=new Meteor.Collection('fman');
	Prof=new Meteor.Collection('pro');
	Articles1 = new Meteor.Collection('articles1');
	Likes1 = new Meteor.Collection('likes1');
	Articles2 = new Meteor.Collection('articles2');
	Likes2 = new Meteor.Collection('likes2');
	Articles3 = new Meteor.Collection('articles3');
	Likes3 = new Meteor.Collection('likes3');
	Articles4 = new Meteor.Collection('articles4');
	Likes4 = new Meteor.Collection('likes4');
Cred.initEasySearch('name');
	Uploads=new FS.Collection('uploads',{
	  stores:[new FS.Store.FileSystem('uploads',{path:'~/Work/a/x/Public'})]
	});
	 ProfilePicUploads=new FS.Collection('prof1',{
  stores:[new FS.Store.FileSystem('prof1',{path:'~/Work/a/x/Public'})]
});
	 ProfilePicUploads.allow({
    insert: function(userId, file) {
        return true;
    },
    update: function(userId, file, fields, modifier) {
        return true;
    },
    remove: function(userId, file) {
        return true;
    },
    download: function() {
        return true;
    }
});
