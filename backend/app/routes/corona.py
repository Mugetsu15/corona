import logging
from urllib3.exceptions import MaxRetryError, NewConnectionError, TimeoutError
from requests.exceptions import ConnectionError
from flask import jsonify, request
from flask_restful import abort
from app.connection import Connection
from app.config import LinkConfig
from app.routes import bp

REQUEST = Connection()

LOG_FILENAME = 'logs/corona.log'
LOG_FORMAT = "%(asctime)s — %(name)s — %(levelname)s — %(funcName)s:%(lineno)d — %(message)s"
logging.basicConfig(filename=LOG_FILENAME, level=logging.DEBUG, format=LOG_FORMAT)
logger = logging.getLogger(__name__)


def _make_response(response, status):
    if 400 <= status < 500:
        logger.error("Backend: [Status: %s] %s" % (status, response))
        abort(status, description=response)
    if status >= 500:
        logger.error("Backend: [Status: %s] %s" % (status, response))
        abort(status, description=response)
    with open('fallback', 'w') as f:
        f.writelines(response)
    return response, status


@bp.route('/api/corona', methods=['POST'])
def infect_corona():
    if not request.is_json:
        return jsonify(message="Missing JSON in request"), 400
    mode = request.json.get("mode")
    if not mode:
        logger.warning(level=logging.WARNING,
                       msg='[Status: 401] {Message: Backend.create_ide() - Unauthorized}')
        abort(404)
    kreis_name = request.json.get('name')
    kreis_type = request.json.get('type')
    body = {
        'kreisName': kreis_name,
        'kreisArt': kreis_type,
    }
    status, response = REQUEST.post(
        body,
        LinkConfig.URL_CORONA_REST['select']
    )
    return _make_response(response, status)


@bp.route('/api/corona/all', methods=['GET'])
def corona_is_here():
    try:
        status, response = REQUEST.get(
            LinkConfig.URL_CORONA_REST['all']
        )
        return _make_response(response, status)
    except ConnectionError or MaxRetryError or NewConnectionError or TimeoutError as err:
        logger.exception(err)
        abort(500, description=err)


@bp.route('/api/corona/fallback', methods=['GET'])
def get_fallback():
    with open('fallback', 'r') as f:
        response = jsonify(f.readline())
        response.status_code = 200
        return response
