if(Meteor.isClient)
{
Template.editpro.helpers({
    proname: function () {
      //alert('here');
       var x=Cred.findOne({owner:Meteor.userId()});
      console.log(x.name);
       return x.name;

      // ...
    },
    probranch: function () {
      
       var x=Cred.findOne({owner:Meteor.userId()});
      console.log(x.branch);
       return x.branch;

      // ...
    },
    prodob: function () {
      
       var x=Cred.findOne({owner:Meteor.userId()});
      console.log(x.dob);
       return x.dob;

      // ...
    },
  });
 Template.editpro.events({
    'submit #Proform': function (e,t) {
      
        e.preventDefault();

        var sig=$(e.currentTarget);
        var abc = sig.find('.name').val();
       // alert(x);
        var y=sig.find('.branch').val();
        var z=sig.find('.dob').val();
         console.log('I am here');
         var x=Cred.findOne({owner:Meteor.userId()});
        //var x=init.find({code:a}).fetch();
          Cred.update(
            { _id:x._id},{ $set:{name:abc,branch:y,dob:z}}
            ,function(err)
            {
              if(err)
                console.log('here');
                else
                  Router.go('/profile');

            });  
    }
});

}