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

export interface ItemBicarbonate {
    id: string;
    name: string;
    measurement: string;
}

export interface DataItemBicarbonate {
    name: string;
    datas: ItemBicarbonate[]
}

export interface SoucessColumn {
    name: string,
    datas: DataItem[]
}

export interface DataSources {
    dialyzer: SoucessColumn;
    concentrator: SoucessColumn;
    spineType: SoucessColumn;
    spine: SoucessColumn;
    catheter: SoucessColumn;
    bicarbonate: DataItemBicarbonate;
    medicinalProducts: SoucessColumn;
    receptionPath: SoucessColumn;
    doses: SoucessColumn;
    frequencyAdmission: SoucessColumn;
}