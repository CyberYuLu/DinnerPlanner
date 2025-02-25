import { Sidebar } from './sidebarPresenter.jsx';
import { Summary } from './summaryPresenter.jsx';

function ReactRoot(props) {
  
  return (
    <div>
      <div>
        <Sidebar model={props.model}/>
        </div>
      <div>
        <Summary model={props.model} />
        </div>
  </div>
  );
}

export { ReactRoot };
