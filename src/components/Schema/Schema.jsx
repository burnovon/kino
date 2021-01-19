import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addBooking, removeBooking } from '../../models/AppModel';
import { addBookingAction, removeBookingAction } from '../../store/actions';

class Schema extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookings: this.props.sessions[this.props.sessionId].bookings,
      bookingSchema: [],
    };
  }

  componentDidMount() {
    const schemaMap = [];

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        schemaMap.push({ row: `${i}`, number: `${j}`, isReserved: false });
      }
    }

    this.setState({
      ...this.state,
      bookingSchema: schemaMap.map((item) => {
        if (
          this.state.bookings.find(
            (booking) =>
              booking.row === item.row && booking.number === item.number
          )
        ) {
          return { ...item, isReserved: true };
        }

        return item;
      }),
    });
  }

  changeReservation = async ({ row, number, isReserved }) => {
    const bookingId = this.props.sessions[
      this.props.sessionId
    ].bookings.findIndex((item) => item.row === row && item.number === number);

    if (isReserved) {
      const removeData = {
        bookingId: bookingId,
        sessionId: this.props.sessionId,
      };

      await removeBooking(removeData);

      this.props.removeBookingDispatch(removeData);
    } else {
      const newBookingData = {
        booking: {
          row,
          number,
        },
        sessionId: this.props.sessionId,
      };

      await addBooking(newBookingData);

      this.props.addBookingDispatch(newBookingData);
    }

    this.setState({
      ...this.state,
      bookingSchema: this.state.bookingSchema.map((item) => {
        if (item.row === row && item.number === number) {
          return { ...item, isReserved: !item.isReserved };
        }

        return item;
      }),
    });
  };

  render() {
    return (
      <div className="schema">
        {this.state.bookingSchema.map((item) => (
          <div
            key={`${item.row}-${item.number}`}
            className={item.isReserved ? 'place' : 'place-free'}
            onClick={this.changeReservation.bind(this, item)}
          ></div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ sessions });

const mapDispatchToProps = (dispatch) => ({
  removeBookingDispatch: ({ bookingId, sessionId }) =>
    dispatch(removeBookingAction({ bookingId, sessionId })),
  addBookingDispatch: (data) => dispatch(addBookingAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schema);
