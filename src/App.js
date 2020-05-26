import React from 'react';
import { ServicesForm } from './components/ServicesForm';
import { servicesDefaultYamlStr } from './constants';
import { ServiceMonitor } from './components/ServiceMonitor';

const STATUS_LOADING = 'loading';
const STATUS_READY   = 'ready';
const STATUS_EDITING = 'editing';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: STATUS_LOADING,
      yamlStr: servicesDefaultYamlStr,
      jsonStr: '',
      services: [],
    };
  }

  componentDidMount() {
    this.setState({ status: STATUS_READY });
  }

  onYamlEditComplete = (data) => {
    this.setState({ ...data, status: STATUS_READY });
  }

  showForm = () => {
    this.setState({ status: STATUS_EDITING });
  }

  renderPrompt = () => {
    return (
      <>
        <div>
          <button type="button" onClick={this.showForm}>Edit Services</button>
        </div>
        <div>
          {this.state.services.map((service, idx) => {
            const str = JSON.stringify(service);
            return (
              <ServiceMonitor service={service} key={`${idx}-${str}`} />
            )
          })}
        </div>
      </>
    )
  }

  renderForm = () => {
    return (
      <ServicesForm defaultServicesYaml={this.state.yamlStr}
                    onComplete={this.onYamlEditComplete}
      />
    );
  }

  render() {
    const { status } = this.state;
    return (
      <div className="App">
        <header>
          Minuterie
        </header>

        <main>
          {status === STATUS_LOADING ? <div>Loading...</div> : null}
          {status === STATUS_READY ? this.renderPrompt() : null}
          {status === STATUS_EDITING ? this.renderForm() : null}
        </main>

        <footer>
          &copy; 2020
        </footer>
      </div>
    );
  }
}

export default App;
