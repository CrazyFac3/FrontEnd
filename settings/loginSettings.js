// JavaScript Document
var ip = "http://crazyface-env.4fpcmyq8xy.us-east-2.elasticbeanstalk.com"
const server_url = ip + "/U1F92A/user/register/"
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
	if (localStorage.getItem("myId") != null) {
		httpGet(ip + "/U1F92A/delete_user/?user_pk=" + localStorage.getItem("myId"))
		localStorage.removeItem("myId")
	  }
	finish(user_image)
}
	function finish(user_image){

	//var a = postData(ip + '/U1F92A/user/register/', user_image)
	//.catch(error => console.error(error))
	//console.log("local debug" + localStorage.getItem("myId"))
	//console.log(user_image)
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
	console.log(theUrl)
    xmlHttp.open("POST", theUrl, false)
    xmlHttp.send(JSON.stringify(json_massage))
	return xmlHttp.responseText
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



function postData(url, data) {
  // Default options are marked with *
  console.log(data)
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => {
	const reader = response.body.getReader();
	return new ReadableStream({
		start(controller) {
		  return pump();
		  function pump() {
			return reader.read().then(({ done, value }) => {
			  // When no more data needs to be consumed, close the stream
			  if (done) {
				  controller.close();
				  return;
			  }
			  // Enqueue the next data chunk into our target stream
			  controller.enqueue(value);
			  return pump();
			});
		  }
		}  
	  })
	})
	.then(stream => new Response(stream))
	.then(response => response.blob())
	.then(blob =>URL.createObjectURL(blob))
	.then(url =>  {var xx = JSON.parse(httpGet(url))["user_pk"]; Window.localStorage.setItem("myId",xx);console.log(xx)})
	.catch(err => console.error(err));
}
