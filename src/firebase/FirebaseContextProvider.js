import React from 'react';
import { StorageProvider } from './Storage';
import { DatabaseProvider } from './Database';
import { AuthProvider } from './Auth';

import { combineComponents } from './combineComponents.tsx';
const providers = [
  StorageProvider,
  DatabaseProvider,
  AuthProvider
]
export const FirebaseContextProvider = combineComponents(...providers);