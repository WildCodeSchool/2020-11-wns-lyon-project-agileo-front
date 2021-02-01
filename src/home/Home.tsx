import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from './Home.module.css'

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
      <header className={style.header}>
        <img className="mr-8" src="/home/logo.svg" alt="Logo" width={60} height={60} />
        <Link href="/">
          <p className="pt-2 text-yellow-400 text-4xl">AGILEO</p>
        </Link>
        <Link href="/login">
          <button className="rounded-md bg-yellow-400 text-black px-4 py-2 m-2">Login</button>
        </Link>
      </header>
      <main className="w-full">
        <section className="sm:text-center bg-yellow-100 lg:text-center min-h-screen flex justify-center">
          <div className={style.solution}>
            <div className="flex justify-center pt-4">
              <h4 className="mr-6 text-5xl text-yellow-400">Notre solution</h4>
              <Image src="/home/036-kitty-14.svg" alt="Logo" width={100} height={100} />
            </div>
            <p className="pt-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
              to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
        <section className={style.title}>
          <div className="h-middleHeight pt-10">
            <h4 className="pb-16 text-5xl text-yellow-400">Title</h4>
            <div className="flex justify-around items-center">
              <div>
                <Image src="/home/038-success.svg" alt="learn 1" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <Image src="/home/041-timetable.svg" alt="learn 2" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div>
                <Image src="/home/042-video lesson.svg" alt="learn 3" width={200} height={200} />
                <h6 className="text-white font-medium text-2xl mb-4 mt-8">Title</h6>
                <p className="w-4/5 m-auto">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="sm:text-center bg-yellow-100 lg:text-center min-h-screen">
          <div className="flex justify-around pt-24">
            <div className={style.title2}>
              <h4 className="text-5xl mb-16 text-yellow-400">title</h4>
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
              <Image src="/home/042-video lesson.svg" alt="Logo" width={200} height={200} />
            </div>
          </div>
          <div className={style.title3}>
            <div className="flex justify-center flex-col">
              <h4 className="text-5xl text-yellow-400">title</h4>
              <p className="pt-20">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <Image src="/home/016-kitty-33.svg" alt="Logo" width={150} height={150} />
            </div>
          </div>
          <form onSubmit={sub} className="m-auto mt-14 max-w-7xl pb-16">
            <input
              className="w-full mb-3 mt-2.5 pl-2.5 h-14"
              type="text"
              placeholder={'vous êtes...'}
              value={''}
              onChange={func}
            />
            <div className="flex justify-center">
              <div>
                <textarea className={style.textarea} placeholder={'votre message'} value={''} onChange={func} />
              </div>
              <div className="flex flex-col w-4/5">
                <input
                  className="mt-0 mt-2.5 pl-2.5 h-14"
                  type="text"
                  placeholder={'votre nom'}
                  value={''}
                  onChange={func}
                />
                <input
                  className="mt-2.5 pl-2.5 h-14"
                  type="text"
                  placeholder={'votre mail'}
                  value={''}
                  onChange={func}
                />
                <button type="submit" value="Envoyer" className="bg-red-500 p-3 mt-2">
                  <span className="text-yellow-400">ENVOYER</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <footer className={style.footer}>
        <div className="text-center pt-6 text-yellow-100">© 2020 Agileo</div>
      </footer>
    </>
  )
}

export default Home
