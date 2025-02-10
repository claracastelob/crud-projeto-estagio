#!/bin/bash

poetry run alembic upgrade head

poetry run uvicorn --host 0.0.0.0 projeto_fastapi.app:app