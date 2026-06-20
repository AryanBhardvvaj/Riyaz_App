import * as Tone from "https://cdn.skypack.dev/tone";

let player;

const volumeNode = new Tone.Volume(-8).toDestination();

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

export async function startTanpura(scale){

    if(player){
        player.stop();
        player.dispose();
    }

    player = new Tone.Player({
        url:"audio/tanpura_c.mp3",
        loop:true
    }).connect(volumeNode);

    await Tone.loaded();

    player.playbackRate =
        Math.pow(2, semitoneMap[scale] / 12);

    player.start();
}


export function updateTanpuraPitch(scale) {

    if (!player) return;

    player.playbackRate =
        Math.pow(2, semitoneMap[scale] / 12);
}

export function stopTanpura(){
    if(player){
        player.stop();
    }
}

export function setTanpuraVolume(db){
    volumeNode.volume.value = db;
}