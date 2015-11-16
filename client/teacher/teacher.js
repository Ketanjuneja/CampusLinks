if (Meteor.isClient) {
trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
//    Session.set('alert', 'Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
  //  Session.set('alert', 'Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
    //  0  Session.set('alert', 'Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
      //  Session.set('alert', 'Your two passwords are not equivalent.');
        return false;
    }
    return true;
};
Template.teacherc.events({
    'submit #Proform': function (e,t) {
      console.log('ok');
        e.preventDefault();

        var sig=$(e.currentTarget);
        var x = sig.find('.name').val();
        var y=sig.find('.branch').val();
        var z=sig.find('.dob').val();
         console.log('I am here');
        //var x=init.find({code:a}).fetch();
          Cred.insert({name:x,branch:y,dob:z,owner:Meteor.userId()},function(err)
            {
              if(err)
                console.log(err);
                else
                  Router.go('/profile');
                
            });  
    }
});

Template.teacher.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase());
            console.log(email);
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            var usid= Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        alert( 'We\'re sorry but this email is already used.');
                        return false;
                    } else {
                        alert('We\'re sorry but something went wrong.');
                        return false;
                    }
                } else {
                    alert('Congrats! You\'re now a new Meteorite!');
                    var userid=Meteor.userId();
                    Meteor.users.update({_id:usid},{$set: {'emails.0.verified':true}},function(err){
                        if(err)
                            console.log(err);


                    }

                        );
                  //  window.location.reload();
                  var option={roles:['admin']};
        
                    Meteor.call('createAdmin',option);
                    alert('Welcome Now you are an admin');
                    Router.go('/teacherc');
                    return false;
                }
            });
        }
        return false;
    }
});
}
