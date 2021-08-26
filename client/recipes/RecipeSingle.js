Template.RecipeSingle.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id')
        self.subscribe('singleRecipe', id);
    })
})

Template.RecipeSingle.helpers({
    recipe: () => {
        var id = FlowRouter.getParam('id')
        return Recipes.findOne({_id: id})
        
    }
})

// Template.RecipeSingle.events({
//     'click .toggle-checked'() {
//         //Set the checked property to the opposite of it's current value
//        Meteor.call('toggleCheckedItem', this.name, this.isChecked)
//     }
// })