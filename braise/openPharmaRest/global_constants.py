
import os

# OS SPECIFIC
PYTHON_PATH = os.popen('which python').read().strip()
DIR_PATH = os.path.dirname(os.path.abspath(__file__))
CRON_ACTUALIZE_LOG_PATH = f"{DIR_PATH}/cron_actualize.log"
