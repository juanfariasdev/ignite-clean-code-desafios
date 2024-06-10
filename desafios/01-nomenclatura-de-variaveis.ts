// Nomenclatura de variáveis

const categories = [
  {
    title: 'User',
    minFollowers: 5
  },
  {
    title: 'Friendly',
    minFollowers: 50,
  },
  {
    title: 'Famous',
    minFollowers: 500,
  },
  {
    title: 'Super Star',
    minFollowers: 1000,
  },
]

export default async function classifyGithubUser(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userResponse = await fetch(`https://api.github.com/users/${username}`);

  if (userResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const userData = await userResponse.json()

  const sortedCategories = categories.sort((a, b) => b.minFollowers - a.minFollowers); 

  const userCategory = sortedCategories.find(category => userData.followers > category.minFollowers)

  const classifiedUser = {
    username,
    category: userCategory.title
  }

  return classifiedUser
}

classifyGithubUser({ query: {
  username: 'josepholiveira'
}}, {})