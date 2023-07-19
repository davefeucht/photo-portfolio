import { createContext } from 'react';

import { API } from './types';

export const ApiContext = createContext<API | null>(null);
