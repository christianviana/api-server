
  
const uuidv4 = require('uuid/v4');

module.exports = app => {
  const remindersDB = app.data.reminders;
  const controller = {};

  const {
    reminders: remindersMock,
  } = remindersDB;

  controller.listReminders = (req, res) => res.status(200).json(remindersDB.reminders.data  );

  controller.saveReminders = (req, res) => {
    console.log("Saving " + req.body.note)
    remindersMock.data.push({      
      id: uuidv4(),
      date: req.body.date,
      time: req.body.time,
      note: req.body.note,
      color: req.body.color,
      city: req.body.city      
    });

    res.status(201).json(remindersMock);
  };

  return controller;
}