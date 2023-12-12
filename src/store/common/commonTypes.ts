// appointmentTypes.ts

export interface CustomColumn {
    title: string;
    dataIndex: string;
    width?: string;
}

export interface DataItem {
    id: string;
    name: string;
}

export interface DataSources {
    dialyzer: DataItem[],
    concentrator: DataItem[],
    spineType: DataItem[];
    spine: DataItem[];
    catheter: DataItem[];
    bicarbonate: DataItem[];
    medicinalProducts: DataItem[];
    receptionPath: DataItem[];
    doses: DataItem[];
    frequencyAdmission: DataItem[];
}