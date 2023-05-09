import React, { useContext } from "react";
import DmfsseContex from "../../app/contextStore";

const TrainingDetail = () => {
  const trainingDetailCtx = useContext(DmfsseContex)
  const training = trainingDetailCtx.detailData
  console.log(training)
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
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {training.title}
            </dd>
          </div>{" "}
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
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
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <img
                    className="w-full h-96"
                    src={training.mediaFile}
                    alt="Training media file"
                  ></img>
                </li>
                {/* <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <img
                    className="w-full h-96"
                    src="https://picsum.photos/200/300"
                    alt="Training media file"
                  ></img>
                </li> */}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TrainingDetail;
