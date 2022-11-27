import numpy as np
import pandas as pd
from multiprocessing import Process 
from matplotlib import pyplot as plt

def plot_creator(x,y):
    print("plot_creator")
    plt.plot(x,y)
    #plt.show()
    plt.savefig("./plt.png")
    plt.close()

def ecg_report(report_number):
    
    # load dataset
    test_df = pd.read_csv('./mitbih_test_small.csv',header=None);
    x_test = test_df.iloc[:,:187].values
    x_test_one_row = np.array(x_test[report_number]);
    #print(x_test_one_row.shape)
    
    arr=[]
    for i in range(len(x_test_one_row)):
        arr.append([i,x_test_one_row[i]])
   
    data = np.array(arr)
    x, y = data.T

    #actually each of the routes of flask's app.route are in a separate thread
    #matplotlib will only work in main thread so we cannot plt.plot() in
    #other threads, hence we created an entirely new Porcess to run matplotlib
    proc = Process(target=plot_creator,args=(x,y))
    proc.start()
    proc.join()

    return