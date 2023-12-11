// commonTypes.ts

export interface CustomColumn {
    title: string;
    dataIndex: string;
    width?: string;
}

export interface DataItem {
    key: string;
    name: string;
}

export interface DataSources {
    spineType: DataItem[];
    spine: DataItem[];
    catheter: DataItem[];
    bicarbonate: DataItem[];
    medicinalProducts: DataItem[];
    receptionPath: DataItem[];
    doses: DataItem[];
    frequencyAdmission: DataItem[];
}