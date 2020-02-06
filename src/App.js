import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

const readProduct = `query listTodos {
	listTodos {
    items {
      id
      name
    }
  } 
}`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      products: []
    };
  }

  async componentDidMount() {
    const products = await API.graphql(graphqlOperation(readProduct));
    this.setState({ "products": products.data.listTodos.items  });
  }

  render() {
    const datas= [].concat(this.state.products)
      .map((item, i) =>
        <div className="alert alert-primary alert-dismissible show" role="alert">
        {item.name}
      </div>
      )
      
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        "ABC"
        {datas}
      </div>
    );
  }
}

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [{
      label: 'My user name',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: true,
      displayOrder: 3,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 4,
      type: 'string'
    }
  ]
};

const usernameAttributes = 'My user name';

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});
