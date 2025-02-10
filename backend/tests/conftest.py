import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from testcontainers.mysql import MySqlContainer

from projeto_fastapi.app import app
from projeto_fastapi.database import get_session
from projeto_fastapi.models import User, table_registry


@pytest.fixture
def client(session):
    def get_session_override():
        return session

    with TestClient(app) as client:
        app.dependency_overrides[get_session] = get_session_override
        yield client

    app.dependency_overrides.clear()


@pytest.fixture
def session(engine):
    table_registry.metadata.create_all(engine)

    with Session(engine) as session:
        yield session
        session.rollback()

    table_registry.metadata.drop_all(engine)


@pytest.fixture(scope='session')
def engine():
    with MySqlContainer('mysql:latest') as mysql:
        _engine = create_engine(mysql.get_connection_url())

        with _engine.begin():
            yield _engine


@pytest.fixture
def user(session):
    user = User(name='Teste', email='teste@test.com', age=18)
    session.add(user)
    session.commit()
    session.refresh(user)

    return user
