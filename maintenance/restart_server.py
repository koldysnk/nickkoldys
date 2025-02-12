import os
import json
import smtplib
import requests
import traceback
import subprocess
from os.path import basename
from datetime import date, timedelta
from email.mime.text import MIMEText
from requests.exceptions import SSLError
from email.utils import COMMASPACE, formatdate
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication


todays_date = date.today()
location = "/home/nkoldys/personalSite/nickkoldys"
log_file = f"{location}/maintenance/log_restart_server_{todays_date.year}-{todays_date.month}-{todays_date.day}.txt"

variables ={} 
with open(f"{location}/variables.json") as file:
        variables = json.load(file)

def output(value,f=None):
        print(value)
        if f:
                f.write(f'{value}\n')

def email(message,file=None):
        msg = MIMEMultipart()
        send_from = variables.get("email")
        send_to = [send_from]
        subject = message
        text = "This is an alert from your server. Please view the attachment for more information."
        msg['From'] = send_from
        msg['To'] = COMMASPACE.join(send_to)
        msg['Date'] = formatdate(localtime=True)
        msg['Subject'] = subject

        msg.attach(MIMEText(f"{text}\n\n"))

        if file:
                with open(file, "rb") as fil:
                        part = MIMEApplication(
                                fil.read(),
                                Name=basename(file)
                        )
                # After the file is closed
                part['Content-Disposition'] = 'attachment; filename="%s"' % basename(file)
                msg.attach(part)


        smtp = smtplib.SMTP('smtp.gmail.com', 587)
        smtp.starttls()  # Secure the connection
        smtp.login(send_from, variables.get("email_app_key"))
        smtp.sendmail(send_from, send_to, msg.as_string())
        smtp.close()

def main():
        output(log_file)
        notify = False
        problem = False

        try:
                f = open(log_file,"w")
                f.write("Starting Restart Process...\n")


                #validate if srver is online and restart if needed
                status = subprocess.run([f'{location}/server/node_modules/.bin/pm2','status'],capture_output=True,text=True)
                output(status.stdout,f)
                if "online" in status.stdout:
                        output("Server is online.",f)
                else:
                        output("Server is offline and needs to be restarted",f)
                        restart = subprocess.run([f'{location}/server/node_modules/.bin/pm2','start','--name','server'],capture_output=True,text=True)
                        output(restart.stdout,f)

                        status2 = subprocess.run([f'{location}/server/node_modules/.bin/pm2','status'],capture_output=True,text=True)
                        output(status2.stdout,f)
                        if "online" in status2.stdout:
                                output("Server was sucessfully restarted.",f)
                        else:
                                output("SERVER FAILED TO RESTART.",f)
                                problem = True
                        notify = True

                #validate connection to endpoint
                try:
                        response = requests.get("https://server.nickkoldys.com:8442/allwords/0/1")
                        if response.ok:
                                output("The connection was sucessfull",f)
                        else:
                                output("Something else is wrong... This needs to be investigated.",f)
                                problem = True
                                notify = True
                except SSLError as e:
                        output(e)
                        output("The server certification needs to be refreshed")
                        problem = True
                        notify = True


        except BaseException as e:
                output(e,f)
                output(traceback.format_exc(),f)
                problem = True
                notify = True
        else:
                output("Process concluded with no errors.",f)
                if not notify:
                        yesterday = todays_date - timedelta(days=1)
                        log_file2 = f"{location}/maintenance/log_restart_server_{yesterday.year}-{yesterday.month}-{yesterday.day}.txt"
                        os.remove(log_file2)
        finally:
                f.close()
                if notify:
                        email(f"{'ACTION REQUIRED: ' if problem else ''}Notification from server")

main()
