import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBooking, editSession, removeSession } from '../../models/AppModel';
import {
  addBookingAction,
  editSessionAction,
  removeSessionAction,
} from '../../store/actions';
import Schema from '../Schema/Schema';

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputNameOpened: false,
      inputTimeOpened: false,
      name: this.props.sessions[this.props.sessionId].name,
      time: this.props.sessions[this.props.sessionId].time,
    };
  }

  onBookingAdd = async () => {
    let row = prompt('Введите ряд', '').trim();
    if (!row || !row.trim()) {
      alert('Невалидный номер!');
      return;
    }

    let number = prompt('Введите номер места', '');
    if (!number || !number.trim()) {
      alert('Невалидный номер!');
      return;
    }
    number = number.trim();

    row = row.trim();

    const newBookingData = {
      booking: {
        row,
        number,
      },
      sessionId: this.props.sessionId,
    };

    await addBooking(newBookingData);

    this.props.addBookingDispatch(newBookingData);
  };

  onDelete = async () => {
    await removeSession(this.props.sessionId);

    this.props.removeSessionDispatch(this.props.sessionId);
  };

  onInputChange = (e) => {
    if (e.target.id === 'name') {
      this.setState({ ...this.state, name: e.target.value });
    } else {
      this.setState({ ...this.state, time: e.target.value });
    }
  };

  onKey = async (e) => {
    if (e.key === 'Escape') {
      this.setState({
        inputNameOpened: false,
        inputTimeOpened: false,
        name: this.props.sessions[this.props.sessionId].name,
        time: this.props.sessions[this.props.sessionId].time,
      });
    } else if (e.key === 'Enter') {
      await editSession({
        sessionId: this.props.sessionId,
        time: this.state.time,
        name: this.state.name,
      });

      this.props.updateSessionDispatch(this.props.sessionId, {
        name: this.state.name,
        time: this.state.time,
      });

      if (e.target.id === 'name') {
        this.setState({
          ...this.state,
          name: e.target.value,
          inputNameOpened: false,
        });
      } else {
        this.setState({
          ...this.state,
          time: e.target.value,
          inputTimeOpened: false,
        });
      }
    }
  };

  render() {
    return (
      <div className="session">
        <DeleteOutlined className="delete-session" onClick={this.onDelete} />
        {!this.state.inputNameOpened ? (
          <h2
            className="session-name"
            onClick={() =>
              this.setState({ ...this.state, inputNameOpened: true })
            }
          >
            {this.state.name}
          </h2>
        ) : (
          <input
            id="name"
            className="session-input"
            value={this.state.name}
            onChange={this.onInputChange}
            onKeyDown={this.onKey}
          />
        )}
        {!this.state.inputTimeOpened ? (
          <h2
            className="session-time"
            onClick={() =>
              this.setState({ ...this.state, inputTimeOpened: true })
            }
          >
            {this.state.time}
          </h2>
        ) : (
          <input
            id="time"
            className="session-input"
            value={this.state.time}
            onChange={this.onInputChange}
            onKeyDown={this.onKey}
          />
        )}
        <Popover
          content={<Schema sessionId={this.props.sessionId} />}
          title="Схема зала"
          trigger="click"
        >
          <Button className="session-button">Добавить бронь</Button>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ sessions });

const mapDispatchToProps = (dispatch) => ({
  addBookingDispatch: (data) => dispatch(addBookingAction(data)),
  removeSessionDispatch: (sessionId) =>
    dispatch(removeSessionAction(sessionId)),
  updateSessionDispatch: (sessionId, data) => {
    dispatch(editSessionAction(sessionId, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
