// Import necessary libraries
import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Define Redux actions
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_DETAILS = 'UPDATE_DETAILS';
const UPDATE_FEES = 'UPDATE_FEES';

// Define initial state
const initialState = {
  name: '',
  details: '',
  fees: 0,
};

// Define Redux reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return { ...state, name: action.payload };
    case UPDATE_DETAILS:
      return { ...state, details: action.payload };
    case UPDATE_FEES:
      return { ...state, fees: action.payload };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

// Define component for displaying and updating the form
class Form extends React.Component {
  handleNameChange = (e) => {
    this.props.updateName(e.target.value);
  };

  handleDetailsChange = (e) => {
    this.props.updateDetails(e.target.value);
  };

  handleFeesChange = (e) => {
    this.props.updateFees(parseInt(e.target.value));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Name"
          value={this.props.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="Details"
          value={this.props.details}
          onChange={this.handleDetailsChange}
        />
        <input
          type="number"
          placeholder="Fees"
          value={this.props.fees}
          onChange={this.handleFeesChange}
        />
      </div>
    );
  }
}

// Connect component to Redux store
const mapStateToProps = (state) => ({
  name: state.name,
  details: state.details,
  fees: state.fees,
});

const mapDispatchToProps = (dispatch) => ({
  updateName: (name) => dispatch({ type: UPDATE_NAME, payload: name }),
  updateDetails: (details) => dispatch({ type: UPDATE_DETAILS, payload: details }),
  updateFees: (fees) => dispatch({ type: UPDATE_FEES, payload: fees }),
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

// Render the app
const App = () => (
  <Provider store={store}>
    <ConnectedForm />
  </Provider>
);

export default App;
