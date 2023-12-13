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

export interface SoucessColumn {
    name: string,
    datas: DataItem[]
}

export interface DataSources {
    dialyzer: SoucessColumn[];
    concentrator: SoucessColumn[];
    spineType: SoucessColumn[];
    spine: SoucessColumn[];
    catheter: SoucessColumn[];
    bicarbonate: SoucessColumn[];
    medicinalProducts: SoucessColumn[];
    receptionPath: SoucessColumn[];
    doses: SoucessColumn[];
    frequencyAdmission: SoucessColumn[];
}