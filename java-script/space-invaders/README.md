# 👾 Space Invaders (Grid-Based)

## 📄 Description
A recreation of the classic arcade game, **Space Invaders**. This project demonstrates core game development principles using vanilla JavaScript, focusing on grid-based rendering and real-time state management. The entire game logic, from movement to collision and scoring, is handled dynamically through DOM manipulation.

## 🛠️ Technologies
* **HTML5 & CSS3:** Used to create the 15x15 game grid and handle all visual styling (for the invaders, the shooter, and the laser).
* **Vanilla JavaScript:** The core game engine. No external libraries were used.

## 💡 Key Concepts Applied
The main complexity and learning points in this project were:

* **Grid-Based Rendering (DOM Manipulation):** Instead of using the Canvas API, the game elements (aliens, shooter, laser) are represented by applying specific CSS classes (`.invaders`, `.shooter`, `.laser`) to **div elements** within a fixed grid structure.
* **Game Loop (`setInterval`):** An interval function (`invadersId`) is used to manage the **aliens' movement** at a constant speed, creating the real-time game experience.
* **Boundary and Direction Logic:** Implementation of logic to detect when the invaders hit the left or right edge, forcing them to **step down** (`alienInvaders[i] += width + 1;`) and **reverse direction**.
* **Collision Detection:** Handled by checking if a grid square contains both the `.laser` and the `.invaders` CSS classes simultaneously.
* **State Management:** Using an array (`alienInvaders`) to store the current position of all invaders and another array (`aliensRemoved`) to track destroyed targets.

## 🚀 How to Run
To run this project, simply open the `index.html` file directly in your web browser.