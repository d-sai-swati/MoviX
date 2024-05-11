import React, { useState } from 'react'
import '../../Home/styles.scss'
import ContentWrapper from '../../../components/ContentWrapper/contentWrapper'
import SwitchTabs from '../../../components/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel'

const Popular = () => {
    const [endPoint , setEndPoint] = useState("tv")
    const { data, loading } = useFetch(`/${endPoint}/popular`)

    const onTabChange = (tab) => {
        setEndPoint(tab=== "Movies" ? "movie" : "tv")
    }
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Tv Shows" ,"Movies" ]} onTabChange={onTabChange} />
    </ContentWrapper>
    <Carousel endpoint={endPoint} data={data?.results} loading={loading} />
</div>
  )
}

export default Popular