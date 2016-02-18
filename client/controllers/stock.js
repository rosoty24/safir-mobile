Session.set('page',1);
Session.set('qtyAsc',0);
Session.set('qtyDec',0);
Session.set('bacodeAsc',0);
Session.set('bacodeDec',0);
Template.stock.helpers({
	listsStock:function(){
		var qtyAsc = Session.get('qtyAsc');
		var qtyDec = Session.get('qtyDec');
		var bacodeAsc = Session.get('bacodeAsc');
		var bacodeDec = Session.get('bacodeDec');
		if(qtyAsc == 1){
			return stock.find({}, {sort: [["QTY","asc"]]}); 
		}else if(qtyDec == 1){
			return stock.find({}, {sort: [["QTY","desc"]]});
		}else if(bacodeAsc == 1){
			return stock.find({}, {sort: [["Barcode","asc"]]});
		}else if(bacodeDec == 1){
			return stock.find({}, {sort: [["Barcode","desc"]]});
		}
		else{
			datastock= stock.find({});
			return datastock;
		}
	  },
	  page:function(){
	  	console.log(Session.get("allPages"));
	  	return Session.get("allPages");
	  }
});
var arr = [1,2,3];
Session.setDefault("allPages",arr);

Template.stock.events({
	'change #shopname':function(event){
		event.preventDefault();
		var name = $('#shopname').val();
		Session.set('storeName',name);
		$('.listStore').css("display","block");
		$('.listAllstore').css("display","none");
	},
	'change #barcode':function(event){
		event.preventDefault();
		var barcode = $('#barcode').val();
		Session.set('RetailBarcode',barcode);
		$('.listStore').css("display","block");
		$('.listAllstore').css("display","none");
	},
	"click .next":function(e){
		  e.preventDefault();
		  //alert("next");
		  var dnext = stock.find({}).count();
		  if(dnext<20){
		   $(".next").css("display","none");
		  }else{

		   Session.set('page',Session.get('page')+1);
		   if(Session.get('page')>1){
 		   		arr.push(Session.get('allPages').length+1);
		   }
		  Session.set("allPages",arr);

		   // var numberpage = Session.set('pagenumber',Session.get('page'));
		   // $(".next").before("<li>"+Session.get('pagenumber')+"</li>");
		  }
 	},
 	 "click .prev":function(e){
	  e.preventDefault();
	   var dnext = stock.find({}).count();
	  if(Session.get('page')==1){
	   $(".prev").css("display","none");
	  }else{
	   Session.set('page',Session.get('page')-1);
	   if(Session.get("allPages").length > 3){
		   var i = arr.indexOf(Session.get("allPages").length);
			if(i != -1) {
				arr.splice(i, 1);
			}
		}
		/*arr.remove(Session.get("allPages")-1);*/
	   Session.set("allPages",arr);
	  }
	 },
	 "click .pageval":function(event){
	 	var text = $(event.currentTarget).attr('name');
		var numberpage=parseInt(text);
		
		Session.set("page",numberpage)

	 },
	 "click .deletestock":function(){
	 	stock.remove(this._id);
	 },
	 "keydown .qty":function(event){
		var qty = $(".qty").val();
		var id=this._id;
		Meteor.call("updateqty",id,qty);
	 },
	 "click .qtyascending":function(event){
	 		Session.set("qtyAsc",1);
	 		Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
	 },
	 "click .qtydescending":function(event){
	 		Session.set("qtyDec",1);
	 		Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
	 },
	 "click .bacodeascending":function(event){
	 		Session.set("bacodeAsc",1);
			Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
			Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
			Session.set("bacodeDec",0);
			delete Session.keys['bacodeDec'];
	 },
	 "click .bacodedescending":function(event){
	 		Session.set("bacodeDec",1);
			Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
			Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
			Session.set("bacodeAsc",0);
			delete Session.keys['bacodeAsc'];
	 }

});