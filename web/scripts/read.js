const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       const rawData=xhttp.responseText
       var data=[JSON.parse(rawData)]
       generateWebPage(data)
     }
};
xhttp.open("GET","dstore.json",true)
xhttp.send()


function generateWebPage(data){
  let output = ""
  //stop the operation of creating form if no data is stored

  let size = data[0][0]['size'];
  //form will be created here
  for(let i = 0;i< data[0][0]['size'];i++)
  {
    let inputs='<input type="text" id="sitename'+i+'" class="textbox" disabled>'
    let inputl='<input type="text" id="loginid'+i+'" class="textbox" disabled>'
    let inputp='<input type="text" id="password'+i+'" class="textbox" disabled>'
    let inputButton='<input type="button" class="dbutton" value="Edit" onclick="edit('+i+')">'
    output += "<div class=default>Sitename : "+inputs+"<br>Login Id : "+
    inputl+"<br>Password : "+inputp+"<br>"+inputButton+"</div>"
  }
  document.getElementById('bd').innerHTML=output
  //values will be inserted in this loop
  for(i = 0; i< data[0][0]['size'];i++)
  {
    let j=i+1
    let v = data[0][j]
    document.getElementById('sitename'+i).value=v['sitename']
    document.getElementById('loginid'+i).value=v['loginid']
    document.getElementById('password'+i).value=v['password']
 }
 setSize(size)
 //delete the unencrypted data in json file
 eel.done()
}

//size variable will keep track how many login details are present in the ui
var size=0;
function setSize(s){
  size=s
  return
}

//function to show different div
function show(a)
{
  const x = document.getElementById("addnew")
  const y = document.getElementById("bd")
  const z = document.getElementById("generatepwd")
  const r = document.getElementById("edit")
  const p = document.getElementById("generatepwd1")
  //showing only addnew div
  if(a==0){
      y.style.display="none"
      x.style.display="block"
      z.style.display="none"
      r.style.display="none"
      p.style.display="none"
  }
  //showing only body div
  else if(a==1){
      y.style.display="block"
      x.style.display="none"
      z.style.display="none"
      r.style.display="none"
      p.style.display="none"
  }
  //showing only generatepwd div
  else if(a==2){
    y.style.display="none"
    x.style.display="none"
    z.style.display="block"
    r.style.display="none"
    p.style.display="none"
  }
  //showing only edit old value
  else if(a==3){
    y.style.display="none"
    x.style.display="none"
    z.style.display="none"
    r.style.display="block"
    p.style.display="none"
  }
  else if(a==4){
    y.style.display="none"
    x.style.display="none"
    z.style.display="none"
    r.style.display="none"
    p.style.display="block"
  }
}
//function generating new password for edit
function generatepwd(){
  s=document.getElementById('size').value
  c1=document.getElementById('checkbox1')
  c2=document.getElementById('checkbox2')
  c3=document.getElementById('checkbox3')
  pwdfield=document.getElementById('gepwd')
  if(s=='' || (c1.checked==false && c2.checked==false && c3.checked==false)){
    const er = document.querySelector("#error1")
    er.innerHTML = "Please select any option and also please enter size"
    setTimeout(() => er.innerHTML="" ,3500)
  }
  else{
    let value=0
    if(c1.checked==true){
      value=value+1
    }
    if(c2.checked==true){
      value=value+2
    }
    if(c3.checked==true){
      value=value+4
    }
    eel.gen(s,value)(function(ret){pwdfield.value=ret})
  }
}
//function copying password from generatepwd to edit div
function subm() {
  const pwdfield=document.getElementById('gepwd')
  const fill=document.getElementById('editpassword')
  fill.value=pwdfield.value
  show(3)
}
//function generating password for addnew
function generatepwd1(){
  s=document.getElementById('size1').value
  c1=document.getElementById('checkbox11')
  c2=document.getElementById('checkbox21')
  c3=document.getElementById('checkbox31')
  pwdfield=document.getElementById('gepwd1')
  if(s=='' || (c1.checked==false && c2.checked==false && c3.checked==false)){
    const er = document.querySelector("#error1")
    er.innerHTML = "Please select any option and also please enter size"
    setTimeout(() => er.innerHTML="" ,3500)
  }
  else{
    let value=0
    if(c1.checked==true){
      value=value+1
    }
    if(c2.checked==true){
      value=value+2
    }
    if(c3.checked==true){
      value=value+4
    }
    eel.gen(s,value)(function(ret){pwdfield.value=ret})
  }
}
//function copying password from generatepwd to edit div
function subm1(){
  const pwdfield=document.getElementById('gepwd1')
  const fill=document.getElementById('addpassword')
  fill.value=pwdfield.value
  show(0)
}

//function sending new details to python script
function addnew() {
    const site=document.getElementById('addsitename')
    const loginid=document.getElementById('addloginid')
    const pwd=document.getElementById('addpassword')

    if(site.value.trim()=="" || loginid.value.trim()=="" || pwd.value.trim()==""){
      const er = document.querySelector("#error2")
      er.innerHTML = "Please enter data in all fields"
      setTimeout(() => er.innerHTML="" ,3500)
    }

    else{
      ssid=JSON.parse(window.sessionStorage.getItem('details'))
      sid = ssid['ssid']
      eel.addvalue(sid,site.value,loginid.value,pwd.value,0,-1)(disp)
      }
  }

//to add new value to the bd div
function disp(msg){
  if(msg=="success"){
    const site=document.getElementById('addsitename')
    console.log(site.value);
    const loginid=document.getElementById('addloginid')
    const pwd=document.getElementById('addpassword')
    let output = ""
    let i=size
    //generating dynamic webpage to show user on ui
    let inputs='<input type="text" id="sitename'+i+'" class="textbox" disabled>'
    let inputl='<input type="text" id="loginid'+i+'" class="textbox" disabled>'
    let inputp='<input type="text" id="password'+i+'" class="textbox" disabled>'
    let inputButton='<input type="button" class="dbutton" value="Edit" onclick="edit('+i+')">'


    output += "<div class=default>Sitename : "+inputs+"<br>Login Id : "+
    inputl+"<br>Password : "+inputp+"<br>"+inputButton+"</div>"

    document.getElementById('bd').insertAdjacentHTML('beforeend',output)

    document.getElementById('sitename'+i).value=site.value
    document.getElementById('loginid'+i).value=loginid.value
    document.getElementById('password'+i).value=pwd.value

    size=size+1
    show(1)
  }
  else{
    const er = document.querySelector("#error2")
    er.innerHTML = msg
    setTimeout(() => er.innerHTML="" ,3500)
  }
}
var pos
//this function shows the details to be edited
function edit(a){
  const site=document.getElementById('sitename'+a)
  const loginid=document.getElementById('loginid'+a)
  const pwd=document.getElementById('password'+a)
  const esite=document.getElementById('editsitename')
  const eloginid=document.getElementById('editloginid')
  const epwd=document.getElementById('editpassword')
  esite.value=site.value
  eloginid.value=loginid.value
  epwd.value=pwd.value
  pos=a+1
  show(3)
}

//this function takes updated detail and send back to python api
function modify(){
  const site=document.getElementById('editsitename')
  const loginid=document.getElementById('editloginid')
  const pwd=document.getElementById('editpassword')
  if(site.value.trim()=="" || loginid.value.trim()=="" || pwd.value.trim()==""){
    const er = document.querySelector("#error3")
    er.innerHTML = "Please enter data in all fields"
    setTimeout(() => er.innerHTML="" ,3500)
  }

  else{
    ssid=JSON.parse(window.sessionStorage.getItem('details'))
    sid = ssid['ssid']
    eel.addvalue(sid,site.value,loginid.value,pwd.value,1,pos)(disp1)
    }    
}

//this function updates newly modified details in ui
function disp1(msg) {
  if(msg=="success"){
    show(1)
    const site=document.getElementById('editsitename')
    const loginid=document.getElementById('editloginid')
    const pwd=document.getElementById('editpassword')
    let i=pos-1
    document.getElementById('sitename'+i).value=site.value
    document.getElementById('loginid'+i).value=loginid.value
    document.getElementById('password'+i).value=pwd.value
  }
  else{
    //console.log(msg)
    const er = document.querySelector("#error3")
    er.innerHTML = msg
    setTimeout(() => er.innerHTML="" ,3500)
  }
}
