// Let's get the data from the Quotes API:
// Quote API variables:
const API_KEY = '1aad9b257amsh8cea256130839a7p1e5326jsn1feba12d1c03'
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'quotes15.p.rapidapi.com'
        }
    };

const quoteApp = document.getElementById('quoteApp');

// Task list variables:
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskBtn = document.getElementById('taskBtn');
const toDoField = document.getElementById('toDoField');

// Let's generate a random quote + author:
function generateRandomQuote() {
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
        .then(response => response.json())
        .then(data => {
            console.log(data); // use the data returned from the API to update your page:
    const quoteText = document.createElement("p");
        quoteText.textContent = data.content;
        quoteApp.append(quoteText);
    const author = document.createElement("h4");
        author.textContent = "- " + data.originator.name;
        quoteApp.append(author);
            console.log(quoteText, author);})  // data is locally scoped inside .then fcn so have to be inside .then to use data
}

// Let's call the previously defined fcn:
generateRandomQuote();


// API#2: LOVE CALCULATOR
    // Must use a modal (modal pops up when you hit button?) for user input AND validate user input (make sure it is text only = names)

// first let's define a few variables:
let openModalBtn = document.getElementById("open-modal-btn");
let closeBtn = document.getElementsByClassName("close")[0];
let modal = document.getElementsByClassName("modal");

// When the user clicks the button, open the modal:
openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

// When the user clicks on the close button, close the modal:
closeBtn.onclick = function() {
    modal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// add an event listener for the love button click:
openModalBtn.addEventListener("click", function(){
    modal.style.display = "block";
});

document.getElementById("submit-btn").addEventListener("click", function(event){
    event.preventDefault()});

const optionsLove = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1aad9b257amsh8cea256130839a7p1e5326jsn1feba12d1c03',
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
	}
};

const loveCalc = document.getElementById('loveCalc');

function generateLoveCalc() {
    // need to first click button to open modal
    // then ask users for their first name + partner name
    // then validate their input to make sure there is at least 1 letter in each box
    // then remove any spaces from user input,
    // THEN these 2 names need to appear below, or maybe the API spits them back out - unsure - 
            // with the % + result sentence. Maybe a heart icon btwn the names
let name1 = document.getElementById('name1input').value;
let name2 = document.getElementById('name2input').value;
fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=${name1}&fname=${name2}', optionsLove)
    .then(response => response.json())
    .then(data => {   // Update modal content with data from API
        document.getElementById('modal-content').innerHTML = `Love percentage between ${name1} and ${name2} is ${data.percentage}%`;
      })
      .catch(error => console.error(error));
    };



// Let's call the LoveCalc API function:
generateLoveCalc();

// END OF LOVE CALC API CODE

// Now let's dynamically create our task input fields and checkable-list & store locally:
function createTask(event) {
    event.preventDefault();  // prevented page refresh to fix bug of task immediately disappearing
    const task = taskInput.value;
            console.log(task);
    const label = document.createElement("label");
        label.setAttribute("for", "checkbox-nested");
    const labelInput = document.createElement("input");
        labelInput.setAttribute("type", "checkbox");
        labelInput.setAttribute("name", task);
        labelInput.checked = false;
        label.textContent = taskInput.value + " ";
        label.append(labelInput);
        toDoField.append(label);
            console.log(label);
    // want tasks to generate on separate lines / vertically, not horiz, every time the fcn runs i.e. every time a task is added
    const lineBr = document.createElement("br");
        toDoField.append(lineBr);
    // left to do in this fcn: save tasks + checked-or-not to local storage - not working
        // PRoblem may be that label is being added as a KEY
    localStorage.setItem("task", JSON.stringify(task));
    console.log(task);  // every time you add a new task, its pushed to a task array (name + checked status) - update that and set item again
    localStorage.setItem("isChecked", JSON.stringify(labelInput.checked));
    // if page is reloaded/refreshed, run refreshTasks fcn, otherwise stop here???
    

// CONFETTI CODE:
    const checkbox = labelInput;
    const confettiContainer = document.getElementById("confetti-container");
    const colors = ["red", "purple", "pink", "blue", "green", "yellow", "orange"];

    checkbox.addEventListener("change", function(){
        if (this.checked) {
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement("div");
                confetti.classList.add("confetti");
                confettiContainer.appendChild(confetti);

                // make confetti a random color from the color array:
                confetti.classList.add(colors[Math.floor(Math.random()*colors.length)]);
                confettiContainer.appendChild(confetti);
                
                // animate confetti falling:
                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.animation = `fall ${Math.random() + 1}s ease-in-out ${Math.random() * 3}s forwards`;
            }
        }
    })
// END OF CONFETTI CODE
};

// Gotta add an event listener to the Create Task button:
taskBtn.addEventListener("click", createTask);


// to update the page with locally stored data when the page is loaded,
window.onload = function onLoad() {  // window.onload does not need an event listener as it will be executed automatically once the pg finishes loading
    const storedTask = localStorage.getItem("task");
    const storedIsChecked = localStorage.getItem("isChecked");
    if (storedTask !== null && storedIsChecked !== null) {
        const label = document.createElement("label");
        label.setAttribute("for", "checkbox-nested");
        label.textContent = storedTask.value + " " + storedIsChecked.valueOf("isChecked");  // this renders true or false and not the box
        document.getElementById("toDoField").append(label);
    } else {
        return;
    }
};
