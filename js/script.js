(function($) { 

	$( document ).ready(function() {

		var context = new webkitAudioContext();
		var noteFrequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25];

		$('#keypad .key').click(keyPadPressed);

		//$(".key").button('toggle')

		//$('#keypad .btn').button();

	});

	function keyPadPressed() {
		//$(this).button('toggle')
		toggleKeyPadLight(this);
	}

	function toggleKeyPadLight(keyPad) {
		$(keyPad).find('div.button-light').toggleClass('on off');
	}
	
})(jQuery); 