import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export default function GetRouter(props) {
    let { id } = useParams();
    props.GetRouter(id)
    // useEffect(() => {
    //     console.log(id)
    // }, [])
    return (
        <div>
            
        </div>
    )
}
