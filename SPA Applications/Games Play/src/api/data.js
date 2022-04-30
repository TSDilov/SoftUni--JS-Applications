import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getlastThree() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export function createGame(game) {
    return api.post('/data/games', game);
}

export function getGameById(id) {
    return api.get('/data/games/' + id);
}

export function deleteGame(id) {
    return api.del('/data/games/' + id);
}

export function editGame(id, game) {
    return api.put('/data/games/' + id, game);
} 

export function getAll() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export function getComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export function postComment(comment) {
    return api.post('/data/comments', comment);
}
