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
    medicinalProducts: DataItem[];
    spine: DataItem[];
    catheter: DataItem[];
    bicarbonate: DataItem[];
    spineType: DataItem[];
    receptionPath: DataItem[];
    frequencyAdmission: DataItem[];
}