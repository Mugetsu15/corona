from singleton import Singleton


@Singleton
class Fallback:

    def __init__(self):
        self._data = None

    def get_data(self):
        return self._data

    def set_data(self, data):
        if not self._data:
            self._data = data
