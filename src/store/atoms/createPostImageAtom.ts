import { atom } from "recoil";

export const createPostImageAtom = atom({
    key: 'createPostImageAtom',
    default: {
        preview: '',
        raw: ''
    }
})