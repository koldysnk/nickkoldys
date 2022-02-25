
def generateLink (word):
    return "https://www.google.com/search?q=define%3A+" + word + "&rlz=1C1CHBF_enUS723US723&sxsrf=APq-WBsASD7LzY0AlHxBGR5dPXApEqCXww%3A1644183556135&ei=BEAAYonUB424ggfJ576gBQ&ved=0ahUKEwiJ5ruGhez1AhUNnOAKHcmzD1QQ4dUDCA4&uact=5&oq=define%3A+" + word + "&gs_lcp=Cgdnd3Mtd2l6EAMyCQgjECcQRhD5ATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQguEIAEMgYIABAHEB46BwgAEEcQsAM6BwgAELADEENKBAhBGABKBAhGGABQoAhYoAhgphJoAXACeACAAWaIAWaSAQMwLjGYAQCgAQHIAQrAAQE&sclient=gws-wiz"

def getWords(start=0,end=400000):
    source = open("dictionary.txt",mode='r')
    dic = []

    for i in range(0,start):
        source.readline()

    for i in range(start,end+1):
        word = source.readline().strip()
        
        if(word==''):
            break
        dic.append(word)

    source.close()

    return dic

def main():
    dic = getWords(end=5)
    for i in dic:
        print(generateLink(i))

main()