import { connect } from "react-redux";
import { createCalendar } from "../../services/calendar";
import CalendarBoard from "./presentation";
import {
  addScheduleOpenDialog,
  addScheduleSetValue,
} from "../../redux/addSchedule/actions";
import { setSchedules } from "../../services/schedule";
import {
  currentScheduleSetItem,
  currentScheduleOpenDialog,
} from "../../redux/currentSchedule/actions";

const mapDispatchToProps = (dispatch) => ({
  openAddScheduleDialog: (d) => {
    dispatch(addScheduleOpenDialog());
    dispatch(addScheduleSetValue({ date: d }));
  },
  openCurrentScheduleDialog: (schedule, e) => {
    e.stopPropagation();
    dispatch(currentScheduleSetItem(schedule));
    dispatch(currentScheduleOpenDialog());
  },
});

const mapStateToProps = (state) => ({
  calendar: state.calendar,
  schedules: state.schedules,
});

const mergeProps = (stateProps, dispatchProps) => {
  const {
    calendar: month,
    schedules: { items: schedules },
  } = stateProps;

  const calendar = setSchedules(createCalendar(month), schedules);

  return {
    ...stateProps,
    ...dispatchProps,
    calendar,
    month,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CalendarBoard);
