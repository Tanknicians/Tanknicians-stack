import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  tankId: null
};

const servicecallTankSlice = createSlice({
  name: 'servicecallClientTank',
  initialState,
  reducers: {
    setTankId: (state, action) => {
      state.tankId = action.payload.tankId;
    },
    clearTankId: state => {
      state.tankId = null;
    }
  }
});

export const { setTankId, clearTankId } = servicecallTankSlice.actions;
export default servicecallTankSlice.reducer;

export const selectCurrentClientTank = (state: RootState) =>
  state.servicecallClientTank.tankId;
