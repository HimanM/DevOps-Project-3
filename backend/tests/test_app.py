import pytest
import sys
import os

# Add the parent directory to sys.path to import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello_world(client):
    """Test the root endpoint."""
    rv = client.get('/')
    json_data = rv.get_json()
    assert rv.status_code == 200
    assert json_data['message'] == "Hello from Python Backend!"

def test_get_data(client):
    """Test the data endpoint."""
    rv = client.get('/api/data')
    json_data = rv.get_json()
    assert rv.status_code == 200
    assert json_data['status'] == "success"
    assert json_data['data'] == [1, 2, 3, 4, 5]
