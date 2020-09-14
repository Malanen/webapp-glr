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
const emailRef = db.collection("emails");

let selectedUserId = "";

// ========== READ ==========
// watch the database ref for changes
songRef.onSnapshot(function (snapshotData) {
    let songs = [];
    snapshotData.forEach(function (doc) {
        let song = doc.data();
        console.log(song);
        song.id = doc.id;
        songs.push(song);
    });
    appendSongs(songs);
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
// append songs to the DOM
function appendSongs(songs) {
    let htmlTemplate = "";
    for (let song of songs) {
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


// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {
    // references to the input fields
    let titleInput = document.querySelector('#title');
    let demoInput = document.querySelector('#demo');
    let artistInput = document.querySelector('#artist');
    let genreInput = document.querySelector('#genre')
    console.log(titleInput.value);
    console.log(demoInput.value);
    console.log(artistInput.value);
    console.log(genreInput.value);

    let newUser = {
        title: titleInput.value,
        demo: demoInput.value,
        artist: artistInput.value,
        genre: genreInput.value
    };
    demoRef.add(newUser);
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

}

// ========== UPDATE ==========
