from http import HTTPStatus


def test_create_user(client):
    response = client.post(
        '/users/',
        json={'name': 'Maria', 'email': 'maria@example.com', 'age': 19},
    )
    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'name': 'Maria',
        'email': 'maria@example.com',
        'age': 19,
    }


def test_read_users(client):
    response = client.get('/users/')
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'users': []}


def test_update_user(client, user):
    response = client.put(
        '/users/1',
        json={'name': 'Joao', 'email': 'joao@example.com', 'age': 30},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'name': 'Joao',
        'email': 'joao@example.com',
        'age': 30,
    }


def test_delete_user(client, user):
    response = client.delete('/users/1')
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'message': 'User deleted from database'}


def test_create_user_thats_already_on_database(client, user):
    response = client.post(
        '/users/',
        json={'name': 'Marcelo', 'email': 'teste@test.com', 'age': 34},
    )
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {'detail': 'Email already exists on database'}


def test_update_user_should_return_not_found(client, user):
    response = client.put(
        '/users/150',
        json={'name': 'Maria', 'email': 'maria@email.com', 'age': 25},
    )
    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'User not found on database'}


def test_delete_should_return_not_found(client, user):
    response = client.delete('/users/150')
    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {'detail': 'User not found on database'}
