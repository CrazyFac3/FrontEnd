// JavaScript Document
const server_url = ""
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
		getBase64(file);
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
	reader.onload = function () {
		console.log(reader.result);
	};
	reader.onerror = function (error) {
		alert("Error when trying to cenvert the file to base64")
		console.log('Error: ', error);
	};
}

function sendImage(img) {
	var user_image = {
		"photo": getBase64(canvas)
	}
	$.post(server_url, user_image, function () {
		alert("image sent succesfully");
	})
}
