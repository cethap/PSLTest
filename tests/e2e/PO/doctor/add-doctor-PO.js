
exports.addDoctorPO = function() {
    
  var nameInput = element(by.css('#name')),
      lastNameInput = element(by.css('#last_name')),
      telephoneInput = element(by.css('#telephone')),
      identificationTypeInput = element(by.css('#identification_type')),
      identificationInput = element(by.css('#identification')),
      sendButton = element(by.css('[onclick="submitForm()"]')),
      titleMessageContainer = element(by.css('.panel .panel-title')),
      bodyMessageContainer = element(by.css('.panel .panel-body')),
      doctorIdContainer = element(by.css('#doctorId'));
      

  this.get = function() {
    browser.ignoreSynchronization = true;
    browser.get('http://automatizacion.herokuapp.com/ctapasco/addDoctor');
  };

  this.setPersonalInfo = function(info) {
    nameInput.sendKeys(info.name);
    lastNameInput.sendKeys(info.lastName);
    telephoneInput.sendKeys(info.telephone);
    identificationTypeInput.sendKeys(info.identificationType);
    identificationInput.sendKeys(info.identification);
  };

  this.sendForm = function(){
    browser.driver.sleep(500);
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

  this.getDoctorId = function() {
    return doctorIdContainer.getText();
  };  

};