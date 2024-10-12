import type { Meta, StoryObj } from '@storybook/react';
import Image1 from 'stories/static/Image1.jpg';
import Image2 from 'stories/static/Image2.jpg';
import Image3 from 'stories/static/Image3.jpg';

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
        delay: {
            description: 'Delay in milliseconds before refreshing images in the carousel'
        },
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
        delay: 4000,
        items: [
            {
                title: 'Image1',
                imageUrl: Image1
            },
            {
                title: 'Image2',
                imageUrl: Image2
            },
            {
                title: 'Image3',
                imageUrl: Image3
            }
        ]
    }
};
