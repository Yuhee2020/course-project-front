import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError} from "./appReducer";
import {tagsApi, TagType} from "../../api/tagsApi";
import {StateType} from "./Store";


export const createTagsTC = createAsyncThunk("tags/createTags",
    async (params: string[], {dispatch,getState}) => {
        try {
            const state=getState() as StateType
            const tags=state.tags.tags.map(tag=>tag.title)
            const uniqueTags=params.filter(tag=>tags.indexOf(tag)<0)
            const uniqueTagsForBack=uniqueTags.map(tag=>({title:tag}))
            if (uniqueTagsForBack.length) {
                const res = await tagsApi.createTags(uniqueTagsForBack)
                return res.data.tags
            }
            return
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        }
    })

export const getTagsTC = createAsyncThunk("tags/getTags",
    async (params, {dispatch}) => {
        try {
            const res = await tagsApi.getTags()
            return res.data.tags
        } catch (err: any) {
            dispatch(setAppError(err.response.data.message))
        }
    })

export const slice = createSlice({
    name: "tags",
    initialState: {
        tags:[] as TagType[],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTagsTC.fulfilled, (state, action) => {
            if (action.payload) state.tags = action.payload
        })
        builder.addCase(createTagsTC.fulfilled, (state, action) => {
            if (action.payload) state.tags = action.payload
        })
    }
})

export const tagsReducer = slice.reducer
export const {} = slice.actions