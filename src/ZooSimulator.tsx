import { useState } from "react";
import Zoo, { Status } from "./Zoo";
import './ZooSimulator.css'
// ZooSimulator component
function ZooSimulator() {
    // Initialize the state with a new instance of the Zoo
    const [zoo] = useState<Zoo>(new Zoo());

    
    const [zooStatus, setZooStatus] =  useState<Status[]>(zoo.checkStatus())
    // initializing zoo time state
    const [zooTime, setZooTime] = useState<number>(zoo.time);

    
    // Function to simulate time passing in the zoo
    const simulateTimePassing = () => {
        
        zoo.passHour();
        // set new zoo time state
        setZooTime(zoo.time)
        setZooStatus(zoo.checkStatus());
        // Update the state with the updated zoo
     
    };

    // Function to feed the animals in the zoo
    const feedAnimalsInZoo = () => {
      
        zoo.feedAnimals();
        setZooStatus(zoo.checkStatus());
        // Update the state with the updated zoo
    };

    const handleClick = (event: { clientX: any; clientY: any; }) => {
        // Get the click coordinates
        const x = event.clientX;
        const y = event.clientY;

        // Create a new redDot animation element
        const redDot = document.createElement('div');
        redDot.className = 'red-dot';
        redDot.style.left = `${x}px`;
        redDot.style.top = `${y}px`;

        // add child to document
        document.body.appendChild(redDot);

        // Remove the fireworks element after animation completes
        setTimeout(() => {
            document.body.removeChild(redDot);
        }, 500); 
    };

    return (
        <div className="container" onClick={handleClick}>
            <h1 className="title">Zoo Simulator</h1>
            <p className="time">Time (Hours Passed): {zooTime}</p>
            {/* Status of animals */}
            <div className="status">
            {/* mapping each animal status */}
            {zooStatus.map(animal => (
                    <div key={animal.name} className="animal-container">
                        <p className="animal-name">{animal.name}</p>
                        <div className="health">
                            <img src={animal.image} alt={animal.name} />
                            <p>Health: {animal.health.toFixed()}</p>
                        </div>
                    </div>
            ))}
            </div>

            {/* Buttons */}
            <div className="buttons">
                <button className="button" onClick={simulateTimePassing}>Pass Hour</button>
                <button className="button" onClick={feedAnimalsInZoo}>Feed Animals</button>
            </div>
        </div>
    );
}

export default ZooSimulator;
