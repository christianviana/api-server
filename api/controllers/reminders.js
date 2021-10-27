const uuidv4 = require('uuid/v4');

module.exports = app => {
  const remindersDB = app.data.reminders;
  const controller = {};

  const {
    reminders: remindersMock,
  } = remindersDB;

  controller.listReminders = (req, res) => {    
    const paramStartingDate = req.query.startingDate;
    const paramEndDate = req.query.endDate;
    result = remindersDB.reminders.data;


    if (paramStartingDate) {
      startingDate = new Date(paramStartingDate);
      result = result.filter(rem => new Date(rem.date) >= startingDate);      
    }

    if (paramEndDate) {
      endDate = new Date(paramEndDate);
      result = result.filter(rem => new Date(rem.date) <= endDate);
    }

    res.status(200).json(result)

  };

  controller.saveReminders = (req, res) => {
    
    const newReminder = {
        id: uuidv4(),
        date: req.body.date,
        time: req.body.time,
        note: req.body.note,
        color: req.body.color,
        city: req.body.city            
    }
    console.log(`Saving id=${newReminder.id}, date=${newReminder.date} time=${newReminder.time}, note=${newReminder.note}`); 
    remindersMock.data.push(newReminder);
    console.log(`Saved id=${newReminder.id}, date=${newReminder.date} time=${newReminder.time}, note=${newReminder.note}`); 
    res.status(201).json(newReminder);
    
  };

  controller.updateReminders = (req, res) => {
    const { 
      reminderId,
    } = req.params;

    console.log(`Updating id=${reminderId}`); 

    const foundReminderIndex = remindersMock.data.findIndex(reminder => reminder.id === reminderId);

    if (foundReminderIndex === -1) {
      console.log(`Reminder id=${reminderId} not found`); 
      res.status(404).json({
        message: 'Reminder ' + reminderId + ' not found!',
        success: false,        
      });
    } else {

      const updatedReminder = {
        id: reminderId,
        date: req.body.date,
        time: req.body.time,
        note: req.body.note,
        color: req.body.color,
        city: req.body.city
      };
      
      remindersMock.data.splice(foundReminderIndex, 1, updatedReminder);
      console.log(`Updated id=${updatedReminder.id}, date=${updatedReminder.date} time=${updatedReminder.time}, note=${updatedReminder.note}`); 
      res.status(200).json({
        message: 'Reminder ' + reminderId + ' updated!',
        success: true,
        reminder: updatedReminder,
      });
    }
  }

  controller.removeReminders = (req, res) => {
    const {
      reminderId,
    } = req.params;

    console.log(`Deleting id=${reminderId}`); 

    const foundReminderIndex = remindersMock.data.findIndex(reminder => reminder.id === reminderId);

    if (foundReminderIndex === -1) {
      console.log(`Reminder id=${reminderId} not found`); 
      res.status(404).json({
        message: 'Reminder not found.',
        success: false,       
      });
    } else {
      remindersMock.data.splice(foundReminderIndex, 1);
      console.log(`Deleted id=${reminderId}`); 
      res.status(200).json({
        message: 'Reminder found and deleted sucessfully!',
        success: true
      });
    }
  };
  
  return controller;

}