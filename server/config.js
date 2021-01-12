let cookieOptions;
if (process.env.NODE_ENV === 'production') {
  cookieOptions = {
    sameSite: 'none',
    secure: true,
    httpOnly: true
  }
}
else {
  cookieOptions = {
    sameSite: 'lax',
    httpOnly: true
  }
}

module.exports = { cookieOptions }