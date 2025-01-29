# Vôlei Web App

## Overview
Welcome to the Vôlei Web App! This application allows you to enter names, generate random teams, and assign a volleyball emoji to one lucky player. The app is built using HTML, CSS, and JavaScript.

## Features
- **Input Box and Add Button**: Enter names and add them to a list.
- **Delete Button**: Remove names from the list.
- **Options Box**: Select the number of teams to generate.
- **Random Team Generation**: Create random teams and assign a volleyball emoji to one player in a star team.
- **Responsive Design**: Display teams in a 2x2 grid, adapting to different screen sizes.

## Project Structure
```
my-web-app
├── src
│   ├── index.html      # Main HTML document
│   ├── styles.css      # Styles for the web application
│   └── app.js          # Main JavaScript file
├── package.json        # npm configuration file
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd my-web-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application
To start the application, open `src/index.html` in your web browser.

## User Journey

### Step 1: Open the Application
Open the `index.html` file in your web browser. You will see the main interface of the Vôlei Web App.

### Step 2: Add Names
1. Enter a name in the input box at the bottom of the screen.
2. Click the "+" button or press "Enter" to add the name to the list.
3. Repeat this process to add more names.

### Step 3: Delete Names
If you need to delete a name:
1. Click the "×" button next to the name you want to remove.
2. The name will be removed from the list, and the remaining names will be reindexed.

### Step 4: Generate Teams
1. Click one of the buttons in the options box to select the number of teams (2, 3, 4, or 5).
2. The teams will be generated and displayed in a 2x2 grid.
3. One player in a star team will be randomly assigned a volleyball emoji.

### Step 5: Redraw Teams
If you want to redraw the teams:
1. Click the "Tirar de novo" button.
2. The teams will be regenerated with the same number of teams.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.