import os

from crontab import CronTab

# get python path
python_path = os.popen('which python').read().strip()
# get path to current folder
current_folder_path = os.path.dirname(os.path.abspath(__file__))

cron = CronTab(user=True)
job = cron.new(
    command=f'{python_path} sayHello.py & 2>&1 >> {current_folder_path}/crono.log')
job.minute.every(1)

cron.write()
