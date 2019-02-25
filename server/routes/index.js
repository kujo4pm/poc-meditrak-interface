const express = require('express');
const {
  patients: patientsController,
  visits: visitsController,
}
  = require('../controllers');

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
};



