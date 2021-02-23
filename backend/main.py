from app import create_app
from os import path

app = create_app()


def create_file():
    if not path.exists('fallback'):
        with open('fallback', 'w') as f:
            f.writelines('t')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8098)
