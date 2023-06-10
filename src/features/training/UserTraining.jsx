import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import {
  addDetailData,
  allTrainings,
  getAllTrainings,
  pagination,
  trainingError,
  trainingStatus,
} from "./trainingSlice";
import { useDispatch, useSelector } from "react-redux";
import TrainingCard from "../../components/cards/TrainingCard";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const UserTraining = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const trainings = useSelector(allTrainings);
  const trainStatus = useSelector(trainingStatus);
  const trainError = useSelector(trainingError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector(pagination)

  useEffect(() => {
    dispatch(getAllTrainings({ token, page: page}));
  }, [page]);
  if (trainStatus == "loading") {
    return (
      <Layout>
        <div className="mt-16 px-5">
          <Loading />
          {/* <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> */}
        </div>
      </Layout>
    );
  }
  if (trainStatus == "failed" || trainError) {
    return (
      <Layout>
        {" "}
        <p>Error happen please try again</p>
      </Layout>
    );
  }
  if (trainStatus == "succeeded") {
    return (
      <Layout>
        <div className="mt-20 mb-10 md:grid md:grid-cols-4 gap-10 px-5 sm:grid sm:grid-cols-2">
          {trainings.map((training) => (
            <TrainingCard
              onTrainingDetail={() => {
                dispatch(addDetailData(training));
                navigate(`/training/${training._id}`);
              }}
              image={training.mediaFile}
              title={training.title}
              description={training.description.substring(0, 100)}
            />
          ))}
        </div>
        <div className="mb-10">
      <Pagination />

      </div>
      </Layout>
    );
  }
  return <p>here</p>;
};

export default UserTraining;
