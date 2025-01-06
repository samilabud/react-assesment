# React Webpack Assessment

This project is a simple React application that demonstrates the use of React Router for navigation and Material-UI for styling. The application allows users to view a list of projects and edit project details.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/samilabud/react-assesment
cd react-webpack-assessment
```

2. Install the dependencies:

```sh
npm install
```

## Running the Project

### To start the development server, run:

```sh
npm start
```

This will start the webpack development server and open the application in your default web browser at http://localhost:3034.

## Building the Project

```sh
npm run build
```

This will create a `dist` directory with the production build of the application.

## Project Description

The application consists of the following components:

- **Sidebar**: Displays a list of favorite projects.
- **ProjectList**: Displays a table of projects with options to edit each project.
- **ProjectEdit**: Allows users to edit the details of a selected project.

The main entry point of the application is index.js, which renders the App component. The App component sets up the routing for the application using React Router.

### Components

- **Sidebar**: Located in Sidebar.js. It is a simple sidebar with a list of favorite projects.
- **ProjectList**: Located in ProjectList.js. It displays a table of projects with an edit button for each project.
- **ProjectEdit**: Located in ProjectEdit.js. It provides a form to edit the details of a selected project.

### Routing

The application uses React Router for navigation. The routes are defined in the App component (`src/App.js`):

- `/`: Displays the ProjectList component.
- `/edit/:id`: Displays the ProjectEdit component for the project with the specified ID.
