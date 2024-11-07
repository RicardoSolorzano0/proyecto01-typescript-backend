import { createAnimal } from './createAnimal';
import { deleteAnimal } from './deleteAnimal';
import { selectAnimals } from './selectAnimals';
import { selectPaginatedAnimals } from './selectPaginatedAnimals';
import { updateAnimal } from './updateAnimal';

export const animalsRoute = {
    createAnimal,
    selectAnimals,
    updateAnimal,
    deleteAnimal,
    selectPaginatedAnimals
}