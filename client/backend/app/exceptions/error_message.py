class ErrorMessage(Exception):
    status_code = 0

    def __init__(self, message, status_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code

    def get_status_code(self, status_code):
        self.status_code = status_code
        return self

    def to_dict(self):
        rv = dict()
        rv['message'] = self.message
        return rv

    def __str__(self):
        return "%s" % self.message