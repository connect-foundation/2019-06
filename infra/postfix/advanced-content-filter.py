# Author: Miroslav Houdek miroslav.houdek at gmail dot com
# License is, do whatever you wanna do with it (at least I think that that is what LGPL v3 says)
#
import os
import sys
import smtpd
import asyncore
import smtplib
import traceback

# please input below blank
FROM_PORT = 0 # number
TO_PORT = 0 # number
SHELL_PATH = '/path/to/script ' # string

class CustomSMTPServer(smtpd.SMTPServer):
	def process_message(self, peer, mailfrom, rcpttos, data):
		mailfrom.replace('\'', '')
		mailfrom.replace('\"', '')
		
		for recipient in rcpttos:
			recipient.replace('\'', '')
			recipient.replace('\"', '')

		os.system('echo "' + data + '" | ' + SHELL_PATH)

		try:
			toserver = smtplib.SMTP('127.0.0.1', TO_PORT)
			toserver.sendmail(mailfrom, rcpttos, data)
			toserver.quit()
		except smtplib.SMTPException:
			print('Exception SMTPException')
			pass
		except smtplib.SMTPServerDisconnected:
			print('Exception SMTPServerDisconnected')
			pass
		except smtplib.SMTPResponseException:
			print('Exception SMTPResponseException')
			pass		
		except smtplib.SMTPSenderRefused:
			print('Exception SMTPSenderRefused')
			pass		
		except smtplib.SMTPRecipientsRefused:
			print('Exception SMTPRecipientsRefused')
			pass		
		except smtplib.SMTPDataError:
			print('Exception SMTPDataError')
			pass		
		except smtplib.SMTPConnectError:
			print('Exception SMTPConnectError')
			pass		
		except smtplib.SMTPHeloError:
			print('Exception SMTPHeloError')
			pass		
		except smtplib.SMTPAuthenticationError:
			print('Exception SMTPAuthenticationError')
			pass
		except:
			print('Undefined exception')
			print(traceback.format_exc())

		return
		
server = CustomSMTPServer(('127.0.0.1', FROM_PORT), None)

asyncore.loop()
