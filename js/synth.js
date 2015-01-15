/**
    @author Martin Tawse martintawse@gmail.com

    @class Synth
    Designed as a monophonic synth with only 1 oscillator
    Requires Sequencer class
*/
function Synth(options) {
    this.sequencer = new Sequencer(options);

    this.volume = options.volume || 100;
    /*
     * Available modes are:
     * '0'  - sine wave
     * '1' - square wave
     * '2' - sawtooth wave
     * '3' - triangle wave
     */
    this.waveform = options.waveform || 0; //sine

    this.filterType = options.filterType || 0;

    /*
     * Available modes are:
     * 'sequence'  - add notes to the sequencer
     * 'play' - play a pattern from the sequencer
     * 'free' - free play on the keypad - this is the default
     */
    this.mode = options.mode || 'free';
    /*
        Note frequencies run from B3 - D5
    */
    // this.noteFrequencies = [246.94,
    //                         261.63,
    //                         277.18,
    //                         293.66,
    //                         311.13,
    //                         329.63,
    //                         349.23,
    //                         369.99,
    //                         392.00,
    //                         415.30,
    //                         440.00,
    //                         466.16,
    //                         493.88,
    //                         523.25,
    //                         554.37,
    //                         587.33];

    /*
        Note frequencies run from B2 - D4
    */
    this.noteFrequencies = [123.47,
        130.81,
        138.59,
        146.83,
        155.56,
        164.81,
        174.61,
        185.00,
        196.00,
        207.65,
        220.00,
        233.08,
        246.94,
        261.63,
        277.18,
        293.66
    ];

    /*
        All the note/frequency pairings
    */
    this.notes = {
        'C0': 16.35,
        'C#0': 17.32,
        'Db0': 17.32,
        'D0': 18.35,
        'D#0': 19.45,
        'Eb0': 19.45,
        'E0': 20.60,
        'F0': 21.83,
        'F#0': 23.12,
        'Gb0': 23.12,
        'G0': 24.50,
        'G#0': 25.96,
        'Ab0': 25.96,
        'A0': 27.50,
        'A#0': 29.14,
        'Bb0': 29.14,
        'B0': 30.87,
        'C1': 32.70,
        'C#1': 34.65,
        'Db1': 34.65,
        'D1': 36.71,
        'D#1': 38.89,
        'Eb1': 38.89,
        'E1': 41.20,
        'F1': 43.65,
        'F#1': 46.25,
        'Gb1': 46.25,
        'G1': 49.00,
        'G#1': 51.91,
        'Ab1': 51.91,
        'A1': 55.00,
        'A#1': 58.27,
        'Bb1': 58.27,
        'B1': 61.74,
        'C2': 65.41,
        'C#2': 69.30,
        'Db2': 69.30,
        'D2': 73.42,
        'D#2': 77.78,
        'Eb2': 77.78,
        'E2': 82.41,
        'F2': 87.31,
        'F#2': 92.50,
        'Gb2': 92.50,
        'G2': 98.00,
        'G#2': 103.83,
        'Ab2': 103.83,
        'A2': 110.00,
        'A#2': 116.54,
        'Bb2': 116.54,
        'B2': 123.47,
        'C3': 130.81,
        'C#3': 138.59,
        'Db3': 138.59,
        'D3': 146.83,
        'D#3': 155.56,
        'Eb3': 155.56,
        'E3': 164.81,
        'F3': 174.61,
        'F#3': 185.00,
        'Gb3': 185.00,
        'G3': 196.00,
        'G#3': 207.65,
        'Ab3': 207.65,
        'A3': 220.00,
        'A#3': 233.08,
        'Bb3': 233.08,
        'B3': 246.94,
        'C4': 261.63,
        'C#4': 277.18,
        'Db4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'Eb4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'Gb4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'Ab4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'Bb4': 466.16,
        'B4': 493.88,
        'C5': 523.25,
        'C#5': 554.37,
        'Db5': 554.37,
        'D5': 587.33,
        'D#5': 622.25,
        'Eb5': 622.25,
        'E5': 659.26,
        'F5': 698.46,
        'F#5': 739.99,
        'Gb5': 739.99,
        'G5': 783.99,
        'G#5': 830.61,
        'Ab5': 830.61,
        'A5': 880.00,
        'A#5': 932.33,
        'Bb5': 932.33,
        'B5': 987.77,
        'C6': 1046.50,
        'C#6': 1108.73,
        'Db6': 1108.73,
        'D6': 1174.66,
        'D#6': 1244.51,
        'Eb6': 1244.51,
        'E6': 1318.51,
        'F6': 1396.91,
        'F#6': 1479.98,
        'Gb6': 1479.98,
        'G6': 1567.98,
        'G#6': 1661.22,
        'Ab6': 1661.22,
        'A6': 1760.00,
        'A#6': 1864.66,
        'Bb6': 1864.66,
        'B6': 1975.53,
        'C7': 2093.00,
        'C#7': 2217.46,
        'Db7': 2217.46,
        'D7': 2349.32,
        'D#7': 2489.02,
        'Eb7': 2489.02,
        'E7': 2637.02,
        'F7': 2793.83,
        'F#7': 2959.96,
        'Gb7': 2959.96,
        'G7': 3135.96,
        'G#7': 3322.44,
        'Ab7': 3322.44,
        'A7': 3520.00,
        'A#7': 3729.31,
        'Bb7': 3729.31,
        'B7': 3951.07,
        'C8': 4186.01
    };

    // create the webaudio audio context
    var context;
    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        throw new Error('AudioContext not supported. :(');
    }
    this.context = context;

    this.setupEventListeners();
}

/*
    Set up the event listeners for the synth
*/
Synth.prototype.setupEventListeners = function () {
    var self = this;
    $('#keypad .key').on('mousedown mouseup', function mouseState(event) {
        // show the light on the keypad, bootstrap kinda takes care of the "press" effect
        self.toggleKeyPadLight(this);
        if (event.type === "mousedown") {
            self.keyPadDown(event);
        }
        if (event.type === 'mouseup') {
            self.keyPadUp(event);
        }
    });
    // same as mouseup, but incase the cursor slides off the keypad
    $('#keypad .key').on('mouseout', function (event) {
        self.turnKeyPadLightOff(event.currentTarget);
        self.keyPadUp(event);
    });
    $('#play').on('click', function () {
        if (!self.sequencer.isplaying) {
            //self.mode = 'play';
            self.startSequencer();
        } else {
            self.stopSequencer();
        }
    });
}

Synth.prototype.createOscillator = function () {
    var attack = 10;
    var decay = 250;

    // create a filter 
    this.filter = this.context.createBiquadFilter();
    this.filter.type = this.filterType;
    this.filter.frequency.value = 220;
    this.filter.Q.value = 10;


    this.gain = this.context.createGain();
    this.gain.gain.value = 1;
    // this.gain.gain.setValueAtTime(0, this.context.currentTime);
    // this.gain.gain.linearRampToValueAtTime(1, this.context.currentTime + attack / 10);
    //this.gain.gain.linearRampToValueAtTime(0, this.context.currentTime + decay / 1000);

    this.oscillator = this.context.createOscillator();
    //this.oscillator.type = this.waveform;
    this.oscillator.frequency.value = this.frequency;
    //this.oscillator.connect(this.context.destination);
    // this.gain.connect(this.context.destination);
    // this.oscillator.connect(this.gain);

    this.oscillator.connect(this.gain);
    this.gain.connect(this.filter);
    this.filter.connect(this.context.destination);
}

/*
    Keypad pressed down - actions will depend on the mode
*/
Synth.prototype.keyPadDown = function (event) {
    // if (this.mode === 'play' || this.mode === 'sequence') {
    //  this.getFrequency(event);
    //  this.playSound();
    // }
    this.getFrequencyFromKeypad(event);
    this.playSound();
    if (this.mode === 'sequence') {
        this.addNoteToSequencer();
    }
}

/*
    Keypad released - only necessary action i to stop the sound
*/
Synth.prototype.keyPadUp = function (event) {
    this.stopSound();
}

/*
    Sets up the oscillator and play the sound
*/
Synth.prototype.playSound = function (noteLength) {
    // this.oscillator = this.context.createOscillator();
    //    this.oscillator.frequency.value = this.frequency;
    //    this.oscillator.connect(this.context.destination);
    noteLength = noteLength || null;
    this.createOscillator();
    this.oscillator.start(this.context.currentTime);
    if (noteLength) {
        this.oscillator.stop(this.context.currentTime + noteLength)
    }
}

/*
    Stop playing the sound
*/
Synth.prototype.stopSound = function () {
    if (this.oscillator) {
        this.gain.gain.value = 0;
        // this.oscillator.stop(0);
        // this.oscillator.disconnect(this.gain);
        // this.gain.disconnect(this.context.destination);
    }
}

/*
    Get the frequency of the key pressed
    @param event
*/
Synth.prototype.getFrequencyFromKeypad = function (event) {
    var keyID = $(event.currentTarget).attr('id');
    keyID = keyID.substring(4); // "key_"
    this.frequency = this.noteFrequencies[keyID - 1];
}
/*
    Get the frequency to be played from the pattern using the 
    currentStep of the sequencer
*/
Synth.prototype.getFrequencyFromPattern = function () {
    var step = this.sequencer.currentStep;
    var notes = this.sequencer.pattern.notes;
    this.frequency = notes[step - 1];
}

/*
    If we are in sequencer mode, then add the frequency to the sequencer pattern
    Later we will add note length, volume, etc
*/
Synth.prototype.addNoteToSequencer = function () {
    this.sequencer.pattern.notes[this.sequencer.currentStep - 1] = this.frequency;
    console.log(this.sequencer.pattern);
}

/*
    Start the sequencer
    I would lke this in the Sequencer class but need it here so I can "pull"
    the notes from the sequencer patter
    Currently uses setInterval for the timing
*/
Synth.prototype.startSequencer = function () {
    //this.playPatternFromSequencer();
    var playingTempo = this.sequencer.tempo;
    playingTempo = (60 / playingTempo) * 1000; // in ms
    playingTempo = playingTempo / 4; // split into 1 /4 beats
    $('#play').text('Stop');
    this.sequencer.isplaying = true;
    this.interval = setInterval(this.playPatternFromSequencer.bind(this), playingTempo);
}
/*
    Stop the sequencer
    Clears the interval
*/
Synth.prototype.stopSequencer = function () {
    clearInterval(this.interval);
    $('#play').text('Play');
    this.sequencer.isplaying = false;
    this.stopSound();
}

/*
    Get the pattern from the sequenver and play it on the synth
*/
Synth.prototype.playPatternFromSequencer = function () {
    this.stopSound();
    this.getFrequencyFromPattern();
    if (this.frequency) {
        this.playSound();
    }
    //this.sequencer.updateStepDisplay();
    this.updateKeypadDisplay();
    if (this.sequencer.currentStep < 16) {
        this.sequencer.currentStep++;
    } else {
        this.sequencer.currentStep = 1;
    }

}

/*
    As the sequencer is playing the pattern, the keypad lights turn on/off to illustrate this
*/
Synth.prototype.updateKeypadDisplay = function () {
    // we need to turn on the current step and turn off the previous
    $('#key_' + this.sequencer.currentStep).find('div.button-light').addClass('on').removeClass('off');
    var previousStep = this.sequencer.currentStep - 1;
    if (previousStep == 0) {
        previousStep = 16;
    }
    $('#key_' + previousStep).find('div.button-light').removeClass('on').addClass('off');
}

/*
    Toggle the keypad light on/off based on selected element
    @param element
*/
Synth.prototype.toggleKeyPadLight = function (element) {
    $(element).find('div.button-light').toggleClass('on off');
}
/*
    Turns the keypad light on based on selected element
    @param element
*/
Synth.prototype.turnKeyPadLightOn = function (element) {
    $(element).find('div.button-light').addClass('on').removeClass('off');
}
/*
    Turns the keypad light off based on selected element
    @param element
*/
Synth.prototype.turnKeyPadLightOff = function (element) {
    $(element).find('div.button-light').addClass('off').removeClass('on');
}