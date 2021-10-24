module.exports = app => {
  const controller = app.controllers.calendarDays;

  app.route('/api/v1/calendar-days')
    .get(controller.listCalendarDays)
    .post(controller.saveCalendarDays);
    
}