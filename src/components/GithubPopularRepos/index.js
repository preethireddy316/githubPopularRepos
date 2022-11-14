import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    activeLangId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {activeLangId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLangId}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const popularRepos = data.popular_repos
      const list = popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({repositoryList: list, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onLangChange = id => {
    this.setState({activeLangId: id}, this.getRepositoryList)
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  loadingView = () => {
    ;<div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  }

  repositoryView = () => {
    const {repositoryList} = this.state
    return (
      <ul>
        {repositoryList.map(each => (
          <RepositoryItem key={each.id} repoDetails={each} />
        ))}
      </ul>
    )
  }

  differentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.repositoryView()
      case apiConstants.loading:
        return this.loadingView()
      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {activeLangId} = this.state
    return (
      <>
        <h1>Popular</h1>
        <ul className="lang-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageDetails={each}
              activeLangId={activeLangId}
              onLangChange={this.onLangChange}
            />
          ))}
        </ul>
        <div>{this.differentViews()}</div>
      </>
    )
  }
}

export default GithubPopularRepos
