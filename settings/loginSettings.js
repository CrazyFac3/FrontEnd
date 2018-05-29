// JavaScript Document
const server_url = ""
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('logInButton');

logInClicked = function(){
	captureButton.click();
}

const constraints = {
	video: true,
};

captureButton.addEventListener('click', () => {
	// Draw the video frame to the canvas.
	context.drawImage(player, 0, 0, canvas.width, canvas.height);
});

// Stop all video streams.
player.srcObject.getVideoTracks().forEach(track => track.stop());
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
	.then((stream) => {
			player.srcObject = stream;
		}

// Convert file to base 64
function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

var file = document.querySelector('#files > input[type="file"]').files[0];
getBase64(file); // prints the base64 string

function sendImage(img){
	var user_image = {"photo":getBase64(canvas)}
	$.post(server_url, user_image, function() {
		alert( "image sent succesfully" );
	  })
}


/* Example for manipulting the fileList
		doSomethingWithFiles = function (fileList) {
			let file = null;

			for (let i = 0; i < fileList.length; i++) {
				if (fileList[i].type.match(/^image\//)) {
					file = fileList[i];
					break;
				}
			}

			if (file !== null) {
				output.src = URL.createObjectURL(file);
			}
		}
*/