import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  student_expelled: false,
  student_group_id: 0,
  student_1c_id: 0,
  student_lastname: "",
  student_login: "",
  student_record_number: "",
  student_eos_password: "",
  student_confirmed: false,
  student_id: "",
  student_firstname: "",
  student_middlename: "",
  student_password: "",
  student_eos_login: "",
  student_email: "",
};

const chatSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    updateInfo: (state, action: any) => {
      console.log(action)
      state.tudent_expelled = action.payload.student_expelled;
      state.student_group = action.payload.student_group;
      state.student_1c_id = action.payload.student_1c_id;
      state.student_lastname = action.payload.student_lastname;
      state.student_login = action.payload.student_login;
      state.student_record_number = action.payload.student_record_number;
      state.student_eos_password = action.payload.student_eos_password;
      state.student_confirmed = action.payload.student_confirmed;
      state.student_id = action.payload.student_id;
      state.student_firstname = action.payload.student_firstname;
      state.student_middlename = action.payload.student_middlename;
      state.student_password = action.payload.student_password;
      state.student_eos_login = action.payload.student_eos_login;
      state.student_email = action.payload.student_email;
    },
    clearInfo: (state) => {
      state.student_expelled = false
      state.student_group_id = 0
      state.student_1c_id = 0
      state.student_lastname = ""
      state.student_login = ""
      state.student_record_number = ""
      state.student_eos_password = ""
      state.student_confirmed = false
      state.student_id = ""
      state.student_firstname = ""
      state.student_middlename = ""
      state.student_password = ""
      state.student_eos_login = ""
      state.student_email = ""
    },
  },
});

export const infoUserActions = chatSlice.actions;
export const infoUserReducer = chatSlice.reducer;
