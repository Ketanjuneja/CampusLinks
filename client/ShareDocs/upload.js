
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({

    'click .adel': function (evt) {
      Uploads.remove({_id:this._id},function  (err) {
      if(err)
        console.log(err); 
      // body...
    });
    },


    'change .fileInput':function(event,template){
      FS.Utility.eachFile(event,function(file){
        var filex=new FS.File(file);
     Uploads.insert(filex,function(err,filex1){
          if(err)
            console.log(err);
          else
          {
            z=uid;
            Fman.insert({owner:z,filid:filex1._id});
          }
          
        });
            
         
      });
    }
  });
  Template.download1.helpers({
    uploads:function(){
     var filex =Uploads.find();
      console.log(filex);
      alert(filex._id);
      Session.set('id', filex._id);
      return filex;
    },
  
  proname:function(){
    var a=Session.get('id');
    console.log(a);
    var b= Fman.findOne({filid:a});
    var c= Cred.findOne({owner:b});
    console.log(c);
    return JSON.parse(JSON.stringify(c['name']));

  }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
