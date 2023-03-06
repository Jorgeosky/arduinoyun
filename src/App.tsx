import { Button, Grid, Table } from '@nextui-org/react';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <div className="motor">
        <img src="logo512.png" className={'App-logo' + state} alt="logo" />
        <p>Press a button to change the direction of motor</p>
        <Grid.Container gap={2} className="grid-button">
          <Grid>
            <Button onClick={() => setState(0)} shadow color="error" auto>
              Turn OFF
            </Button>
          </Grid>
          <Grid>
            <Button onClick={() => setState(1)} shadow color="success" auto>
              Turn ON
            </Button>
          </Grid>
          <Grid>
            <Button onClick={() => setState(-1)} shadow color="secondary" auto>
              Turn ON Reverse
            </Button>
          </Grid>
        </Grid.Container>
      </div>
      <div className="registro">
        <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>CODE</Table.Column>
        <Table.Column>ACTION</Table.Column>
        <Table.Column>TIME</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>Jorge Quintero</Table.Cell>
          <Table.Cell>20181170054</Table.Cell>
          <Table.Cell>Turn OFF</Table.Cell>
          <Table.Cell>2:16</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      </div>
      <div className="servo"></div>
    </div>
  );
}

export default App;
