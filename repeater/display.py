#import plotly
#import plotly.graph_objs as go
#import plotly.express as px
#from plotly.subplots import make_subplots

import numpy as np
import pandas as pd

def plot(x, y):
    #рисуем график из списка numpy
    x = np.arange(0, 5, 0.1)
    def f(x):
        return x**2
    print (x,y)
    fig = px.scatter(x=x, y=y)
    fig.show()
