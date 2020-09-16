// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8L3By0UWfxZ8CO9vNZHwDN6Ev553xbcQ",
    authDomain: "golden-lady-record.firebaseapp.com",
    databaseURL: "https://golden-lady-record.firebaseio.com",
    projectId: "golden-lady-record",
    storageBucket: "golden-lady-record.appspot.com",
    messagingSenderId: "1026913158705",
    appId: "1:1026913158705:web:d686f7c2d11e8263f9b710"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const songRef = db.collection("songs");
const demoRef = db.collection("demos");
const emailRef = db.collection("email");

let _selectedUserId = "";
let _songs = [];
// ========== READ ==========
// watch the database ref for changes
songRef.onSnapshot(function (snapshotData) {
    snapshotData.forEach(function (doc) {
        let song = doc.data();
        console.log(song);
        song.id = doc.id;
        _songs.push(song);
    });
    appendSongs(_songs);
});


demoRef.onSnapshot(function (snapshotData) {
    let demos = [];
    snapshotData.forEach(function (doc) {
        let demo = doc.data();
        console.log(demo);
        demo.id = doc.id;
        demos.push(demo);
    });
    appendDemos(demos);
});

// loading screen 
(function(){
    var loading = document.getElementById("loading"),

      show = function(){
        loading.style.display = "block";
        setTimeout(hide, 2000); // 5 seconds
      },

      hide = function(){
        loading.style.display = "none";
      };

    show();
  })();


// append songs to the DOM
function appendSongs(songs) {
    let htmlTemplate = "";
    for (let index = 0; index < 3; index++) {
        let song = _songs[index];
        console.log(song.id);
        console.log(song.artist);
        htmlTemplate += `
    <article>
      <h2>${song.title}</h2>
      ${song.soundcloud}
      <h2>${song.artist}</h2>
      <h2>${song.genre}</h2>
    </article>
    `;

    }
    document.querySelector('#home').innerHTML = htmlTemplate;
}
//show more show less
function showMore(songs) {
    let htmlTemplate = "";
    for (let index = 3; index < _songs.length; index++) {
        let song = _songs[index];
        console.log(song.id);
        console.log(song.artist);
        htmlTemplate += `
    <article>
      <h2>${song.title}</h2>
      ${song.soundcloud}
      <h2>${song.artist}</h2>
      <h2>${song.genre}</h2>
    </article>
    `;

    }
    document.querySelector('#home').innerHTML += htmlTemplate;
}

function showLess(songs) {
    let htmlTemplate = "";
    for (let index = 0; index < 3; index++) {
        let song = _songs[index];
        console.log(song.id);
        console.log(song.artist);
        htmlTemplate += `
    <article>
      <h2>${song.title}</h2>
      ${song.soundcloud}
      <h2>${song.artist}</h2>
      <h2>${song.genre}</h2>
    </article>
    `;

    }
    document.querySelector('#home').innerHTML = htmlTemplate;
}

/*function show() {
    let show = document.getElementById("showMore");
    let showTwo = document.getElementById("showLess")
  if (show.style.display === "block") {
    show.style.display = "none";
    showTwo.style.display = "block";
  } else if (showTwo.style.display === "block") {
    showTwo.style.display = "none";
    show.style.display = "block";
  }
} */
   let _show = document.getElementById("showMore");
    let _showTwo = document.getElementById("showLess");

function show() {
    if (_show.style.display === "block") {
        _show.style.display = "none";
        _showTwo.style.display = "block";
} else if (_showTwo.style.display === "block"){
    _showTwo.style.display = "none";
    _show.style.display = "block";
}
}








// append demos to the DOM
function appendDemos(demos) {
    let htmlTemplate = "";
    for (let demo of demos) {
        console.log(demo.id);
        console.log(demo.artist);
        htmlTemplate += `
    <article>
      <h2>${demo.title}</h2>
      ${demo.soundcloud}
      <h2>${demo.artist}</h2>
      <h2>${demo.genre}</h2>
    </article>
    `;
    }
    document.querySelector('#demos').innerHTML = htmlTemplate;
}



// Show Filter Button

window.onscroll = function () {
    let showFilter = document.querySelector("#filterDiv");
    let sectionPages = document.querySelector("#home");
    let offsetTop = sectionPages.getBoundingClientRect("sectionPages").top;
    if (offsetTop <= 565) {
        showFilter.style.display = "block";
    } else {
        showFilter.style.display = "none";
    }
}




//  Toggle Filter

function showFilter() {
    let filter = document.querySelector("#filter")
    document.body.style.overflowY = "hidden";
    filter.style.display = "block";
    filter.classList.add("slide-in-bottom");
    filter.classList.remove("slide-out-bottom");
    let template = /*html*/ `
    <input class="search" type="text" id="searchBar" placeholder="Search" onkeyup="search(this.value)>
    <h2>Genre</h2>
    <div>
    <a onclick="changeColor(this)" class="notselected"><p>House</p></a>
    <a onclick="changeColor(this)" class="notselected"><p>Deep House</p></a>
    <a onclick="changeColor(this)" class="notselected"><p>Rap</p></a>
    <a onclick="changeColor(this)" class="notselected"><p>Tech House</p></a>
    <a onclick="changeColor(this)" class="notselected"><p>Techno</p></a>
    <a onclick="changeColor(this)" class="notselected"><p>Psytrance</p></a>
    </div>
    <h2>Releases</h2>
    <div>
    <a onclick="changeColor(this)" class="notselected releaseBtn"><p>New Releases</p></a>
    <a onclick="changeColor(this)" class="notselected releaseBtn"><p>Popular Releases</p></a>
    </div>
    <div class="slidecontainer">
    <input type="range" min="1" max="200" value="100" class="slider" id="myRange" oninput="sliderValueFilter()">
    <p>BPM: <span id="bpmValueFilter"></span></p>
    </div>
    <a id="closemenu" onclick="noToggleMenu()">x</a>
    `;
    document.querySelector("#filter").innerHTML = template;
}

let filterButton = document.querySelector("#filterDiv");
filterButton.addEventListener("click", showFilter);


function changeColor(element) {
    if (element.classList.contains("notselected")) {
        element.classList.remove("notselected");
        element.classList.add("selected");
    } else if (element.classList.contains("selected")) {
        element.classList.remove("selected");
        element.classList.add("notselected");
    }

}

// Send Demo form

function sendDemo() {
    let template = /*html*/ `
  <form id="demoForm">
    <a href="#home" id="closeSendDemo" onclick="goBack()">X</a>
    <h2>Send your demo</h2>
    <input class="demoBox" type="text" id="name" placeholder="Artist name" required>
    <input class="demoBox" type="email" id="email" placeholder="Email" required>
    <input class="demoBox" type="text" id="title" placeholder="Title" required>
    <input class="demoBox" type="text" id="soundcloud" placeholder="Embedded soundcloud link" required><a href="https://help.soundcloud.com/hc/en-us/articles/115003568008-Embedding-a-track-or-playlist-" target="_blank" id="helpBtn">?</a>
    <select name="genre" id="genre" class="demoBox">
    <option value="Genre" class="class">Genre</option>
     <option value="House" class="class">House</option>
      <option value="Techno" class="class">Techno</option>
      <option value="Deephouse" class="class">Deephouse</option>
      <option value="Techhouse" class="class">Techhouse</optiononkeyup="search(this.value)>
      <option value="Trance" class="class">Trance</option>
      <option value="Rap" class="class">Rap</option>
      <option value="Other" class="class">Other</option>
    </select>
    <div class="slidecontainer">
  <input type="range" min="1" max="200" value="100" class="slider" id="bpmRange" oninput="sliderValue()">
  <p>BPM: <span id="bpmValue"></span></p>
</div>
    <a href="#demos" type="button" name="button" onclick="createEmailDemo(), createUser()" id="sendBtn">Send Demo</a>
  </form>
  `
    document.querySelector("#sendDemo").innerHTML = template;
    document.body.style.overflowY = "hidden";
}

function sliderValue() {
    let slider = document.getElementById("bpmRange").value
    let output = document.getElementById("bpmValue");
    output.innerHTML = slider;
}
function sliderValueFilter() {
    let slider = document.getElementById("myRange").value
    let output = document.getElementById("bpmValueFilter");
    output.innerHTML = slider;
}



// Send demo and add on firebase.

function createUser() {
    // references to the input fields
    let titleInput = document.querySelector("#title");
    let demoInput = document.querySelector('#soundcloud');
    let artistInput = document.querySelector('#name');
    let genreInput = document.querySelector('#genre');
    let bpmInput = document.querySelector('#bpmRange');
    console.log(titleInput.value);
    console.log(demoInput.value);
    console.log(artistInput.value);
    console.log(genreInput.value);
    console.log(bpmInput.value);

    let newUser = {
        title: titleInput.value,
        soundcloud: demoInput.value,
        artist: artistInput.value,
        genre: genreInput.value,
        BPM: bpmInput.value
    };
    demoRef.add(newUser);
    document.body.style.overflowY = "auto";
}



// Sign up to newsletter and add on firebase

function createEmail() {
    // references to the input fields
    let emailInput = document.querySelector("#yourEmail");
    let newEmail = {
        email: emailInput.value,
    };
    emailRef.add(newEmail);
    emailInput.value = "Thanks!";
}

function createEmailDemo() {
    // references to the input fields
    let emailDemoInput = document.querySelector("#email");
    let newEmail = {
        email: emailDemoInput.value,
    };
    emailRef.add(newEmail);
}


// Remove filter
function noToggleMenu() {
    let filter = document.querySelector("#filter");
    filter.classList.remove("slide-in-bottom");
    filter.style.display = "none";
    filter.classList.add("slide-out-bottom");
    document.body.style.overflowY = "auto";
}
function goBack() {
    document.body.style.overflowY = "auto";
}



// Search

function search(value) {
    let searchValue = value.toLowerCase();
    let filteredSongs = this._songs.filter(song => song.title.toLowerCase().includes(searchValue));
    console.log(searchValue);
    this.appendSongs(filteredSongs);
}

