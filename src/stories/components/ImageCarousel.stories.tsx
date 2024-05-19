import type { Meta, StoryObj } from '@storybook/react';

import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/ImageCarousel',
    component: ImageCarousel,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        items: {
            description: 'Items to display in the carousel'
        }
    }
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        items: [
            {
                title: 'Foo',
                imageUrl: 'https://throughapinhole.com/wp-content/uploads/2015/05/17301105226_36808ff398_o.jpg'
            },
            {
                title: 'Bar',
                imageUrl: 'https://throughapinhole.com/wp-content/uploads/2015/05/17675903310_0e167b43d9_o.jpg'
            },
            {
                title: 'Doom',
                imageUrl: 'https://throughapinhole.com/wp-content/uploads/2015/05/17326681651_7fa623328c_o.jpg'
            }
        ]
    }
};
