import React from 'react';
import axios from 'axios';
import { ServiceHistoryChart } from './ServiceHistoryChart';

const STATUS_LOADING = 'loading';
const STATUS_READY   = 'ready';
const STATUS_CALLING = 'calling';

export class ServiceMonitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: STATUS_LOADING,
      history: [],
    };
    this.id = 0;
  }

  componentDidMount() {
    this.id = setInterval(this.callService, 5 * 1000);
    this.setState({ status: STATUS_READY });
  }

  componentWillUnmount() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  callService = () => {
    const { service } = this.props;
    const url = this.url(service);
    if (!url) {
      console.warn('invalid service url');
      return;
    }
    this.setState({ status: STATUS_CALLING });
    const t0 = new Date();
    axios.get(url)
      .then(() => {
        const t1 = new Date();
        this.historyAppend({ ts: t1, delta: t1 - t0, result: '' });
      }).catch(() => {
        const t1 = new Date();
        this.historyAppend({ ts: t1, delta: t1 - t0, result: 'error' });
      });
  }

  historyAppend = (row) => {
    const { history } = this.state;
    const oldRows = (history.length < 100) ? [...history] : history.slice(1, 100);
    this.setState({
      history: [...oldRows, row],
      status: STATUS_READY,
    });
  }

  description = (service) => {
    const t = typeof service;
    if (t === 'string') return service;
    if (t === 'object') {
      if (service.name) return service.name;
    }
    return '[no name]';
  }

  url = (service) => {
    const t = typeof service;
    if (t === 'string') return service;
    if (t === 'object') {
      if (service.url) return service.url;
    }
    return null;
  }

  render() {
    const { service } = this.props;
    const { status, history } = this.state;

    return (
      <div className="monitor">
        <ServiceHistoryChart history={history} />
        <div>
          {this.description(service)} { status }
        </div>
      </div>
    )
  }
}
