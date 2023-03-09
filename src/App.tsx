import { Button, Grid, Table } from '@nextui-org/react';
import { Modal, Text, Input, Row } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import './App.css';

interface user {
  name: String;
  code: String;
  action: String;
  time: String;
}

const url = 'http://192.168.243.73:3001';
const urlArduino = 'http://192.168.243.96/arduino/digital/';

function App() {
  const [state, setState] = useState(0);
  const [json, setJson] = useState<Array<user>>([]);
  const [dataTable, setDataTable] = useState([]);
  const [servo, setServo] = useState(0);
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState('');
  const [codigo, setCodigo] = useState('');
  const [alert, setAlert] = useState(false);
  const [change, setChange] = useState(true);
  const closeHandler = () => {
    if (name && codigo) {
      setVisible(false);
    } else {
      setAlert(true);
    }
  };

  const setData = (json: any) => {
    console.log(json);
    return json.map((item: user) => (
      <Table.Row key={json.indexOf(item)}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.code}</Table.Cell>
        <Table.Cell>{item.action}</Table.Cell>
        <Table.Cell>{item.time}</Table.Cell>
      </Table.Row>
    ));
  };

  useEffect(() => {
    if (json.length > 0) {
      console.log('superxd');
      setDataTable(setData(json));
    } else {
      console.log('xd');
      fetch(url+'/users')
        .then((response) => response.json())
        .then((response) => setJson(response));
    }
  }, [json]);

  useEffect(() => {
    fetch(url+'/users')
        .then((response) => response.json())
        .then((response) => setJson(response));
  }, [change]);

  const setDataOnClick = (stateNumber: number, action: String) => {
    setState(stateNumber);
    const newUser: user = {
      name: name,
      code: codigo,
      action: action,
      time: new Date(Date.now()).toLocaleString(),
    };
    json.push(newUser);
    const data = json.map((data) => data);
    fetch(url+'/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => setJson(data)).then(() => setChange(!change));
  };

  const setServoOnClick = (servo: number, action: String) => {
    setServo(servo);
    const newUser: user = {
      name: name,
      code: codigo,
      action: action,
      time: new Date(Date.now()).toLocaleString(),
    };
    json.push(newUser);
    const data = json.map((data) => data);
    fetch(url+'/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => setJson(data)).then(() => setChange(!change));
  };

  return (
    <div className="App">
      <Modal
        className="modal"
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Ingrese Por favor su{' '}
            <Text b size={18}>
              Nombre
            </Text>{' '}
            y{' '}
            <Text b size={18}>
              Codigo
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            aria-label="name"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nombre"
            onChange={(item) => setName(item.target.value)}
          />
          <Input
            aria-label="code"
            clearable
            bordered
            fullWidth
            type="number"
            color="primary"
            className="inputCodigo"
            size="lg"
            placeholder="Codigo"
            onChange={(item) => setCodigo(item.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row justify="flex-start">
            <Text b hidden={!alert} size={14} color="error">
              Los datos son obligatorios
            </Text>
          </Row>
          <Button auto onPress={closeHandler}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="motor">
        <img src="logo512.png" className={'App-logo' + state} alt="logo" />
        <p>Press a button to change the direction of motor</p>
        <Grid.Container gap={2} className="grid-button">
          <Grid>
            <Button
              onPress={() => setDataOnClick(0, 'Turn OFF')}
              shadow
              color="error"
              auto
            >
              <a href={urlArduino+'4/1'} target='_blank' rel='noreferrer'>Turn OFF</a>
            </Button>
          </Grid>
          <Grid>
            <Button
              onPress={() => setDataOnClick(1, 'Turn ON')}
              shadow
              color="success"
              auto
            >
              <a href={urlArduino+'2/1'} target='_blank' rel='noreferrer'>Turn ON</a>
            </Button>
          </Grid>
          <Grid>
            <Button
              onPress={() => setDataOnClick(-1, 'Turn ON Reverse')}
              shadow
              color="secondary"
              auto
            >
              <a href={urlArduino+'3/1'} target='_blank' rel='noreferrer'>Turn ON Reverse</a>
            </Button>
          </Grid>
        </Grid.Container>
      </div>
      <div
        className="registro"
        style={{
          height: '50%',
          overflow: 'scroll',
        }}
      >
        <Table
          aria-label="Example table with static content"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>CODE</Table.Column>
            <Table.Column>ACTION</Table.Column>
            <Table.Column>TIME</Table.Column>
          </Table.Header>
          <Table.Body>{dataTable}</Table.Body>
        </Table>
      </div>
      <div className="servo">
        <div className="imageServo">
          <img
            src="Manito.png"
            className="imageServoimg"
            alt="servo"
            style={{ WebkitTransform: 'rotate(' + servo + 'deg)' }}
          />
        </div>
        <Grid.Container gap={2} className="grid-button">
          <Grid>
            <Button
              onPress={() => { if (servo > -90) setServoOnClick(servo - 10, "Negative") }}
              shadow
              color="error"
              auto
            >
              Negative
            </Button>
          </Grid>
          <Grid>
            <Button
              onPress={() => { if (servo < 90) setServoOnClick(servo + 10, "Positive") }}
              shadow
              color="primary"
              auto
            >
              Positive
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}

export default App;
