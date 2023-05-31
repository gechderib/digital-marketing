import React from 'react'

const TrainingCard = ({image, title, description, onTrainingDetail}) => {
  return (
    <div onClick={onTrainingDetail} class="max-w-sm cursor-pointer rounded overflow-hidden shadow-lg">
  {/* <img class="w-full" src={image}></img> */}
  <div>
  {image.indexOf(".mp4") > -1 ? (
                  <video controls>
                    <source src={image} type="video/mp4" />
                  </video>
                ) : null}
                
                {image.indexOf(".mp3") > -1 || image.indexOf(".MP3") > -1? (
                  <audio controls>
                    <source src={image} type="audio/mp3"></source>
                  </audio>
                ) : null}

                {image.indexOf(".jpg") > -1 || image.indexOf(".JPG") > -1 || image.indexOf(".png") > -1 || image.indexOf(".PNG") > -1?     <img
                  className="w-full h-40"
                  src={image}
                  alt="Training media file"
                ></img>:null}
  </div>
  
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