file = open('dictionary.txt',mode='r')
output = open('populateDictionary.sql',mode='w')


for line in file.read().splitlines():
    output.write("INSERT INTO dictionary(word, length) VALUES (\'"+line+"\', "+str(len(line))+");\n")


file.close()
output.close()