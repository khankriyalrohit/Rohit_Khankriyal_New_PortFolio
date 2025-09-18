import { configureStore } from "@reduxjs/toolkit";
import { heroReducer } from "./reducers/heroReducers";
import { skillsReducer } from "./reducers/skillsReducers";
import { experienceReducer } from "./reducers/experienceReducers";
import { projectsReducer } from "./reducers/projectsReducers";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    skills: skillsReducer,
    experience: experienceReducer,
    projects: projectsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
