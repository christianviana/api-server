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

  controller.updateReminders = (req, res) => {
    const { 
      reminderId,
    } = req.params;

    console.log("Saving " + reminderId)
    const foundReminderIndex = remindersMock.data.findIndex(reminder => reminder.id === reminderId);

    if (foundReminderIndex === -1) {
      res.status(404).json({
        message: 'Reminder ' + reminderId + ' not found!',
        success: false,
        reminders: remindersMock,
      });
    } else {
      const newReminder = {
        id: reminderId,
        date: req.body.date,
        time: req.body.time,
        note: req.body.note,
        color: req.body.color,
        city: req.body.city
      };
      
      remindersMock.data.splice(foundReminderIndex, 1, newReminder);
      
      res.status(200).json({
        message: 'Reminder ' + reminderId + ' updated!',
        success: true,
        reminders: remindersMock,
      });
    }
  }


  return controller;
}