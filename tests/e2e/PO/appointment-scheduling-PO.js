
exports.appointmentSchedulingPO = function() {
    
  var datepicker = element(by.css('#datepicker')),
      dayButton = element(by.css('#ui-datepicker-div > table > tbody > tr:nth-child(3) > td:nth-child(5) > a')),
      patientIdLabel = element(by.css('[for="patient-identification"]')),
      doctorIdLabel = element(by.css('[for="doctor-identification"]')),
      noteLabel = element(by.css('[for="note"]')),
      sendButton = element(by.css('[onclick="submitForm()"]')),
      titleMessageContainer = element(by.css('.panel .panel-title')),
      bodyMessageContainer = element(by.css('.panel .panel-body'));

  this.get = function() {
    browser.ignoreSynchronization = true;
    browser.get('http://automatizacion.herokuapp.com/ctapasco/appointmentScheduling');
  };

  this.setAppointmentSchedulingInfo = function(info) {
    datepicker.click();
    datepicker.sendKeys(info.time);
    browser.driver.wait(function(){ return dayButton.isDisplayed(); });    
    dayButton.click();
    patientIdLabel.element(by.xpath('..')).element(by.css('.form-control')).sendKeys(info.patient);
    doctorIdLabel.element(by.xpath('..')).element(by.css('.form-control')).sendKeys(info.doctor);
    noteLabel.element(by.xpath('..')).element(by.css('.form-control')).sendKeys(info.note);
  };

  

  this.sendForm = function(){
    sendButton.click();
  };

  this.waitTitleMessage = function() {
    browser.driver.wait(function () {
        return titleMessageContainer.isDisplayed();
    });
  };

  this.getContentMessage = function() {
    return bodyMessageContainer.getText();
  };

  this.waitForDatepickerInput = function() {
    browser.driver.wait(function () {
        return datepicker.isDisplayed();
    });
  };

};