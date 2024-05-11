import React, { useState } from 'react'
import '../../Home/styles.scss'
import ContentWrapper from '../../../components/ContentWrapper/contentWrapper'
import SwitchTabs from '../../../components/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel'

const Trending = () => {
    const [endPoint , setEndPoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange = (tab) => {
        setEndPoint(tab=== "Day" ? "day" : "week")
    }
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading} />
</div>
  )
}

export default Trending