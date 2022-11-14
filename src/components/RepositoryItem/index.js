// Write your code here
const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, starsCount, forksCount, issuesCount, avatarUrl} = repoDetails
  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        alt="stars"
      />
      <p>{starsCount}</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        alt="forks"
      />
      <p>{forksCount}</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        alt="open issues"
      />
      <p>{issuesCount}</p>
    </li>
  )
}

export default RepositoryItem
