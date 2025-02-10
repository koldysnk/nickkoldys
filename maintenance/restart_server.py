import os
import requests
import traceback
import subprocess
from datetime import date
from requests.exceptions import SSLError

def output(value,f=None):
        print(value)
        if f:
                f.write(f'{value}\n')

def main():
        todays_date = date.today()
        location = "/home/nkoldys/personalSite/nickkoldys"
        log_file = f"{location}/maintenance/log_restart_server_{todays_date.year}-{todays_date.month}-{todays_date.day}.txt"
        output(log_file)

        try:
                f = open(log_file,"w")
                f.write("Starting Restart Process...\n")


                #validate if srver is online and restart if needed
                status = subprocess.run([f'{location}/server/node_modules/.bin/pm2','status'],capture_output=True,text=True)
                #output(status.stdout,f)
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

                #validate connection to endpoint
                try:
                        response = requests.get("https://server.nickkoldys.com:8442/allwords/0/1")
                        if response.ok:
                                output("The connection was sucessfull",f)
                        else:
                                outpur("Something else is wrong... This needs to be investigated.",f)
                except SSLError as e:
                        output(e)
                        output("The server certification needs to be refreshed")


        except BaseException as e:
                output(e,f)
                output(traceback.format_exc(),f)
        else:
                output("Process concluded with no errors.",f)
        finally:
                f.close()

main()
