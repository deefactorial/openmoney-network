/*global describe, it, before, after, expect, Merchant, Welcome, Registration, Router, workspace, Backbone, sinon, Date */
'use strict';

function scaffold() {
    var $app = $('<div id="mainContainer" class="container"></div>').appendTo('body');
    // $app
    //     .append('<div id="page"/>');
    return $app;
}

describe('Integration Test', function () {
    function triggerEnter($el, eventName, value) {
        var e = jQuery.Event(eventName);
        e.which = 13;
        $el.val(value).trigger(e);
    }

    before(function() {
        //this.$app = scaffold();
        //this.view = new Welcome();
    });

    after(function() {
        //this.$app.remove();
        //localStorage.clear();
    });

    describe('Integration Tests', function() {
        describe('Instantiation', function() {
            it('should have one element', function() {
                expect($('#mainContainer').children()).to.have.length(0);
            });
        });



        // describe('Create item', function() {
        //     it('should create on enter', function() {
        //         triggerEnter($('#new-todo'), 'keypress', 'Clean the house');
        //
        //         var $list = $('#todo-list');
        //         expect($list.children()).to.have.length(1);
        //         expect($list.html()).to.contain('Clean the house');
        //         expect($('#new-todo').val()).to.be.empty;
        //         expect($('#footer').html()).contain('1');
        //     });
        //
        //     it('should update items count', function() {
        //         triggerEnter($('#new-todo'), 'keypress', 'Clean the house');
        //         expect($('#footer').html()).contain('2');
        //     });
        //
        //     it('should not create with empty input', function() {
        //         triggerEnter($('#new-todo'), 'keypress', '');
        //
        //         var $list = $('#todo-list');
        //         expect($list.children()).to.have.length(2);
        //         expect($list.html()).to.contain('Clean the house');
        //         expect($('#footer').html()).contain('2');
        //     });
        // });
        // Other interaction tests: toggleAllComplete, clearCompleted, filter etc.
    });

    describe('Router', function() {
        before(function(done) {
            app.on('start', function(){
              done();
            })

            // this.router = new Router();
            // Backbone.history.start();

            // Add one more completed item
            //todoList.create({ title: 'Test route ready', completed: true });
        });

        // it('should ready with expected items', function(done) {
        //     router.navigate('welcome', { trigger: true });
        //     //var $page = $('#page');
        //     // Remember other items added in AppView tests
        //     //expect($('#mainContainer').children()).to.have.length(1);
        //     router.on('route', function(){
        //       expect($('#pageContainer').html()).to.contain('Openmoney Logo');
        //       done();
        //     });
        //
        // });

        describe('Routes', function(){

          before(function(done){

            setTimeout(function(){
              console.log('Router',router);
              router.navigate('login',{trigger:true, replace:false});
              console.log('navigate to login');
              done();
            }, 2);
          });

          it('should route to Login', function(done) {
            //expect($('#pageContainer').children(':visible')).to.have.length(1);
            setTimeout(function(){
              console.log('test if at login page');
              expect($('#mainContainer').children().html()).to.contain('Login');
              done();
            }, 2);

          });
        });

    });

    describe('App Flows', function(){

      before(function() {
          this.router = router;
          this.merchantname = 'test' + (new Date()).getTime();
          this.password = '12345';
          this.email = 'test@test.com';
      });

      after(function(){
          this.router.navigate('logout', true);
      })

      describe('Registration Flow', function(){

          before(function(done){
            this.router.navigate('register', true);
            setTimeout(function(){
              done();
            }, 1000);
          });

          it('should load registration page', function(){
            expect($('#mainContainer').children().html()).to.contain('REGISTRATION');
          });

          describe('Submit Registration Form with no data', function(){
            before(function(done){

                $('#stewardname').val('');
                $('#email').val('');
                $('#password').val('');
                $('#register-button').trigger('click', done);

            })

            it('should show error with no input', function(done){
              console.log('error notification',$('#error-notification').html());
              expect($('#error-notification').html()).to.contain('String is too short (0 chars), minimum 5')
              // expect($('#merchantname-error').html()).to.contain('Merchant name is required.');
              // expect($('#email-error').html()).to.contain('Email is required.');
              // expect($('#password-error').html()).to.contain('Password is required.');
              //expect($('#error-notification').html()).to.contain('Authorization Failed');
              done();
            });
          });

          describe('Submit Registration Form with test data', function(){

            before(function(done){
              $('#stewardname').val('test');
              $('#email').val('test@test.com');
              $('#password').val('12345');
              $('#register-button').trigger('click', done);
            })

            it('should show error user already exists', function(done){
              expect($('#mainContainer').children().html()).to.contain('REGISTRATION');
              //expect($('#merchantname-error').html()).to.contain('Merchant name is required.');
              //expect($('#email-error').html()).to.contain('Email is required.');
              //expect($('#password-error').html()).to.contain('Password is required.');
              expect($('#error-notification').html()).to.contain('That merchant name is already taken.');
              done();
            });
          });

          describe('Submit Registration Form with random test data', function(){

            before(function(done){

              $('#stewardname').val(this.merchantname);
              $('#email').val(this.email);
              $('#password').val(this.password);
              $('#register-button').trigger('click', done);
              this.timeout(10000);
            })

            it('should show success merchant registered', function(done){
              expect($('#mainContainer').children().html()).to.contain('LOGIN');
              expect($('#success-notification').html()).to.contain('Successfully Registered New Merchant.');
              done();
            });
          });

          describe('Login Flow Failure', function(){
            before(function(done){
              $('#stewardname').val(this.merchantname);
              $('#password').val('54321');
              $('#login-button').trigger('click', done);
              this.timeout(5000);
            })

            it('should show success merchant logged in', function(done){
              expect($('#mainContainer').children().html()).to.contain('LOGIN');
              expect($('#error-notification').html()).to.contain('Authorization Failed.');
              done();
            });
          });

          describe('Login Flow Success', function(){
            before(function(done){
              $('#stewardname').val(this.merchantname);
              $('#password').val(this.password);
              $('#login-button').trigger('click', done);
              this.timeout(5000);
            })

            it('should show success merchant logged in', function(done){
              expect($('#mainContainer').html()).to.contain('Process Transactions');
              expect($('#success-notification').html()).to.contain('Successfully Logged In.');
              done();
            });
          });
      });
    });
});
