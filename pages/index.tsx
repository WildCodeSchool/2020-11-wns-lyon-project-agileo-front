import React from 'react'
import style from '../styles/home.module.css'
import NavBar from 'components/NavBar'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, Typography } from '@material-ui/core'

const func = () => {
  return ''
}

const sub = (e: React.FormEvent) => {
  e.preventDefault()
  return ''
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    firstContent: {
      height: 'calc(100vh - 84px)',
      marginTop: '84px',
      backgroundColor: 'white',
    },
    container: {
      height: 'calc(100vh - 84px)',
      backgroundColor: '#2AB1BF',
      padding: '1.2rem',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
)

const Home = () => {
  const classes = useStyles()
  return (
    <Box className="bg-light-grey">
      <NavBar />
      <Container>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.firstContent}>
          <Grid item md={8} className={classes.content}>
            <Typography variant="h4" align="center" className="color-yellow">
              Notre solution
            </Typography>
            <Typography align="justify" variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
              to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" className="color-yellow">
              Des possibilités infinies
            </Typography>
            <Grid container direction="row" justify="center" spacing={5}>
              <Grid item md={4} className="flex column align-center">
                <img src="img/038-success.svg" alt="learn 1" width={200} height={200} />
                <Typography variant="h5" className="color-light-yellow">
                  Title
                </Typography>
                <Typography align="justify" variant="body1" className="color-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </Typography>
              </Grid>
              <Grid item md={4} className="flex column align-center">
                <img src="img/038-success.svg" alt="learn 1" width={200} height={200} />
                <Typography variant="h5" className="color-light-yellow">
                  Title
                </Typography>
                <Typography align="justify" variant="body1" className="color-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </Typography>
              </Grid>
              <Grid item md={4} className="flex column align-center">
                <img src="img/038-success.svg" alt="learn 1" width={200} height={200} />
                <Typography variant="h5" className="color-light-yellow">
                  Title
                </Typography>
                <Typography align="justify" variant="body1" className="color-white">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
              <img src="/042-video lesson.svg" alt="Logo" width={200} height={200} />
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
              <img src="/016-kitty-33.svg" alt="Logo" width={150} height={150} />
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
      </Container>
      <footer className={style.footer}>
        <div className="text-center pt-6 text-yellow-100">© 2020 Agileo</div>
      </footer>
    </Box>
  )
}

export default Home
