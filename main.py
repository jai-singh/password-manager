import encryptionDecryption
import randomStringGenerator
import eel
import json
import os

eel.init('web')

#this function will add new users it accepts username and password
@eel.expose
def addnew(username, password):
	data = {}
	#random data is generated which would be used for authentication of user in future
	rData = gen(30,7)
	obj = encryptionDecryption.encryptdecrypt(password)
	#encrypting the random data
	erData = obj.enc(rData)
	data[username] = {}
	data[username]['0'] = {'rData':erData}
	#checking if there is some data has already been stored in the file
	if(os.path.exists("storage.json")):
		if (os.stat("storage.json").st_size == 0):
			with open("storage.json", "w") as file:
				json.dump(data,file)
				return("success")
		else:
			with open("storage.json", "r+") as file:
				#loads data that has already been stored in the dictionary
				sdata = json.load(file)
				#check if user with this name already exist as every new user will have some random data
				try:
					if(len(sdata[username])!=0):
						return("User already exists")
				
				#adds new data in the dictionary
				except KeyError:
						sdata.update(data)
						file.seek(0)
						file.truncate(0)
						json.dump(sdata, file)
						return("success")
					
	else:
		with open("storage.json", "w") as file:
				json.dump(data,file)
				return("success")


#this will verify login details and pass stored values
@eel.expose
def login(username,password):

	#checking if there is storag file or not
	if(os.path.exists("storage.json")):
		if(os.stat("storage.json").st_size == 0):
			return("No profile has been created yet",'')

		else:
			with open("storage.json","r+") as file:
				sdata=json.load(file)

				try:
					#loads encrypted random data for authentication
					erData = sdata[username]['0']['rData']										
					obj = encryptionDecryption.encryptdecrypt(password)
					#decrypting random data if it wont happen it will throw a exception
					rData = obj.dec(erData)					
				except:					
					return("Username or Password entered is incorrect",'')

				#counts total no of loginid and password stored for the username
				#subtracting 1 because random data is stored automatically when user creates profile 
				tno=len(sdata[username])-1

				#creating a dictionary so decrypted data can be stored into it
				decryptdict={}
				decryptdict[0]={}
				decryptdict[0]['size']=tno
				for i in range(1,tno+1):
					decryptdict[str(i)]={}
					esitename=sdata[username][str(i)]['sitename']
					eloginid=sdata[username][str(i)]['loginid']
					epassword=sdata[username][str(i)]['password']
					decryptdict[str(i)]['sitename']=obj.dec(esitename)
					decryptdict[str(i)]['loginid']=obj.dec(eloginid)					
					decryptdict[str(i)]['password']=obj.dec(epassword)

				#encrypting password and username with random text and storing in json file and sending the 
				#random text for future verification
				with open("temp.json","w") as file:
					file.truncate(0)
					file.seek(0)
					sid = gen(32,7)
					newdict = {}
					obj1 = encryptionDecryption.encryptdecrypt(sid)
					enusername = obj1.enc(username)
					enpassword = obj1.enc(password)
					newdict['enuser'] = enusername  
					newdict['enpass'] = enpassword
					json.dump(newdict,file)  
					
				with open("web/dstore.json","w+") as file:
					file.truncate(0)
					file.seek(0)
					json.dump(decryptdict,file)

			return("success",sid)
	else:
		return("No profile has been created yet",'')

	return("Something did not work",'')

#this funtion will add new data to storage or modify stored data
@eel.expose
def addvalue(sid,sitename,loginid,pwd,flag,position=-1):
	#sid will be used to decrypt details of already logged in user
	#flag variable will tell to add data or modify data (0 to add, 1 to modify value)
	#position variable stores value where the data has to be modified default -1
	flag=int(flag)

	with open("temp.json","r+") as file:
		information = json.load(file)
		obj = encryptionDecryption.encryptdecrypt(sid)
		enusername = information['enuser']
		enpassword = information['enpass']
		try:
			username = obj.dec(enusername)
			password = obj.dec(enpassword)
		except: 
			return("Your sid is wrong please reopen app and relogin it")
	
	if(flag == 0):
		obj2 = encryptionDecryption.encryptdecrypt(password)		
		esitename = obj2.enc(sitename)
		eloginid = obj2.enc(loginid)
		epwd = obj2.enc(pwd)
		ndata = {'sitename':esitename,'loginid':eloginid,"password":epwd}
		with open("storage.json","r+") as file:
			sdata = json.load(file)
			size = len(sdata[username])
			sdata[username][str(size)] = {}
			sdata[username][str(size)].update(ndata)
			file.seek(0)
			file.truncate(0)
			json.dump(sdata,file)
			return("success")

	elif(flag==1):
		position = int(position)
		obj2 = encryptionDecryption.encryptdecrypt(password)
		esitename = obj2.enc(sitename)
		eloginid = obj2.enc(loginid)
		epwd = obj2.enc(pwd)
		with open("storage.json","r+") as file:
			sdata = json.load(file)
			sdata[username][str(position)]['sitename']=esitename
			sdata[username][str(position)]['loginid']=eloginid
			sdata[username][str(position)]['password']=epwd
			file.seek(0)
			file.truncate(0)
			json.dump(sdata,file)
			return ("success")

#function which generate random text according to requirement
@eel.expose
def gen(size,category):
	size=int(size)
	category=int(category)
	obj = randomStringGenerator.ge(size,category)
	rText = obj.generator()
	return(rText)

#when ui renders the unencrypted data store in json file it initiate to delete the json file
@eel.expose
def done():
	os.remove('web/dstore.json')	
	return


eel.start(
	'main.html', 
	size=(700,666), 
	# close_callback=close_callback,
	cmdline_args=['--incognito']
)