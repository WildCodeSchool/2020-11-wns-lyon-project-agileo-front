import React from 'react'

export const Style = () => {
  return (
    <style>{`
      h1, h2, h3, h4, h5, h6 {color: #fcc116; font-family: 'Lobster', cursive;}
      p {text-align: justify; font-size: 18px; color: #FFF1C8; font-family: 'Overpass', sans-serif;}
      input {border: none;background-color: white;margin-top: 10px;height: 60px;padding-left: 10px;}
      .bg-yellow-450 {background-color: #fcc116;}
      .text-yellow-450 {color: #fcc116;}
      .bg-yellow-550 {background-color: #fff1c8;}
      .text-yellow-550 {color: #fff1c8;}
      .bg-blue-450 {background-color: #2ab1bf;}
      .text-blue-450 {color: #2ab1bf;}
      .bg-orange-450 {background-color: #fa6424;}
      .text-orange-450 {color: #fa6424;}
      .w-550 {width: 550px;}
      .h-450 {height: 450px;}
      .h-190 {height: 190px;}
      .h-seventeen {height: 70px;}
      .rounded-50 {border-radius: 50%;}
      .fix-footer {height: 85vh;}
      .title {font-family: 'Lobster', cursive;}
      .introduction {height: calc(100vh - 70px); background-image: url("https://image.shutterstock.com/z/stock-photo-confident-man-using-a-laptop-and-looking-at-camera-in-a-balcony-in-a-town-1259079382.jpg"); background-size: cover; background-color: rgba(255, 255, 128, .5);}
      .contact {background-image: url("https://image.shutterstock.com/z/stock-photo-confident-man-using-a-laptop-and-looking-at-camera-in-a-balcony-in-a-town-1259079382.jpg"); background-size: cover; background-color: rgba(255, 255, 128, .5);}
    `}</style>
  )
}
