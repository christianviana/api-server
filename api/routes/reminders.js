module.exports = app => {
    const controller = app.controllers.reminders;
  
    app.route('/api/v1/reminders')
      .get(controller.listReminders)
      .post(controller.saveReminders);
  
     app.route('/api/v1/reminders/:reminderId')
       .put(controller.updateReminders);
     //.delete(controller.removeReminders)
    
      
  }