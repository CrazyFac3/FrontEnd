var friendId = null;
var myId=null
var lst = []
var counter= 0;
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
function main(){
    get_friends()
    console.log(counter + "ADasdad")
    var hours_size = 
    {
        0 : '10vh',
        1 :'10vh',
        2 : '11vh',
        3 : '11vh',
        4 : '12vh',
        5 : '12vh',
        6 : '13vh',
        7 : '13vh', 
        8 : '14vh', 
        9 : '14vh', 
        10 : '15vh', 
        11 : '15vh', 
        12 : '16vh', 
        13 : '16vh', 
        14 : '17vh', 
        15 : '17vh', 
        16 : '18vh', 
        17 : '18vh', 
        18 : '19vh', 
        19 : '19vh', 
        20 : '20vh', 
        21 : '20vh', 
        22 : '21vh', 
        23 : '21vh', 
    }
    
    document.getElementById("person1").src=photo["photo"]["friendImg1"];
    document.getElementById("person2").src=photo["photo"]["friendImg2"];
    document.getElementById("person3").src=photo["photo"]["friendImg3"];
    document.getElementById("person4").src=photo["photo"]["friendImg4"];
    document.getElementById("person5").src=photo["photo"]["friendImg5"];

    var sign_in_hour = []
    sign_in_hour[0] = photo["time_created"]["time1"].split(" ");
    sign_in_hour[1] = photo["time_created"]["time2"].split(" ");
    sign_in_hour[2] = photo["time_created"]["time3"].split(" ");
    sign_in_hour[3] = photo["time_created"]["time4"].split(" ");
    sign_in_hour[4] = photo["time_created"]["time5"].split(" ");

    sign_in_hour[0] = sign_in_hour[0].toString().split(":");
    sign_in_hour[1] = sign_in_hour[1].toString().split(":");
    sign_in_hour[2] = sign_in_hour[2].toString().split(":");
    sign_in_hour[3] = sign_in_hour[3].toString().split(":");
    sign_in_hour[4] = sign_in_hour[4].toString().split(":");

    var current_hour = new Date().getHours();
    for (var i=0; i < sign_in_hour.length; i++)
    {
        temp_hour = current_hour - sign_in_hour[i]
        var x = i + 1
        console.log("person" + x)
        document.getElementById("person" + x).setAttribute("style", "height: " + hours_size[temp_hour] + "; width: " + hours_size[temp_hour]); 
    }
    setTimeout(function(){console.log(photo["photo"]["friendImg1"]); assign_photo()},200)
}
class IntervalArray{
    constructor(id1){
        var id = null;
        this.id = id1;
        this.friend = null
        
      
    }
    set idF(a){
        this.friend = a
    }
    get idFa(){
        return this.friend
    }
    executeInterval() {
        var self = this;
        self.inter = setInterval(function(){friendId= JSON.parse(httpGet("http://79.179.68.55:8000/U1F92A/user/random?user_pk=" + myId)); if(friendId != 0){console.log(self.id); assign_id(self.id)}},200)
    }
    
}
function get_friends()
{
    myId = localStorage.getItem("myId")
    console.log(myId)
    //var details = JSON.parse(httpPost("http://79.179.68.55:8000/U1F92A/user/register/",null,{"photo": 1111}))
   // myId = details["user_pk"]
   // localStorage.setItem("myId",myId)
    for(var i=0; i<5; i++){
        lst.push(new IntervalArray(i))
    }
    console.log(lst)
    console.log(lst[0].id)
    for(i=0; i<5; i++){
       lst[i].executeInterval()
    }
    console.log(photo)
}


function assign_id(i)
{
    clearInterval(lst[i].inter)
    i = i + 1
    counter += 1;
    console.log(friendId["photo"] + "this is the pk")
    photo["photo"]["friendImg" + i] = friendId["photo"];
    photo["time_created"]["time" + i] = friendId["time_created"];
    lst[i-1].idF = friendId["pk"];
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
function assign_photo(){
    for(var i = 1; i<6; i++){
        console.log(photo["photo"]["friendImg1"])
        var pk = photo["photo"]["friendImg"+ i]
        request(pk,i)
    }
}
const request = async (pk,sNum) => {
    const response1 =  fetch('http://79.179.68.55:8000/U1F92A/get_photo_json/' + pk).then(response => {
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
        .then(url =>  {var xx = JSON.parse(httpGet(url))["base64"]; document.getElementById("person" + sNum).setAttribute("style","background: url(" + xx + "); height: 15vh; width: 15vh; ")})
        .catch(err => console.error(err));
}

function storeFriendId(i){
    localStorage.setItem("friendId",lst[i-1].idFa)
}