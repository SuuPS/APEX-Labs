
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface UserType {
    name: string;
    surname: string;
    patronymic: string;
    role: string;
}
export const useUserStore = defineStore('user', () => {

    const user = reactive<UserType>({
        name: 'Жусуп',
        surname: 'Мунанбеков',
        patronymic: 'Мунанбекович',
        role: 'Семейный врач',
    })

    return {
        user,
    };
});
