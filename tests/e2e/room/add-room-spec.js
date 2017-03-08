/*

--Gherkin Draft--

  Feature: Admin rooms info
    In order to attend a user at a medical appointment correctly
  
    Scenario: Add simple room with correctly data
      Given the URL http://automatizacion.herokuapp.com/{name}/addRoom
        And replacement {name} with a name and last name combination
      When I type in the name field without alphabetical characters
       And I choose simple room
       And I choose double bed
       And I intent choose DirecTV
       And I press the save button
     Then should no check DirecTV
       should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form    

    Scenario: Add simple room with name already saved
      Given the URL http://automatizacion.herokuapp.com/{name}/addRoom
        And replacement {name} with a name and last name combination
      When I type in the name field without alphabetical characters and with name already saved
       And I choose simple room
       And I choose double bed
       And I intent choose DirecTV
       And I press the save button
     Then should no check DirecTV
       should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form           

    Scenario: Add luxury with correctly data
      Given the URL http://automatizacion.herokuapp.com/{name}/addRoom
        And replacement {name} with a name and last name combination
      When I type in the name field without alphabetical characters
       And I choose luxury room
       And I choose double bed
       And I intent choose DirecTV
       And I press the save button
     Then should no double bed
       should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form    

    Scenario: Add luxury room with name already saved
      Given the URL http://automatizacion.herokuapp.com/{name}/addRoom
        And replacement {name} with a name and last name combination
      When I type in the name field without alphabetical characters and with name already saved
       And I choose luxury room
       And I choose double bed
       And I intent choose DirecTV
       And I press the save button
     Then should no double bed
       should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form 


    Scenario: Add luxury room with force alphabetical characters
      Given the URL http://automatizacion.herokuapp.com/{name}/addRoom
        And replacement {name} with a name and last name combination
      When I type in the name field with force alphabetical characters and with name already saved
       And I choose luxury room
       And I choose double bed
       And I intent choose DirecTV
       And I press the save button
     Then should no double bed
       should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form        

*/

var addRoomPO = require("../PO/add-room-PO").addRoomPO;
var PO = null;
var testData = {
    number:"Roomm",
    typeChoose:[0,1],
    type:0
};

var setNewNumber = function(){
  var id = Math.random().toString(36).substring(5);
  testData.number = id.charCodeAt(0)+""+id.charCodeAt(1)+""+id.charCodeAt(2);
};


describe('Add room', function() {

    beforeEach(function(){
        PO = new addRoomPO();
        PO.get();   
    });
  
    it('Add simple room with correctly data', function() {

        testData.type = testData.typeChoose[0];  

        setNewNumber();
        PO.waitForNameInput();
        PO.setRoomInfo(testData);
        expect(PO.getRoomLuxuryInput().isSelected()).toBe(false);
        PO.sendForm();
        PO.waitTitleMessage();
        browser.driver.sleep(1000);
        var specMessage = PO.getContentMessage();
        var specId = PO.getRoomId();  
        expect(specId.then(function(rs){return isNaN(rs-1)})).toBe(false);
        expect(specMessage).toEqual("Datos guardados correctamente.");
        expect(specId).toEqual(testData.number);

    });

    it('Add simple room with name already saved', function() {

        testData.type = testData.typeChoose[0];  

        PO.waitForNameInput();
        PO.setRoomInfo(testData);
        PO.sendForm();
        PO.waitTitleMessage();
        browser.driver.sleep(1000);
        var specMessage = PO.getContentMessage();
        expect(specMessage).toContain("No se pudo guardar debido a:");
        expect(specMessage).toContain("*El campo 'Número de habitación' ya esta registrado.");

    });

    it('Add luxury room with correctly data', function() {

        testData.type = testData.typeChoose[1];  

        setNewNumber();
        PO.waitForNameInput();
        PO.setRoomInfo(testData);
        expect(PO.getRoomSimpleInput().isSelected()).toBe(false);
        PO.sendForm();
        PO.waitTitleMessage();
        browser.driver.sleep(1000);
        var specMessage = PO.getContentMessage();
        var specId = PO.getRoomId();  
        expect(specId.then(function(rs){return isNaN(rs-1)})).toBe(false);
        expect(specMessage).toEqual("Datos guardados correctamente.");
        expect(specId).toEqual(testData.number);

    });

    it('Add luxury room with name already saved', function() {

        testData.type = testData.typeChoose[1];  

        PO.waitForNameInput();
        PO.setRoomInfo(testData);
        expect(PO.getRoomSimpleInput().isSelected()).toBe(false);
        PO.sendForm();
        PO.waitTitleMessage();
        browser.driver.sleep(1000);
        var specMessage = PO.getContentMessage();
        expect(specMessage).toContain("No se pudo guardar debido a:");
        expect(specMessage).toContain("*El campo 'Número de habitación' ya esta registrado.");

    });

    it('Add luxury room with name with force alphabetical characters', function() {

        testData.type = testData.typeChoose[1];  
        browser.executeScript('document.querySelector(\'[name="name"]\').value="adasdad"');
        PO.waitForNameInput();
        PO.setRoomInfo(testData);
        PO.sendForm();
        PO.waitTitleMessage();
        browser.driver.sleep(1000);
        var specMessage = PO.getContentMessage();
        var specId = PO.getRoomId();  
        expect(specId.then(function(rs){return isNaN(rs-1)})).toBe(false);

    });    

});