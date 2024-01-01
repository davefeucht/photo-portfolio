import type { Meta, StoryObj } from '@storybook/react';

import CarouselItem from '../../components/CarouselItem/CarouselItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/CarouselItem',
    component: CarouselItem,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        imageUrl: {
            description: 'URL of the image to display in the carousel item'
        },
        title: {
            description: 'Title of the image'
        }
    }
} satisfies Meta<typeof CarouselItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        title: 'Foo',
        imageUrl: 'https://throughapinhole.com/wp-content/uploads/2022/01/5054A3FC-D229-4C61-804D-494247BA38F2-1024x655.jpeg'
    }
};
