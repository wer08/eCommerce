import { TypedUseSelectorHook } from "react-redux"
import { User } from "../auth/types"

export enum Category {
    FURNITURE = 'Furniture',
    RTV = 'Rtv',
    AGD = 'Agd',
    HOME = 'Home',
    ITEM = 'Item',
    GROCERY = 'Grocery',
    NO_CATEGORY = 'No category'
}

export type TItemsState = {
    items: Array<TItem>,
    filteredItems: Array<TItem>,
    currentCart: Array<TItem>
    status: string,
    error: string | null | undefined
}

export type TItem = {
    id:number,
    name: string,
    description: string,
    price: number,
    picture: string,
    client: User,
    quantity: number
    category: Category
}

export type TItemUpload = {
    name: string,
    client: User | null,
    description: string,
    price: number,
    picture: Blob | null,
    quantity: number
    category: Category
}

export type TBody = {
    name: string,
    client: User | null,
    description: string,
    price: number | null,
    picture: string | null,
    quantity: number | null,
    category: Category
}
