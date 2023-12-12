// appointmentTypes.ts


export interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
}

export enum SoftType {
    HD = 0,
    HDF = 1,
    UF = 2,
}

export interface FormType {
    id: string;
    softType: SoftType;
}