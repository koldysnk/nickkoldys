import matplotlib.pyplot as plt
import numpy as np

def main():
    arrA = []
    with open('takenPieceThenLowTohighlevel4.txt') as fp:
        line = fp.readline()
        while line:
            if(line.startswith('actions.js:3342 Alpha Beta: Visited ')):
                num = int(line.split(' ')[4])
                arrA.append(num)
            line = fp.readline()
    arr2 = []

    with open('lowToHigh.txt') as fp:
        line = fp.readline()
        while line:
            if(line.startswith('actions.js:3319 Alpha Beta: Visited ')):
                num = int(line.split(' ')[4])
                arr2.append(num)
            line = fp.readline()
    
    for i in range(max(len(arrA),len(arr2))):
        if(i>=len(arr2)):
            arr2.append(0)
            print('Low To High: 0 Capture then Low To High: '+str(arrA[i]))
        elif(i>=len(arrA)):
            arrA.append(0)
            print('Low To High: '+str(arr2[i])+' Capture then Low To High: 0')
        else:
            print('Low To High: '+str(arr2[i])+' Capture then Low To High: '+str(arrA[i])+' Difference: '+str((arr2[i]-arrA[i])))

    x = np.array([i for i in range(len(arrA))])
    plt.plot(arrA,label='Captures First')
    plt.plot(arr2,label='Low Impact First')
    plt.legend(loc='upper right')
    plt.show()
    
main()
