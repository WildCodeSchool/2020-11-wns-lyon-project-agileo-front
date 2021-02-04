import React from 'react'
import Link from 'next/link'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const NavBar = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <div className={classes.menu}>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <Link href="/">
              <img src="img/logo.svg" alt="Logo" width={60} height={60} />
            </Link>
          </IconButton>
          <Typography color="primary" className={classes.title} variant="h4">
            <Link href="/">Agileo</Link>
          </Typography>
        </div>
        <Link href="/login">
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
