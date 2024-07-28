# Health Challenge Tracker

## Description

The Health Challenge Tracker is a web application that allows users to track their workouts, view workout statistics, and manage workout data. This project was built using Angular and features components for adding workouts, filtering, listing, and visualizing workout data.

## Features

- **Workout Form**: Add and manage workouts.
- **Search Filter**: Filter workouts by name and type.
- **Workout List**: View a list of all workouts.
- **User Workout Chart**: Visualize workout data for each user with charts.

## Hosted Website

You can view the live application [here](https://health-challenge-tracker-v1-seven.vercel.app/).

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/sret-farhan2021/health-challenge-tracker.git `

2.  Navigate to the project directory:
    `cd health-challenge-tracker`

2.  Install the dependencies:
    `npm install`

3.  Run the application:
    `ng serve`

    Open `http://localhost:4200` in your browser to view the application.

Running Tests
-------------

To run the unit tests and generate a code coverage report, use the following command:

`ng test --code-coverage`

The coverage report will be generated in the `coverage` directory. Open `coverage/index.html` in your browser to view the detailed coverage report.

Code Coverage
-------------

The project includes unit tests for the following:

-   **Component**: UserWorkoutChartComponent
-   **Service**: WorkoutService

Both the component and the service have 100% code coverage.
