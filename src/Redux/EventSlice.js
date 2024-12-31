import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEvent,
  editEventById,
  getEventById,
  getEvents,
  joinEvent,
} from "../Services/Event";

export const addEventsAsync = createAsyncThunk(
  "add/event",
  async (formData) => {
    const data = await addEvent(formData);
    return data;
  }
);

export const getEventsAsync = createAsyncThunk("get/events", async () => {
  const data = await getEvents();
  return data;
});

export const getEventByIdAsync = createAsyncThunk(
  "get/events/id",
  async (eventId) => {
    const data = await getEventById(eventId);
    return data;
  }
);
export const editEventAsync = createAsyncThunk(
  "edit/events/id",
  async ({ eventId, formData }) => {
    console.log("working");
    const data = editEventById(eventId, formData);
    console.log(...formData);
    return data;
  }
);

const EventSlice = createSlice({
  name: "events",
  initialState: {
    status: "idle",
    events: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEventsAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(getEventsAsync.fulfilled, (state, action) => {
        state.events = action.payload;
      });
  },
});

export default EventSlice.reducer;
