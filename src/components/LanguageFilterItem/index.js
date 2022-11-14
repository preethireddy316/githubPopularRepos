// Write your code here
const LanguageFilterItem = props => {
  const {languageDetails, activeLangId, onLangChange} = props
  const {id, language} = languageDetails

  const langChange = () => {
    onLangChange(id)
  }

  const clsName = id === activeLangId ? 'lang' : ''
  return (
    <li>
      <button type="button" className={clsName} onClick={langChange}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
