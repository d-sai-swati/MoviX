import React from 'react'
import DetailsBanner from './DeatilsBanner'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cast from './Cast';
import VideosSection from './VideoSection';
import Similar from './Carousels/similar';
import Recommendation from './Carousels/recommendation';

const Details = () => {
  const { mediaType, id } = useParams(); //access multiple parameters from same url i.e mediaType and id
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data:credits, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
