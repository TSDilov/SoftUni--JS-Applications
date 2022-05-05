import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getAllTheaters() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export function createTheater(theater) {
    return api.post('/data/theaters', theater);
}

export function getTheaterById(id) {
    return api.get('/data/theaters/' + id);
}

export function deleteTheater(id) {
    return api.del('/data/theaters/' + id);
}

export function getTheatersByUser(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function editTheather(id, theater) {
    return api.put('/data/theaters/' + id, theater);
}

export function getLikes(theaterId) {
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export function postLike(theaterId) {
    return api.post('/data/likes', { theaterId });
}

export function getLike(theaterId, userId) {
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}