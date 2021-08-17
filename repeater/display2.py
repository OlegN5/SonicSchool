import matplotlib.pyplot as plt
import librosa.display
import numpy




def plot(x, y):
    plt.figure(figsize=(14, 5))
    librosa.display.waveplot(x=x, sr=y)
