import { getNextPost, getPreviousPost } from "utils/PostHelper";

import { posts } from "../data/testData";

describe('Post Helper', () => {
    it('Should get the next post when it exists', () => {
        const nextPostId = getNextPost(1, posts);
        expect(nextPostId).toEqual(2);
    });

    it('Should indicate when there is no next post', () => {
        const nextPostId = getNextPost(2, posts);
        expect(nextPostId).toEqual(-1);
    });

    it('Should get the previous post when it exists', () => {
        const nextPostId = getPreviousPost(2, posts);
        expect(nextPostId).toEqual(1);
    });

    it('Should indicate when there is no previous post', () => {
        const nextPostId = getPreviousPost(1, posts);
        expect(nextPostId).toEqual(-1);
    });
});