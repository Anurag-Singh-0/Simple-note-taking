let inputBox = document.querySelector("#input-box");
let btn = document.querySelector(".btn");
let noteContainer = document.querySelector(".note-container");

// Load notes from localStorage when the page reloads
document.addEventListener("DOMContentLoaded", loadNotes);

function createNotes() {
  let inputValue = inputBox.value.trim();
  if (inputValue === "") {
    alert("Please enter something");
    return;
  }

  let noteDiv = document.createElement("div");
  noteDiv.className = "notes";
  let content = document.createElement("p");
  content.className = "content";
  content.textContent = inputValue;

  let Button = document.createElement("button");
  Button.className = "delete-btn";
  Button.innerHTML = `<i class="ri-delete-bin-line"></i>`;

  noteDiv.appendChild(content);
  noteDiv.appendChild(Button);
  noteContainer.appendChild(noteDiv);

  //store notes in localStorage
  saveNote();

  inputBox.value = "";

  Button.addEventListener("click", () => {
    noteDiv.remove();
    saveNote(); // Update localStorage after deletion
  });
}

function saveNote() {
  let notes = [];
  document.querySelectorAll(".content").forEach((note) => {
    notes.push(note.textContent);
  });

  localStorage.setItem("notes", JSON.stringify(notes)); //it convert your array data into string
}

btn.addEventListener("click", createNotes);

inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNotes();
  }
});

function loadNotes() {
  let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach((noteText) => {
    let noteDiv = document.createElement("div");
    noteDiv.className = "notes";
    let content = document.createElement("p");
    content.className = "content";
    content.textContent = noteText;

    let Button = document.createElement("button");
    Button.className = "delete-btn";
    Button.innerHTML = `<i class="ri-delete-bin-line"></i>`;

    noteDiv.appendChild(content);
    noteDiv.appendChild(Button);
    noteContainer.appendChild(noteDiv);

    //store notes in localStorage
    saveNote();

    inputBox.value = "";

    Button.addEventListener("click", () => {
      noteDiv.remove();
      saveNote(); // Update localStorage after deletion
    });
  });
}

loadNotes();
