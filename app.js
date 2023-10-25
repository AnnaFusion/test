const express = require('express')

const { sequelize, User, Post } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  console.log(req.body)
  const { name } = req.body

  try {
    const user = await User.create({ name})

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findOne({
      where: { userId },
      include: 'posts',
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findOne({ where: { userId } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId
  const { name } = req.body
  try {
    const user = await User.findOne({ where: { userId } })

    user.name = name

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/posts', async (req, res) => {
  const { userId, body } = req.body

  try {
    const user = await User.findOne({ where: { userId } })

    const post = await Post.create({ body, userId: user.id })

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json(posts)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen({ port: 3003 }, async () => {
  console.log('Server up on http://localhost:3003')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
