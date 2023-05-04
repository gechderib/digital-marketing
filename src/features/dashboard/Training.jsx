import React, { useContext, useState } from "react";
import Trainings from "../training/Trainings";
import AddTraining from "../training/AddTraining";
import DmfsseContex from "../../app/contextStore";
import EditTraining from "../training/EditTraining";
import TrainingDetail from "../training/TrainingDetail";

const Training = () => {
  const addCtx = useContext(DmfsseContex);
  return (
    <div className="p-4 mt-11 sm:ml-64">
      {addCtx.isAdding ? (
        <AddTraining />
      ) : addCtx.isEditing ? (
        <EditTraining />
      ) :addCtx.showDetail?<TrainingDetail/>: (
        <Trainings />
      )}
    </div>
  );
};

export default Training;
