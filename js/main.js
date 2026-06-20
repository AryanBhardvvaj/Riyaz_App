import * as Tone from "https://cdn.skypack.dev/tone";

import {
    startTanpura,
    stopTanpura,
    setTanpuraVolume,
    updateTanpuraPitch
} from "./tanpura.js";

import {
    loadTabla,
    startTaal,
    stopTaal,
    setTaalVolume,
    updatePitch,
    updateTempo
} from "./taal_player.js";

const overlay = document.getElementById("overlay");

const scale = document.getElementById("scale");

let tanpuraPlaying = false;
let tablaPlaying = false;

/* -------------------------
   Volume Controls
------------------------- */

document
    .getElementById("tanpuraVolume")
    .addEventListener("input", (e) => {

        setTanpuraVolume(
            Number(e.target.value)
        );

    });

document
    .getElementById("tablaVolume")
    .addEventListener("input", (e) => {

        setTaalVolume(
            Number(e.target.value)
        );

    });

document
    .getElementById("scale")
    .addEventListener("change", (e) => {

        const newScale = e.target.value;

        if (tanpuraPlaying) {
            updateTanpuraPitch(newScale);
        }

        if (tablaPlaying) {
            updatePitch(newScale);
        }

    });


document
    .getElementById("tempo")
    .addEventListener("change", (e) => {

        if (!tablaPlaying) return;

        updateTempo(
            Number(e.target.value)
        );

    });

document
    .getElementById("taalSelect")
    .addEventListener("change", async () => {

        if (!tablaPlaying) return;

        const scale =
            document.getElementById("scale").value;

        const bpm =
            document.getElementById("tempo").value;

        const taal =
            document.getElementById("taalSelect").value;

        startTaal(
            taal,
            bpm,
            scale
        );
    });

function showFutureFeature() {

    overlay.style.display = "flex";

    setTimeout(() => {
        overlay.style.display = "none";
    }, 2000);
}

/* -------------------------
   Tanpura Toggle
------------------------- */

document
    .getElementById("toggleTanpura")
    .addEventListener("click", async () => {

        await Tone.start();

        const btn =
            document.getElementById("toggleTanpura");

        if (!tanpuraPlaying) {

            startTanpura(scale.value);

            btn.textContent =
                "Stop Tanpura";

            tanpuraPlaying = true;

        } else {

            stopTanpura();

            btn.textContent =
                "Start Tanpura";

            tanpuraPlaying = false;
        }
    });

/* -------------------------
   Tabla Toggle
------------------------- */

document
    .getElementById("toggleTabla")
    .addEventListener("click", async () => {

        await Tone.start();

        console.log(Tone.context.state);

        await loadTabla();

        const btn =
            document.getElementById("toggleTabla");

        if (!tablaPlaying) {

        await loadTabla();

        const currentScale =
            document.getElementById("scale").value;

        const currentBpm =
            document.getElementById("tempo").value;

        const currentTaal =
            document.getElementById("taalSelect").value;

        startTaal(
            currentTaal,
            currentBpm,
            currentScale
        );

            btn.textContent =
                "Stop Tabla";

            tablaPlaying = true;

        } else {

            stopTaal();

            btn.textContent =
                "Start Tabla";

            tablaPlaying = false;
        }
    });

/* -------------------------
   Future Features
------------------------- */

document
    .getElementById("playManjeera")
    .addEventListener(
        "click",
        showFutureFeature
    );

document
    .getElementById("playSwarmandal")
    .addEventListener(
        "click",
        showFutureFeature
    );

/* -------------------------
   Cleanup
------------------------- */

window.addEventListener(
    "beforeunload",
    () => {

        stopTanpura();
        stopTaal();

    }
);