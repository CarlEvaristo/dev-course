import React from 'react'
import Box from './Box'
import "./carousel.css"

export default function Carousel() {
    const [scrolledStep, setScrolledStep] = React.useState(0);
    const numItems = 15
    const visibleItems = 3
    const containerWidth = 250

    const galleryContainer = {
        margin: "1rem 0 1rem 1rem",
        width: `${containerWidth}px`,
        aspectRatio: "1",
    }

    const firstContainer = {...galleryContainer, margin: "1rem 0"}

    React.useEffect(()=>{
        console.log(scrolledStep)
    },[scrolledStep])

    const handleClick = (direction) => {
        (direction === "left") ? setScrolledStep(prev => prev - 1) : setScrolledStep(prev => prev + 1)
    }

    return (
        <section className={`carousel fadeSide ${(scrolledStep > 0) && "fadeLeft"}`} >
                <div className="sideScroll" style={{marginLeft:`${(-1 * scrolledStep * containerWidth)}px`, transition: "margin-left .5s ease-in-out",}}>
                    <Box style={firstContainer}>1</Box>
                    <Box style={galleryContainer}>2</Box>
                    <Box style={galleryContainer}>3</Box>
                    <Box style={galleryContainer}>4</Box>
                    <Box style={galleryContainer}>5</Box>
                    <Box style={galleryContainer}>6</Box>
                    <Box style={galleryContainer}>7</Box>
                    <Box style={galleryContainer}>8</Box>
                    <Box style={galleryContainer}>9</Box>
                    <Box style={galleryContainer}>10</Box>
                    <Box style={galleryContainer}>11</Box>
                    <Box style={galleryContainer}>12</Box>
                    <Box style={galleryContainer}>13</Box>
                    <Box style={galleryContainer}>14</Box>
                    <Box style={galleryContainer}>15</Box>
                </div>
                {((numItems - scrolledStep) > visibleItems) && <div className='sideScrollBtn' onClick={()=>handleClick("right")} >
                    <i class="fa-solid fa-chevron-right"></i>
                </div>}
                {(scrolledStep > 0) && <div className='sideScrollBtn leftBtn' onClick={()=>handleClick("left")} >
                    <i class="fa-solid fa-chevron-left"></i>
                </div>}

        </section>
    )
}
