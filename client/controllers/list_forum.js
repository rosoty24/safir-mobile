/*Template.listForum.helpers({
	listForum: function(){
		return posts.find({});
	}
});

Template.forumDetail.helpers({
	forumDetail: function(){
		return posts.find({});
	}
});
*/
Template.listForum.events({
	'click #delete': function(){
		var user_id = Meteor.userId();
		var id = this._id;
		Meteor.call('deleteForum',id,user_id);
	}
});

//list forum
Session.set('loadlimit',10);
Template.listForum.helpers({
    allForums: function(){
        //return posts.find({});
        return posts.find({parentId:"0"},{limit:Session.get('loadlimit')});
    },
    getUserName: function(id) {
        console.log("MYID: "+id);
        var profile = Meteor.users.findOne({_id:id});
        var pro = profile.profile.name;
        console.log("profile name "+pro);
        return pro;
    },
    getImage: function(id) {
        var img = images.findOne({
            _id: id
        });
        if (img) {
            console.log(img.copies.images.key);
            return img.copies.images.key;
        } else {
            return;
        }
    },

});
// list all forum  user logged in
Template.myforum.helpers({
    listallmyforums: function(){
        // return posts.find();
        var userId=Meteor.userId();
        return posts.find({userId:userId}); //get user logged in
    },
    getImage: function(id) {
        var img = images.findOne({
            _id: id
        });
        if (img) {
            console.log(img.copies.images.key);
            return img.copies.images.key;
        } else {
            return;
        }
    }
});
Template.myforum.events({
	'click #delete': function(){
		var user_id = Meteor.userId();
		var id = this._id;
		Meteor.call('deleteForum',id,user_id);
	}
});