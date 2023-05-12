import { TypedUseSelectorHook } from "react-redux"
import { User } from "../auth/types"

export enum Category {
    FURNITURE = 'FURNITURE',
    RTV = 'RTV',
    AGD = 'AGD',
    HOME = 'HOME',
    ITEM = 'ITEM',
    GROCERY = 'GROCERY',
    NO_CATEGORY = 'NO CATEGORY'
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
    quantity: number,
    category: Category,
    active: Boolean
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
