import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import TrainingDetail from './TrainingDetail'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneTraining, trainingDetail, trainingStatus } from './trainingSlice'

const TrainingDetailPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const trainDetail = useSelector(trainingDetail)
    const token = user.accessToken
    const dispatch = useDispatch()
    const {id} = useParams()
    const trainStatus = useSelector(trainingStatus)
    useEffect(() => {
        if(trainDetail.title == null){
            dispatch(getOneTraining({id, token}))

        }
    },[dispatch]) 

    if(trainStatus == "loading"){
        return <Layout>
            <div className='px-5 mt-20'>
                Loading ...
            </div>
        </Layout>
    }
    if(trainStatus == "failed"){
        return <Layout>
            <div className='px-5 mt-20'>
                Error happen please check your connection!!..
            </div>
        </Layout>
    }
  return (
    <Layout>
        <div className='px-5'>
        <TrainingDetail/>
        </div>
    </Layout>
  )
}

export default TrainingDetailPage