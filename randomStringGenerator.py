#this scripts generates a random string according to the requirement
import string
import random

class ge:

	#sets the length and type of password to be generated
	def __init__(self,leng,t):
		self.length=leng
		self.category=t

	def generator(self):
		password=''
		#generates string of letters only , atleast one lowercase char. and one uppercase char
		if(self.category==1):
			source=string.ascii_letters
			password=password+random.SystemRandom().choice(string.ascii_lowercase)
			password=password+random.SystemRandom().choice(string.ascii_uppercase)
			for i in range(self.length-2):
				password=password+random.SystemRandom().choice(source)

		#generates string of numbers only
		if(self.category==2):
			for i in range(self.length):
				password=password+random.SystemRandom().choice(string.digits)

		#generates string of atleast one digit , one lowercase and one uppercase
		if(self.category==3):
			source=string.ascii_letters+string.digits
			password=password+random.SystemRandom().choice(string.ascii_lowercase)
			password=password+random.SystemRandom().choice(string.ascii_uppercase)
			password=password+random.SystemRandom().choice(string.digits)
			for i in range(self.length-3):
				password=password+random.SystemRandom().choice(source)

		#generates password with well known special character only
		if(self.category==4):
			#some sites do not allow all special characters so here are some common 11 special characters
			specialcharacter="~!@#$%^&*_-"
			for i in range(self.length):
				password=password+random.SystemRandom().choice(specialcharacter)

		#generates password with letters and special charcater only		
		if(self.category==5):
			specialcharacter="~!@#$%^&*_-"
			source=string.ascii_letters+specialcharacter
			password=password+random.SystemRandom().choice(string.ascii_lowercase)
			password=password+random.SystemRandom().choice(string.ascii_uppercase)
			password=password+random.SystemRandom().choice(specialcharacter)
			for i in range(self.length-3):
				password=password+random.SystemRandom().choice(source)

		#generates password with numbers and special charcater only
		if(self.category==6):
			specialcharacter="~!@#$%^&*_-"
			source=string.digits+specialcharacter
			password=password+random.SystemRandom().choice(string.digits)
			password=password+random.SystemRandom().choice(specialcharacter)
			for i in range(self.length-2):
				password=password+random.SystemRandom().choice(source)

		#generates string of atleast one digit,one lowercase, one uppercase, and one special character		
		elif(self.category==7):
			#some sites do not allow all special characters so here are selected 11 special characters
			specialcharacter="~!@#$%^&*_-"
			source=string.ascii_letters+string.digits+specialcharacter
			password=password+random.SystemRandom().choice(string.ascii_lowercase)
			password=password+random.SystemRandom().choice(string.ascii_uppercase)
			password=password+random.SystemRandom().choice(string.digits)
			password=password+random.SystemRandom().choice(specialcharacter)
			for i in range(self.length-4):
				password=password+random.SystemRandom().choice(source)
					
		return (password)
					
