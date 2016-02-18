Template.addPost.events({
	'submit form': function(e,tpl){
		e.preventDefault();
		var id = Meteor.userId();
		var topic = $('#topic').val();
		var description = $('#description').val();
		var d = new Date();
		var date = d.getDate();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var time = date+"-"+month+"-"+year;
		var image = Session.get("ADDIMAGEID");
		var parent_id = "0";
		if(Meteor.user()){
			Meteor.call('addPost', id,parent_id,topic,description,image,time, function(err){
				if(err){
					alert(err.reason);
				}else{
					alert("Success");
				}
			});
		}else{
			Router.go("/login");
		}
	
	},
	  'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
       // alert("sess"+fileObj._id)
        Session.set('ADDIMAGEID', fileObj._id);
      });
    }
  },
  
});

Template.reply.events({
		'click #reply': function(e,tpl){
  		e.preventDefault();
		var id = Meteor.userId();
		var topic = $('#topic').val();
		var description = $('#description').val();
		var d = new Date();
		var date = d.getDate();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var time = date+"-"+month+"-"+year;
		var image = $("#image").val();
		var parent_id = this._id;
		Meteor.call('addPost', id,parent_id,topic,description,image,time, function(err){
			if(err){
				alert(err.reason);
			}else{
				alert("Success");
			}
		});
  },
  	'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
       // alert("sess"+fileObj._id)
        Session.set('ADDIMAGEID', fileObj._id);
      });
    }
  }
});