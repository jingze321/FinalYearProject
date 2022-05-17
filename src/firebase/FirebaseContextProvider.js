import { StorageProvider } from './Storage';
import { DatabaseProvider } from './Database';
import { AuthProvider } from './Auth';
import { RealtimeDatabaseProvider } from './RealtimeDatabase';

import { combineComponents } from './combineComponents.tsx';
const providers = [
  AuthProvider,
  StorageProvider,
  DatabaseProvider,
  RealtimeDatabaseProvider
]
export const FirebaseContextProvider = combineComponents(...providers);