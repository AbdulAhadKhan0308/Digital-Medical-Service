# load and evaluate a saved model
from keras.models import load_model
from keras.utils.np_utils import to_categorical
import pandas as pd
import numpy as np

# load model
cnn = load_model('./ecg_model.h5')

# summarize model.
# model.summary()

# load dataset
test_df = pd.read_csv('./mitbih_test_small.csv',header=None);
print("test_df.shape!!!")
print(test_df.shape)

def ecg_prediction(report_number):
    #y attribute-tuple (class tuple) within given tuple (each row in dataset represents an ecg beat)
    y_test = to_categorical(test_df[187]);
    y_test_one_row = np.array([y_test[report_number]]);
    
    #x tuple
    x_test = test_df.iloc[:,:187].values
    print("x_test.shape",x_test.shape)
    x_test_one_row = np.array([x_test[report_number]]);
    print("x_test_one_row.shape!!!")
    print(x_test_one_row.shape)
    x_test_one_row = x_test_one_row.reshape(len(x_test_one_row), x_test_one_row.shape[1],1)
    print("x_test_one_row.shape!!!")
    print(x_test_one_row.shape)
    
    #predict from the model
    scores = cnn.evaluate(x_test_one_row,y_test_one_row, verbose=1)
    y_predict_one_row = cnn.predict(x_test_one_row)
    print("scores!!!")
    print(scores)
    print("y_predict_one_row!!!")
    print(y_predict_one_row)
    print("y_test_one_row!!!")
    print(y_test_one_row)
    
    y_predict_one_row=y_predict_one_row[0]
    y_test_one_row=y_test_one_row[0]
    print("y_predict_one_row!!!")
    print(y_predict_one_row)
    print("y_test_one_row!!!")
    print(y_test_one_row);

    actual_val=predict_val=actual_index=predict_index=-1

    for i in range(y_predict_one_row.size):
        if y_predict_one_row[i]>predict_val:
            predict_val=y_predict_one_row[i]
            predict_index=i
        if y_test_one_row[i]>actual_val:
            actual_val=y_test_one_row[i]
            actual_index=i
    
    return str(predict_index)+":"+str(actual_index)+":"+str(y_predict_one_row)+":"+str(y_test_one_row)
