import React, { PureComponent } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import subSeconds from 'date-fns/subSeconds';
import format from 'date-fns/format';

function convertHistory(history) {
  const L = history.length;
  const now = new Date();

  const rows = [...Array(100 - L)].map((_, idx) => ({
    ts: subSeconds(now, (100 - idx) * 5),
    delta: 0,
    result: '',
  }));
  // [ populate, .... h1,h2,h3]
  const data = L < 100 ? [...rows, ...history] : history;

  return data.map(({ ts, delta, result }) => {
    // result: '' or 'error'
    return {
      ts: format(ts, 'H:m:s'),
      latency: delta,
      label: result,
    }
  })
}

export class ServiceHistoryChart extends PureComponent {

  render() {
    const data = convertHistory(this.props.history);
    return (
      <>
        <ResponsiveContainer width="90%" height={100}>


          <BarChart width={300} height={50} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" type="category" />
            <YAxis dataKey="latency" type="number" domain={[0, dataMax => Math.round(dataMax * 1.1)]} />
            <Bar dataKey="latency" fill="#8884d8" unit="ms" barSize={8} isAnimationActive={false} >
              {
                data.map((entry, index) => (
                  <Cell cursor="pointer" fill={entry.label === 'error' ? '#ad1616' : '#1919aa'} key={`cell-${index}`} />
                ))
              }
            </Bar>
          </BarChart>

        </ResponsiveContainer>

      </>


    );
  }
}
