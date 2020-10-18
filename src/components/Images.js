// w-1/6 p-1 border flex justify-center

import React, { useState, useEffect } from 'react'
import Image from './Image'
import useFetchImage from '../utils/hooks/useFetchImage'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import useDebounce from '../utils/hooks/useDebounce'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

export default function Images() {

    // Use States
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState(null)
    const [images, setImages, errors, isLoading] = useFetchImage(page, searchTerm)
    const debounce = useDebounce()

    // Use effects
    useEffect(() => {
        const input = document.getElementById('inputBox')
        if (input !== null) {
            input.focus()
        }
    })

    // Functions
    const handleRemove = index => {
        setImages(images.filter((image, i) => i !== index))
    }

    const handleInput = e => {
        const text = e.target.value
        debounce(() => setSearchTerm(text))
        if (e.target.value === '') {
            setSearchTerm(null)
        }
    }

    // Rendering    
    if (isLoading) return <Loading />

    return (
        <section className="p-5">
            <form className="my-5">
                <input 
                    id="inputBox"
                    className="w-11/12 border rounded shadow p-2"
                    type="text"
                    onChange={handleInput}
                    placeholder="Search Photos Here"
                />
            </form>
            {errors.length > 0 && (
                <div className="flex h-screen">
                    <p className="m-auto">{errors[0]}</p>
                </div>
            )}
             <div className="flex flex-wrap justify-center">
                <ShowImage images={images} page={page} setPage={setPage} handleRemove={handleRemove} />
            </div>
        </section>
    )
}

const ShowImage = ({images, page, setPage, handleRemove}) => {

    const [showPreview, setShowPreview] = useState(false)
    
    return (
        <AnimateSharedLayout>
            {console.log(page)}
            <InfiniteScroll 
                dataLength={images.length}
                next={() => setPage(page + 1)}   
                hasMore={true}
                className="flex flex-wrap justify-center"
            >
                {images.map((img, i) => (
                    <motion.div 
                        className="p-1 m-1 border rounded flex space-x-5"
                        key={i} 
                        layoutId={img.urls.regular}
                    >
                        <Image 
                            show={() => setShowPreview(img.urls.regular)}
                            image={img.urls.regular} 
                            index={i} 
                            handleRemove={handleRemove} 
                        />
                    </motion.div>
                ))}
            </InfiniteScroll>
            <AnimatePresence>
                {showPreview && <motion.section 
                    layoutId={showPreview}
                    exit={{ opacity: 0, rotate: 360, transition: { duration: 1 } }}
                    className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-40"
                    onClick={() => setShowPreview(false)}
                >
                    <div className='bg-white'>
                        <img
                            src={showPreview}
                            alt='img'
                            className="rounded-lg w-full h-full"
                        />
                    </div>
                </motion.section>}
            </AnimatePresence>
        </AnimateSharedLayout>
    )
}