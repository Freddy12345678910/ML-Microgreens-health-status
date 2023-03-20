import json
import pickle

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pika
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
#from sklearn.metrics import (accuracy_score, f1_score, matthews_corrcoef,
               #              plot_confusion_matrix)
from sklearn.model_selection import train_test_split
#from sklearn.preprocessing import StandardScaler, scale
from sklearn.svm import SVC

df = pd.read_csv(
    "C:\\Users\\Freddy Cigollen\\Desktop\\ProyectFINALP2\\PRUEBADEFINITIVA2nolightoff.csv", encoding="ISO-8859-1")

df.drop(['TipoEstres'], axis=1, inplace=True)
df.drop(['Bandas'], axis=1, inplace=True)

#df.Descripcion[df.Descripcion == 'GOOD'] = 'E5'
#df.Descripcion[df.Descripcion == 'MUCHWATER'] = 'E4'
#df.Descripcion[df.Descripcion == 'DEHYDRATED'] = 'E1'
#df.Descripcion[df.Descripcion == 'NOLIGHT'] = 'E3'


# Definir las variables dependientes
Y = df['Descripcion'].values
# Definir las variables independientes
X = df.drop(['Descripcion'], axis=1)
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.30, random_state=0)




##################SUPPORT VECTOR MACHINE######################
clf_svm = SVC(random_state=40, kernel='poly', C=20, gamma='scale', degree=3)
clf_svm.fit(X_train, Y_train)
##############################################################



##################LOGISTIC REGRESSION######################
model_LR = LogisticRegression(solver='liblinear', random_state=20, C=0.1)
model_LR.fit(X_train, Y_train)
model_LR.classes_
model_LR.intercept_
model_LR.coef_
##############################################################


##################RANDOMFOREST ######################
model_RF = RandomForestClassifier(
    n_estimators=50, random_state=30, bootstrap=True)
model_RF.fit(X_train, Y_train)
##############################################################


########CONSTRUYENDO STACK####################
estimator_list = [
    ('SVM', clf_svm),
    ('LR', model_LR),
    ('RF', model_RF)]

stack_model = StackingClassifier(estimators=estimator_list, final_estimator=RandomForestClassifier(
    n_estimators=50, random_state=30, bootstrap=True))


stack_model.fit(X_train, Y_train)
y_pred_stack = stack_model.predict(X_train)

pickle.dump(stack_model, open('model.pkl', 'wb'))
pickled_model = pickle.load(open('model.pkl', 'rb'))
pickled_model.predict(X_test)



def serializeNumPyDataType(o):
    if isinstance(o, np.int64):
        return int(o)
    if isinstance(o, str):
        return o
    raise TypeError


def getBands(channel, method, properties, body):
    bodyAsDict = json.loads(body)
    pickleData = pd.DataFrame([bodyAsDict])
    probmayordata = (pickled_model.predict_proba(pickleData))
    maxProb = np.amax(probmayordata)
    maxprobindex = np.argmax(probmayordata)
    possibleStressOutcomes = {0: "Saludable", 1: "Deshidratada", 2: "Exceso de Agua"}
    typeOfStress = possibleStressOutcomes[maxprobindex]
    bodyAsDict['indexType'] = maxprobindex
    bodyAsDict['probability'] = maxProb
    bodyAsDict['Typestress'] = typeOfStress
    processedDataAsJson = json.dumps(
        bodyAsDict, default=serializeNumPyDataType)
    publishConnection = pika.BlockingConnection(
        pika.ConnectionParameters('localhost'))
    publishChannel = publishConnection.channel()
    publishChannel.basic_publish(
        exchange='datos.procesados.exchange', routing_key='datos.key', body=processedDataAsJson)
    publishChannel.close()
    publishConnection.close()


connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.basic_consume(queue='datos.sensor.espectral',
                      on_message_callback=getBands, auto_ack=True)
channel.start_consuming()
