import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";

const HeadAgileo = () => {
    return (
        <>
            <CssBaseline/>
            <Head>
                <meta name="viewport" content="minimum{/**/}-scale=1, initial-scale=1, width=device-width"/>
                <title>Agileo - Une façon innovante d&apos;enseigner à distance</title>
                <link rel="shortcut icon" type="image/svg" href="logo.svg"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass&display=swap"/>
            </Head>
        </>
    )
}

export default HeadAgileo;