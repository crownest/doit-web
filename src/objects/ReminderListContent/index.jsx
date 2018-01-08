// Packages
import React from 'react';

// Components
import ReminderUpdateForm from '../../components/ReminderUpdateForm/index'
import ReminderDeleteButton from '../../components/ReminderDeleteButton/index'
import ReminderRetrieveContent from '../../components/ReminderRetrieveContent/index'

// Local Moduless
import './index.css';


export default class ReminderListContent extends React.Component {
  render() {
    return(
      <div>
        {this.props.reminders.map(reminder =>
          <div key={reminder.id} className={"reminder-card " + (reminder.is_completed ? 'completed-reminder': 'uncompleted-reminder')}>
            <ReminderDeleteButton reminder={reminder}></ReminderDeleteButton>
            {reminder.is_completed ?
              <ReminderRetrieveContent
                date={reminder.date}
                locale_date={reminder.locale_date}>
              </ReminderRetrieveContent> :
              <ReminderUpdateForm
                id={reminder.id}
                date={reminder.date}
                locale_date={reminder.locale_date}>
              </ReminderUpdateForm>
            }
          </div>
        )}
      </div>
    );
  }
}
