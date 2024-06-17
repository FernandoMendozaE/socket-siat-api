export const helloWorld = async (req, res) => {
  try {
    let message = req.body.message
    return res.send('Hello World!, este es tu mensaje: ' + message)
  } catch (error) {
    console.log({ error })
    return res.render('error', { errorMessage: error.message })
  }
}
