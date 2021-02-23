import json

from requests import post, get

URL_CORONA_REST = 'http://192.168.176.62/corona/iz/all'
ARRAY = []


def test_data():
    response = get(URL_CORONA_REST)
    return response.status_code, response.text


if __name__ == '__main__':
    status, response = test_data()
    tmp = json.loads(response)
    print(status)
    print(response)
    print(type(tmp))
    for data in json.loads(response):
        print(data['IZ'])
