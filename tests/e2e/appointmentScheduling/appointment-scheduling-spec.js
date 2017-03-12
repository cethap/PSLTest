/*

--Gherkin Draft--

  Feature: Admin appointment scheduling info
    In order to attend a user at a medical appointment correctly
  
    Scenario: Appointment scheduling with correctly data
      Given the URL http://automatizacion.herokuapp.com/{name}/appointmentScheduling
        And replacement {name} with a name and last name combination
      When I type day of the next month
       And I type the patient id field
       And I type the doctor id field
       And I type the note box
       And I press the save button
     Then should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form 

    Scenario: Appointment scheduling with correctly data
      Given the URL http://automatizacion.herokuapp.com/{name}/appointmentScheduling
        And replacement {name} with a name and last name combination
      When I type day of the previous month
       And I type bad the patient id field
       And I type bad the doctor id field
       And I type the note box
       And I press the save button
     Then should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form       
              
*/

var appointmentSchedulingPO = require("../PO/appointment-scheduling-PO").appointmentSchedulingPO;
var PO = null;
var testData = {
    patient:"123",
    doctor:"456",
    note:"3405609876",
    time:""
};

describe('Appointment Scheduling', function() {
  
  beforeEach(function(){
      PO = new appointmentSchedulingPO();
      PO.get();
  });

  it('Appointment scheduling with correctly data', function() {

    var dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth()+1);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    testData.time =  ((month<10)?"0"+month:month) + "/" + ((day<10)?"0"+day:day) + "/" + year;

    testData.doctor = browser.params.glob.doctorID||"123...";
    testData.patient = browser.params.glob.patientID||"123...";

    PO.waitForDatepickerInput();
    PO.setAppointmentSchedulingInfo(testData);
    PO.sendForm();
    PO.waitTitleMessage();
    browser.driver.sleep(500);
    var specMessage = PO.getContentMessage();
    expect(specMessage).toEqual("Datos guardados correctamente.");
    
  });

  it('Appointment scheduling with incorrect data', function() {

    testData.doctor = "123...";
    testData.patient = "123...";

    var dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth()-1);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    testData.time =  ((month<10)?"0"+month:month) + "/" + ((day<10)?"0"+day:day) + "/" + year;
    
    PO.waitForDatepickerInput();
    PO.setAppointmentSchedulingInfo(testData);
    PO.sendForm();
    PO.waitTitleMessage();
    browser.driver.sleep(500);
    var specMessage = PO.getContentMessage();
    expect(specMessage).toContain("*El campo 'Documento de identidad' no se encuentra entre nuestros doctores.");
    expect(specMessage).toContain("*El campo 'Documento de identidad' no se encuentra entre nuestros pacientes registrados.");
    
  });


});