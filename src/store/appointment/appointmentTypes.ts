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
    HD = 0,
    HDF = 1,
    UF = 2,
}

export interface FormType {
    id: string
    softType: SoftType
    dialyzer: DataItem
    concentrator: DataItem
}