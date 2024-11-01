import { createContext } from 'react';

import { Store } from './types';

export const StoreContext = createContext<Store | null>(null);
