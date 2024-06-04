const input = document.getElementById("add-input");
const add_button = document.getElementById("add-button");
const notes = document.getElementById("notes");

var notes_cache = {};

console.log(input)

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
    note.id = "note-"+id
    note.dataset.finished = finished && "1" || 0;

    let note_body = document.createElement("div");
    note_body.classList.add("note-body");
    note_body.textContent = body;
    note.appendChild(note_body);

    let note_controls = document.createElement("div");
    note_controls.classList.add("note-controls");
    
    let note_finish = document.createElement("button");
    note_controls.classList.add("note-finish");
    note_finish.textContent = "✔";
    note_finish.addEventListener("click", (e) => {
        e.preventDefault();
        let tmp_notes_cache = localStorage.getItem("TODO_NOTES");
        console.log(tmp_notes_cache);
        notes_cache = tmp_notes_cache != null && JSON.parse(tmp_notes_cache) || {};
        if (note.dataset.finished == "1") {
            note.dataset.finished = "0";
            notes_cache[id].finished = false;
        } else {
            note.dataset.finished = "1";
            notes_cache[id].finished = true;
        }
        localStorage.setItem("TODO_NOTES", JSON.stringify(notes_cache));
    })
    note_controls.appendChild(note_finish);
    
    let note_remove = document.createElement("button");
    note_controls.classList.add("note-rmeove");
    note_remove.textContent = "❌";
    note_remove.addEventListener("click", (e) => {
        e.preventDefault();
        let tmp_notes_cache = localStorage.getItem("TODO_NOTES");
        console.log(tmp_notes_cache);
        notes_cache = tmp_notes_cache != null && JSON.parse(tmp_notes_cache) || {};
        console.log(notes_cache);
        delete notes_cache[id]; /* huh??? what is this sorcery */
        console.log(notes_cache);
        localStorage.setItem("TODO_NOTES", JSON.stringify(notes_cache));
        note.remove();
    })
    note_controls.appendChild(note_remove);
    
    note.appendChild(note_controls);

    notes.appendChild(note);
}

function saveNewNote(body) {
    let tmp_notes_cache = localStorage.getItem("TODO_NOTES");
    console.log(tmp_notes_cache)
    notes_cache = tmp_notes_cache != null && JSON.parse(tmp_notes_cache) || {};
    console.log(notes_cache)
    let highest_index = 0;
    for(let [key, _] of Object.entries(notes_cache)) if (highest_index < key) highest_index = key;
    console.log("Highest index: "+highest_index);
    
    let note_index = 1+parseInt(highest_index);
    
    notes_cache[note_index] = {"body": body, "finished": false};
    
    console.log(notes_cache)
    console.log("saving: "+JSON.stringify(notes_cache));

    localStorage.setItem("TODO_NOTES", JSON.stringify(notes_cache));

    return note_index;
}

let tmp_notes_cache = localStorage.getItem("TODO_NOTES");
console.log(tmp_notes_cache)
notes_cache = tmp_notes_cache != null && JSON.parse(tmp_notes_cache) || {};

for (let [id, data] of Object.entries(notes_cache)) {
    console.log(data);
    createNote(data.body, id, data.finished);
}