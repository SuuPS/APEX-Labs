// medicinalProductsTypes.ts


export interface SubItem {
    key: string;
    label: string;
    title: string;
}

export interface MenuItem {
    key: string;
    icon: () => JSX.Element;
    label: string;
    title: string;
    children?: SubItem[];
}

export interface MenuState {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    preOpenKeys: string[];
}
