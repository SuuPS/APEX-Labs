// commonTypes.ts


export interface SubItem {
    key: string;
    label: string;
    title: string;
    name: string;
    options: boolean
}

export interface MenuItem {
    key: string;
    icon: () => JSX.Element;
    label: string;
    title: string;
    name: string;
    options: boolean
    children?: SubItem[];
}

export interface MenuState {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    preOpenKeys: string[];
}
