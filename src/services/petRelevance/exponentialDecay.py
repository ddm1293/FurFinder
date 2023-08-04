import numpy as np
from scipy.optimize import curve_fit
import sys
import json


def exponential_decay(x, A, k):
    return A * np.exp(-k * x)


def fit_exponential_decay(x, y):
    params, _ = curve_fit(exponential_decay, np.array(x), np.array(y))
    A_fit, k_fit = params
    return A_fit, k_fit

x_data = json.loads(sys.argv[1])
y_data = json.loads(sys.argv[2])

A_fit, k_fit = fit_exponential_decay(x_data, y_data)

print(A_fit)
print(k_fit)
