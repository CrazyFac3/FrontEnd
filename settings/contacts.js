
function get_friends()
{
    var details = JSON.parse(httpPost("http://192.168.43.169:8000/U1F92A/user/register/",null,{"photo": 1111}))
    var myId = details["user_pk"]
        var j = setInterval(function(){friendId= JSON.parse(httpGet("http://192.168.43.169:8000/U1F92A/user/random?user_pk=" + myId));if(friendId != 0){assign_id(0)}},1000)
}

var photo = {
    "photo":{
        "friendImg1":"",
        "friendImg2":"",
        "friendImg3":"",
        "friendImg4":"",
        "friendImg5":""
    },
    "time_created": {
        "time1": "",
        "time2": "",
        "time3": "",
        "time4": "",
        "time5": ""
    }
};

function assign_id(i)
{
    clearInterval(j)
    photo["photo"]["friendImg" + i.toString()] = friendId["photo"];
    photo["time_created"]["time" + i.toString()] = friendId["time_created"];
    friendId = friendId["pk"];
    console.log( photo["photo"]["friendImg" + i.toString()])
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
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