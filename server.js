import { fastify } from 'fastify'
import { DatabasePostgres } from './db-postgres.js'

const database = new DatabasePostgres()

const server = fastify()

server.post('/videos', async (request, reply) => {
   const { title, description, duration } = request.body
   
   await database.create({
      title,
      description,
      duration,
   })

   return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
   const search = request.query.search

   const videos = await database.list(search)

   return videos
})

server.put('/videos/:id', async (request, reply) => {
   const { title, description, duration } = request.body
   const videoID = request.params.id
   
   await database.update(videoID, {
      title,
      description,
      duration,
   })
   
   return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
   const videoID = request.params.id

   await database.delete(videoID)

   return reply.status(204).send()
})

server.listen({
   port: 3334
})