class ChordHarmonies {
  keys = ['G', 'D', 'A', 'E', 'B', 'F#','Db', 'Ab', 'Eb', 'Bb', 'F','C'];
  tonality = ['major', 'minor', 'diminished'];
  sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#'];
  chromaticScale = {
    flat: [
      'A','Bb','B','C',
      'Db','D','Eb','E',
      'F','Gb','G','Ab',
      'A','Bb','B','C',
      'Db','D','Eb','E',
      'F','Gb','G','Ab'
    ],
    sharp: [
      'A','A#','B','C',
      'C#','D','D#','E',
      'F','F#','G','G#',
      'A','A#','B','C',
      'C#','D','D#','E',
      'F','F#','G','G#'
    ]
  };

  isSharp = (note) => this.sharpKeys.includes(note);

  formatInput = (input) => {
    if(input[1] && input[1].toLowerCase() === 's'){
      return input[0].toUpperCase() + '#'
    }
    return input[0] && input[0].toUpperCase() + input.substring(1,).toLowerCase();
  };

  chordScale = (rootNote, chord) => {
    rootNote = this.formatInput(rootNote);
    const scale = this.sharpKeys.includes(rootNote) ? 'sharp' : 'flat';
    const root = this.chromaticScale[scale].indexOf(rootNote);
    const harmony = {
      major: {
        third: root + 4,
        fifth: root + 7
      },
      minor: {
        third: root + 3,
        fifth: root + 7
      },
      diminished: {
        third: root + 3,
        fifth: root + 6
      }
    };

    const chordNotes = {
      flat:{
        root: this.chromaticScale.flat[root],
        third: this.chromaticScale.flat[harmony[chord].third],
        fifth: this.chromaticScale.flat[harmony[chord].fifth]
      },
      sharp: {
        root: this.chromaticScale.sharp[root],
        third: this.chromaticScale.sharp[harmony[chord].third],
        fifth: this.chromaticScale.sharp[harmony[chord].fifth]
      }
    };

    return {
      root: chordNotes[scale].root,
      third: chordNotes[scale].third,
      fifth: chordNotes[scale].fifth
    }
  };
}

export default ChordHarmonies;















