const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  patients: patientsController,
  visits: visitsController,
}
  = require('../controllers');
const { Users } = require('../models');

module.exports = app => {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
    sent: new Date().toISOString(),
  }));

  app.post('/api/patients', patientsController.create);
  app.get('/api/patients', patientsController.list);
    
  app.post('/api/patients/:patientId/visits', visitsController.create);
  app.get('/api/visits/:visitId', visitsController.read);
  app.get('/api/patients/:patientId/visits', visitsController.list);


  // https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52

  app.post('/api/register', async (req, res) => {
    try {
      const { password, email } = req.body;
      console.log({ password, email });
      const hashedPassword = bcrypt.hashSync(password, 8);
      console.log({ segrit: process.env.SECRET })
      const user = await Users.create({
        password: hashedPassword,
        email,
      });
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).send("There was a problem registering the user.")
    }
  });

  app.post('/api/me', async (req, res) => {
    try {
      const token = req.headers['x-access-token'];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      
      const decoded = jwt.verify(token,  process.env.SECRET);
      res.status(200).send(decoded);
    } catch (error) {
      console.error(error);
      res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  });
  app.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
};



