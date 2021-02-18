FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1
RUN set -e; \
        apk add --no-cache --virtual .build-deps \
                gcc \
                libc-dev \
                linux-headers \
                mariadb-dev \
                python3-dev \
                postgresql-dev \
                uwsgi-python3 \
                pcre-dev \
        ;

RUN pip install --upgrade pip
RUN pip install uwsgi

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

## User account
RUN adduser --disabled-password --gecos '' --home /home/corona --shell /bin/bash corona

RUN mkdir -p /home/corona/logs

RUN chmod g+rw /home && \
    chown -R corona:corona /home/corona

ENV USER corona
ENV HOME /home/corona
WORKDIR $HOME
COPY . $HOME

RUN chown -R corona:corona /home/corona

USER corona

EXPOSE 8098

CMD ["uwsgi", "main.ini"]