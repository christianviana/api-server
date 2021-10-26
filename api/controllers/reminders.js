const uuidv4 = require('uuid/v4');

module.exports = app => {
  const remindersDB = app.data.reminders;
  const controller = {};

  const {
    reminders: remindersMock,
  } = remindersDB;

  controller.listReminders = (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
    result = remindersDB.reminders.data;

    if (typeof year != 'undefined') {
      result = result.filter(rem => new Date(rem.date).getFullYear() == year);      
    }

    if (typeof month != 'undefined') {
      result = result.filter(rem => new Date(rem.date).getMonth() == month);
    }

    if (typeof day != 'undefined') {
      result = result.filter(rem => new Date(rem.date).getDate() == day);
    }
    
    res.status(200).json(result)

  };

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
    
    const foundReminderIndex = remindersMock.data.findIndex(reminder => reminder.id === reminderId);

    if (foundReminderIndex === -1) {
      res.status(404).json({
        message: 'Reminder ' + reminderId + ' not found!',
        success: false,
        reminders: remindersMock,
      });
    } else {

      console.log("Saving id =" + reminderId + ', color = ' + req.body.color); 
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

  controller.removeReminders = (req, res) => {
    const {
      reminderId,
    } = req.params;

    const foundReminderIndex = remindersMock.data.findIndex(reminder => reminder.id === reminderId);

    if (foundReminderIndex === -1) {
      res.status(404).json({
        message: 'Reminder not found.',
        success: false,
        reminders: remindersMock,
      });
    } else {
      remindersMock.data.splice(foundReminderIndex, 1);
      res.status(200).json({
        message: 'Reminder found and deleted sucessfully!',
        success: true,
        reminders: remindersMock,
      });
    }
  };
  
  return controller;

}