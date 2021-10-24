
  
const uuidv4 = require('uuid/v4');

module.exports = app => {
  const calendarDaysDB = app.data.calendarDays;
  const controller = {};

  const {
    calendarDays: calendarDaysMock,
  } = calendarDaysDB;

  controller.listCalendarDays = (req, res) => res.status(200).json(calendarDaysDB);

  controller.saveCalendarDays = (req, res) => {
    calendarDaysMock.data.push({
      date: req.body.date,
      reminders: req.body.reminders,
    });

    res.status(201).json(calendarDaysMock);
  };

  return controller;
}