var msg = []
var lastMessege = null
function DeleteEmoji(){
    preview_box = document.getElementById("preview")
    if(preview_box.innerHTML){
        msg.splice(-1,1)
        preview_box.innerHTML = msg.join("")
    }
}
function PrintEmoji(param) {

    preview_box = document.getElementById("preview")
    preview_box.innerHTML += document.getElementById(param).innerHTML
    msg.push(document.getElementById(param).innerHTML)
}
function SendEmoji(classs, source=msg) {
    if (msg.length == 0 && source == msg) {
        return null
    }
    var new_msg = document.createElement("DIV")
    new_msg.className = classs
    if (source.constructor == Array)
       new_msg.innerHTML = source.join("")
    else
       new_msg.innerHTML = source
    document.getElementById("mainbox").appendChild(new_msg)
    document.getElementById("mainbox").scrollTop = document.getElementById("mainbox").scrollHeight;
    msg = []
    if (document.getElementById("preview"))
        document.getElementById("preview").innerHTML = null

}
function extractInital(str) {

}

function manageJson() {
    var str = {
            "messages": {
                "1": {
                    "text": "🕡🕡🕡",
                    "sender": "1",
                    "message_id": "123456"
                },
                "2": {
                    "text": "🕡🕡🕡",
                    "sender": "2",
                    "message_id": "1234567"
                },
                "3": {
                    "text": "🕡🕡🕡",
                    "sender": "2",
                    "message_id": "12345698"
                },
                "4": {
                    "text": "🕡🕡🕡",
                    "sender": "1",
                    "message_id": "1234561212"
                }
            }
        
    };

    if (lastMessege == null) {
        var peep = "message client-m"
        var key2keep = null
        var started = false
            for(var key in str["messages"]){
                id = str["messages"][key]["message_id"]
                if (lastMessege == id || lastMessege == null){
                    key2keep = key
                    console.log(key)
                    break
                }
            }
            for (var key in str["messages"]) {
                console.log(key)
                if (key == key2keep || started){
                started = true
                new_msg = str["messages"][key]["text"]
                sender = str["messages"][key]["sender"]
                console.log("the sender is" + sender)
                id = str["messages"][key]["message_id"]
                //if(last_massge == id)
                if (sender == 2)
                peep = "message user-m"
                else
                peep  = "message client-m"
                SendEmoji(peep, new_msg)
                lastMessege = id 

                
                
        }
                             
    }
}
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