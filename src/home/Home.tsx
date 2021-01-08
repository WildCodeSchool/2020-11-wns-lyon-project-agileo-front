import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Style } from './Style'

const func = () => {
  return ''
}

const sub = (e: React.FormEvent) => {
  e.preventDefault()
  return ''
}

const Home = () => {
  return (
    <>
      <header className="flex justify-between bg-blue-450 pt-2 pl-20 pr-20 h-seventeen">
        <img className="mr-8" src="/home/logo.svg" alt="Logo" width={60} height={60} />
        <Link href="/">
          <p className="pt-2 text-yellow-450 text-4xl title">Agileo</p>
        </Link>
        <Link href="/login">
          <button className="rounded-md bg-yellow-450 text-gray-500 px-4 py-2 m-2 title">Login</button>
        </Link>
      </header>
      <main className="w-full">
        <section className="flex justify-center introduction">
          <div className="bg-blue-450 w-3/5 m-auto p-10">
            <div className="flex justify-center pt-4">
              <h4 className="mr-6 text-5xl">Notre solution</h4>
            </div>
            <p className="m-9 text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
              to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
        <section className="sm:text-center bg-blue-450 lg:text-center min-h-screen">
          <div className="h-middleHeight pt-10">
            <h4 className="pb-16 text-5xl">Title</h4>
            <div className="flex justify-around items-center">
              <div>
                <Image src="/home/038-success.svg" alt="learn 1" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto text-center">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </p>
              </div>
              <div>
                <Image src="/home/041-timetable.svg" alt="learn 2" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto text-center">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </p>
              </div>
              <div>
                <Image src="/home/042-video lesson.svg" alt="learn 3" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto text-center">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen">
          <div className="flex justify-around pt-24">
            <div className="bg-blue-450 p-16 pt-8 max-w-2xl">
              <h4 className="text-5xl mb-16">Title</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div>
              <img src="/home/graphics.png" alt="Logo" />
            </div>
          </div>
        </section>
        <section className="sm:text-center bg-yellow-550 lg:text-center min-h-screen contact">
          <div className="bg-blue-450 p-24 pt-15 rounded-50 w-4/6 m-auto">
            <div className="flex justify-center flex-col">
              <h4 className="text-5xl">Title</h4>
              <p className="pt-20 text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </p>
              <Image src="/home/016-kitty-33.svg" alt="Logo" width={150} height={150} />
            </div>
          </div>
          <form onSubmit={sub} className="m-auto mt-14 max-w-7xl pb-16">
            <input className="w-full mb-3" type="text" placeholder={'Vous êtes...'} value={''} onChange={func} />
            <div className="flex justify-center">
              <div>
                <textarea
                  className="w-550 mr-5 pl-3 pt-3 h-190"
                  placeholder={'Votre message'}
                  value={''}
                  onChange={func}
                />
              </div>
              <div className="flex flex-col w-4/5">
                <input className="mt-0" type="text" placeholder={'Votre nom'} value={''} onChange={func} />
                <input type="text" placeholder={'Votre mail'} value={''} onChange={func} />
                <button type="submit" value="Envoyer" className="bg-orange-450 p-3 mt-2">
                  <span className="text-yellow-50 title">Envoyer</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <footer className="bg-blue-450 h-seventeen">
        <div className="text-center pt-6 text-yellow-550">© 2020 Agileo</div>
      </footer>
      <Style />
    </>
  )
}

export default Home
