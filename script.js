// Write your JavaScript code here!
let planet;

window.addEventListener("load", function() {

   showPlanetInformation();

   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(event) {
      let pilot = document.querySelector("input[name=pilotName]");
      let coPilot = document.querySelector("input[name=copilotName]");
      let fuel = document.querySelector("input[name=fuelLevel]");
      let mass = document.querySelector("input[name=cargoMass]");

      event.preventDefault();
      //validate values
      
       if(pilot.value === "" || coPilot.value === "" || fuel.value === "" || mass.value === ""){
         alert("All fields are required");
         return;
      } else if((isNaN(fuel.value)) || (isNaN(mass.value))){
         alert("Make sure to enter valid information for each field!");
         return;
      }
      
      
      
      let fuelLevel = Number(fuel.value);
      let cargoMass = Number(mass.value);
      let faultyDiv = document.getElementById("faultyItems");
      let h2 = document.getElementById("launchStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let pilotStatus = document.getElementById("pilotStatus");
      let coPilotStatus = document.getElementById("copilotStatus");
      //check faulty conditions
      if(fuelLevel < 10000) {
         faultyDiv.style.visibility = 'visible';
         h2.innerHTML = 'Shuttle not ready for launch';
         h2.classList.add("red");
         pilotStatus.innerHTML = "Pilot " + pilot.value +" is ready for launch";
         coPilotStatus.innerHTML = "Co-Pilot " + coPilot.value +" is ready for launch";
         fuelStatus.innerHTML = "Fuel level too low for the launch";
      }
      if(cargoMass > 10000) {
         faultyDiv.style.visibility = 'visible';
         h2.innerHTML = 'Shuttle not ready for launch';
         h2.classList.add("red");
         pilotStatus.innerHTML = "Pilot " + pilot.value +" is ready for launch";
         coPilotStatus.innerHTML = "Co-Pilot " + coPilot.value +" is ready for launch";
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
      }

      if(cargoMass < 10000 && fuelLevel > 10000){
         faultyDiv.style.visibility = 'visible';
         h2.innerHTML = 'Shuttle is ready for launch'; 
         pilotStatus.innerHTML = "Pilot " + pilot.value +" is ready for launch";
         coPilotStatus.innerHTML = "Co-Pilot " + coPilot.value +" is ready for launch";
         h2.classList.add("green");
        
      }
      
   });
});




   function showPlanetInformation() {
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(planets) {
            planet = pickRandomPlanet(planets);
            let missionTarget = document.getElementById("missionTarget");
            missionTarget.innerHTML += `
            <h2>Mission Destination</h2>
            <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src=${planet.image}>
            `;
        });
   });
   }


   function pickRandomPlanet(planets){
      let index = [Math.floor(Math.random() * planets.length)];
      return planets[index];
   }


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
