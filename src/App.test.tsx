import { render, fireEvent, waitFor } from "@testing-library/react";
import ZooSimulator from './ZooSimulator';

describe("ZooSimulator component", () => {
  it("renders without crashing", () => {
    render(<ZooSimulator />);
  });

  it("testing pass hour button", () => {
    // render the component
    const { getByText, getByAltText } = render(<ZooSimulator />);
    const passHourButton = getByText("Pass Hour");

    // we get our initial time
    const initialTimeElement = getByText(/Time \(Hours Passed\):/);
    // we parse the text, and get the number of hours passed
    const initialTime = parseInt(initialTimeElement.textContent!.split(":")[1].trim());
  
    // Click the 'Pass Hour' button
    fireEvent.click(passHourButton);

    // get and parse updatedtime
    const updatedTimeElement = getByText(/Time \(Hours Passed\):/);
    const updatedTime = parseInt(updatedTimeElement.textContent!.split(":")[1].trim());

    // asserting
    expect(updatedTime).toBe(initialTime + 1); // Time should be incremented by 1

  });


  it("testing red dot animation", () => {
    const { container } = render(<ZooSimulator />);
    const zooContainer = container.querySelector(".container");
  
    // testing click event
    fireEvent.click(zooContainer!);
  
    // check if red-dot animation exist
    const redDotAnimation = document.body.querySelector('.red-dot')

    // check if red-dot animation element has been added
    expect(redDotAnimation).not.toBeNull();


  
  });
});
