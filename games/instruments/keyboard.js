const Speaker = require("speaker");
const AudioContext = require('web-audio-engine').StreamAudioContext;
const context = new AudioContext();
const musical = require('musical.js')


//****** Musical JS (ABC notation) Demo ******//

//const AudioContext = require('web-audio-engine').WebAudioContext;
//var context = new WebAudioEngine.WebAudioContext({ context: new AudioContext() });

var inst = new musical.Instrument('piano');
//inst.connect(context.destination);

// Play a single tone immediately.  Tones may be also specified
// numerically (in Hz), or with midi numbers (as negative integers).
inst.tone('C')

// Whenever we like, release the note.
setTimeout(function() {
inst.tone('C', false);
firstsong();
}, Math.random() * 10000);

function firstsong() {
// Play "Mary Had a Little Lamb"
inst.play({tempo:200},
"AGFG|AAA2|GGG2|AAA2|AGFG|AAAA|GGAG|F4|z4", whendone)
}

// Do this after Mary is done.
function whendone() {
// Play "Stairway", which picks out a few chords.
inst.setTimbre({wave:'sawtooth', gain:0.15,
attack:0.008, decay:0.2, release:0.2,
cutoff:0, cutfollow:20, resonance:3});
inst.play("F^Gcf|[gE]c^G|g[^g^D]c|^G^g[dD]|" +
"^AFd|[^C=c]^GF|^G21/3c^GF|[G^DG,][F,F^G][^GFF,]2z4", whendone2);
}

// Do this after Stairway is done.
function whendone2() {
// Change the inst to sound more like a piano.
inst.setTimbre({wave:"piano"});
// Then play a couple bars of a Beethoven Sonata, using ABC notation
// clipped from the web.  Note support for chords, beats, accidentals,
// key signatures, meter and tempo markings, ties, and so on.
inst.play(
"X:2\n" +
"T:8th Sonata for inst\n" +
"%%staves {1 2}\n" +
"C:L. van Beethoven\n" +
"M:C\n" +
"L:1/16\n" +
"Q:1/8=66\n" +
"F:http://richardrobinson.tunebook.org.uk/tune/6525\n" +
"K:Cm\n" +
"V:1\n" +
"!fp![E,4G,4C4]- [E,3/G,3/C3/]!3![G,/C/]!4![G,3/=B,3/D3/]!5![G,/C/E/] " +
"([=A,4C4E4]!4![=B,2D2])z2|\n" +
"!fp!!3![=B,4D4F4]- [B,3/D3/F3/][B,/D/F/][B,3/D3/G3/][B,/D/A/] " +
"([B,4D4A4]!3![C2E2G2])z2|\n" +
"V:2\n" +
"[C,,4E,,4G,,4C,4]- [C,,3/E,,3/G,,3/C,3/]!2!E,/!3!D,3/!4!C,/ " +
"(!2!^F,4G,2)z _A,,|\n" +
"_A,4-A,3/!2!A,/!1!G,3/=F,/ E,4-E,2z2|\n"
);
}

// Set the output for audio streaming
//context.pipe(process.stdout);

// If you want to playback sound directly in this process, you can use 'node-speaker'.
context.pipe(new Speaker());
 
// Start to render audio
context.resume();
 
// composeWith(context);