import './Header.css';
import { Button } from 'react-bootstrap';
import GithubIcon from "./assets/github-mark.png";

export default function Header() {
  return (
    <div className='Header'>
        <h1>🐝  OMSCS Course Planner</h1>
        <div className="actions">
          <Button 
            href="https://eatstash.com/" 
            target="_blank" 
            rel="noopener"
            className="eatstash-button"
          >
            Try my cooking app!
          </Button>
          <a 
            href="https://github.com/logic-tonic/omscs-course-planner" 
            target="_blank" 
            rel="noreferrer"
          >
            <img className="github" src={ GithubIcon } alt="Github"/>
          </a>
        </div>
    </div>
  );
}
