from urllib.request import urlopen 
import re

import smtplib 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

file = open("email_credentials.txt")

email = file.readline().strip()
pas = file.readline().strip()

sms_gateway = file.readline().strip()

file.close()

for i in range(1,2):
    question = str(i)

    url = 'https://projecteuler.net/problem='+question

    client = urlopen(url)

    html = client.read()

    client.close()

    html = html.decode('ISO-8859-1')

    p = re.compile('<h2>(.*?)</h2>')

    title = p.search(html).group(1)

    p2 = re.compile('<div class="problem_content" role="problem">([\S\s]*?)</div>')

    questionText = p2.search(html).group(1).replace('\n','').replace('</p>','</p>\n')





    # The server we use to send emails in our case it will be gmail but every email provider has a different smtp 
    # and port is also provided by the email provider.
    smtp = "smtp.gmail.com" 
    port = 587
    # This will start our email server
    server = smtplib.SMTP(smtp,port)
    # Starting the server
    server.starttls()
    # Now we need to login
    server.login(email,pas)

    # Now we use the MIME module to structure our message.
    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = sms_gateway
    # Make sure you add a new line in the subject
    msg['Subject'] = "Question: "+question+"\n"
    # Make sure you also add new lines to your body
    body = questionText+"\n"
    # and then attach that body furthermore you can also send html content.
    msg.attach(MIMEText(body, 'plain'))

    sms = msg.as_string()

    #server.sendmail(email,sms_gateway,sms)

    # lastly quit the server
    server.quit()