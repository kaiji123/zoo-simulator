// defining animal type
type AnimalType = 'Monkey' | 'Giraffe' | 'Elephant'
// Animal interface
interface Animal {
    type: AnimalType;
    health: number;
    isDead: boolean;
    decreaseHealth(percent: number): void;
    increaseHealth(percent: number): void;
    isWalking(): boolean;
    isAlive(): boolean;
}

// Implementation of Anima
class AnimalImpl implements Animal {
    type: AnimalType;
    health: number;
    isDead: boolean;

    // we can define thresholds for giraffe and monkey
    private readonly MONKEY_THRESHOLD = 30;
    private readonly GIRAFFE_THRESHOLD = 50;

    // construction animal with AnimalType and health
    // we use typescript to ensure the type will be one of them, otherwise it will raise an error
    constructor(type: AnimalType, health: number = 100) {
        this.type = type;
        this.health = health;
        this.isDead = false;
    }



    // decreasing health when an hour passes
    decreaseHealth(percent: number) {
        // since we decrease health when hour passes we do a precheck if elephant was already at 70% health, if so dead
        if (this.type === 'Elephant' && this.health < 70){
            this.isDead = true;
            this.health = 0
            return
        }
        this.health -= percent;
        // check death for monkey and giraffe
        if ((this.type === 'Monkey' && this.health < this.MONKEY_THRESHOLD) || 
            (this.type === 'Giraffe' && this.health < this.GIRAFFE_THRESHOLD)) {
            this.isDead = true;
            this.health = 0
        } 
      
    }

    // increasing health when fed
    increaseHealth(percent: number) {
        this.health += percent;
        // if health is more than 100% make it 100%, capping of health
        if (this.health > 100) {
            this.health = 100;
        }
    }

    // check if animal is walking
    isWalking() {
        // since the walking conditions weren't defined for monkey and giraffe we assume it is true
        return !(this.type === 'Elephant' && this.health < 70);
    }

    // check if animal is alive
    isAlive() {
        return !this.isDead;
    }
}


type Status = { 
    name: string;
    health: number;
    image: string;
}

// Zoo class
class Zoo {
    // hashmap for animals for further convenience
    animals: { [key: string]: Animal[] };
    time: number;

    constructor() {

        // initializing animals with hashmap
        this.animals = {
            // we use fill.map to initialize separate instance
            // if we just use .fill it will reference to the same instance
            monkey: Array(5).fill(null).map(() => new AnimalImpl('Monkey')),
            giraffe: Array(5).fill(null).map(() => new AnimalImpl('Giraffe')),
            elephant: Array(5).fill(null).map(() => new AnimalImpl('Elephant'))
        };
        // Initialize the time passed in zoo
        this.time = 0;
    }

    // Method to simulate time passing in the zoo
    passHour() {
        this.time++;

        // Iterate over each type of animal in animals map
        for (let type in this.animals) {

            // Update the health of each animal based on the time passed
            this.animals[type].forEach(animal => {
                // we can only decrease health of animals who are alive
                if (animal.isAlive()) {

                    // since math.random generates a floating point between 0 (inclusive) and 1 (exclusive)
                    // after floor operation the number will be between 0 and 20 (all inclusive)
                    const decreasePercent = Math.floor(Math.random() * 21);
                   
                    animal.decreaseHealth(decreasePercent);
                }
            });
        }
    }

    // Method to feed the animals in the zoo
    feedAnimals() {
        // Iterate over each type of animal
        for (let type in this.animals) {

            // Increase the health of each animal after feeding
            this.animals[type].forEach(animal => {

                // we can only feed animals who are alive
                if (animal.isAlive()) {
                    // generates [0 , 15] (all inclusive) and then adds 10 to bounds, so [10, 25]
                    const increasePercent = Math.floor(Math.random() * 16) + 10;
                    animal.increaseHealth(increasePercent);
                }
            });
        }
    }

   
    //check the status of the animals in the zoo
    checkStatus() {
        const status: Status[] = [];
        // Iterate over each type of animal
        for (let type in this.animals) {
            // Display the health of each animal
            this.animals[type].forEach(animal => {
                status.push({
                    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${status.length + 1}`,
                    health: animal.health,
                    image: this.getAnimalImage(animal.type, animal.isAlive())
                });
            });
        }
        return status;
    }

    // this is used to get image of an animal, we need to check the type and if it is alive
    getAnimalImage(type: AnimalType, isAlive: boolean): string {
        // if animal is not alive, render grave icon
        if (!isAlive){
            return 'death-grave-icon.png';
        }
        // if animal is alive
        switch (type) {
            case 'Monkey':
                return 'monkey-face-animal-icon.png';
            case 'Giraffe':
                return 'giraffe-icon.png';
            case 'Elephant':
                return 'elephant-icon.png';
            default:
                return '';
        }
    }

}

export default Zoo;
export type {Status};