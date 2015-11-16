Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});
Router.map(function() {
  	this.route('splash', {path: '/'})
  	this.route('messages');
	this.route('ShareDocs');
	this.route('home');
  	this.route('signUp');
	this.route('SignIn');
	this.route('forgotPassword');
	this.route('resetPassword');
	this.route('LoggedIn');
	this.route('Access');
	this.route('Create');
	this.route('profile');
	this.route('editpro');
	this.route('searchp');
	this.route('teacher');
	this.route('Achievements');
	this.route('Projects');
	this.route('Certificates');
	this.route('Marksheets');
	this.route('Achievementsa');
	this.route('Projectsa');
	this.route('Certificatesa');
	this.route('Marksheetsa');
	this.route('profilea');

	
});