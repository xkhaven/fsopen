const _ = require('lodash')

const dummy = (blogs) => {
  // ...
  if (blogs.length === 0) return 1
}

const totalLikes = (blogs) => {
  let count = 0
  blogs.forEach(b => count += b.likes)

  return count
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max.apply(Math, blogs.map(b => b.likes))
  const blogWithMaxLikes = blogs.find(b => b.likes === maxLikes)
  return blogWithMaxLikes
}

const mostBlogs = (blogs) => {
  let result = {}
  result.author = _.maxBy(blogs, 'author').author
  result.blogs = _.sumBy(blogs, (b) => b.author === result.author)

  return result
}

const mostLikes = (blogs) => {
  const byAuthor = _.groupBy(blogs, 'author')
  let totalLikesByAuthor = []

  _.each(byAuthor, (a) => {
    totalLikesByAuthor.push({
      author: a[0].author,
      likes: _.sumBy(a, 'likes')
    })
  })
  const result = _.maxBy(totalLikesByAuthor, 'likes')

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
