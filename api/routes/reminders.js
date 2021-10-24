module.exports = app => {
    const controller = app.controllers.reminders;
  
    app.route('/api/v1/reminders')
      .get(controller.listReminders)
      .post(controller.saveReminders);
  
    // app.route('/api/v1/reminders/:day')
    //   .delete(controller.removeReminders)
    //   .put(controller.updateReminders);
      
  }