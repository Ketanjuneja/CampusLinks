 


  

if (Meteor.isClient) {
Template.profile.rendered = function(){
  Deps.autorun(function(){
    
    Meteor.subscribe("myContactsFiles");
    
  });
}
    
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.profilea.helpers({
    proname: function () {
      //alert('here');
      var id=Session.get('id');
       var x=Cred.findOne({owner:id});
      //console.log(x.name);
       return x['name'];

      // ...
    },
    probranch: function () {
      
      var id=Session.get('id');
       var x=Cred.findOne({owner:id});
      
       return x['branch'];

      // ...
    },
    prodob: function () {
      var id=Session.get('id');
       var x=Cred.findOne({owner:id});
      //  console.log(x.dob);
       return x['dob'];

      // ...
    },
      hero :function(){
       var x= Prof.findOne({owner:Meteor.userId()});
       return x['obj'];    

      },
     proimages: function() {
     //var x= Prof.findOne({owner:Meteor.userId()});

        //console.log(x.obj);
       // alert('idhar aya');
        //var y=x['obj'];
         var x=Session.get('id');
        console.log(ProfilePicUploads.files.find({_id:x}).fetch());
        //var z=ProfilePicUploads.files.find({_id:y}).fetch();
        //console.log(z['url']);
        //alert(z.url()); 
        //console.log(z);
        return ProfilePicUploads.files.find({owner:Meteor.userId()}).fetch();;  
         // return z;


             
      }
          //console.log('not here');
                  
    
  
  });
       
       
       
    
  
    //var q=Prof.find();
    
    
    
  
   

      // ...
    


  Template.profilea.events({

 /*'click .edit':function(event) {
  event.preventDefault();
  Router.go('/editpro');
 },
 /*'click .updateprofile':function(event){
  if(event.target.title.updateprofile==false)
  {
    event.target.title.updateprofile=true;
  }
  else
  {
    event.target.title.updateprofile=false;
  }
 }  
 'change .profpic':function(event,template){
       event.preventDefault();
       FS.Utility.eachFile(event,function(file){
        var fileObj=new FS.File(file);
            
        ProfilePicUploads.insert(fileObj,function(err,filex){
          if(err)
            alert(err);
          else
          {
            z=Meteor.userId();
            Fman.insert({owner:z,filid:filex._id});
            Session.set('id', filex._id);
          }
          
        }); 
      });
     },*/

     /*var file = $('.profpic').get(0).files[0];

      //var profilefile=new FS.File(file);
    //profilefile.owner=Meteor.userId();
      var f=ProfilePicUploads.insert(file);
     
    
      console.log(f.url());
    
      
    //var profilefile= new FS.File(a);
    //profilefile.type=123;
    //profilefile.metadata={user:Meteor.userId()};
    //console.log(profilefile.metadata.userId);
    //Meteor.call('insertPro',file);
   Router.go('/profile'); 
    
 },*/
  'click .view1':function(event){
  event.preventDefault();
  Router.go('/projectsa');
 },
 'click .view2':function(event){
  event.preventDefault();
  Router.go('/marksheetsa');
 },
 'click .view3':function(event){
  event.preventDefault();
  Router.go('/certificatesa');
 },
'click .view4':function(event){
  event.preventDefault();
  Router.go('/Achievementsa');
 } 
 

});
}
/*
if(Meteor.isServer)
{
  ProfilePicUploads.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }

});*/



