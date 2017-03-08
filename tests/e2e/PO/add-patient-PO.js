
exports.addPatientPO = function() {
    
  var nameInput = element(by.css('[name="name"]')),
      lastNameInput = element(by.css('[name="last_name"]')),
      telephoneInput = element(by.css('[name="telephone"]')),
      identificationTypeInput = element(by.css('[name="identification_type"]')),
      identificationInput = element(by.css('[name="identification"]')),
      prepaidInput = element(by.css('[name="prepaid"]')),
      sendButton = element(by.css('[onclick="submitForm()"]')),
      titleMessageContainer = element(by.css('.panel .panel-title')),
      bodyMessageContainer = element(by.css('.panel .panel-body')),
      patientIdContainer = element(by.xpath('//*[@id="page-wrapper"]/div/div[3]/div/table/tbody/tr[5]/td[2]/span'));
      

  this.get = function() {
    browser.ignoreSynchronization = true;
    browser.get('http://automatizacion.herokuapp.com/ctapasco/addPatient');
  };

  this.setPersonalInfo = function(info) {
    nameInput.sendKeys(info.name);
    lastNameInput.sendKeys(info.lastName);
    telephoneInput.sendKeys(info.telephone);
    identificationTypeInput.sendKeys(info.identificationType);
    identificationInput.sendKeys(info.identification);
    if(info.prepaid){
      prepaidInput.click();
    }
  };

  this.sendForm = function(){
    sendButton.click();
  };

  this.waitTitleMessage = function() {
    browser.driver.wait(function () {
        return titleMessageContainer.isDisplayed();
    });
  };

  this.waitForNameInput = function() {
    browser.driver.wait(function () {
        return nameInput.isDisplayed();
    });
  };

  this.getContentMessage = function() {
    return bodyMessageContainer.getText();
  };

  this.getPatientId = function() {
    return patientIdContainer.getText();
  };  

};