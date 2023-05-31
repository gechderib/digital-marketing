import React from "react";
import { useSelector } from "react-redux";
import { trainingDetail } from "./trainingSlice";

const TrainingDetail = () => {
  const training = useSelector(trainingDetail);

  if (training.title == null) {
    return <p>loading ..</p>;
  }

  return (
    <div>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          Training Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Training details and Comments.
        </p>
      </div>
      <div class="mt-6 md:flex">
        <div className="md:w-1/3">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {training.title}
            </dd>
          </div>{" "}
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900 text-justify">
              Description
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {training.description}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">By</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {training.postedBy.firstName} {training.postedBy.lastName}
            </dd>
          </div>
        </div>

        <div class="md:w-2/3 px-4 py-6">
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                {training.mediaFile.indexOf(".mp4") > -1 ? (
                  <video controls>
                    <source src={training.mediaFile} type="video/mp4" />
                  </video>
                ) : null}
                
                {training.mediaFile.indexOf(".mp3") > -1 || training.mediaFile.indexOf(".MP3") > -1? (
                  <audio controls>
                    <source src={training.mediaFile} type="audio/mp3"></source>
                  </audio>
                ) : null}

                {training.mediaFile.indexOf(".jpg") > -1 || training.mediaFile.indexOf(".JPG") > -1 || training.mediaFile.indexOf(".png") > -1 || training.mediaFile.indexOf(".PNG") > -1?     <img
                  className="w-full h-96"
                  src={training.mediaFile}
                  alt="Training media file"
                ></img>:null}
           
              </li>
            </ul>
          </dd>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;
