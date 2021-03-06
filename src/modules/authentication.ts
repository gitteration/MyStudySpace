/**
 *  session and jwt
 */

import session from 'express-session';
const session_config = require('../config/authentication').session;

declare module 'express-session' {
    interface SessionData {
        uid: string;
    }
}
export = session(session_config);
