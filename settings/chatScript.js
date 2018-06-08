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

function closeKeyboard(){
    var btn = document.getElementById("toggleKey");
    console.log(toggled)
    var mainboxele = document.getElementById("mainbox");
    // document.getElementById("bottom_box").style.visibility = "hidden";
    var bottom_box = document.getElementById("bottom_box");
    var initial_mainbox_height = "45vh";
    if(toggled == 0){
        // removeElement("bottom_box");
        btn.innerHTML = "⬆️";        
        bottom_box.style.visibility = "hidden";
        mainboxele.style.height = "100%";
        toggled = 1;
    }
    else if(toggled == 1){
        btn.innerHTML = "⬇️";
        bottom_box.style.visibility = "visible";
        mainboxele.style.height = "45vh";
        console.log("is toggled: " + toggled)
        toggled = 0;
    }
}

function updateScroll(item_id){
    var element = document.getElementById(item_id);
    element.scrollBy(0,element.scrollHeight)
    console.log("scroll height: " + element.scrollHeight)
}

function DeleteEmoji(){
    preview_box = document.getElementById("preview")
    if(preview_box.innerText){
        if(msg[msg.length-1] == "<br />") msg.splice(-1,1)
        msg.splice(-1,1)
        preview_box.innerHTML = msg.join("")
    }
}

function PrintEmoji(param) {
    preview_box = document.getElementById("preview")
    console.log(param)
    preview_box.innerText += document.getElementById(param).innerText
    msg.push(document.getElementById(param).innerText)
    if(msg.length % 9 == 0) msg.push("<br />");
    preview_box.innerHTML = msg.join("");
    console.log("Current text in box: " + preview_box.innerText)
    updateScroll("preview_box")    
}
function SendEmoji(classs, source=msg, sendToServer=true) {
    if (msg.length == 0 && source == msg) {
        return null
    }
    var new_msg = document.createElement("DIV")
    new_msg.className = classs
    if (source.constructor == Array)
    {
       new_msg.innerHTML = source.join("");
    }
    else
       new_msg.innerHTML = source
    document.getElementById("mainbox").appendChild(new_msg)
    if(sendToServer){
        httpPost("http://Server_IP/U1F92A/create_message/", new_msg.innerHTML)
        lastConv[Object.keys(lastConv).length + 1] = new_msg.innerHTML 
    }
    document.getElementById("mainbox").scrollTop = document.getElementById("mainbox").scrollHeight;
    msg = []
    if (document.getElementById("preview"))
        document.getElementById("preview").innerHTML = null

}

var lastConv = null
function updateMessages(){
    console.log("updating")
    var conv = JSON.parse(httpGet('http://Server_IP/U1F92A/get_conversation/?user_id=' + myId + '&friend_id=' + friendId))
    if(Object.keys(lastConv).length != Object.keys(conv).length && lastConv != null){
        manageJson(conv)
    }
    lastConv = conv
}
function httpPost(theUrl, massage, json_massage= {
    "photo_pk" : myId,
    "sender_pk" : myId,
    "receiver_pk": friendId, 
    "content_text": massage
}) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false)
    xmlHttp.send(JSON.stringify(json_massage))
    return xmlHttp.responseText
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function manageJson(msg=null) {
    console.log("called")
    if(msg == null){
        str = JSON.parse(httpGet('http://Server_IP/U1F92A/get_conversation/?user_id=' + myId +  '&friend_id=' + friendId))
        lastConv = str
    }
    else
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
        peep  = "message client-m"
        SendEmoji(peep, new_msg, false)
                             
}
    lastMessege = key
    console.log(lastMessege) 
}

function setImg(){
var photo = {
    "participent":{
        "userImg":"../images/user.jpg",
        "friendImg":"../images/friend.jpeg"
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
document.getElementById("user").src=photo["participent"]["userImg"]
document.getElementById("friend").src=photo["participent"]["friendImg"]
//         fetch("./conversietion_demo.json").then(
//         function(json){
//             console.log("hi",json)
//         }); 
}

function BuildKeyBoard()
{
    emojiList = ['231B ', '23EA ', '23EC ', '23F0 ', '25FD ', '2615 ', '2649 ', '264B ', '264D ', '264F ', '2651 ', '2653 ', '26AA ', '26BD ', '26C4 ', '26F2 ', '26FD ', '2705 ', '270B ', '274C ', '2753 ', '2755 ', '2795 ', '2797 ', '27B0 ', '2B1C ', '2B55 ', '1F0CF ', '1F191 ', '1F193 ', '1F195 ', '1F197 ', '1F199 ', '1F201 ', '1F21A ', '1F232 ', '1F234 ', '1F236 ', '1F238 ', '1F23A ', '1F251 ', '1F301 ', '1F303 ', '1F305 ', '1F307 ', '1F309 ', '1F30B ', '1F30D ', '1F30F ', '1F311 ', '1F313 ', '1F315 ', '1F317 ', '1F319 ', '1F31B ', '1F31D ', '1F31F ', '1F32D ', '1F32F ', '1F331 ', '1F333 ', '1F335 ', '1F337 ', '1F339 ', '1F33B ', '1F33D ', '1F33F ', '1F341 ', '1F343 ', '1F345 ', '1F347 ', '1F349 ', '1F34B ', '1F34D ', '1F34F ', '1F351 ', '1F353 ', '1F355 ', '1F357 ', '1F359 ', '1F35B ', '1F35D ', '1F35F ', '1F361 ', '1F363 ', '1F365 ', '1F367 ', '1F369 ', '1F36B ', '1F36D ', '1F36F ', '1F371 ', '1F373 ', '1F375 ', '1F377 ', '1F379 ', '1F37B ', '1F37F ', '1F381 ', '1F383 ', '1F385 ', '1F387 ', '1F389 ', '1F38B ', '1F38D ', '1F38F ', '1F391 ', '1F393 ', '1F3A0 ', '1F3A2 ', '1F3A4 ', '1F3A6 ', '1F3A8 ', '1F3AA ', '1F3AC ', '1F3AE ', '1F3B0 ', '1F3B2 ', '1F3B4 ', '1F3B6 ', '1F3B8 ', '1F3BA ', '1F3BC ', '1F3BE ', '1F3C0 ', '1F3C2 ', '1F3C4 ', '1F3C6 ', '1F3C8 ', '1F3CA ', '1F3D0 ', '1F3D2 ', '1F3E0 ', '1F3E2 ', '1F3E4 ', '1F3E6 ', '1F3E8 ', '1F3EA ', '1F3EC ', '1F3EE ', '1F3F0 ', '1F3F4 ', '1F3F9 ', '1F3FB ', '1F3FD ', '1F3FF ', '1F401 ', '1F403 ', '1F405 ', '1F407 ', '1F409 ', '1F40B ', '1F40D ', '1F40F ', '1F411 ', '1F413 ', '1F415 ', '1F417 ', '1F419 ', '1F41B ', '1F41D ', '1F41F ', '1F421 ', '1F423 ', '1F425 ', '1F427 ', '1F429 ', '1F42B ', '1F42D ', '1F42F ', '1F431 ', '1F433 ', '1F435 ', '1F437 ', '1F439 ', '1F43B ', '1F43D ', '1F443 ', '1F445 ', '1F447 ', '1F449 ', '1F44B ', '1F44D ', '1F44F ', '1F451 ', '1F453 ', '1F455 ', '1F457 ', '1F459 ', '1F45B ', '1F45D ', '1F45F ', '1F461 ', '1F463 ', '1F465 ', '1F467 ', '1F469 ', '1F46B ', '1F46D ', '1F46F ', '1F471 ', '1F473 ', '1F475 ', '1F477 ', '1F479 ', '1F47B ', '1F47D ', '1F47F ', '1F481 ', '1F483 ', '1F485 ', '1F487 ', '1F489 ', '1F48B ', '1F48D ', '1F48F ', '1F491 ', '1F493 ', '1F495 ', '1F497 ', '1F499 ', '1F49B ', '1F49D ', '1F49F ', '1F4A1 ', '1F4A3 ', '1F4A5 ', '1F4A7 ', '1F4A9 ', '1F4AB ', '1F4AD ', '1F4AF ', '1F4B1 ', '1F4B3 ', '1F4B5 ', '1F4B7 ', '1F4B9 ', '1F4BB ', '1F4BD ', '1F4BF ', '1F4C1 ', '1F4C3 ', '1F4C5 ', '1F4C7 ', '1F4C9 ', '1F4CB ', '1F4CD ', '1F4CF ', '1F4D1 ', '1F4D3 ', '1F4D5 ', '1F4D7 ', '1F4D9 ', '1F4DB ', '1F4DD ', '1F4DF ', '1F4E1 ', '1F4E3 ', '1F4E5 ', '1F4E7 ', '1F4E9 ', '1F4EB ', '1F4ED ', '1F4EF ', '1F4F1 ', '1F4F3 ', '1F4F5 ', '1F4F7 ', '1F4F9 ', '1F4FB ', '1F500 ', '1F502 ', '1F504 ', '1F506 ', '1F508 ', '1F50A ', '1F50C ', '1F50E ', '1F510 ', '1F512 ', '1F514 ', '1F516 ', '1F518 ', '1F51A ', '1F51C ', '1F51E ', '1F520 ', '1F522 ', '1F524 ', '1F526 ', '1F528 ', '1F52A ', '1F52C ', '1F52E ', '1F530 ', '1F532 ', '1F534 ', '1F536 ', '1F538 ', '1F53A ', '1F53C ', '1F54B ', '1F54D ', '1F550 ', '1F552 ', '1F554 ', '1F556 ', '1F558 ', '1F55A ', '1F55C ', '1F55E ', '1F560 ', '1F562 ', '1F564 ', '1F566 ', '1F596 ', '1F5FB ', '1F5FD ', '1F5FF ', '1F601 ', '1F603 ', '1F605 ', '1F607 ', '1F609 ', '1F60B ', '1F60D ', '1F60F ', '1F611 ', '1F613 ', '1F615 ', '1F617 ', '1F619 ', '1F61B ', '1F61D ', '1F61F ', '1F621 ', '1F623 ', '1F625 ', '1F627 ', '1F629 ', '1F62B ', '1F62D ', '1F62F ', '1F631 ', '1F633 ', '1F635 ', '1F637 ', '1F639 ', '1F63B ', '1F63D ', '1F63F ', '1F641 ', '1F643 ', '1F645 ', '1F647 ', '1F649 ', '1F64B ', '1F64D ', '1F64F ', '1F681 ', '1F683 ', '1F685 ', '1F687 ', '1F689 ', '1F68B ', '1F68D ', '1F68F ', '1F691 ', '1F693 ', '1F695 ', '1F697 ', '1F699 ', '1F69B ', '1F69D ', '1F69F ', '1F6A1 ', '1F6A3 ', '1F6A5 ', '1F6A7 ', '1F6A9 ', '1F6AB ', '1F6AD ', '1F6AF ', '1F6B1 ', '1F6B3 ', '1F6B5 ', '1F6B7 ', '1F6B9 ', '1F6BB ', '1F6BD ', '1F6BF ', '1F6C1 ', '1F6C3 ', '1F6C5 ', '1F6CC ', '1F6D0 ', '1F6EB ', '1F910 ', '1F912 ', '1F914 ', '1F916 ', '1F918 ', '1F981 ', '1F983 ', '1F9C0 ','','','','','']
    console.log(emojiList.length)
    var counter = 0
    var keyBoard = document.getElementById("tchat")
    var Row,Content;
    var Col;
    for (var row in Array.from(Array(emojiList.length/10).keys())){
        Row = document.createElement("tr")
        for(var col in Array.from(Array(10).keys())){
            Col = document.createElement("th")
            Content = document.createElement("BUTTON")
            Content.id = "button" + counter
            Content.type = "button"
            Content.className = "button"
            Content.innerHTML = "&#x" + emojiList[counter];
            Content.onclick = function() {PrintEmoji(this.getAttribute('id'));};
             counter += 1;
             Col.appendChild(Content)
             Row.appendChild(Col)
             keyBoard.appendChild(Row)
        }
    }
}

function setFlag(){
    clicked = true
}
function SetQuitAlart()
{
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "nananana";
    console.log(clicked)
    if(clicked == false){
        (e || window.event).returnValue = confirmationMessage;
    }
    clicked = false
     //Gecko + IE
    console.log(confirmationMessage)                           //Webkit, Safari, Chrome
    });
}