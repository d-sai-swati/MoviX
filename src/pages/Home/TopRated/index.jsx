import React, { useState } from 'react'
import '../../Home/styles.scss'
import ContentWrapper from '../../../components/ContentWrapper/contentWrapper'
import SwitchTabs from '../../../components/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel'

const TopRated = () => {
    const [endPoint , setEndPoint] = useState("movie")
    const { data, loading } = useFetch(`/${endPoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndPoint(tab=== "Movies" ? "movie" : "tv")
    }
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Tv Shows" ,"Movies" ]} onTabChange={onTabChange} />
    </ContentWrapper>
    <Carousel endpoint={endPoint} data={data?.results} loading={loading} />
</div>
  )
}

export default TopRated;