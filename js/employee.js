  $(function() {
    $( "#fromdatepicker" ).datepicker();
    $( "#todatepicker" ).datepicker();
  });


$( document ).ready(function() {
 	$('#leaveform').on( "click", function() {
		$('#leavefrm').show();
	});

	$('#leavecancel').on( "click", function() {
		$('#fromdatepicker').datepicker('setDate', null);
		$('#todatepicker').datepicker('setDate', null);
		$('.apply-box input[type="text"]').val('');
		$('.apply-box textarea').val('');
	});

	$('#leaveapply').on( "click", function() {
		console.log($('#fromdatepicker').val());
		console.log($('#todatepicker').val());
		$('#type').val();
		$('#desc').val();
	});
  	$("aside h4 a").click(function(){
	$('.tab').hide();
    theDiv = $(this).attr("href");
    $(theDiv).show();
});
});