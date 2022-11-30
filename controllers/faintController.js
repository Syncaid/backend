import { Faint } from "../models/faint.js"; // add validate

export function getAll(req, res) {
  Faint.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getByUser(req, res) {
  Faint.find({
    UserId: req.params.id,
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getById(req, res) {
  Faint.findById(req.params.id)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function addOnce(req, res) {
  Faint.create({
    Date: req.body.Date,
    Duration: req.body.Duration,
    UserId: req.body.UserId,
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function updateOnce(req, res) {
  Faint.findOneAndUpdate(
    { _id: req.params.id },
    {
      Date: req.body.Date,
      Duration: req.body.Duration,
      UserId: req.body.UserId,
    }
  )
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteOnce(req, res) {
  Faint.findOneAndRemove(req.params.id, req.body)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
