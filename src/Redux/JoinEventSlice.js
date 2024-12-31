import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { joinEvent, myJoinEvent } from "../Services/JoinEvent";

export const joinEventAsync = createAsyncThunk(
  "join/event",
  async (eventId) => {
    const data = await joinEvent(eventId);
    return data;
  }
);
export const myJoinEventAsync = createAsyncThunk("join/event", async () => {
  const data = await myJoinEvent();
  return data;
});

const myEventSlice = createSlice({
  name: "myEvents",
  initialState: {
    status: "idle",
    events: [],
    error: null,
  },
});

export default myEventSlice.reducer;
