# Purdue Clash

## Description

Purdue Clash is a React Native application designed to gamify and track study hours within Purdue University libraries. The app allows users to monitor their study time, compete on leaderboards, view library crowdedness on a map, and manage their profiles.

## Features

- **User Authentication:** Sign up, login, and password reset features.
- **Study Time Tracking:** Automatically track study time when within a designated Purdue library.
- **Leaderboard:** Compete with other students based on study hours (weekly and monthly rankings).
- **Interactive Map:** View crowdedness and building information within the Purdue campus.
- **Profile Management:** Users can view and update their profile, including study statistics and rankings.
- **Building Conquest:** Colleges can "conquer" buildings by accumulating the most study hours within them, adding a competitive aspect to the app.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Setup

```sh
# Clone the repository
git clone <repository_url>
cd purdue-library-study-tracker

# Install dependencies
npm install

# Start the Expo server
npm start
```

## Running the App

### Android

```sh
npm run android
```

### iOS

```sh
npm run ios
```

### Web

```sh
npm run web
```

## Folder Structure

```
.
├── components
│   ├── HomeScreen.js
│   ├── screens
│   │   ├── Login.js
│   │   ├── ForgotPW.js
│   │   ├── SignUpId.js
│   │   └── SignUpInfo.js
│   ├── fragments
│   │   ├── LeaderboardFragment.js
│   │   ├── MapFragment.js
│   │   └── ProfileFragment.js
├── assets
├── data
├── LocationManager.js
├── Theme.js
└── index.js
```

## Key Dependencies

- **React Native Paper:** UI components.
- **React Navigation:** Navigation between screens.
- **Axios:** API requests.
- **React Native Maps:** Map and location services.

## How Leaderboards and Building Conquests Work

The app uses background location tracking to monitor users' study sessions in different buildings. The `LocationManager.js` file handles location tracking and communicates with the backend to log study sessions. Based on the accumulated study hours, individual users are ranked on the leaderboard, and colleges can "conquer" buildings by contributing the most study hours within them.

## API Endpoints

- **Login:** `POST /login`
- **Signup:** `POST /signup`
- **Reset Password:** `POST /reset-password`
- **Individual Leaderboard:** `GET /individualLeaderboard/weekly`
- **Building Data:** `POST /buildingLeaderboard/individual/weekly`
- **Study Session Management:** `POST /newSession`, `POST /updateSession`

## License

This project is licensed under the MIT License.

## Contributors

- Segyul Park - [park1362@purdue.edu]
- Junhee Lim - [lim347@purdue.edu]
- Hosung Ryu - [ryu62@purdue.edu]

Feel free to contribute to this project by submitting issues or pull requests.
