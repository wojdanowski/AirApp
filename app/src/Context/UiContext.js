import React from 'react';

const UiContext = React.createContext();

export const UiProvider = UiContext.Provider;
export const UiConsumer = UiContext.Consumer;

export default UiContext;
