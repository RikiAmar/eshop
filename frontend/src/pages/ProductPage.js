import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const params = useParams();//now we can mess with params
    const {token} = params;//deconstraction 


  return (
    <div>{token}</div>
  )
}

export default ProductPage