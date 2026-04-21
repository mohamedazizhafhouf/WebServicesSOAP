const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;
// Implémentation des opérations du service
const calculatorService = {
 CalculatorService: {
 CalculatorPort: {
 // Opération Addition
 Add: function(args) {
 const result = parseFloat(args.a) + parseFloat(args.b);
 console.log(`Add: ${args.a} + ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Soustraction
 Subtract: function(args) {
 const result = parseFloat(args.a) - parseFloat(args.b);
 console.log(`Subtract: ${args.a} - ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Multiplication
 Multiply: function(args) {
 const result = parseFloat(args.a) * parseFloat(args.b);
 console.log(`Multiply: ${args.a} * ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Division
 Divide: function(args) {
 if (parseFloat(args.b) === 0) {
 throw {
 Fault: {
 Code: { Value: 'DIVIDE_BY_ZERO' },
 Reason: { Text: 'Division par zéro impossible' }
 }
 };
 }
 const result = parseFloat(args.a) / parseFloat(args.b);
 console.log(`Divide: ${args.a} / ${args.b} = ${result}`);
 return { result: result };
 },

  // Opération Modulo
 Modulo: function(args) {
 if (parseFloat(args.b) === 0) {
 throw {
 Fault: {
 Code: { Value: 'DIVIDE_BY_ZERO' },
 Reason: { Text: 'Division par zéro impossible' }
 }
 };
 }
 const result = parseFloat(args.a) % parseFloat(args.b);
 console.log(`Modulo: ${args.a} % ${args.b} = ${result}`);
 return { result: result };
 }, 

 // Opération Power
 Power: function(args) {
 if (parseFloat(args.b)<0){
    const result = 1/(Math.pow(parseFloat(args.a),parseFloat(args.b)));
 }
 const result = Math.pow(parseFloat(args.a),parseFloat(args.b));
 console.log(`Power: ${args.a} ^ ${args.b} = ${result}`);
 return { result: result };
 },

 }
 }
};

const temperatureService = {
 TemperatureService: {
 TemperaturePort: {
    // Temperature Conversion
 CelsiusToFahrenheit: function(args) {
 const result = parseFloat(args.a)*(9/5)+32;
 console.log(`Celsius To Fahrenheit: ${args.a} C = ${result} F`);
 return { result: result };
 },

 FahrenheitToCelsius: function(args) {
 const result = (parseFloat(args.a)-32)*(5/9);
 console.log(`Fahrenheit To Celsius: ${args.a} F = ${result} C`);
 return { result: result };
 },

 CelsiusToKelvin: function(args) {
 const result = parseFloat(args.a)+273.15;
 console.log(`Celsius To Kelvin: ${args.a} C = ${result} k`);
 return { result: result };
 },
 }
 }
};
// Lire le fichier WSDL
const wsdlPath = path.join(__dirname, 'calculator.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');
const wsdlPath2 = path.join(__dirname, 'temperature.wsdl');
const wsdl2 = fs.readFileSync(wsdlPath2, 'utf8');

// Démarrer le serveur
app.listen(PORT, function() {
 console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);

 // Créer le service SOAP
 const server = soap.listen(app, '/calculator', calculatorService, wsdl);
 const temperatureServer = soap.listen(app, '/temperature', temperatureService, wsdl2);

 console.log(`🚀 WSDL Calculator disponible sur http://localhost:${PORT}/calculator?wsdl`);
  console.log(`🚀 WSDL Temperature disponible sur http://localhost:${PORT}/temperature?wsdl`);


 // Log des requêtes entrantes (debug)
 server.log = function(type, data) {
 console.log(`[${type}]`, data);
 };
});