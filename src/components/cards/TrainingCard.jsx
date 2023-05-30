import React from 'react'

const TrainingCard = ({image, title, description, onTrainingDetail}) => {
  return (
    <div onClick={onTrainingDetail} class="max-w-sm cursor-pointer rounded overflow-hidden shadow-lg">
  <img class="w-full" src={image}></img>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{title}</div>
    <p class="text-gray-700 text-base">
    {description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#farming</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#buy-and-sell</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#technology</span>
  </div>
</div>
  )
}

export default TrainingCard