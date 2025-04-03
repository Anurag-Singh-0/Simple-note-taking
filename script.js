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

  // Create note element
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

  // Store note in localStorage
  saveNotes();

  inputBox.value = "";

  // Delete note functionality
  Button.addEventListener("click", () => {
    noteDiv.remove();
    saveNotes(); // Update localStorage after deletion
  });
}

// Save notes to localStorage
function saveNotes() {
  let notes = [];
  document.querySelectorAll(".content").forEach((note) => {
    notes.push(note.textContent);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from localStorage
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

    Button.addEventListener("click", () => {
      noteDiv.remove();
      saveNotes(); // Update localStorage after deletion
    });
  });
}

// Event listeners
btn.addEventListener("click", createNotes);
inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNotes();
  }
});
