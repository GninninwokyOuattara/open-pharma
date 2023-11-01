import multiprocessing

bind = "0.0.0.0:8080"
workeres = multiprocessing.cpu_count() * 2 + 1
