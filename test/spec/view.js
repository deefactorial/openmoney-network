/*global describe, it, beforeEach, afterEach, expect, Merchant, Welcom, sinon */
'use strict';

describe('Tests for Welcome View', function () {
    var welcomeView;
    beforeEach(function() {
        var merchant = new Merchant();
        // Must set up localStorage for model
        //todo.localStorage = new Store('ViewSpecs');

        //$('body').append('<ul id="todoList"></ul>');
        welcomeView = new Welcome({ model: merchant });
    });

    afterEach(function() {
        welcomeView.remove();
        //$('#todoList').remove();
    });

    it('should be tied to a DOM element when created, based off the property provided', function() {
        expect(welcomeView.tagName).to.be.equal('div');
        expect(welcomeView.el.tagName.toLowerCase()).to.be.equal('div');
    });

    it('is backed by a model instance, which provides the data', function() {
        expect(welcomeView.model).to.exist;
        expect(welcomeView.model.get('merchantname')).to.be.equal('');
    });

    it('when rendered, the view element contains the complete DOM representation of the view', function() {
        welcomeView.render();

        expect(welcomeView.$el).not.to.be.empty;

        //expect(welcomeView.$el.find('#logo').attr('alt')).to.be.equal('Openmoney Logo');
        //expect(welcomeView.$el.find('label').is(':empty')).to.be.true;
    });

    describe('Test interactions', function() {
        beforeEach(function() {
            welcomeView.model.set({ merrchantname: 'test' }, { silent: true });
            //$('#todoList').append(welcomeView.render().el);
        });
        //
        // it('should toggle complete', function() {
        //     var spy = sinon.spy(welcomeView.model, 'toggle');
        //
        //     $('#todoList').find('.toggle').trigger('click');
        //
        //     sinon.assert.calledOnce(spy);
        //
        //     // Unwrap spy
        //     welcomeView.model.toggle.restore();
        // });
        //
        // it('should switch into editing mode', function() {
        //     $('#todoList').find('label').trigger('dblclick');
        //
        //     expect(welcomeView.$el.find('.edit').is(':visible')).to.be.true;
        //     expect(welcomeView.$el.find('.edit').val()).to.be.equal('todo item');
        // });
        //
        // it('should update on enter in editing mode', function() {
        //     $('#todoList').find('label').trigger('dblclick');
        //
        //     var e = jQuery.Event('keypress');
        //     e.which = 13;
        //     welcomeView.$el.find('.edit').val('update todo').trigger(e);
        //
        //     expect(welcomeView.$el.find('label').text()).to.be.equal('update todo');
        //     expect(welcomeView.model.get('title')).to.be.equal('update todo');
        // });
        //
        // it('should remove item when enter empty in editing mode', function() {
        //     var spy = sinon.spy(welcomeView.model, 'destroy');
        //
        //     $('#todoList').find('label').trigger('dblclick');
        //
        //     var e = jQuery.Event('keypress');
        //     e.which = 13;
        //     welcomeView.$el.find('.edit').val('').trigger(e);
        //
        //     expect($('#todoList').children()).to.have.length(0);
        //
        //     sinon.assert.calledOnce(spy);
        //     welcomeView.model.destroy.restore();
        // });
    });
});
