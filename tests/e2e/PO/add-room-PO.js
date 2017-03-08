
exports.addRoomPO = function() {
    
  var nameInput = element(by.css('[name="name"]')),
      roomTypeInput = element.all(by.css('[name="optionsRadios"]')),
      roomSimpleInput = element(by.css('.simple [type="checkbox"]')),
      roomLuxuryInput = element(by.css('.luxury [type="checkbox"]')),
      titleMessageContainer = element(by.css('.panel .panel-title')),
      bodyMessageContainer = element(by.css('.panel .panel-body')),      
      roomIdContainer = element(by.xpath('//*[@id="page-wrapper"]/div/div[3]/div/table/tbody/tr[1]/td[2]')),      
      sendButton = element(by.css('[onclick="submitForm();"]'));
      

  this.get = function() {
    browser.ignoreSynchronization = true;
    browser.get('http://automatizacion.herokuapp.com/ctapasco/addRoom');
  };

  this.setRoomInfo = function(info) {
    nameInput.sendKeys(info.number);
    roomTypeInput.get(info.type).click();
    roomSimpleInput.click();
    roomLuxuryInput.click();
  };

  this.getRoomSimpleInput = function() {
    return roomSimpleInput;
  }

  this.getRoomLuxuryInput = function() {
    return roomLuxuryInput;
  }  

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

  this.getRoomId = function() {
    return roomIdContainer.getText();
  };  

};