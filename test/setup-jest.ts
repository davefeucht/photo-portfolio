import '@testing-library/jest-dom';

Object.defineProperty(window.screen, "orientation", {
    value: {
        type: "portrait-primary",
        addEventListener: () => {},
        removeEventListener: () => {}
    }
});
