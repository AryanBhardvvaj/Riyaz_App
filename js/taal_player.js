import * as Tone from "https://cdn.skypack.dev/tone";
import { TAALS } from "./taal_arranger.js";

let players = {};
let repeatEvent = null;
let currentTaal = null;
let currentBeat = 0;

let pitchShift = new Tone.PitchShift();
const volumeNode = new Tone.Volume(-8).toDestination();

pitchShift.connect(volumeNode);

const semitoneMap = {
    "F#": -6,
    "G":  -5,
    "G#": -4,
    "A":  -3,
    "A#": -2,
    "B":  -1,
    "C":   0,
    "C#":  1,
    "D":   2,
    "D#":  3,
    "E":   4,
    "F":   5
};

const bolFiles = [
    "dha", "dhin", "ge", "ke",
    "na", "re", "ta", "te",
    "tin", "tu"
];

export async function loadTabla() {

    if (Object.keys(players).length > 0) return;

export async function loadTabla() {

    if (Object.keys(players).length > 0) return;

    for (const bol of bolFiles) {

        const url = new URL(`../audio/${bol}.mp3`, import.meta.url).href;

        players[bol] = new Tone.Player(url);

        players[bol].connect(pitchShift);
    }

    await Tone.loaded();
}

export function startTaal(taalName, bpm, scale) {

    stopTaal();

    currentTaal = TAALS[taalName];

    if (!currentTaal) return;

    currentBeat = 0;

    Tone.Transport.bpm.value = bpm;

    pitchShift.pitch = semitoneMap[scale] ?? 0;

    repeatEvent = Tone.Transport.scheduleRepeat((time) => {

        const bol = currentTaal.bols[currentBeat];

        players[bol]?.start(time);

        currentBeat++;

        if (currentBeat >= currentTaal.bols.length) {
            currentBeat = 0;
        }

    }, "4n");

    Tone.Transport.position = 0;
    Tone.Transport.start();
}

export function updateTempo(bpm) {
    Tone.Transport.bpm.rampTo(bpm, 0.2);
}

export function updatePitch(scale) {
    pitchShift.pitch = semitoneMap[scale] ?? 0;
}

export function stopTaal() {

    if (repeatEvent !== null) {
        Tone.Transport.clear(repeatEvent);
        repeatEvent = null;
    }

    Tone.Transport.stop();
    Tone.Transport.position = 0;

    currentBeat = 0;
}

export function setTaalVolume(db) {
    volumeNode.volume.value = db;
}