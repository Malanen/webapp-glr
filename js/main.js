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
(function () {
    var loading = document.getElementById("loading"),

        show = function () {
            loading.style.display = "block";
            setTimeout(hide, 2000); // 5 seconds
        },

        hide = function () {
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
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      ${song.soundcloud}
    </article>
    `;

    }
    document.querySelector('#songContent').innerHTML = "<h1>Newest releases</h1>" + htmlTemplate;
}
//show more show less
let _show = document.getElementById("showMore");
let _showTwo = document.getElementById("showLess");

function showMore(songs) {
    _show.style.display = "none";
    _showTwo.style.display = "block";
    let htmlTemplate = "";
    for (let index = 3; index < _songs.length; index++) {
        let song = _songs[index];
        console.log(song.id);
        console.log(song.artist);
        htmlTemplate += `
    <article>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        ${song.soundcloud}
    </article>
    `;

    }
    document.querySelector('#songContent').innerHTML += htmlTemplate;
}

function showLess(songs) {
    _showTwo.style.display = "none";
    _show.style.display = "block";

    let htmlTemplate = "";
    for (let index = 0; index < 3; index++) {
        let song = _songs[index];
        console.log(song.id);
        console.log(song.artist);
        htmlTemplate += `
    <article>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        ${song.soundcloud}
    </article>
    `;

    }
    document.querySelector('#songContent').innerHTML = "<h1>Newest releases</h1>" + htmlTemplate;
}

// append demos to the DOM
function appendDemos(demos) {
    let htmlTemplate = "";
    for (let demo of demos) {
        console.log(demo.id);
        console.log(demo.artist);
        htmlTemplate += `
    <article>
      <h3>${demo.title}</h3>
      <p>${demo.artist}</p>
      ${demo.soundcloud}
    </article>
    `;
    }
    document.querySelector('#demos').innerHTML = "<h1>Public demos</h1>" + htmlTemplate;
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
    <input class="search" type="text" id="searchBar" placeholder="Search">
    <a href="#searchFilteredSongs" id="filterShowContent" onclick="searchFunction(); noToggleMenu();"><img src="/img/searchIcon.png" id="searchIcon"></a>
    <h2>Genre</h2>
    <div class="flexFilter">
        <div class="flexFilterItems">
            <a href="#searchFilteredSongs" onclick="changeColor(this, 'House'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/House.png"></a>
            <a href="#searchFilteredSongs" onclick="changeColor(this, 'Deep House'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/Deep-House.png"></a>
        </div>
        <div class="flexFilterItems">
            <a href="#searchFilteredSongs" onclick="changeColor(this, 'Rap'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/Rap.png"></a>
            <a href="#searchFilteredSongs" onclick="changeColor(this, 'Tech House'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/Tech-House.png"></a>
        </div>
        <div class="flexFilterItems">
    <a href="#searchFilteredSongs" onclick="changeColor(this, 'Techno'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/Techno.png"></a>
    <a href="#searchFilteredSongs" onclick="changeColor(this, 'Psytrance'); searchFunctionGenre(); noToggleMenu();" class="notselected"><img src="img/Psytrance.png"></a>
        </div>
    </div>
    
    <a id="closemenu" onclick="noToggleMenu()"><img src="img/closeFilterIcon.png"></a>
    `;
    document.querySelector("#filter").innerHTML = template;
}
let selectedGenre = "";

// Search

function searchFunctionGenre() {
    let filteredSearch = [];
    for (const song of _songs) {
        if (song.genre === selectedGenre) {
            filteredSearch.push(song)
        }
    }
    appendFilteredsongs(filteredSearch);
}

function searchFunction() {
    let value = document.querySelector("#searchBar").value
    console.log(value)
    let searchValue = value.toLowerCase();

    let filteredSearch = [];

    for (const song of _songs) {
        let filteredTitles = song.title.toLowerCase();
        let filteredArtist = song.artist.toLowerCase();

        if (filteredTitles.includes(searchValue) || filteredArtist.includes(searchValue)) {
            filteredSearch.push(song);
        }
    }
    appendFilteredsongs(filteredSearch);
}

function appendFilteredsongs(songs) {
    let htmlTemplate = "";
    for (const song of songs) {
        htmlTemplate += `
    <article>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        ${song.soundcloud}
    </article>
    `;

    }
    document.querySelector('#searchFilteredSongs').innerHTML = '<a href="#home"><img src="img/returnbutton2.png" class="backbutton" alt="backbutton"></a>' + htmlTemplate;
}


let filterButton = document.querySelector("#filterDiv");
filterButton.addEventListener("click", showFilter);


function changeColor(element, genre) {
    let selected = document.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    } else {
        element.classList.add("selected");
    }
    selectedGenre = genre;
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

