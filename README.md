# Card Game

## Card Game folder structure

```
.
├── android 
├── ios 
├── src
│   └── components          #Reusable components.
│   └── hooks               #Reusable custom hooks.
│   └── navigation          #React Native navigation.
│   └── redux               #Redux.
│   │   └── play_cards      #Actions, Reducers and Saga file related play_cards feature.
│   │   │   └── test        #Jest Units test for play_card feature redux.
│   │   ├──**/*.ts          #Redux files.
│   └── utils               #Reusable functions.
├── test                    #Test setup files.
├── App.tsx                 #App initialization
└── README.md
```

## Run the following command to run the application

1. Enter `yarn`

2. Enter `npx react-native start --reset-cache`

3. To run Android enter: `npx react-native run-android`

4. To run iOS enter: `npx react-native run-ios`

5. To run test enter: `yarn test`

That's it!!! :)
