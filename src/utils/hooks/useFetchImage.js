import { useState, useEffect } from 'react'
import axios from 'axios'

const api = process.env.REACT_APP_UNSPLASH_API
const secret = process.env.REACT_APP_UNSPLASH_KEY
    
export default function useFetchImage(page, searchTerm) {

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (searchTerm !== null) {
            fetchSearch()
        } else {
            fetchRandom()
        }
    }, [page])

    useEffect(() => {
        if (searchTerm === null) return
        fetchSearch()
    })

    function fetchSearch() {
        axios.get(
            `${api}/search/photos?client_id=${secret}&page=${page}&per_page=15&query=${searchTerm}`
        ).then(res => {
            if (page > 1) {
                setImages([...images, ...res.data.results])
            } else {
                setImages([...res.data.results])
            }
            setIsLoading(false)
        })
        .catch(e => {
            setErrors(["Unable to fetch query images"])
            setIsLoading(false)
        })
    }

    function fetchRandom() {
        axios.get(
            `${api}/photos?client_id=${secret}&page=${page}&per_page=15&`
        ).then(res => {
            setImages([...images, ...res.data])
            setIsLoading(false)
        })
        .catch(e => {
            setErrors(["Unable to fetch random images"])
            setIsLoading(false)
        })
    }

    return [images, setImages, errors, isLoading]
}
