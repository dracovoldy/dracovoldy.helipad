import { Subject } from 'rxjs';

const subject = new Subject();

const initialState = {
    shell: {
        profile: false,
        popoverRef: null
    }
};

let state = initialState;

const helipadStore = {
    init: () => {
        state = { ...state }
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    sendMessage: message => {
        state = { ...message };
        subject.next(state);
    },
    initialState
}

export default helipadStore;