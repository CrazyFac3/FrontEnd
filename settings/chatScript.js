//varibales
var msg = []
var lastMessege = null
var toggled = 0;
var lastMessege = -1
var clicked = false
//varibales

function removeElement(id) {
    // removes an element from the html (by id)
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function closeKeyboard() {
    var btn = document.getElementById("toggleKey");
    console.log(toggled)
    var mainboxele = document.getElementById("mainbox");
    // document.getElementById("bottom_box").style.visibility = "hidden";
    var bottom_box = document.getElementById("bottom_box");
    var initial_mainbox_height = "45vh";
    if (toggled == 0) {
        // removeElement("bottom_box");
        btn.innerHTML = "⬆️";
        bottom_box.style.visibility = "hidden";
        mainboxele.style.height = "100%";
        toggled = 1;
    } else if (toggled == 1) {
        btn.innerHTML = "⬇️";
        bottom_box.style.visibility = "visible";
        mainboxele.style.height = "45vh";
        console.log("is toggled: " + toggled)
        toggled = 0;
    }
}

function updateScroll(item_id) {
    var element = document.getElementById(item_id);
    element.scrollBy(0, element.scrollHeight)
    console.log("scroll height: " + element.scrollHeight)
}

function DeleteEmoji() {
    preview_box = document.getElementById("preview")
    if (preview_box.innerText) {
        if (msg[msg.length - 1] == "<br />") msg.splice(-1, 1)
        msg.splice(-1, 1)
        preview_box.innerHTML = msg.join("")
    }
}

function PrintEmoji(param) {
    preview_box = document.getElementById("preview")
    console.log(param)
    preview_box.innerText += document.getElementById(param).innerText
    msg.push(document.getElementById(param).innerText)
    if (msg.length % 9 == 0) msg.push("<br />");
    preview_box.innerHTML = msg.join("");
    console.log("Current text in box: " + preview_box.innerText)
    updateScroll("preview_box")
}

function SendEmoji(classs, source = msg, sendToServer = true) {
    if (msg.length == 0 && source == msg) {
        return null
    }
    var new_msg = document.createElement("DIV")
    new_msg.className = classs
    if (source.constructor == Array) {
        new_msg.innerHTML = source.join("");
    } else
        new_msg.innerHTML = source
    document.getElementById("mainbox").appendChild(new_msg)
<<<<<<< HEAD
    if(sendToServer){
        httpPost('http://79.179.68.55:8000/U1F92A/create_message/', new_msg.innerHTML)
        lastConv[Object.keys(lastConv).length + 1] = new_msg.innerHTML 
=======
    if (sendToServer) {
        httpPost("http://Server_IP/U1F92A/create_message/", new_msg.innerHTML)
        lastConv[Object.keys(lastConv).length + 1] = new_msg.innerHTML
>>>>>>> 55d2e2b30f94bf432e6dd5ea1823998c0a3ed940
    }
    document.getElementById("mainbox").scrollTop = document.getElementById("mainbox").scrollHeight;
    msg = []
    if (document.getElementById("preview"))
        document.getElementById("preview").innerHTML = null

}

var lastConv = null

function updateMessages() {
    console.log("updating")
<<<<<<< HEAD
    var conv = JSON.parse(httpGet('http://79.179.68.55:8000/U1F92A/get_conversation/?user_id=' + myId + '&friend_id=' + friendId))
    if(Object.keys(lastConv).length != Object.keys(conv).length && lastConv != null){
=======
    var conv = JSON.parse(httpGet('http://Server_IP/U1F92A/get_conversation/?user_id=' + myId + '&friend_id=' + friendId))
    if (Object.keys(lastConv).length != Object.keys(conv).length && lastConv != null) {
>>>>>>> 55d2e2b30f94bf432e6dd5ea1823998c0a3ed940
        manageJson(conv)
    }
    lastConv = conv
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

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function manageJson(msg = null) {
    console.log("called")
<<<<<<< HEAD
    if(msg == null){
        str = JSON.parse(httpGet('http://79.179.68.55:8000/U1F92A/get_conversation/?user_id=' + myId +  '&friend_id=' + friendId))
=======
    if (msg == null) {
        str = JSON.parse(httpGet('http://Server_IP/U1F92A/get_conversation/?user_id=' + myId + '&friend_id=' + friendId))
>>>>>>> 55d2e2b30f94bf432e6dd5ea1823998c0a3ed940
        lastConv = str
    } else
        str = msg
    console.log(str)
    console.log(lastMessege)
    for (var key in str) {
        new_msg = str[key]["content_text"]
        sender = str[key]["sender"]
        console.log("the sender is" + sender)
        if (sender == myId)
            peep = "message user-m"
        else
            peep = "message client-m"
        SendEmoji(peep, new_msg, false)

    }
    lastMessege = key
    console.log(lastMessege)
}

function setImg() {
    var photo = {
        "participent": {
            "userImg": "../images/user.jpg",
            "friendImg": "../images/friend.jpeg"
        },
        "messages": {
            "1": {
                "text": "🕡🕡🕡",
                "sender": "1"
            },
            "2": {
                "text": "🕡🕡🕡",
                "sender": "2"
            },
            "3": {
                "text": "🕡🕡🕡",
                "sender": "2"
            },
            "4": {
                "text": "🕡🕡🕡",
                "sender": "1"
            }
        }
    };
    document.getElementById("user").src = photo["participent"]["userImg"]
    document.getElementById("friend").src = photo["participent"]["friendImg"]
    //         fetch("./conversietion_demo.json").then(
    //         function(json){
    //             console.log("hi",json)
    //         }); 
}

<<<<<<< HEAD
function BuildKeyBoard()
{
    emojiList = ['21A9', '21AA', '2328', '23E9', '23F3', '24C2', '25B6', '25FB', '25FE', '260E', '2614', '2615', '261D', '2622', '2623', '262A', '2638', '263A', '2642', '265F', '2660', '2665', '2666', '267B', '2692', '2697', '269B', '269C', '26AA', '26AB', '26BD', '26BE', '26C8', '26CF', '26D3', '26D4', '26F0', '26F5', '26FD', '2705', '270A', '270B', '270F', '2714', '271D', '2728', '2744', '274C', '2753', '2755', '2763', '2764', '27A1', '27BF', '2B05', '2B07', '2B50', '3030', '3297', '1F004', '1F170', '1F171', '1F17F', '1F191', '1F19A', '1F201', '1F202', '1F22F', '1F250', '1F251', '1F321', '1F32D', '1F32F', '1F336', '1F37D', '1F380', '1F393', '1F399', '1F39B', '1F3A0', '1F3C4', '1F3C6', '1F3CA', '1F3CF', '1F3D3', '1F3E0', '1F3F0', '1F3F7', '1F400', '1F43E', '1F440', '1F442', '1F4F7', '1F4F9', '1F4FC', '1F4FF', '1F549', '1F54A', '1F550', '1F567', '1F573', '1F579', '1F587', '1F590', '1F5A4', '1F5A8', '1F5BC', '1F5D1', '1F5D3', '1F5E1', '1F5E8', '1F5F3', '1F5FB', '1F5FF', '1F601', '1F610', '1F612', '1F614', '1F616', '1F618', '1F61A', '1F61C', '1F61E', '1F620', '1F625', '1F628', '1F62B', '1F62D', '1F630', '1F633', '1F635', '1F640', '1F643', '1F644', '1F680', '1F6C5', '1F6D0', '1F6E0', '1F6E5', '1F6EB', '1F6EC', '1F6F3', '1F6F7', '1F6F8', '1F910', '1F918', '1F91F', '1F928', '1F92F', '1F931', '1F932', '1F93C', '1F93E', '1F947', '1F94B', '1F94D', '1F94F', '1F95F', '1F96B', '1F973', '1F976', '1F97C', '1F97F', '1F985', '1F991', '1F998', '1F9A2', '1F9C0', '1F9D0', '1F9E6', '231A', '231B', '23F0', '25FD', '25FE', '2648', '2653', '2693', '26AA', '26AB', '26C4', '26C5', '26D4', '26F2', '26F3', '26FA', '2705', '2728', '274E', '2757', '27B0', '2B1B', '2B1C', '2B55', '1F0CF', '1F191', '1F19A', '1F201', '1F22F', '1F238', '1F23A', '1F300', '1F320', '1F330', '1F335', '1F37E', '1F37F', '1F3A0', '1F3C4', '1F3C6', '1F3CA', '1F3E0', '1F3F0', '1F3F8', '1F3FF', '1F440', '1F4F8', '1F4FF', '1F54B', '1F54E', '1F57A', '1F5A4', '1F600', '1F611', '1F615', '1F617', '1F619', '1F61B', '1F61F', '1F626', '1F627', '1F62C', '1F62E', '1F62F', '1F634', '1F641', '1F642', '1F645', '1F64F', '1F6CC', '1F6D1', '1F6D2', '1F6F4', '1F6F6', '1F6F9', '1F919', '1F91E', '1F920', '1F927', '1F930', '1F933', '1F93A', '1F940', '1F945', '1F94C', '1F950', '1F95E', '1F96C', '1F970', '1F97A', '1F980', '1F984', '1F992', '1F997', '1F9B0', '1F9B9', '1F9C1', '1F9C2', '1F9E7', '1F9FF', '261D', '270A', '270B', '1F385', '1F3C7', '1F3CB', '1F3CC', '1F446', '1F450', '1F46E', '1F47C', '1F485', '1F487', '1F574', '1F575', '1F590', '1F645', '1F647', '1F6A3', '1F6C0', '1F918', '1F91E', '1F926', '1F931', '1F932', '1F93D', '1F93E', '1F9B8', '1F9B9', '0023', '0030', '0039', '20E3', '1F1E6', '1F1FF', '1F9B0', '1F9B3', '00A9', '203C', '2122', '2194', '2199', '231A', '231B', '2388', '23E9', '23F3', '24C2', '25B6', '25FB', '25FE', '2607', '2612', '2616', '2617', '2619', '2670', '2671', '267E', '267F', '2690', '2691', '269D', '26A0', '26A1', '26B2', '26BD', '26BF', '26C4', '26CD', '26CF', '26E1', '26E3', '26E8', '26FF', '2701', '2704', '2708', '2709', '270C', '2712', '2716', '2721', '2733', '2734', '2747', '274E', '2757', '2795', '2797', '27B0', '2934', '2935', '2B1B', '2B1C', '2B55', '303D', '3299', '1F02C', '1F02F', '1F094', '1F09F', '1F0AF', '1F0B0', '1F0BF', '1F0C1', '1F0CF', '1F0D1', '1F0DF', '1F0F6', '1F0FF', '1F12F', '1F170', '1F171', '1F17F', '1F191', '1F19A', '1F201', '1F202', '1F21A', '1F232', '1F23A', '1F249', '1F24F', '1F252', '1F25F', '1F266', '1F2FF', '1F321', '1F32C', '1F330', '1F335', '1F337', '1F37C', '1F37E', '1F37F', '1F394', '1F39F', '1F3C5', '1F3CB', '1F3CE', '1F3D4', '1F3DF', '1F3F1', '1F3F7', '1F400', '1F43E', '1F440', '1F442', '1F4F7', '1F4F9', '1F4FC', '1F4FF', '1F546', '1F54A', '1F550', '1F567', '1F57A', '1F5A4', '1F5FB', '1F5FF', '1F601', '1F610', '1F612', '1F614', '1F616', '1F618', '1F61A', '1F61C', '1F61E', '1F620', '1F625', '1F628', '1F62B', '1F62D', '1F630', '1F633', '1F635', '1F640', '1F643', '1F644', '1F680', '1F6C5', '1F6D0', '1F6D3', '1F6D4', '1F6E0', '1F6EC', '1F6F0', '1F6F3', '1F6F7', '1F6F8', '1F6FA', '1F6FF', '1F7D5', '1F7D8', '1F80C', '1F80F', '1F85A', '1F85F', '1F8AE', '1F8FF', '1F910', '1F918', '1F91F', '1F928', '1F92F', '1F931', '1F932', '1F93C', '1F93E', '1F940', '1F945', '1F94C', '1F950', '1F95E', '1F96C', '1F970', '1F973', '1F976', '1F97A', '1F97C', '1F97F', '1F985', '1F991', '1F998', '1F9A2', '1F9B0', '1F9B9', '1F9C0', '1F9C3', '1F9CF', '1F9E7', '1F9FF', '1FA60', '1FA6D',"","","",""]
=======
function BuildKeyBoard() {
    emojiList = ['231B ', '23EA ', '23EC ', '23F0 ', '25FD ', '2615 ', '2649 ', '264B ', '264D ', '264F ', '2651 ', '2653 ', '26AA ', '26BD ', '26C4 ', '26F2 ', '26FD ', '2705 ', '270B ', '274C ', '2753 ', '2755 ', '2795 ', '2797 ', '27B0 ', '2B1C ', '2B55 ', '1F0CF ', '1F191 ', '1F193 ', '1F195 ', '1F197 ', '1F199 ', '1F201 ', '1F21A ', '1F232 ', '1F234 ', '1F236 ', '1F238 ', '1F23A ', '1F251 ', '1F301 ', '1F303 ', '1F305 ', '1F307 ', '1F309 ', '1F30B ', '1F30D ', '1F30F ', '1F311 ', '1F313 ', '1F315 ', '1F317 ', '1F319 ', '1F31B ', '1F31D ', '1F31F ', '1F32D ', '1F32F ', '1F331 ', '1F333 ', '1F335 ', '1F337 ', '1F339 ', '1F33B ', '1F33D ', '1F33F ', '1F341 ', '1F343 ', '1F345 ', '1F347 ', '1F349 ', '1F34B ', '1F34D ', '1F34F ', '1F351 ', '1F353 ', '1F355 ', '1F357 ', '1F359 ', '1F35B ', '1F35D ', '1F35F ', '1F361 ', '1F363 ', '1F365 ', '1F367 ', '1F369 ', '1F36B ', '1F36D ', '1F36F ', '1F371 ', '1F373 ', '1F375 ', '1F377 ', '1F379 ', '1F37B ', '1F37F ', '1F381 ', '1F383 ', '1F385 ', '1F387 ', '1F389 ', '1F38B ', '1F38D ', '1F38F ', '1F391 ', '1F393 ', '1F3A0 ', '1F3A2 ', '1F3A4 ', '1F3A6 ', '1F3A8 ', '1F3AA ', '1F3AC ', '1F3AE ', '1F3B0 ', '1F3B2 ', '1F3B4 ', '1F3B6 ', '1F3B8 ', '1F3BA ', '1F3BC ', '1F3BE ', '1F3C0 ', '1F3C2 ', '1F3C4 ', '1F3C6 ', '1F3C8 ', '1F3CA ', '1F3D0 ', '1F3D2 ', '1F3E0 ', '1F3E2 ', '1F3E4 ', '1F3E6 ', '1F3E8 ', '1F3EA ', '1F3EC ', '1F3EE ', '1F3F0 ', '1F3F4 ', '1F3F9 ', '1F3FB ', '1F3FD ', '1F3FF ', '1F401 ', '1F403 ', '1F405 ', '1F407 ', '1F409 ', '1F40B ', '1F40D ', '1F40F ', '1F411 ', '1F413 ', '1F415 ', '1F417 ', '1F419 ', '1F41B ', '1F41D ', '1F41F ', '1F421 ', '1F423 ', '1F425 ', '1F427 ', '1F429 ', '1F42B ', '1F42D ', '1F42F ', '1F431 ', '1F433 ', '1F435 ', '1F437 ', '1F439 ', '1F43B ', '1F43D ', '1F443 ', '1F445 ', '1F447 ', '1F449 ', '1F44B ', '1F44D ', '1F44F ', '1F451 ', '1F453 ', '1F455 ', '1F457 ', '1F459 ', '1F45B ', '1F45D ', '1F45F ', '1F461 ', '1F463 ', '1F465 ', '1F467 ', '1F469 ', '1F46B ', '1F46D ', '1F46F ', '1F471 ', '1F473 ', '1F475 ', '1F477 ', '1F479 ', '1F47B ', '1F47D ', '1F47F ', '1F481 ', '1F483 ', '1F485 ', '1F487 ', '1F489 ', '1F48B ', '1F48D ', '1F48F ', '1F491 ', '1F493 ', '1F495 ', '1F497 ', '1F499 ', '1F49B ', '1F49D ', '1F49F ', '1F4A1 ', '1F4A3 ', '1F4A5 ', '1F4A7 ', '1F4A9 ', '1F4AB ', '1F4AD ', '1F4AF ', '1F4B1 ', '1F4B3 ', '1F4B5 ', '1F4B7 ', '1F4B9 ', '1F4BB ', '1F4BD ', '1F4BF ', '1F4C1 ', '1F4C3 ', '1F4C5 ', '1F4C7 ', '1F4C9 ', '1F4CB ', '1F4CD ', '1F4CF ', '1F4D1 ', '1F4D3 ', '1F4D5 ', '1F4D7 ', '1F4D9 ', '1F4DB ', '1F4DD ', '1F4DF ', '1F4E1 ', '1F4E3 ', '1F4E5 ', '1F4E7 ', '1F4E9 ', '1F4EB ', '1F4ED ', '1F4EF ', '1F4F1 ', '1F4F3 ', '1F4F5 ', '1F4F7 ', '1F4F9 ', '1F4FB ', '1F500 ', '1F502 ', '1F504 ', '1F506 ', '1F508 ', '1F50A ', '1F50C ', '1F50E ', '1F510 ', '1F512 ', '1F514 ', '1F516 ', '1F518 ', '1F51A ', '1F51C ', '1F51E ', '1F520 ', '1F522 ', '1F524 ', '1F526 ', '1F528 ', '1F52A ', '1F52C ', '1F52E ', '1F530 ', '1F532 ', '1F534 ', '1F536 ', '1F538 ', '1F53A ', '1F53C ', '1F54B ', '1F54D ', '1F550 ', '1F552 ', '1F554 ', '1F556 ', '1F558 ', '1F55A ', '1F55C ', '1F55E ', '1F560 ', '1F562 ', '1F564 ', '1F566 ', '1F596 ', '1F5FB ', '1F5FD ', '1F5FF ', '1F601 ', '1F603 ', '1F605 ', '1F607 ', '1F609 ', '1F60B ', '1F60D ', '1F60F ', '1F611 ', '1F613 ', '1F615 ', '1F617 ', '1F619 ', '1F61B ', '1F61D ', '1F61F ', '1F621 ', '1F623 ', '1F625 ', '1F627 ', '1F629 ', '1F62B ', '1F62D ', '1F62F ', '1F631 ', '1F633 ', '1F635 ', '1F637 ', '1F639 ', '1F63B ', '1F63D ', '1F63F ', '1F641 ', '1F643 ', '1F645 ', '1F647 ', '1F649 ', '1F64B ', '1F64D ', '1F64F ', '1F681 ', '1F683 ', '1F685 ', '1F687 ', '1F689 ', '1F68B ', '1F68D ', '1F68F ', '1F691 ', '1F693 ', '1F695 ', '1F697 ', '1F699 ', '1F69B ', '1F69D ', '1F69F ', '1F6A1 ', '1F6A3 ', '1F6A5 ', '1F6A7 ', '1F6A9 ', '1F6AB ', '1F6AD ', '1F6AF ', '1F6B1 ', '1F6B3 ', '1F6B5 ', '1F6B7 ', '1F6B9 ', '1F6BB ', '1F6BD ', '1F6BF ', '1F6C1 ', '1F6C3 ', '1F6C5 ', '1F6CC ', '1F6D0 ', '1F6EB ', '1F910 ', '1F912 ', '1F914 ', '1F916 ', '1F918 ', '1F981 ', '1F983 ', '1F9C0 ', '', '', '', '', '']
>>>>>>> 55d2e2b30f94bf432e6dd5ea1823998c0a3ed940
    console.log(emojiList.length)
    var counter = 0
    var keyBoard = document.getElementById("tchat")
    var Row, Content;
    var Col;
    for (var row in Array.from(Array(emojiList.length / 10).keys())) {
        Row = document.createElement("tr")
        for (var col in Array.from(Array(10).keys())) {
            Col = document.createElement("th")
            Content = document.createElement("BUTTON")
            Content.id = "button" + counter
            Content.type = "button"
            Content.className = "button"
            Content.innerHTML = "&#x" + emojiList[counter];
            Content.onclick = function () {
                PrintEmoji(this.getAttribute('id'));
            };
            counter += 1;
            Col.appendChild(Content)
            Row.appendChild(Col)
            keyBoard.appendChild(Row)
        }
    }
}

function setFlag() {
    clicked = true
}

function SetQuitAlart() {
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "nananana";
        console.log(clicked)
        if (clicked == false) {
            (e || window.event).returnValue = confirmationMessage;
        }
        clicked = false
        //Gecko + IE
        console.log(confirmationMessage) //Webkit, Safari, Chrome
    });
}