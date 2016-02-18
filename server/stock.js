Meteor.methods({
	"updateqty":function(id,qty){
		return stock.update({_id:id},{$set:{QTY:qty}});
	}
});