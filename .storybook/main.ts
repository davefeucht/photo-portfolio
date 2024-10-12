import type { StorybookConfig } from "@storybook/react-webpack5";
import { dirname, join, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-interactions"),
        getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
        "@chromatic-com/storybook"
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {
            builder: {}
        }
    },

    docs: {
        defaultName: "Documentation"
    },

    webpackFinal: async config => {
        if (!config.resolve) {
            config.resolve = {};
        }

        config.resolve.modules = [
            ...(config.resolve?.modules ?? []),
            resolve(__dirname, "../src")
        ]
        return config;
    }
};
export default config;
