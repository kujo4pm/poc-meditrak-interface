const Patient = require('../models').Patient;

module.exports = {
  create(req, res) {
    const { firstName, lastName } = req.body;
    return Patient
      .create({
        firstName,
        lastName,
      })
      .then(patient => res.status(201).send(patient))
      .catch(error => res.status(400).send(error));
  },
  async list (req, res) {
    const patients = await Patient.all()
      .catch(error => res.status(400).send(error));
    res.status(200).send(patients);
  },
};