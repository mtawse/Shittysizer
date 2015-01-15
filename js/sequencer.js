/**
	@author Martin Tawse martintawse@gmail.com

	@class Sequencer
*/
function Sequencer(options) {
	this.numSteps = 16; // 16 step sequencer
    this.currentStep = options.currentStep || 1;
    this.tempo = options.tempo || 130;
    this.maxTempo = 220; // let's not get silly here
    this.minTempo = 40; // let's not get silly here
    /*
        Possible display modes are:
        'tempo' - display the tempo (in bpm), default is 130
        'step' - display the numbered step sequencer, defaults to 1
    */
    this.displayMode = options.displayMode || 'tempo'; // tempo is default when page is loaded
    this.isPlaying = false;
    this.pattern = {
    	octave: 0,
    	notes: new Array(this.numSteps), // make sure the pattern has the full number of steps
  		tempo: this.tempo
    };
    //this.synth = new Synth(options);
    this.setupEventListeners();
    this.updateSequencerDisplay();

}

Sequencer.prototype.setupEventListeners = function () {
    // set up and down buttons
    $('.btn-up').click(this.buttonUp.bind(this));
    $('.btn-down').click(this.buttonDown.bind(this));
    $('input[name=display-select-input]').change(this.updateSequencerDisplayMode.bind(this));
}

Sequencer.prototype.updateSequencerDisplayMode = function () {
    this.displayMode = $('input[name=display-select-input]:checked').val();
    this.updateSequencerDisplay();
}

Sequencer.prototype.buttonUp = function() {
        switch (this.displayMode) {
        case 'tempo':
            this.tempoUp();
            break;
        case 'step':
            this.stepUp();
            break;
    }
}

Sequencer.prototype.buttonDown = function() {
        switch (this.displayMode) {
        case 'tempo':
            value = this.tempoDown();
            break;
        case 'step':
            this.stepDown();
            break;
    }    
}

Sequencer.prototype.tempoUp = function () {
    if (this.tempo === this.maxTempo) {
        return;
    }
    this.tempo++;
    this.updateSequencerDisplay();
}

Sequencer.prototype.tempoDown = function () {
    if (this.tempo === this.minTempo) {
        return;
    }
    this.tempo--;
    this.updateSequencerDisplay();
}

Sequencer.prototype.stepUp = function () {
    if (this.currentStep === 16) {
        return;
    }
    this.currentStep++;
    this.updateSequencerDisplay();
}

Sequencer.prototype.stepDown = function () {
    if (this.currentStep === 1) {
        return;
    }
    this.currentStep--;
    this.updateSequencerDisplay();
}

Sequencer.prototype.updateSequencerDisplay = function() {
    var value;
    switch (this.displayMode) {
        case 'tempo':
            value = this.tempo;
            break;
        case 'step':
            value = this.currentStep;
            break;
    }
    $('#sequencer-display').html(value);    
}

// Sequencer.prototype.play = function () {
//     $('#play').text('Stop');
//     this.playing = true;
// }

// Sequencer.prototype.stop = function () {
//     $('#play').text('Play');
//     this.playing = false;
// }