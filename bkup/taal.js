import * as Tone from "https://cdn.skypack.dev/tone";

let taalPlayer;

const ORIGINAL_BPM = 80;

const volumeNode = new Tone.Volume(-8).toDestination();

const pitchShift = new Tone.PitchShift();
pitchShift.connect(volumeNode);

const semitoneMap = {
    "C": 0,
    "C#": 1,
    "D": 2,
    "D#": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "G": 7,
    "G#": 8,
    "A": 9,
    "A#": 10,
    "B": 11
};

export async function startTaal(scale, bpm, taal) {

    if (taalPlayer) {
        taalPlayer.stop();
        taalPlayer.dispose();
    }

    taalPlayer = new Tone.GrainPlayer({
        url: `audio/${taal}.mp3`,
        loop: true,
        grainSize: 0.08,
        overlap: 0.04
    });

    taalPlayer.connect(pitchShift);

    await Tone.loaded();

    // Tempo change without major pitch change
    taalPlayer.playbackRate = bpm / ORIGINAL_BPM;

    // Tabla tuning according to selected Sa
    pitchShift.pitch = semitoneMap[scale] ?? 0;

    taalPlayer.start();
}

export function updateTaalPitch(scale) {

    pitchShift.pitch =
        semitoneMap[scale] ?? 0;
}

export function updateTaalTempo(bpm) {

    if (!taalPlayer) return;

    taalPlayer.playbackRate =
        bpm / ORIGINAL_BPM;
}

export function stopTaal() {
    if (taalPlayer) {
        taalPlayer.stop();
    }
}

export function setTaalVolume(db) {
    volumeNode.volume.value = db;
}