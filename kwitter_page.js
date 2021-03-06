//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCdzGSj-t3RGm_q7CbUE8e0c4xlkUUGWIA",
      authDomain: "kwitter-db-a6af6.firebaseapp.com",
      databaseURL: "https://kwitter-db-a6af6-default-rtdb.firebaseio.com",
      projectId: "kwitter-db-a6af6",
      storageBucket: "kwitter-db-a6af6.appspot.com",
      messagingSenderId: "416297446375",
      appId: "1:416297446375:web:c4401e2a647f25ef99eb42"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
//console.log("Room Name -"+Room_names);
//row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names +"</div><hr>";
//document.getElementById("output").innerHTML+=row;

console.log(firebase_message_id);
console.log(message_data);
name=message_data["name"];
message=message_data["message"];
like=message_data['like'];

name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-morning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button>";

row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;


//End code
      } });  }); }
getData();


function updateLike(message_id){
      console.log("clicked on liked -"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
     name:user_name,
     message:msg,
     like:0
      });


}


function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html"
}