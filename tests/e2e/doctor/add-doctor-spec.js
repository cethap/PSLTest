/*

--Gherkin Draft--

  Feature: Admin doctors info
    In order to attend a user at a medical appointment correctly
  
    Scenario: Add doctor with correctly data
      Given the URL http://automatizacion.herokuapp.com/{name}/addDoctor
        And replacement {name} with a name and last name combination
      When I type in the name field
       And I type in the last name field
       And I type in the telephone field
       And I type in the identification type field
       And I type in the identification field
       And I press the save button
     Then should show the next message "Datos guardados correctamente."
       And should show the text referenced in fields typed in previous form 

    Scenario: Add doctor with id already saved
      Given the URL http://automatizacion.herokuapp.com/{name}/addDoctor
        And replacement {name} with a name and last name combination
      When I type in the name field
       And I type in the last name field
       And I type in the telephone field
       And I type in the identification type field
       And I type in the identification field with id already saved
       And I press the save button
     Then should show that contains the next message "*El campo 'Documento de identidad' ya esta registrado."
       And should show the text referenced in fields typed in previous form   

    Scenario: Add doctor with id already saved and without a require fields
      Given the URL http://automatizacion.herokuapp.com/{name}/addDoctor
        And replacement {name} with a name and last name combination
      When I don't type in the name field
       And I don't type in the last name field
       And I type in the telephone field
       And I type in the identification type field
       And I type in the identification field with id already saved
       And I press the save button
     Then should show that contains the next message "*El campo 'Documento de identidad' ya esta registrado."
       And should show the text referenced in fields typed in previous form               
*/

var addDoctorPO = require("../PO/doctor/add-doctor-PO").addDoctorPO;
var PO = null;
var testData = {
    name:"Doctor",
    lastName:"House",
    telephone:"3405609876",
    identificationType: ["Cédula de cuidadanía", "Cédula de extrangería", "Pasaportes"],
    identification: ""
};

var setNewIdentification = function(){
  var id = Math.random().toString(36).substring(5);
  testData.identification = id.charCodeAt(0)+""+id.charCodeAt(1)+""+id.charCodeAt(2);
};

beforeEach(function(){
    PO = new addDoctorPO();
    PO.get();
    testData.identificationType = testData.identificationType[
      Math.floor(Math.random() * testData.identificationType.length)
    ];
});

describe('Add doctor', function() {
  
  it('Add doctor with correctly data', function() {

    setNewIdentification();
    PO.setPersonalInfo(testData);
    PO.sendForm();
    PO.waitTitleMessage();
    var specMessage = PO.getContentMessage();
    var specId = PO.getDoctorId();
    expect(specMessage).toEqual("Datos guardados correctamente.");
    expect(specId).toEqual(testData.identification);
    

  });

  it('Add doctor with id already saved', function() {

    PO.setPersonalInfo(testData);
    PO.sendForm();
    PO.waitTitleMessage();
    var specMessage = PO.getContentMessage();
    expect(specMessage).toContain("No se pudo guardar debido a:");
    expect(specMessage).toContain("*El campo 'Documento de identidad' ya esta registrado.");

  });

  it('Add doctor with id already saved and without a require fields', function() {
    testData.name = "";
    testData.lastName = "";
    PO.setPersonalInfo(testData);
    PO.sendForm();
    PO.waitTitleMessage();
    var specMessage = PO.getContentMessage();
    expect(specMessage).toContain("No se pudo guardar debido a:");
    expect(specMessage).toContain("*El campo 'Nombre' es requerido.");
    expect(specMessage).toContain("*El campo 'Apellidos' es requerido.");
    expect(specMessage).toContain("*El campo 'Documento de identidad' ya esta registrado.");

  });  

});