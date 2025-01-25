'use client'

import WritePost from "./WritePost"

export default function CreateComment({id}: {id: string}){

    

    return (
        <div className="flex justify-between items-center">
            <WritePost placeholder="Post your Reply" id={id}/>
        </div>
    )
}