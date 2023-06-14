import './Header.css';
import GithubIcon from "./assets/github-mark.png"

export default function Header() {
  return (
    <div className='Header'>
        <h1>🐝  OMSCS Course Planner</h1>
        <div className="actions">
          <a className="coffee" href="https://www.buymeacoffee.com/logictonic" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" /></a>
          <a href="https://github.com/logic-tonic/omscs-course-planner" target="_blank"><img className="github" src={ GithubIcon } alt="Github"/></a>
        </div>
    </div>
  )
}