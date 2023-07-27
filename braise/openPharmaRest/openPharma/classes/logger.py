from abc import ABC, abstractmethod
from typing import Dict


class ProcessingLogger:
    """
    Class for logging
    """
    COLORS: Dict

    @abstractmethod
    @classmethod
    def success(cls, message: str):
        pass

    @abstractmethod
    @classmethod
    def error(cls, message: str):
        pass

    @abstractmethod
    @classmethod
    def warning(cls, message: str):
        pass


class ConsoleLogger(ProcessingLogger):
    COLORS = {
        'success': '\033[92m',
        'error': '\033[91m',
        'warning': '\033[93m',
        'reset': '\033[0m',
    }

    @classmethod
    def success(cls, message: str):
        print(cls.COLORS['success'] + message + cls.COLORS['reset'])

    @classmethod
    def error(cls, message: str):
        print(cls.COLORS['error'] + message + cls.COLORS['reset'])

    @classmethod
    def warning(cls, message: str):
        print(cls.COLORS['warning'] + message + cls.COLORS['reset'])
