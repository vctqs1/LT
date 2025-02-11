import { handleEvent } from './diagnostics';

/**
 * Learnosity Toolkit constructor module.
 * @module Authoring/App
 */

const state = {};

/**
 * Constructor method for Learnosity Toolkit.
 * @since 2.0.0
 * @param {object} app - Author API app instance
 * @example
 * // Declare and set your variable with the Author API LearnosityAuthor.init() method
 * const authorApp = LearnosityAuthor.init(signedConfigObject);
 *
 * // Pass that app instance to the Toolkit constructor in the Author API readyListener()
 * import { LT } from '[path/to/tookit/index]';
 * LT.init(authorApp);
 *
 * // Can be handy in the global scope for development
 * window.LT = LT;
 */
export function init(app) {
    state.app = app;
    setupListeners();
}

/**
 * Returns the Author API app instance that the host page declared.
 * @since 2.0.0
 * @returns {object}
 */
export function appInstance() {
    return state.app;
}

/**
 * The Question Editor API app instance, or `null` if not loaded.
 * @since 2.2.0
 * @returns {object | null}
 */
export function questionEditorApp() {
    return appInstance().editorApp() !== undefined ? appInstance().editorApp() : null;
}

/**
 * Sets up listeners on all events to pass to the diagnostics module.
 * Should not be called externally.
 * @since 2.0.0
 * @ignore
 */
function setupListeners() {
    // Sends all Author API events for handling.
    state.app.on('all', e => {
        handleEvent(e);
    });
    state.app.on('widgetedit:editor:ready', e => {
        handleEvent('widgetedit:editor:ready');
    });
    state.app.on('widgetedit:widget:ready', e => {
        handleEvent('widgetedit:widget:ready');
    });
    state.app.on('widgetedit:preview:changed', e => {
        handleEvent('widgetedit:preview:changed');
    });
    state.app.on('widgetedit:widget:changed', e => {
        handleEvent('widgetedit:widget:changed');
    });
}
