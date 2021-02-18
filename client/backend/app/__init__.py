import logging
import os
import secrets
from logging.handlers import RotatingFileHandler
from flask import Flask
from flask_cors import CORS

cors = CORS()


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.update(
        LOG_TO_STDOUT=False,
        TRAP_HTTP_EXCEPTIONS=True,
        PROPAGATE_EXCEPTIONS=True,
        SECRET_KEY=secrets.token_urlsafe(512),
        JWT_COOKIE_CSRF_PROTECT=True,
        JWT_ACCESS_COOKIE_PATH='/api/',
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
        REMEMBER_COOKIE_SECURE=True,
        REMEMBER_COOKIE_HTTPONLY=True,
    )
    cors.init_app(app)

    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    if not app.debug and not app.testing:

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/corona.log', maxBytes=10240, backupCount=3)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Corona startup')

    return app
