// appointmentTypes.ts
import { DataItem } from "../common/commonTypes.ts";
import type { Dayjs } from 'dayjs';

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

export interface sessionTableType {
    medicinalProduct: string;
    receptionPath: string;
    doses: string;
    sessionCount: string;
    sessionDateStart: string;
    sessionDateEnd: string;
    days: string;
}

export interface sessionItemType {
    component: any,
    title: string
    text: string,
}

export interface sessionItemsType {
    softType: sessionItemType;
    dialyzer: sessionItemType;
    concentrator: sessionItemType;
    spineCatheter: sessionItemType;
    bicarbonate: sessionItemType;
    anticoagulation: sessionItemType;
    anticoagulationVolume: sessionItemType;
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
    createdSession: any;
    medicinalProduct: DataItem;
    receptionPath: DataItem;
    doses: DataItem;
    sessionCount: number[];
    sessionDateStart: Dayjs;
    sessionDateEnd: Dayjs;
    sessionTableResult: sessionTableType[]

    TreatmentMedicinalProduct: DataItem;
    TreatmentReceptionPath: DataItem;
    TreatmentDoses: DataItem;
    TreatmentReceptionCount: DataItem;
    TreatmentSessionDateStart: Dayjs;
    TreatmentSessionDateEnd: Dayjs;

}