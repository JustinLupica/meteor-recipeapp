Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Ingredient = new SimpleSchema({
    name: {
        type: String,
    },
    amount: {
        type: String
    },
    test: {
        type: String
    },
    isChecked: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform:{
            type: "hidden"
        }
    }
});

Instructions = new SimpleSchema({
    step: {
        type: String
    }
})

RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"
    },
    ingredients: {
        type: [Ingredient]
    },
    instructions: {
        type: [Instructions]
    },
    inMenu: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
})

Meteor.methods({
    toggleMenuItem: function(id, currentState) {
        Recipes.update(id, {
            $set: {
                inMenu: !currentState
            }
        });
    },
    deleteRecipe: function(id) {
        Recipes.remove(id);
    },
    toggleCheckedItem: function(id, currentState) {
        Recipes.ingredients.update(id, {
            $set: {
                isChecked: !currentState
            }
        })
    }
})

Recipes.attachSchema( RecipeSchema );