export const watchlist = {
  container: {
    minH: `120px`,
    padding: `32px 40px 32px 40px`,
    boxShadow: `2px 2px 8px 0px #0000001A`,
    borderRadius: `12px`,
    _hover: {
      boxShadow: `2px 2px 8px 0px #0000004d`,
      cursor: `pointer`,
    },
  },
  body: {
    _before: {
      content: `""`,
      display: `block`,
      position: `absolute`,
      borderLeftRadius: `12px`,
      left: 0,
      top: 0,
      height: `100%`,
      width: `10px`,
      backgroundColor: `green.600`,
    },
    display: `flex`,
    alignContent: `center`,
  },
}

export const watchlistNoHover = {
  ...watchlist,
  container: {
    ...watchlist.container,
    _hover: {
      boxShadow: `2px 2px 8px 0px #0000001A`,
      cursor: `default`,
    },
  },
}
