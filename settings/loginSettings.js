// JavaScript Document
const server_url = "http://79.179.68.55:8000/U1F92A/user/register/"
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('logInButton');

// get the input image from the image selector
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

// handles the fileList and finds a file which is an image
function doSomethingWithFiles(fileList) {
	let file = null;

	// since the fileList is probably empty we can use the line below
	// instead of searching the right file (the loop below)
	// var file = fileList[0]

	// finds a file that matches an image format
	for (let i = 0; i < fileList.length; i++) {
		if (fileList[i].type.match(/^image\//)) {
			file = fileList[i];
			break;
		}
	}
	
	if (file !== null) {
		console.log(getBase64(file));
		sendImage();
		// output.src = URL.createObjectURL(file);
	}
}

// constraints for getting data from the camera (can decide which camera for example)
const constraints = {
	video: true,
};

// when clicking the image button (first login button)
captureButton.addEventListener('click', () => {
	// Draw the video frame to the canvas.
	context.drawImage(player, 0, 0, canvas.width, canvas.height);

	// Stop all video streams.
	player.srcObject.getVideoTracks().forEach(track => track.stop());
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
	.then((stream) => {
		player.srcObject = stream;
	});

// Convert file to base 64
function getBase64(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function (e) {
		var raw =  reader.result
		localStorage.setItem("upload", raw)
		console.log(raw)
	};
	reader.onerror = function (error) {
		alert("Error when trying to cenvert the file to base64")
		console.log('Error: ', error);
	};
}


function sendImage() {
	var user_image = {
		"photo": localStorage.getItem("upload")
	}
	localStorage.removeItem("upload")
	console.log(user_image)
	var myId = httpPost(server_url,user_image,json_massage = user_image)
	localStorage.setItem("myId",JSON.parse(myId)["user_pk"])
	console.log(localStorage.getItem("myId"))
	location.href = '../html/contacts.html'
}

function httpPost(theUrl, massage, json_massage = {
    "photo_pk": myId,
    "sender_pk": myId,
    "receiver_pk": friendId,
    "content_text": massage
}) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false)
    xmlHttp.send(JSON.stringify(json_massage))
	return xmlHttp.responseText
}