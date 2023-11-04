from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict


class ProcessingLogger(ABC):
    """
    Class for logging
    """
    COLORS: Dict

    @abstractmethod
    def info(cls, message: str):
        pass

    @abstractmethod
    def success(cls, message: str):
        pass

    @abstractmethod
    def error(cls, message: str):
        pass

    @abstractmethod
    def warning(cls, message: str):
        pass


class ConsoleLogger(ProcessingLogger):
    COLORS = {
        'success': '\033[92m',
        'error': '\033[91m',
        'warning': '\033[93m',
        'reset': '\033[0m',
        'info': '\033[94m',
    }

    def print(self, color: str, message: str):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S:%f")
        print("[" + timestamp + "] " + color + message + self.COLORS['reset'])

    def info(self, message: str):
        self.print(self.COLORS['info'], message)
        # print(self.COLORS['info'] + message + self.COLORS['reset'])

    def success(self, message: str):
        self.print(self.COLORS['info'], message)
        # print(self.COLORS['success'] + message + self.COLORS['reset'])

    def error(self, message: str):
        self.print(self.COLORS['info'], message)
        # print(self.COLORS['error'] + message + self.COLORS['reset'])

    def warning(self, message: str):
        self.print(self.COLORS['info'], message)
        # print(self.COLORS['warning'] + message + self.COLORS['reset'])
