from requests import post, get


class Connection:

    @staticmethod
    def post(url, body=None):
        response = post(url, json=body)
        return response.status_code, response.text\

    @staticmethod
    def get(url):
        response = get(url)
        return response.status_code, response.text
