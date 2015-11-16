
Template.searchResult.helpers({
  getPackages: function() {
    var n=Session.get('attr');
     var c=Cred.findOne({name:n});
     Session.set('id', c['owner']);
     alert(c['owner']);
    return Cred.find({name:n});
  },
  'click #person':function(events)
  {
    events.preventDefault();
    Router.go('/profilea');
  }
});


Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    Session.set('attr', text);
    
  }, 200)
});