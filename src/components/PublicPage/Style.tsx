import React from 'react'

const Style = () => {
  return (
    <style jsx>{`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: #fcc116;
      }
      p {
        word-break: break-all;
        text-align: justify;
      }

      input {
        border: none;
        background-color: white;
        margin-top: 10px;
        height: 60px;
        padding-left: 10px;
      }
      .bg-yellow-450 {
        background-color: #fcc116;
      }
      .text-yellow-450 {
        color: #fcc116;
      }
      .bg-yellow-550 {
        background-color: #fff1c8;
      }
      .text-yellow-550 {
        color: #fff1c8;
      }
      .bg-blue-450 {
        background-color: #2ab1bf;
      }
      .text-blue-450 {
        color: #2ab1bf;
      }
      .bg-orange-450 {
        background-color: #fa6424;
      }
      .text-orange-450 {
        color: #fa6424;
      }
      .w-550 {
        width: 550px;
      }
      .h-450 {
        height: 450px;
      }
      .h-190 {
        height: 190px;
      }
      .h-seventeen {
        height: 70px;
      }
      .rounded-50 {
        border-radius: 50%;
      }
    `}</style>
  )
}

export default Style
