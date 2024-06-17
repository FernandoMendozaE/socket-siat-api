import Note from './model/Note'
import logger from './util/logger'

module.exports = function (io) {
  io.on('connection', socket => {
    logger.info(`New socket connection: ${socket.id}`)

    const emitNotes = async () => {
      try {
        const notes = await Note.find()
        io.emit('server:loadnotes', notes)
        logger.info('Notes fetched and emitted successfully.') // Usando 'info' en lugar de 'success'
      } catch (error) {
        logger.error(`Error fetching notes: ${error.message}`)
      }
    }
    emitNotes()

    socket.on('client:newnote', async data => {
      try {
        const newNote = new Note(data)
        const savedNote = await newNote.save()
        io.emit('server:newnote', savedNote)
        logger.info(`New note created successfully: ${savedNote._id}`) // Usando 'info' en lugar de 'success'
      } catch (error) {
        logger.error(`Error saving new note: ${error.message}`)
      }
    })

    socket.on('client:deletenote', async id => {
      try {
        await Note.findByIdAndDelete(id)
        emitNotes()
        logger.info(`Note deleted successfully: ${id}`) // Usando 'info' en lugar de 'success'
      } catch (error) {
        logger.error(`Error deleting note: ${error.message}`)
      }
    })

    socket.on('client:getnote', async id => {
      try {
        const note = await Note.findById(id)
        if (note) {
          io.emit('server:selectednote', note)
          logger.info(`Note retrieved successfully: ${id}`) // Usando 'info' en lugar de 'success'
        }
      } catch (error) {
        logger.error(`Error getting note: ${error.message}`)
      }
    })

    socket.on('client:updatenote', async updatedNote => {
      try {
        await Note.findByIdAndUpdate(updatedNote._id, {
          title: updatedNote.title,
          description: updatedNote.description
        })
        emitNotes()
        logger.info(`Note updated successfully: ${updatedNote._id}`) // Usando 'info' en lugar de 'success'
      } catch (error) {
        logger.error(`Error updating note: ${error.message}`)
      }
    })
  })
}
