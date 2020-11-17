import { selector } from 'recoil';
import { gameState } from './atoms';

export const currentGameState = selector({
  key: 'currentGameState',
  get: ({ get }) => {
    // look into local storage for cached user info
    const cachedGameState = JSON.parse(
      window.localStorage.getItem('currentGameState')
    );
    // return the cached user info or the default userState if no cached obj found
    return cachedGameState ? cachedGameState : get(gameState);
  },
  set: ({ set }, newValue) => {
    // set the new user info into local storage
    window.localStorage.setItem('currentGameState', JSON.stringify(newValue));
    // update state with the new user
    set(gameState, newValue);
  },
});
