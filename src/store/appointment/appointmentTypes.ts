// appointmentTypes.ts
import {DataItem, ItemBicarbonate} from "../common/commonTypes.ts";
import type { Dayjs } from 'dayjs';
import {UserType} from "../user/userStore.ts";

export interface modalType {
    open: boolean
    tableName: string
    inputField: string
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
    bicarbonate: ItemBicarbonate;
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
    TreatmentReport: string[]

    recommendationValue: string,
    recommendations: string[]

    dateAppointment: Dayjs,
    doctor: UserType

}