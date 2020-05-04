import React from 'react';

const MainState = React.createContext();

export const MainStateProvider = MainState.Provider;
export const MainStateConsumer = MainState.Consumer;

export default MainState;
