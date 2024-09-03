# Area-Application

## Project Status

**Note:** The code available in this repository is for the mobile client. The application is not completed.

## Project Overview

The goal of this project is to develop an automation platform similar to IFTTT or Zapier, where users can create automated workflows (referred to as "AREA" in this project) by interconnecting different services. The project is divided into three main components:

1. **Application Server**: This is the core of the project, implementing all business logic and exposing a REST API for the clients.
2. **Web Client**: A user interface accessible via a web browser to interact with the application server.
3. **Mobile Client**: A mobile application allowing users to interact with the platform from their smartphones.

The mobile and web clients serve only as interfaces and do not perform any business logic, which is entirely handled by the application server.

### Main Features

- **User Management**: Allows users to register, authenticate, and manage their profiles.
- **Service Subscription**: Users can subscribe to various services (e.g., Google, Facebook) and link their accounts.
- **AREA Creation**: Users can create automation tasks (AREA) by linking actions (triggers) from one service to reactions (outputs) in another service.
- **Trigger and Execute**: The application server automatically triggers the specified REActions when the corresponding Actions occur.

## Technologies Used

- **React Native**: Used for developing the mobile client.
- **Expo**: Used to facilitate the development process with React Native.
- **No External Libraries**: Only core React Native functionalities have been used without relying on large external libraries.

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Lucaspalazuelo/Area-Application.git
    cd Area-Application
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the project**:
    ```bash
    npm start
    ```
    This command will start the Expo development server, and you can run the project on your local machine or connected device.

## Usage

Once the project is running, you can view the application on your mobile device using the Expo Go app or an emulator. The application includes basic functionalities such as user registration, service subscription, and creating automation workflows.
