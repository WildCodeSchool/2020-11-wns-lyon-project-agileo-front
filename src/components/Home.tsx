import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <main className="w-full">
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen flex justify-center">
          <div className="bg-blue-450 w-4/5 m-auto h-middleHeight">
            texte 1
          </div>
        </section>
        <section className="sm:text-center bg-blue-450 lg:text-center min-h-screen">
          <h4 className="pb-24">Title</h4>
          <div className="h-middleHeight flex justify-around items-center">
            <div>
              <img src="" alt="img 1" />
              <h6>Title</h6>
              <p>texte 1</p>
            </div>
            <div>
              <img src="" alt="img 2" />
              <h6>Title</h6>
              <p>texte 2</p>
            </div>
            <div>
              <img src="" alt="img 3" />
              <h6>Title</h6>
              <p>texte 3</p>
            </div>
        </div>
        </section>
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen flex justify-center">
          texte 3
        </section>
      </main>
    </>
  )
}

export default Home
