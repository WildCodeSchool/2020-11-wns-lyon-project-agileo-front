import React from 'react'
import Link from 'next/link'

const func = () => {
  return ''
}

const sub = () => {
  return ''
}

const Home = () => {
  return (
    <>
      <main className="w-full">
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen flex justify-center">
          <div className="bg-blue-450 w-3/5 m-auto h-450 p-10">
            <div className="flex justify-center pt-15">
              <h4 className="mr-6 text-5xl">title</h4>
              <img src="" alt="img" />
            </div>
            <p className="pt-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
        <section className="sm:text-center bg-blue-450 lg:text-center min-h-screen">
          <div className="h-middleHeight pt-40">
            <h4 className="pb-6 text-5xl">Title</h4>
            <div className="flex justify-around items-center">
              <div>
                <img src="" alt="img 1" />
                <h6 className="text-white font-medium text-2xl">Title</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <img src="" alt="img 2" />
                <h6 className="text-white font-medium text-2xl">Title</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <img src="" alt="img 3" />
                <h6 className="text-white font-medium text-2xl">Title</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen">
          <div className="flex justify-around pt-24">
            <div className="bg-blue-450 p-24 max-w-2xl">
              <h4 className="text-5xl">title</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div>
              <img src="" alt="img" />
            </div>
          </div>
          <div className="bg-blue-450 p-24 rounded-50 w-1/2 m-auto mt-24">
            <div className="flex justify-center flex-col">
              <h4 className="text-5xl">title</h4>
              <p className="pt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <img src="" alt="img" />
            </div>
          </div>
          <form onSubmit={sub} className="m-auto mt-14 max-w-7xl pb-16">
            <input className="w-full mb-3" type="text" placeholder={'vous êtes...'} value={''} onChange={func} />
            <div className="flex justify-center">
              <div>
                <textarea
                  className="w-550 mr-5 pl-3 pt-3 h-190"
                  placeholder={'votre message'}
                  value={''}
                  onChange={func}
                />
              </div>
              <div className="flex flex-col w-4/5">
                <input className="mt-0" type="text" placeholder={'votre nom'} value={''} onChange={func} />
                <input type="text" placeholder={'votre mail'} value={''} onChange={func} />
                <button type="submit" value="Envoyer" className="bg-orange-450 p-3 mt-2">
                  <span className="text-yellow-450">ENVOYER</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Home
