//dynamic generation of layout
function show(a) {
  const crbox = document.getElementById("crbox")
  const lbox = document.getElementById("lbox")
  const element1 = document.getElementById("message1")
  const element2 = document.getElementById("message2")
  //create div show
  if(a==0) {
    crbox.style.display='block'
    lbox.style.display='none'
    element1.style.display='none'
    element2.style.display='none'
  }
  //login box show
  else if(a==1) {
    crbox.style.display='none'
    lbox.style.display='block'
    element1.style.display='none'
    element2.style.display='none'
  }
  //message1 div show
  else if(a==2) {
    crbox.style.display='none'
    lbox.style.display='none'
    element1.style.display='block'
    element2.style.display='none'
  }
  //message2 div show
  else if(a==3){
    crbox.style.display='none'
    lbox.style.display='none'
    element1.style.display='none'
    element2.style.display='block'
  }
}

let userid=""
let passwo=""

//login function
function submitDetails() {
  let username = document.getElementById("user1").value
  let password = document.getElementById("pass1").value
  if(username.trim() == "" || password.trim() == ""){
    const er = document.querySelector("#error1")
    er.innerHTML = "Please Enter all Fields"
    setTimeout(() => er.innerHTML="" ,3500)
  }
  else{
      userid=username
      passwo=password
      eel.login(username,password)(disp) //passed username and password and 
  }                                      //disp function gets the response
}

//action performed as reponse given from python script
function disp() {
  if(arguments[0][0]=="success"){
    //storing data for future use
    const person = {
      ssid: arguments[0][1]
    }
    //storing user information for future use
    window.sessionStorage.setItem('details', JSON.stringify(person))
    location.replace("login.html")
  } else {
    let msg = document.getElementById("msg1")
    msg.innerHTML = arguments[0][0]
    show(2)
  }
}
//create account function
function createAccount() {
  let username = document.getElementById("user2").value
  let password = document.getElementById("pass2").value
  let pass2 = document.getElementById('repass').value
  if (username.trim() == "" || password.trim()== "" || pass2.trim() == "") {
    const er = document.querySelector("#error2")
    er.innerHTML = "Please Enter all Fields"
    setTimeout(() => er.innerHTML="" ,3500)
  } else if(password!=pass2) {
    const er = document.querySelector("#error2")
    er.innerHTML = "Password and Retype Password Should be same"
    setTimeout(() => er.innerHTML="" ,3500)
  } else {
    eel.addnew(username,password)(disp1)
  }
}
//display success or failure according to response of create account function in python
function disp1(verify) {
  if(verify=="success") {
    const er = document.querySelector("#error2")
    er.style.color="green"
    er.innerHTML = "Account Created Successfully" + "<br>" + "You can now login with entered details"
  }
  //If there is failure in creating the account
  else {
    let msg = document.getElementById("msg2")
    msg.innerHTML = verify
    show(3)
  }
}
