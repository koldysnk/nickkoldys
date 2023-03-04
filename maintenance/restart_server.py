from datetime import date
import os

def main():
	todays_date = date.today()
	log_file = f"log_restart_server_{todays_date.year}-{todays_date.month}-{todays_date.day}.txt"
	print(log_file)

	os.system(f"cd ../server/; ./node_modules/.bin/pm2 stop server >> ../maintenance/{log_file}")
	os.system(f"cd ../server/; ./node_modules/.bin/pm2 start --name server app.js >> ../maintenance/{log_file}")

	with open(log_file) as f:
		if "Process successfully started" in f.read():
			print("Process successfully started - removing log file")
			os.remove(log_file)
main()
