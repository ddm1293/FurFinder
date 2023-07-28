import numpy as np
from scipy.optimize import curve_fit


def exponential_decay(x, A, k):
    return A * np.exp(-k * x)


def fit_exponential_decay(x, y):
    params, _ = curve_fit(exponential_decay, np.array(x), np.array(y))
    A_fit, k_fit = params
    return A_fit, k_fit

x_data = [0, 0.5, 1, 2, 3, 7, 15, 30, 45]
y_data = [1, 0.97, 0.93, 0.85, 0.77, 0.62, 0.31, 0.23, 0.19]

A_fit, k_fit = fit_exponential_decay(x_data, y_data)

print(A_fit)
print(k_fit)
