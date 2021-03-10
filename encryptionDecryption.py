#this scripts returns encrypted and decrypted data 
#also generates and store salt if not generated
import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class encryptdecrypt:
	
	#key generates when class object is created
	def __init__(self,pwd):
		s_file="sfile" #file where salt will be stored
		
		#checking if salt file exists or not
		if(not(os.path.exists(s_file))):
			with open(s_file, "wb") as file:
				#generating a random salt of 32 bytes in first initiazion of the program and stores it
				ss=os.urandom(32)
				file.write(ss)
			
		else:
			with open(s_file, "rb") as file:	
				#loading salt from the file		
				ss=file.read()
									

		#creates a object kdf which derives the key from password
		kdf = PBKDF2HMAC(
				    algorithm=hashes.SHA256(),
				    length=32,
				    salt=ss, 
				    iterations=100000,
				    backend=default_backend()
				    )
				
		password=pwd.encode()
		key=base64.urlsafe_b64encode(kdf.derive(password))
		self.fe=Fernet(key)

	

	#encrypting data and returning it in decoded
	def enc(self,dText):
		dt=dText.encode()
		eData=self.fe.encrypt(dt) #the data is being encrypted
		eData=eData.decode()
		return eData 

	#data is being decrypted and returned in decoded form
	def dec(self,eText):
		et=eText.encode()
		dData=self.fe.decrypt(et) #data is being decrypted
		dData=dData.decode()
		return dData
