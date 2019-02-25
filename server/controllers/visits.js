const Visit = require('../models').Visit;

module.exports = {
  async create(req, res) {
    const { startDate, endDate, title, description } = req.body;
    const { patientId } = req.params;
    if (!patientId) return res.status(404).send('PatientId not found');
    try {
      const visit = await Visit
        .create({
          startDate,
          endDate,
          title,
          description,
          patientId,
        });
      res.status(201).send(visit);
    }
    catch (error) {
      res.status(400).send(error);
    }

  },
  async list (req, res) {
    const visits = await Visit.all()
      .catch(error => res.status(400).send(error));
    res.status(200).send(visits);
  },
  async read (req, res) {
    const { visitId } = req.params;
    const visit = await Visit.findById(visitId)
      .catch(error => res.status(400).send(error));
    res.status(200).send(visit);
  },
};