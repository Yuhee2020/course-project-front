import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {itemsApi, ItemType} from "../../api/itemsApi";
import {createTagsTC} from "./tagsReducer";


export const createItemTC = createAsyncThunk("items/createItem",
    async (params: ItemType, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.createItem(params)
            params.tags && dispatch(createTagsTC(params.tags))
            dispatch(setSuccessMessage(res.data.message))
            return res.data.collectionItems
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getCollectionItemsTC = createAsyncThunk("items/getCollectionItems",
    async (params:string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.getCollectionItems(params)
            return res.data.collectionItems
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const getItemTC = createAsyncThunk("items/getItem",
    async (params:string, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.getItem(params)
            return res.data.item
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const deleteItemsTC = createAsyncThunk("items/deleteItems",
        async (params:{ itemsId: string[], collectionId: string }, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.deleteItems(params.itemsId,params.collectionId)
            return res.data.collectionItems
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const editItemTC = createAsyncThunk("items/editItem",
    async (params:ItemType, {dispatch}) => {
        dispatch(setLoading(true))
        try {
            const res = await itemsApi.editItem(params)
            dispatch(getCollectionItemsTC(params.collectionId))
            return res.data.updatedItem
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        } finally {
            dispatch(setLoading(false))
        }
    })

export const slice = createSlice({
    name: "items",
    initialState: {
        collectionItems:[] as ItemType[],
        item:{} as ItemType,
    },
    reducers: {
        setCollectionImageUrl(state, action: PayloadAction<string>) {
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCollectionItemsTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(createItemTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(getItemTC.fulfilled, (state, action) => {
            if (action.payload) state.item = action.payload
        })
        builder.addCase(deleteItemsTC.fulfilled, (state, action) => {
            if (action.payload) state.collectionItems = action.payload
        })
        builder.addCase(editItemTC.fulfilled, (state, action) => {
            if (action.payload) state.item = action.payload
        })

    }
})

export const itemsReducer = slice.reducer
export const {} = slice.actions