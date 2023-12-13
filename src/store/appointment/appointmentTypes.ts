// appointmentTypes.ts
import { DataItem } from "../common/commonTypes.ts";

export interface modalType {
    open: boolean
    tableName: string
    inputField: string
}

export interface TableItem {
    key: number
    name: string
    age: number
    address: string
}

export enum SoftType {
    HD = 'HD',
    HDF = 'HDF',
    UF = 'UF',
}

export enum InjectionType {
    Spine = 0,
    Catheter = 1,
}

export interface FormType {
    id: string;
    softType: SoftType.HD;
    dialyzer: DataItem;
    concentrator: DataItem;
    concentratorVolume: number;
    injectionType: InjectionType.Spine;
    spineType: DataItem;
    spine: DataItem;
    catheterType: DataItem;
    catheter: DataItem;
    bicarbonate: DataItem;
    patientWeight: number;
    anticoagulation: string;
    anticoagulationVolume: number;
    createdSession: boolean;
    medicinalProduct: DataItem;
    receptionPath: DataItem;
    doses: DataItem;
    sessionCount: number[];
    sessionDateStart: string;
    sessionDateEnd: string;
    [key: string]: DataItem | string | number | boolean;
}