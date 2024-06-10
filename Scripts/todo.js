import "./dataStorage.mjs";
import { cache, retrieveTable, saveTable } from "./dataStorage.mjs";

const input = document.getElementById("add-input");
const add_button = document.getElementById("add-button");
const notes = document.getElementById("notes");

const DATA_KEY = "TODO_NOTES";

retrieveTable(DATA_KEY); // initial table retireval to fill the cache

add_button.addEventListener("click", (e) => {
    e.preventDefault();
    let body = input.value;
    if (body != "") {
        input.value = "";
        let note_index = saveNewNote(body);
        createNote(body, note_index);
    }
})

input.addEventListener("keydown", (e) => {
    console.log(e);
    let body = input.value;
    if (e.key === "Enter" && body != "") {
        input.value = "";
        let note_index = saveNewNote(body);
        createNote(body, note_index);
    }
})

function createNote(body/*string*/, id/*int*/, finished) {
    /* TODO: implement OOP */
    finished = finished == undefined && false || finished;
    let note = document.createElement("div");
    note.classList.add("note");
    note.id = `note-${id}`
    note.dataset.finished = finished && "1" || 0;

    let note_body = document.createElement("div");
    note_body.classList.add("note-body");
    note_body.textContent = body;
    note.appendChild(note_body);

    let note_controls = document.createElement("div");
    note_controls.classList.add("note-controls");
    
    let note_finish = document.createElement("button");
    note_controls.classList.add("note-finish");
    note_finish.innerHTML = `<svg class="icon check"></svg>`;
    note_finish.addEventListener("click", (e) => {
        if (note.dataset.finished == "1") {
            note.dataset.finished = "0";
            cache[DATA_KEY][id].finished = false;
        } else {
            note.dataset.finished = "1";
            cache[DATA_KEY][id].finished = true;
        }
        saveTable(DATA_KEY);
    })
    note_controls.appendChild(note_finish);
    
    let note_remove = document.createElement("button");
    note_controls.classList.add("note-rmeove");
    note_remove.innerHTML = `<svg class="icon delete"></svg>`;
    note_remove.addEventListener("click", (e) => {
        delete cache[DATA_KEY][id]; /* huh??? what is this sorcery */
        //TODO: FIX
        /*let len = Object.keys(cache[DATA_KEY]).length + 1;
        console.log("Removing data at index "+id+", length = "+len);
        for (let i = id+1; i <= len; i++) {
            console.log("Iterating: "+i+" out of "+len);
            cache[DATA_KEY][i-1] = cache[DATA_KEY][i];
            if (i == len) {
                console.log("Removing last key! ("+i+")");
                delete cache[DATA_KEY][i];
            }
        }*/
        saveTable(DATA_KEY);
        note.remove();
    })

    note_controls.appendChild(note_remove);
    note.appendChild(note_controls);
    notes.appendChild(note);
}

function saveNewNote(body) {
    let highest_index = 0;
    for(let [key, _] of Object.entries(cache[DATA_KEY])) if (highest_index < key) highest_index = key;
    
    let note_index = 1+parseInt(highest_index);
    
    cache[DATA_KEY][note_index] = {"body": body, "finished": false};
    
    saveTable(DATA_KEY);
    return note_index;
}

for (let [id, data] of Object.entries(cache[DATA_KEY])) {
    createNote(data.body, id, data.finished);
}