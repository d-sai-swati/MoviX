import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import ImgComponent from '../../../components/LazyLoadImage/ImgComponent'
import ContentWrapper from '../../../components/ContentWrapper/contentWrapper'

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)

  const { data, loading } = useFetch("/movie/upcoming") // get upcoming movies banner
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path; // math.randoms gets random banner
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`) // navigate to search page for specific query
    }
  }
  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <ImgComponent src={background} />
      </div>}

      <div className="opacity-layer"></div>
      <ContentWrapper>
          <div className='heroBannerContent'>
            <span className='title'>Welcome</span>
            <span className='subtitle'>Welcome to the movie world </span>
            <div className="searchInput">
              <input type="text" placeholder="Search" onChange={(event) => setQuery(event.target.value)} onKeyUp={searchQueryHandler} />
              <button onClick={searchQueryHandler}>Search</button>
            </div>
          </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
