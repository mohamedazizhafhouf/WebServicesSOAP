const soap = require('soap');
const WSDL_URL = 'http://localhost:8000/temperature?wsdl';
async function main() {
 try {
 // Créer le client SOAP
 const client = await soap.createClientAsync(WSDL_URL);
 console.log('✅ Client SOAP connecté !');
 console.log('🚀 Opérations disponibles:',
Object.keys(client.TemperatureService.TemperaturePort));
 console.log('\n--- Tests des opérations ---\n');

 

 //Temperature Conversion
  const ctfResult = await client.CelsiusToFahrenheitAsync({ a: 32});
  console.log(`Celsius To Fahrenheit: 32 C = ${ctfResult[0].result} F`);

  const ftcResult = await client.FahrenheitToCelsiusAsync({ a: 89.6});
  console.log(`Fahrenheit To Celsius: 89.6 F = ${ftcResult[0].result} C`);

  
  const ctkResult = await client.CelsiusToKelvinAsync({ a: 40});
  console.log(`Celsius To Kelvin: 40 C = ${ctkResult[0].result} K`);

 
 } catch (error) {
 console.error('Erreur de connexion:', error.message);
 }
}
main();