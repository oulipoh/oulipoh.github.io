function observe(element, animation, threshold=1) {
    new IntersectionObserver((e, o) => {
        if (e[0].intersectionRatio >= threshold) {
            o.unobserve(e[0].target)
            animation()
        }
    }, {threshold: threshold}).observe(element)
}


// poem1
let index = 0
setInterval(() => {
    line2.innerHTML = ['היא', '<span class="hidden">הי</span>אני'][index]
    index = 1 - index
}, 1500)


// poem2
observe(poem2, animateSecondPoem)

function animateSecondPoem() {
    document.querySelectorAll('.shuruk-symbol').forEach(symbol => symbol.remove())
    vavTav.classList.remove("move");
    yodLamed.classList.add("hidden");
    period.classList.add("hidden");
    heVav.classList.add("hidden");
    newLine.classList.remove("show");
    yodLamed.classList.remove("grow", "disappear");
    heVav.classList.remove("grow-left", "disappear");

    // Step 1: Move "ות" to the left
    setTimeout(() => {
        vavTav.classList.add("move");

        // Step 2: After "ות" moves, show the period
        setTimeout(() => {
            period.classList.remove("hidden");

            // Step 3: Finally, scale the "יל" text from 0 to full width
            setTimeout(() => {
                yodLamed.classList.remove("hidden");
                yodLamed.classList.add("grow"); // Apply grow to trigger the scale

                // Step 4: Disappear the "יל" part after 3 seconds
                setTimeout(() => {
                    yodLamed.classList.add("disappear"); // Add disappear class

                    // Step 5: Show "(וה)" and scale it from left to right
                    setTimeout(() => {
                        heVav.classList.remove("hidden");
                        heVav.classList.add("grow-left"); // Trigger the scale from left to right

                        // Step 6: Make both "יל" and "וה" disappear after 4 seconds
                        setTimeout(() => {
                            heVav.classList.add("disappear");
                            //console.log(yodLamed.classList + "|" + heVav.classList)
                            //console.log(yodLamed.style.transform + "|" + heVav.style.transform)

                            //step 6.5: back to scale 0
                            setTimeout(() => {
                                yodLamed.classList.remove("grow");
                                heVav.classList.remove("grow-left");

                                // Step 7: Reanimate both "יל" and "וה" together
                                setTimeout(() => {
                                    yodLamed.classList.remove("disappear");
                                    heVav.classList.remove("disappear");
                                    yodLamed.classList.add("grow");
                                    heVav.classList.add("grow-left");
                                    //console.log(yodLamed.classList + "|" + heVav.classList)
                                    //console.log(yodLamed.style.transform + "|" + heVav.style.transform)

                                    // Step 8: Show new line after 1.5 seconds
                                    setTimeout(() => {
                                        newLine.classList.add("show");
                                        setTimeout(() => {
                                            // Step 9: Trigger the final Shuruk line animation
                                            drawShurukLine();
                                        }, 1000);
                                    }, 4000); // Increased the delay to allow proper reset
                                }, 2000); // Reanimate after a longer delay
                            }, 1000);
                        }, 7000); // Increased disappearance time for both to 4 seconds
                    }, 2000); // Allow 1.5 seconds before starting to scale "(וה)"
                }, 7000); // Wait 3 seconds for "(יל)" to disappear
            }, 4000); // After 1 second, trigger the scaling of "יל"
        }, 2000); // Wait 1.5 seconds for the movement of "ות" to complete
    }, 6000);
}

// Function to create and animate the Shuruk symbols
// Function to show the Shuruk symbols at predefined positions from an array
function drawShurukLine() {

    const newLineRect = anuVav.getBoundingClientRect();
    const startX = newLineRect.left - 12; // X position of ו
    const startY = newLineRect.top + scrollY;  // Y position of ו

    const periodRect = period.getBoundingClientRect();
    const X0 = periodRect.left ; // X position of ו
    const Y0 = periodRect.top + scrollY ;  // Y position of ו

    const vavTavRect = vavTav.getBoundingClientRect();
    const X1 = vavTavRect.left + 14; // X position of ו
    const Y1 = vavTavRect.top + 10 + scrollY;  // Y position of ו

    const space = 8;
    // Array of positions for each Shuruk symbol (x and y coordinates) relative to ו's position
    const shurukPositions = [
        // Left (straight line)
        { x: startX, y: startY },
        { x: startX - space, y: startY },
        { x: startX - space * 2, y: startY },
        { x: startX - space * 3, y: startY },
        { x: startX - space * 4, y: startY },
        { x: startX - space * 5, y: startY },
        { x: startX - space * 6, y: startY },
        { x: startX - space * 7, y: startY },
        { x: startX - space * 8, y: startY },
        { x: startX - space * 9, y: startY },
        { x: startX - space * 10, y: startY },
        { x: startX - space * 11, y: startY },

        // Downward curve (slightly adjust the first few points for curvature)
        { x: startX - space * 11.5, y: startY + space * 0.5 },  // Curve slightly down-right
        { x: startX - space * 12, y: startY + space },
        { x: startX - space * 12, y: startY + space * 2 },
        { x: startX - space * 12, y: startY + space * 3 },
        { x: startX - space * 11.5, y: startY + space * 3.5 },  // Curve slightly up-right
        { x: startX - space * 11, y: startY + space * 4 },

        // Right (straight line)
        { x: startX - space * 10, y: startY + space * 4 },
        { x: startX - space * 9, y: startY + space * 4 },
        { x: startX - space * 8, y: startY + space * 4 },
        { x: startX - space * 7, y: startY + space * 4 },
        { x: startX - space * 6, y: startY + space * 4 },
        { x: startX - space * 5, y: startY + space * 4 },
        { x: startX - space * 4, y: startY + space * 4 },
        { x: startX - space * 3, y: startY + space * 4 },
        { x: startX - space * 2, y: startY + space * 4 },
        { x: startX - space,     y: startY + space * 4 },
        { x: startX,             y: startY + space * 4 },
        { x: startX + space,     y: startY + space * 4 },
        { x: startX + space * 2, y: startY + space * 4 },
        { x: startX + space * 3, y: startY + space * 4 },
        { x: startX + space * 4, y: startY + space * 4 },

        // Upward curve (slightly adjust the first few points for curvature)
        { x: startX + space * 4.5, y: startY + space * 3.5 },
        { x: startX + space * 5, y: startY + space * 3.2 },
        { x: startX + space * 5.5, y: startY + space * 2.7 },
        { x: startX + space * 6, y: startY + space * 2.0 },
        { x: startX + space * 6.5, y: startY + space * 1.5 },
        { x: startX + space * 7, y: startY + space },

        // Straight line up
        { x: startX + space * 7, y: startY },
        { x: startX + space * 7, y: startY - space },
        { x: startX + space * 7, y: startY - space * 2 },
        { x: startX + space * 7, y: startY - space * 3 },
        { x: startX + space * 7, y: startY - space * 4 },
        { x: startX + space * 7, y: startY - space * 5 },
        { x: startX + space * 7, y: startY - space * 6 },
        { x: startX + space * 7, y: startY - space * 7 },
        { x: startX + space * 7, y: startY - space * 8 },

        // Left (curve slightly at direction change)
        { x: startX + space * 6.5, y: startY - space * 8.5 },  // Curve slightly left-down
        { x: startX + space * 6, y: startY - space * 9 },      // Continue left-down
        { x: startX + space * 5.5, y: startY - space * 9.5 },  // Continue left-down
        { x: startX + space * 5, y: startY - space * 10 },         // Curve to straight left
        { x: startX + space * 4, y: startY - space * 10 },
        { x: startX + space * 3, y: startY - space * 10 },
        { x: startX + space * 2, y: startY - space * 10 },
        { x: startX + space    , y: startY - space * 10 },
        { x: startX,             y: startY - space * 10 },         // Curve to straight left
        { x: startX - space,     y: startY - space * 10 },
        { x: startX - space * 2, y: startY - space * 10 },
        { x: startX - space * 3, y: startY - space * 10 },
        { x: startX - space * 4, y: startY - space * 10 },

        // Down (slight curve)
        { x: X0 - space * 0.25, y: Y0 - space * 3.25 },
        { x: X0 - space * 0.5, y: Y0 - space * 2.5 },
        { x: X0 - space * 0.5, y: Y0 - space * 1.5 },
        { x: X0 - space * 0.5, y: Y0 - space },
        { x: X0 - space * 0.5, y: Y0 },
        { x: X0 - space * 0.5, y: Y0 + space },
        { x: X0 - space * 0.5, y: Y0 + space * 2 },

        // Left (slight curve)
        { x: startX - space * 6, y: startY - space * 3 },
        { x: startX - space * 7, y: startY - space * 3 },
        { x: startX - space * 8, y: startY - space * 3 },
        { x: startX - space * 9, y: startY - space * 3 },
        { x: startX - space * 10, y: startY - space * 3 },
        { x: startX - space * 11, y: startY - space * 3 },

        // Upward curve
        { x: X1 + space * 0.5, y: Y1 + space * 1.5 },  // Curve slightly right-down
        { x: X1,               y: Y1 + space },
        { x: X1 - space * 0.5, y: Y1 },
        { x: X1 - space * 0.5, y: Y1 - space },
        { x: X1 - space * 0.5, y: Y1 - space * 2 },
        { x: X1 - space * 0.5, y: Y1 - space * 3 },

        // Right
        { x: X1,             y: Y1 - space * 4 },
        { x: X1 + space,     y: Y1 - space * 4 },
        { x: X1 + space * 2, y: Y1 - space * 4 },
        { x: X1 + space * 3, y: Y1 - space * 4 },
        { x: X1 + space * 4, y: Y1 - space * 4 },
        { x: X1 + space * 5, y: Y1 - space * 4 },
        { x: X1 + space * 6, y: Y1 - space * 4 },
        { x: X1 + space * 7, y: Y1 - space * 4 },
        { x: X1 + space * 8, y: Y1 - space * 4 },
        { x: X1 + space * 9, y: Y1 - space * 4 },
        { x: X1 + space * 10, y: Y1 - space * 4 },
        { x: X1 + space * 11, y: Y1 - space * 4 },

        // Upward curve
        { x: X1 + space * 11.5 - 3, y: Y1 - space * 5 },
        { x: X1 + space * 11.5 - 2, y: Y1 - space * 6 },
        { x: X1 + space * 11.5 - 2, y: Y1 - space * 7 },
        { x: X1 + space * 11.5 - 2, y: Y1 - space * 8 },
        { x: X1 + space * 11.5 - 2, y: Y1 - space * 9 },
        { x: X1 + space * 11.5 - 2, y: Y1 - space * 10 },

        // Left
        { x: X1 + space * 11.5 - 1.5, y: Y1 - space * 10 },

        // Up (straight)
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 10 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 10 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 11 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 12 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 13 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 14 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 15 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 16 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 17 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 18 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 19 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 20 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 21 },
        { x: X1 + space * 10.5 - 1, y: Y1 - space * 22 },
        // Right
        { x: X1 + space * 11.5, y: Y1 - space * 22.5 },
        { x: X1 + space * 12.5, y: Y1 - space * 22.5 },
        { x: X1 + space * 13.5, y: Y1 - space * 22.5 },
        { x: X1 + space * 14.5, y: Y1 - space * 22.5 },
        // Up
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 23.5 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 24 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 25 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 26 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 27 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 28 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 29 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 30 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 31 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 32 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 33 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 34 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 35 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 36 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 37 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 38 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 39 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 40 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 41 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 42 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 43 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 44 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 45 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 46 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 47 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 48 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 49 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 50 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 51 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 52 },
        { x: X1 + space * 15.5 + 2, y: Y1 - space * 53 }
    ];

    // Iterate over the array of positions and create Shuruk symbols
    shurukPositions.forEach((position, index) => {
        const symbol = document.createElement("span");
        symbol.classList.add("shuruk-symbol");
        symbol.textContent = "\u05BC";  // Correct Shuruk symbol (ּ)

        // Set the position based on the array values
        symbol.style.left = `${position.x}px`;
        symbol.style.top = `${position.y}px`;

        // Append the symbol to the container with a delay to simulate appearance
        setTimeout(() => {
            lineAnimation.appendChild(symbol); // Add each symbol after a delay
        }, index * 200); // Delay by 500ms between each symbol appearing
    });

    setTimeout(animateSecondPoem, (shurukPositions.length-1)*200 + 6000)
}


// poem3
// Get the elements containing the ל ל לל ל lines
const movingLElements = document.querySelectorAll('.movings');
// Get the elements containing the ק ק lines
const movingLElements2 = document.querySelectorAll('.movings2');

observe(poem3, animateThirdPoem, .5)

function animateThirdPoem() {
    setTimeout(showAndAnimate, 6000)
}

// Function to position the moving elements directly above the "לְחָלָלאֱלֹ" part
function positionElements() {
    // Get the bounding rectangle of the target text
    const targetRect = targetText.getBoundingClientRect();

    // Calculate the position where the lines should appear
    const startX3 = targetRect.left; // Include scroll offset
    const startY3 = targetRect.top + scrollY;

    // Position each moving-l element with a slight vertical offset
    movingLElements.forEach((element, index) => {
        //console.log(index + "|"  + element.style.left + "|" + element.style.top);
        element.style.left = `${startX3}px`; // Align with the target text
        element.style.top = `${startY3}px`; // Stack the lines vertically above
    });
}

// Function to show the elements and animate them upward
function showAndAnimate() {
    positionElements()
    movingLElements.forEach((e, index) => e.classList.add("moving-" + (index + 1)))
    setTimeout(showAndAnimate2, 23000)
}

function positionElements2() {
    // Get the bounding rectangle of the target text
    const targetRect2 = targetText2.getBoundingClientRect();

    // Calculate the position where the lines should appear
    const startX4 = targetRect2.left; // Include scroll offset
    const startY4 = targetRect2.top + scrollY;

    // Position each moving-l element with a slight vertical offset
    movingLElements2.forEach((element, index) => {
        //console.log(index + "|"  + element.style.left + "|" + element.style.top);
        element.style.left = `${startX4}px`; // Align with the target text
        element.style.top = `${startY4}px`; // Stack the lines vertically above
    });
}

// Function to show the elements and animate them upward
function showAndAnimate2() {
    positionElements2()
    movingLElements2.forEach((e, index) => e.classList.add("moving2-" + (index + 1)))
    setTimeout(addX, 26000)
}


let initialDelay = 600; // Start with a slower delay
const minDelay = 90; // Set a minimum delay (fastest speed)
const accelerationFactor = 0.9; // Factor by which delay decreases each time

function addX() {
    let currentText = '';
    let delay = initialDelay;

    function addCharacter() {
        currentText += 'ש';
        shins.textContent = currentText;
        delay = Math.max(minDelay, delay * accelerationFactor);
        if (currentText.length < 120)
            setTimeout(addCharacter, delay)
        else
            addX_right(delay)
    }

    addCharacter()
}

function addX_right(delay) {
    let currentText = '';

    function addCharacter() {
        currentText += 'ש';
        shins_container.dataset.content = currentText;

        if (currentText.length < 100) {
            delay = Math.max(minDelay, delay * accelerationFactor);
            setTimeout(addCharacter, delay)
        }
        else
            setTimeout(reset3, 6000)
    }

    addCharacter()
}

function reset3() {
    movingLElements.forEach((element, index) => element.classList.remove("moving-" + (index + 1)))
    movingLElements2.forEach((element, index) => element.classList.remove("moving2-" + (index + 1)))
    shins.textContent = ''
    shins_container.dataset.content = ''
    animateThirdPoem()
}

addEventListener('resize', positionElements, {passive: true});
addEventListener('resize', positionElements2, {passive: true});