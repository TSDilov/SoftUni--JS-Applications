import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export function getAllPets() {
    return api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export function createPet(pet) {
    return api.post('/data/pets', pet);
}

export function getPetById(id) {
    return api.get('/data/pets/' + id);
}

export function deletePet(id) {
    return api.del('/data/pets/' + id);
}

export function editPet(id, pet) {
    return api.put('/data/pets/' + id, pet);
}

export function getAllDonates(petId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export function getDonate(petId, userId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function postDonate(petId) {
    return api.post('/data/donation', { petId });
}