import json
import os
import sys
import threading
from ecg_report import ecg_report
from ecg_prediction import ecg_prediction
from flask import Flask,jsonify,request,send_file
from flask_cors import CORS


#this line output goes in server logs
print("SYS.PATH")
print(sys.path)
print("CORS")
print(CORS)
print("OS.GETCWD()")
print(os.getcwd())

#flask run by default at port 5000
app = Flask(__name__)
CORS(app)


#default route
@app.route("/",methods=['GET'])
def default():
  return "<h1> Welcome to ECG predictor <h1>"


#route for ecg input file number, returns prediction
@app.route("/ecg/",methods=['GET'])
def return_ecg_prediction():
  report_number = int(request.args.get('repno'))

  if report_number<0 or report_number>104:
    return jsonify("INVALID REPORT_NUMBER")

  return jsonify(ecg_prediction(report_number))


#route for ecg input file number, returns the ecg itself
@app.route("/ecgreport/",methods=['GET'])
def return_ecg_report():
  report_number = int(request.args.get('repno'))
  
  print("Threads")
  print(threading.enumerate())
  print("Current Thread")
  print(threading.get_ident())
  print("INPUT QUERY ARG")
  print("report_number",report_number);
  print("INPUT QUERY ARG")
  print("report_number",report_number);

  if report_number<0 or report_number>104:
      return jsonify("INVALID REPORT_NUMBER")

  ecg_report(report_number)
  return send_file("plt.png", mimetype='image/gif')


if __name__ == "__main__":
    app.run()