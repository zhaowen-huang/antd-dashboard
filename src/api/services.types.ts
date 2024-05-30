export type Item = {
    id: number;
    owner_id: number;
    title: string;
    description: string;
};
export type ItemsServiceRsp = {
    data: Item[];
    count: number;
};
export type ItemCreate = {
    title: string;
    description?: string | null;
};
export type ItemUpdate = ItemCreate;
