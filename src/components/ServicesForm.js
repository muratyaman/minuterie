import React from 'react';
import { yamlParse } from '../lib';

export class ServicesForm extends React.Component {

  constructor(props) {
    super(props);
    const { defaultServicesYaml } = props;
    this.state = this.newState(defaultServicesYaml);
  }

  newState = (yamlStr) => {
    const yamlDoc  = yamlParse(yamlStr);
    const jsonStr  = JSON.stringify(yamlDoc);
    const services = yamlDoc && yamlDoc.services ? yamlDoc.services : [];
    return {
      yamlStr,
      jsonStr,
      services,
    }
  }

  onChange = (ev) => {
    const yamlStr = ev.target.value;
    this.setState(this.newState(yamlStr));
  }

  onSubmit = () => {
    this.props.onComplete(this.state);
  }

  render() {
    const { yamlStr, services } = this.state;
    const footerClass = services.length ? 'success' : 'error';
    return (
      <form className='services'>
        <header>
          <label>Services</label>
        </header>
        <section>
          <div>
            <textarea onChange={this.onChange} rows={15} value={yamlStr} />
          </div>
          <div>
            <button type="button" onClick={this.onSubmit}>OK</button>
          </div>
        </section>
        <footer className={footerClass}>
          <label>Valid services: </label><span>{services.length}</span>
        </footer>
      </form>
    )
  }

}
