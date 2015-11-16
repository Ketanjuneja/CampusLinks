
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

Template.access.events({
    'submit #InForm': function (e,t) {
        e.preventDefault();
        var sig=$(e.currentTarget);
        var a = sig.find('#code').val();
        
        console.log(a);
        var y=sig.find('#name').val();

        var x=Init.find({code:a}).fetch();
        console.log('idhar hu')
        console.log(Init.findOne({code:a}));
        if(x)
            {
            console.log('here');

            Router.go('/signUp');
            }
            
    }
});

Template.signIn.events({
  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var signInForm = $(e.currentTarget),
          email = trimInput(signInForm.find('.email').val().toLowerCase()),
          password = signInForm.find('.password').val();
          console.log(password);
    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          console.log('These credentials are not valid.');
        } else {
          alert('Welcome back Meteorite!');
          var a=Meteor.userId();
          alert(a);
         // window.location.reload();
          Router.go('/messages');
          return false;
        }
      });

    }
    return false;
  },
});


Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase());
            console.log(email);
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            Accounts.createUser({email: email, password: password}, function(err) {
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
                  //  window.location.reload();
                    Router.go('/Create');
                    return false;
                }
            });
        }
        return false;
    },
});
  Template.signOut.events({
    'submit #signOut': function(e, t) {
        console.log('idhar hai');
        Meteor.logout(function() {
        //    Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
        console.log(Meteor.userId());
        alert("Logging Out");
        Router.go('/');
         return false;   
        });
        
    }
});
Template.resetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;
  }
});
Template.forgotPassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          alert('Email Sent. Check your mailbox.');
        }
      });

    }
    return false;
  },
});
Template.create.events({
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
                console.log('here');


            });  
    }
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
