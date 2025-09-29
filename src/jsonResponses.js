const users = {};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
    'Cache-Control': 'no-cache',
  };

  response.writeHead(status, headers);

  if (request.method !== 'HEAD') {
    response.write(content);
  }

  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response) => {
  const { name, age } = request.body;

  if (!name || !age) {
    const responseJSON = {
      message: 'Name and age are both required.',
      id: 'addUserMissingParams',
    };

    return respondJSON(request, response, 400, responseJSON);
  }

  const numericAge = parseInt(age, 10);
  const nameKey = name;

  if (users[nameKey]) {
    users[nameKey].age = numericAge;
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    return response.end();
  }
  const newUser = { name, age: numericAge };

  users[nameKey] = newUser;

  const responseJSON = {
    message: 'Created Successfully',
    user: newUser,
  };

  return respondJSON(request, response, 201, responseJSON);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you were looking for was not found.',
    id: 'notReal',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you were looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
  notFound,
};
